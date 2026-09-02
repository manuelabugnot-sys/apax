// Utilidades para la detección de país y gestión inteligente de WhatsApp (México / Argentina)

export type SupportedCountry = 'MX' | 'AR';

export interface WhatsAppContact {
  countryCode: SupportedCountry;
  countryName: string;
  flag: string;
  displayNumber: string;
  waNumber: string;
  city: string;
  defaultMessage: string;
}

export const WHATSAPP_CONTACTS: Record<SupportedCountry, WhatsAppContact> = {
  MX: {
    countryCode: 'MX',
    countryName: 'México',
    flag: '🇲🇽',
    displayNumber: '+52 1 442 534 2271',
    waNumber: '5214425342271',
    city: 'Querétaro / CDMX',
    defaultMessage: '¡Hola Apax Management México! Quisiera consultar sobre sus soluciones estratégicas de Talento y RRHH.'
  },
  AR: {
    countryCode: 'AR',
    countryName: 'Argentina',
    flag: '🇦🇷',
    displayNumber: '+54 9 11 7826-0450',
    waNumber: '5491178260450',
    city: 'Palermo, Buenos Aires',
    defaultMessage: '¡Hola Apax Management Argentina! Quisiera consultar sobre sus soluciones estratégicas de Talento y RRHH.'
  }
};

/**
 * Detección instantánea por Zona Horaria del navegador (0 latencia, 100% privacidad, sin llamadas de red)
 */
export function detectCountryFromTimezone(): SupportedCountry | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // Zonas horarias oficiales de México
    if (/Mexico|Cancun|Merida|Monterrey|Mazatlan|Chihuahua|Hermosillo|Tijuana|Bahia_Banderas|Matamoros|Ojinaga|Ciudad_Juarez/i.test(tz)) {
      return 'MX';
    }
    
    // Zonas horarias oficiales de Argentina
    if (/Argentina|Buenos_Aires|Cordoba|Mendoza|Catamarca|Jujuy|Rosario|Tucuman|Ushuaia|San_Juan|San_Luis|Salta|Rio_Gallegos/i.test(tz)) {
      return 'AR';
    }
  } catch (err) {
    console.warn('No se pudo determinar la zona horaria del cliente:', err);
  }
  return null;
}

/**
 * Genera la URL de WhatsApp con el número adecuado y mensaje opcional
 */
export function buildWhatsAppUrl(country: SupportedCountry, customMessage?: string): string {
  const contact = WHATSAPP_CONTACTS[country] || WHATSAPP_CONTACTS.AR;
  const message = customMessage || contact.defaultMessage;
  return `https://wa.me/${contact.waNumber}?text=${encodeURIComponent(message)}`;
}
