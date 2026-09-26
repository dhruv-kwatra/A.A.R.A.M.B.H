// UI strings: English / Hindi. Severity badges keep IMD color-code wording.
export const STRINGS = {
  en: {
    subtitle: 'Bharat Convective Nowcasting · Storm Operations',
    live: 'LIVE',
    offline: 'OFFLINE',
    demo: 'DEMO',
    lastCycle: 'Last cycle',
    region: 'Region',
    language: 'भाषा',
    districtAlerts: 'District alerts',
    noThreat: 'No imminent threat',
    arrivingIn: 'Storm arriving in',
    minutes: 'min',
    overheadNow: 'Storm overhead now',
    probability: 'Probability',
    eta: 'ETA',
    armAlert: 'Arm alert',
    alertArmed: 'Alert armed',
    alertModalTitle: 'Arm storm alert',
    alertModalSub: 'Simulated delivery — no real SMS is sent in this demo.',
    nameLabel: 'Name',
    contactLabel: 'Phone / Email',
    cancel: 'Cancel',
    saveAlert: 'Arm alert',
    alertSaved: 'Alert armed — simulated SMS/email delivery.',
    layers: 'Layers',
    radar: 'Radar reflectivity',
    opacity: 'Opacity',
    baseMap: 'Base map',
    osm: 'OpenStreetMap',
    bhuvan: 'ISRO Bhuvan',
    compare: 'IMD vs BhoomiRakshak',
    imdSimBadge: 'Simulated IMD reference',
    imdSimNote: 'IMD-style polygons are illustrative only — not an official bulletin.',
    imdSimAdvisory:
      'IMD-style simulated warning: thunderstorm with lightning likely in the next 3 hours. Illustrative only — not an official IMD bulletin.',
    validTime: 'Valid',
    forecastLead: 'Forecast lead',
    now: 'Now',
    play: 'Play',
    pause: 'Pause',
    backendOffline:
      'Backend offline — showing base map only. Start the API server and reload.',
    retry: 'Retry',
    legend: 'Legend',
    radarScale: 'dBZ',
    severity: 'Severity',
    intensity: 'Intensity',
    advisory: 'Advisory',
    noAdvisory: 'Advisory awaited from district administration.',
    cells: 'storm cells',
    footerDemo:
      'Demo mode: simulated radar seeded by live Open-Meteo convective data.',
    footerSources:
      'Sources: IMD Doppler Weather Radar · MOSDAC / INSAT-3D · IITM lightning network · NCMRWF · IMD API portal | Base maps © OpenStreetMap contributors · ISRO Bhuvan (NRSC)',
    hazards: 'Hazards',
  },
  hi: {
    subtitle: 'भारत संवहनीय पूर्वानुमान · तूफ़ान संचालन',
    live: 'लाइव',
    offline: 'ऑफ़लाइन',
    demo: 'डेमो',
    lastCycle: 'अंतिम चक्र',
    region: 'क्षेत्र',
    language: 'Language',
    districtAlerts: 'ज़िला अलर्ट',
    noThreat: 'कोई तत्काल खतरा नहीं',
    arrivingIn: 'तूफ़ान आने में',
    minutes: 'मिनट',
    overheadNow: 'तूफ़ान अभी ऊपर',
    probability: 'संभावना',
    eta: 'अनुमानित समय',
    armAlert: 'अलर्ट लगाएँ',
    alertArmed: 'अलर्ट सक्रिय',
    alertModalTitle: 'तूफ़ान अलर्ट लगाएँ',
    alertModalSub: 'सिम्युलेटेड डिलीवरी — इस डेमो में कोई वास्तविक SMS नहीं भेजा जाता।',
    nameLabel: 'नाम',
    contactLabel: 'फ़ोन / ईमेल',
    cancel: 'रद्द करें',
    saveAlert: 'अलर्ट लगाएँ',
    alertSaved: 'अलर्ट सक्रिय — सिम्युलेटेड SMS/ईमेल डिलीवरी।',
    layers: 'परतें',
    radar: 'रडार परावर्तन',
    opacity: 'पारदर्शिता',
    baseMap: 'आधार मानचित्र',
    osm: 'ओपनस्ट्रीटमैप',
    bhuvan: 'इसरो भुवन',
    compare: 'आईएमडी बनाम भूमिरक्षक',
    imdSimBadge: 'सिम्युलेटेड आईएमडी संदर्भ',
    imdSimNote:
      'आईएमडी-शैली बहुभुज केवल उदाहरण हेतु हैं — आधिकारिक बुलेटिन नहीं।',
    imdSimAdvisory:
      'आईएमडी-शैली सिम्युलेटेड चेतावनी: अगले 3 घंटों में बिजली के साथ तूफ़ान की संभावना। केवल उदाहरण — आधिकारिक आईएमडी बुलेटिन नहीं।',
    validTime: 'वैध समय',
    forecastLead: 'पूर्वानुमान',
    now: 'अभी',
    play: 'चलाएँ',
    pause: 'रोकें',
    backendOffline:
      'बैकएंड ऑफ़लाइन — केवल आधार मानचित्र दिख रहा है। API सर्वर चालू करके पुनः लोड करें।',
    retry: 'पुनः प्रयास',
    legend: 'संकेत',
    radarScale: 'dBZ',
    severity: 'गंभीरता',
    intensity: 'तीव्रता',
    advisory: 'परामर्श',
    noAdvisory: 'ज़िला प्रशासन से परामर्श की प्रतीक्षा है।',
    cells: 'तूफ़ान कोशिकाएँ',
    footerDemo:
      'डेमो मोड: लाइव Open-Meteo संवहनीय डेटा से सीडेड सिम्युलेटेड रडार।',
    footerSources:
      'स्रोत: आईएमडी डॉपलर मौसम रडार · MOSDAC / INSAT-3D · IITM तड़ित नेटवर्क · NCMRWF · IMD API पोर्टल | आधार मानचित्र © OpenStreetMap योगदानकर्ता · इसरो भुवन (NRSC)',
    hazards: 'खतरे',
  },
};

export const REGION_HI = {
  'delhi-ncr': 'दिल्ली-एनसीआर',
  mumbai: 'मुंबई',
  chennai: 'चेन्नई',
  kolkata: 'कोलकाता',
  bengaluru: 'बेंगलुरु',
  hyderabad: 'हैदराबाद',
  ahmedabad: 'अहमदाबाद',
  lucknow: 'लखनऊ',
};

// IMD colour-code wording for severity badges.
export function severityLabel(sev, lang = 'en') {
  const map = {
    en: {
      yellow: 'YELLOW · Watch',
      orange: 'ORANGE · Alert',
      red: 'RED · Warning',
      green: 'GREEN · No warning',
    },
    hi: {
      yellow: 'पीला · निगरानी',
      orange: 'नारंगी · अलर्ट',
      red: 'लाल · चेतावनी',
      green: 'हरा · कोई चेतावनी नहीं',
    },
  };
  const table = map[lang] || map.en;
  return table[sev] || table.green;
}

export function regionName(region, lang = 'en') {
  if (!region) return '';
  if (lang === 'hi' && REGION_HI[region.id]) return REGION_HI[region.id];
  return region.name || region.id;
}
