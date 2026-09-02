import { useState, useEffect, useCallback } from 'react';
import { 
  SupportedCountry, 
  WHATSAPP_CONTACTS, 
  WhatsAppContact, 
  detectCountryFromTimezone, 
  buildWhatsAppUrl 
} from '../utils/whatsapp';

const STORAGE_KEY = 'apax_country_preference';
const CHANGE_EVENT = 'apax_country_change';

export function useCountryWhatsApp() {
  const [country, setCountryState] = useState<SupportedCountry>(() => {
    // 1. Preferencia guardada en localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedCountry | null;
      if (saved === 'MX' || saved === 'AR') {
        return saved;
      }
    }
    // 2. Detección instantánea por Timezone del navegador
    const detected = detectCountryFromTimezone();
    if (detected) {
      return detected;
    }
    // 3. Fallback por defecto a Argentina (o México según se defina)
    return 'AR';
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return !saved;
    }
    return true;
  });

  // Escuchar cambios entre diferentes componentes en la misma página
  useEffect(() => {
    const handleStorageOrEvent = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedCountry>;
      if (customEvent.detail && (customEvent.detail === 'MX' || customEvent.detail === 'AR')) {
        setCountryState(customEvent.detail);
      } else {
        const saved = localStorage.getItem(STORAGE_KEY) as SupportedCountry | null;
        if (saved === 'MX' || saved === 'AR') {
          setCountryState(saved);
        }
      }
    };

    window.addEventListener(CHANGE_EVENT, handleStorageOrEvent);
    window.addEventListener('storage', handleStorageOrEvent);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleStorageOrEvent);
      window.removeEventListener('storage', handleStorageOrEvent);
    };
  }, []);

  // Intento de geolocalización por IP en segundo plano (asincrónico)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Si el usuario ya eligió manualmente, respetamos su elección
    if (saved === 'MX' || saved === 'AR') {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const checkGeoIP = async () => {
      try {
        // Servicio rápido y confiable sin API key
        const res = await fetch('https://api.country.is/', { 
          signal: controller.signal,
          cache: 'no-cache'
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;

        if (data && data.country) {
          const detectedCountryCode = data.country.toUpperCase();
          if (detectedCountryCode === 'MX') {
            setCountryState('MX');
          } else if (detectedCountryCode === 'AR') {
            setCountryState('AR');
          }
        }
      } catch {
        // Silencioso: el fallback por zona horaria ya está activo
      } finally {
        clearTimeout(timeoutId);
      }
    };

    checkGeoIP();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  const setCountry = useCallback((newCountry: SupportedCountry) => {
    setCountryState(newCountry);
    setIsAutoDetected(false);
    try {
      localStorage.setItem(STORAGE_KEY, newCountry);
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: newCountry }));
    } catch {
      // Ignorar errores de localStorage en modo privado
    }
  }, []);

  const activeContact: WhatsAppContact = WHATSAPP_CONTACTS[country];

  const getUrl = useCallback((customMessage?: string) => {
    return buildWhatsAppUrl(country, customMessage);
  }, [country]);

  return {
    country,
    isDetectedMexico: country === 'MX',
    isDetectedArgentina: country === 'AR',
    activeContact,
    contacts: WHATSAPP_CONTACTS,
    setCountry,
    getUrl,
    isAutoDetected
  };
}
