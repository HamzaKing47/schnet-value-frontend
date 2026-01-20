import { useState, useEffect, useRef } from 'react';

const GoogleTranslateWithSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // All available languages with English names
  const allLanguages = [
    { code: 'af', name: 'Afrikaans', englishName: 'Afrikaans' },
    { code: 'sq', name: 'Albanian', englishName: 'Albanian' },
    { code: 'am', name: 'Amharic', englishName: 'Amharic' },
    { code: 'ar', name: 'Arabic', englishName: 'Arabic' },
    { code: 'hy', name: 'Armenian', englishName: 'Armenian' },
    { code: 'az', name: 'Azerbaijani', englishName: 'Azerbaijani' },
    { code: 'eu', name: 'Basque', englishName: 'Basque' },
    { code: 'be', name: 'Belarusian', englishName: 'Belarusian' },
    { code: 'bn', name: 'Bengali', englishName: 'Bengali' },
    { code: 'bs', name: 'Bosnian', englishName: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian', englishName: 'Bulgarian' },
    { code: 'ca', name: 'Catalan', englishName: 'Catalan' },
    { code: 'ceb', name: 'Cebuano', englishName: 'Cebuano' },
    { code: 'ny', name: 'Chichewa', englishName: 'Chichewa' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', englishName: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', englishName: 'Chinese (Traditional)' },
    { code: 'co', name: 'Corsican', englishName: 'Corsican' },
    { code: 'hr', name: 'Croatian', englishName: 'Croatian' },
    { code: 'cs', name: 'Czech', englishName: 'Czech' },
    { code: 'da', name: 'Danish', englishName: 'Danish' },
    { code: 'nl', name: 'Dutch', englishName: 'Dutch' },
    { code: 'en', name: 'English', englishName: 'English' },
    { code: 'eo', name: 'Esperanto', englishName: 'Esperanto' },
    { code: 'et', name: 'Estonian', englishName: 'Estonian' },
    { code: 'tl', name: 'Filipino', englishName: 'Filipino' },
    { code: 'fi', name: 'Finnish', englishName: 'Finnish' },
    { code: 'fr', name: 'French', englishName: 'French' },
    { code: 'fy', name: 'Frisian', englishName: 'Frisian' },
    { code: 'gl', name: 'Galician', englishName: 'Galician' },
    { code: 'ka', name: 'Georgian', englishName: 'Georgian' },
    { code: 'de', name: 'German', englishName: 'German' },
    { code: 'el', name: 'Greek', englishName: 'Greek' },
    { code: 'gu', name: 'Gujarati', englishName: 'Gujarati' },
    { code: 'ht', name: 'Haitian Creole', englishName: 'Haitian Creole' },
    { code: 'ha', name: 'Hausa', englishName: 'Hausa' },
    { code: 'haw', name: 'Hawaiian', englishName: 'Hawaiian' },
    { code: 'he', name: 'Hebrew', englishName: 'Hebrew' },
    { code: 'hi', name: 'Hindi', englishName: 'Hindi' },
    { code: 'hmn', name: 'Hmong', englishName: 'Hmong' },
    { code: 'hu', name: 'Hungarian', englishName: 'Hungarian' },
    { code: 'is', name: 'Icelandic', englishName: 'Icelandic' },
    { code: 'ig', name: 'Igbo', englishName: 'Igbo' },
    { code: 'id', name: 'Indonesian', englishName: 'Indonesian' },
    { code: 'ga', name: 'Irish', englishName: 'Irish' },
    { code: 'it', name: 'Italian', englishName: 'Italian' },
    { code: 'ja', name: 'Japanese', englishName: 'Japanese' },
    { code: 'jw', name: 'Javanese', englishName: 'Javanese' },
    { code: 'kn', name: 'Kannada', englishName: 'Kannada' },
    { code: 'kk', name: 'Kazakh', englishName: 'Kazakh' },
    { code: 'km', name: 'Khmer', englishName: 'Khmer' },
    { code: 'ko', name: 'Korean', englishName: 'Korean' },
    { code: 'ku', name: 'Kurdish (Kurmanji)', englishName: 'Kurdish' },
    { code: 'ky', name: 'Kyrgyz', englishName: 'Kyrgyz' },
    { code: 'lo', name: 'Lao', englishName: 'Lao' },
    { code: 'la', name: 'Latin', englishName: 'Latin' },
    { code: 'lv', name: 'Latvian', englishName: 'Latvian' },
    { code: 'lt', name: 'Lithuanian', englishName: 'Lithuanian' },
    { code: 'lb', name: 'Luxembourgish', englishName: 'Luxembourgish' },
    { code: 'mk', name: 'Macedonian', englishName: 'Macedonian' },
    { code: 'mg', name: 'Malagasy', englishName: 'Malagasy' },
    { code: 'ms', name: 'Malay', englishName: 'Malay' },
    { code: 'ml', name: 'Malayalam', englishName: 'Malayalam' },
    { code: 'mt', name: 'Maltese', englishName: 'Maltese' },
    { code: 'mi', name: 'Maori', englishName: 'Maori' },
    { code: 'mr', name: 'Marathi', englishName: 'Marathi' },
    { code: 'mn', name: 'Mongolian', englishName: 'Mongolian' },
    { code: 'my', name: 'Myanmar (Burmese)', englishName: 'Burmese' },
    { code: 'ne', name: 'Nepali', englishName: 'Nepali' },
    { code: 'no', name: 'Norwegian', englishName: 'Norwegian' },
    { code: 'ps', name: 'Pashto', englishName: 'Pashto' },
    { code: 'fa', name: 'Persian', englishName: 'Persian' },
    { code: 'pl', name: 'Polish', englishName: 'Polish' },
    { code: 'pt', name: 'Portuguese', englishName: 'Portuguese' },
    { code: 'pa', name: 'Punjabi', englishName: 'Punjabi' },
    { code: 'ro', name: 'Romanian', englishName: 'Romanian' },
    { code: 'ru', name: 'Russian', englishName: 'Russian' },
    { code: 'sm', name: 'Samoan', englishName: 'Samoan' },
    { code: 'gd', name: 'Scots Gaelic', englishName: 'Scots Gaelic' },
    { code: 'sr', name: 'Serbian', englishName: 'Serbian' },
    { code: 'st', name: 'Sesotho', englishName: 'Sesotho' },
    { code: 'sn', name: 'Shona', englishName: 'Shona' },
    { code: 'sd', name: 'Sindhi', englishName: 'Sindhi' },
    { code: 'si', name: 'Sinhala', englishName: 'Sinhala' },
    { code: 'sk', name: 'Slovak', englishName: 'Slovak' },
    { code: 'sl', name: 'Slovenian', englishName: 'Slovenian' },
    { code: 'so', name: 'Somali', englishName: 'Somali' },
    { code: 'es', name: 'Spanish', englishName: 'Spanish' },
    { code: 'su', name: 'Sundanese', englishName: 'Sundanese' },
    { code: 'sw', name: 'Swahili', englishName: 'Swahili' },
    { code: 'sv', name: 'Swedish', englishName: 'Swedish' },
    { code: 'tg', name: 'Tajik', englishName: 'Tajik' },
    { code: 'ta', name: 'Tamil', englishName: 'Tamil' },
    { code: 'te', name: 'Telugu', englishName: 'Telugu' },
    { code: 'th', name: 'Thai', englishName: 'Thai' },
    { code: 'tr', name: 'Turkish', englishName: 'Turkish' },
    { code: 'uk', name: 'Ukrainian', englishName: 'Ukrainian' },
    { code: 'ur', name: 'Urdu', englishName: 'Urdu' },
    { code: 'uz', name: 'Uzbek', englishName: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese', englishName: 'Vietnamese' },
    { code: 'cy', name: 'Welsh', englishName: 'Welsh' },
    { code: 'xh', name: 'Xhosa', englishName: 'Xhosa' },
    { code: 'yi', name: 'Yiddish', englishName: 'Yiddish' },
    { code: 'yo', name: 'Yoruba', englishName: 'Yoruba' },
    { code: 'zu', name: 'Zulu', englishName: 'Zulu' }
  ];

  // Popular languages with flags
  const popularLanguages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', englishName: 'German' },
    { code: 'en', name: 'English', flag: '🇬🇧', englishName: 'English' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', englishName: 'French' },
    { code: 'es', name: 'Español', flag: '🇪🇸', englishName: 'Spanish' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', englishName: 'Italian' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', englishName: 'Dutch' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', englishName: 'Polish' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', englishName: 'Russian' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', englishName: 'Turkish' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', englishName: 'Arabic' },
    { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳', englishName: 'Chinese' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', englishName: 'Japanese' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', englishName: 'Korean' },
  ];

  // Filter languages based on search (using English names)
  const filteredLanguages = allLanguages.filter(lang =>
    lang.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [showDropdown]);

  // Initialize Google Translate and check current language
  useEffect(() => {
    // Check current language from cookies
    const getCurrentLanguage = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('googtrans=')) {
          const value = cookie.split('=')[1];
          const parts = value.split('/');
          if (parts.length >= 3) {
            const langCode = parts[2];
            // Update state with detected language
            setTimeout(() => setSelectedLanguage(langCode), 100);
            return langCode;
          }
        }
      }
      return 'de';
    };

    const savedLang = localStorage.getItem('preferred_language') || getCurrentLanguage();
    setSelectedLanguage(savedLang);

    // Load Google Translate
    const loadGoogleTranslate = () => {
      if (!window.google || !window.google.translate) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    const timer = setTimeout(loadGoogleTranslate, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Function to change language
  const changeLanguage = (langCode) => {
    const lang = allLanguages.find(l => l.code === langCode);
    const langName = lang ? lang.englishName : langCode;
    
    // Set Google Translate cookie
    document.cookie = `googtrans=/de/${langCode}; path=/; max-age=31536000`;
    
    // Store user preference
    localStorage.setItem('preferred_language', langCode);
    setSelectedLanguage(langCode);
    setShowDropdown(false);
    
    // Show notification
    alert(`Translating page to ${langName}...\nThe page will reload in a moment.`);
    
    // Reload page to apply translation
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  // Get current language English name
  const getCurrentLanguageName = () => {
    const lang = allLanguages.find(l => l.code === selectedLanguage);
    return lang ? lang.englishName : 'German';
  };

  // Get flag for current language
  const getCurrentFlag = () => {
    const popularLang = popularLanguages.find(l => l.code === selectedLanguage);
    return popularLang ? popularLang.flag : '🌐';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Selector Button - English Name Only */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-50 border border-gray-200 bg-white shadow-sm min-w-[120px]"
      >
        <span className="text-lg flex-shrink-0">{getCurrentFlag()}</span>
        <span className="font-semibold truncate">{getCurrentLanguageName()}</span>
        <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col max-h-[80vh] sm:max-h-[500px]">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Choose Language</h3>
              <span className="text-xs text-gray-500">Google Translate</span>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by language name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  ⌘F
                </div>
              )}
            </div>
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Popular Languages (when no search) */}
            {!searchTerm && (
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Languages</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2 popular-scrollbar">
                  {popularLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-3 p-3 rounded-lg text-left hover:bg-primaryLighter transition-colors ${
                        selectedLanguage === lang.code ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{lang.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{lang.englishName}</div>
                        <div className="text-xs text-gray-500 truncate">{lang.name}</div>
                      </div>
                      {selectedLanguage === lang.code && (
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Languages List (when searching) */}
            {searchTerm && filteredLanguages.length > 0 ? (
              <div className="p-2">
                {filteredLanguages.map((lang) => {
                  const isPopular = popularLanguages.some(p => p.code === lang.code);
                  const popularLang = popularLanguages.find(p => p.code === lang.code);
                  
                  return (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                        selectedLanguage === lang.code ? 'bg-primary/10' : ''
                      }`}
                    >
                      <div className={`w-8 h-6 rounded border border-gray-200 flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                        isPopular ? 'bg-primary/5 text-primary' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {lang.code.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{lang.englishName}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {isPopular && popularLang?.flag} {lang.name}
                        </div>
                      </div>
                      {selectedLanguage === lang.code && (
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : searchTerm && filteredLanguages.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">No languages found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {searchTerm 
                  ? `${filteredLanguages.length} languages found` 
                  : `${allLanguages.length} languages available`
                }
              </span>
              <a 
                href="https://translate.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primaryDark font-medium"
              >
                Powered by Google
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div 
        id="google_translate_element" 
        style={{ 
          position: 'absolute',
          top: '-1000px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Custom scrollbar styles */}
      <style jsx="true">{`
        /* Hide Google Translate banner */
        .goog-te-banner-frame,
        .skiptranslate,
        .goog-te-gadget-icon,
        .goog-logo-link {
          display: none !important;
        }
        
        /* Main scrollable area */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
          margin: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
          border: 2px solid #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Popular languages grid scrollbar */
        .popular-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
        
        .popular-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .popular-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        
        .popular-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        
        .popular-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }
        
        .popular-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslateWithSearch;