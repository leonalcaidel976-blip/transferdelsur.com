import { useState, useEffect, createContext, useContext } from "react";
import "@/App.css";
import { translations } from "./translations";
import { 
  Plane, Clock, MapPin, Car, Users, Briefcase, Star, 
  Phone, Mail, Instagram, ChevronDown, Menu, X, Globe,
  Check, ArrowRight, Quote
} from "lucide-react";

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Language Provider
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Selector Component
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];
  
  const currentLang = languages.find(l => l.code === language);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
        data-testid="language-selector-btn"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.name}</span>
        <span className="sm:hidden">{currentLang?.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-800 flex items-center gap-2 transition-colors ${
                language === lang.code ? 'bg-amber-500/20 text-amber-400' : 'text-white'
              }`}
              data-testid={`lang-${lang.code}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {language === lang.code && <Check className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#servicios', label: t.nav.services },
    { href: '#flota', label: t.nav.fleet },
    { href: '#tarifas', label: t.nav.prices },
    { href: '#nosotros', label: t.nav.about },
    { href: '#contacto', label: t.nav.contact },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg">Transfer del Sur</span>
              <span className="text-amber-400 text-xs block">Costa del Sol</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector />
            <a
              href="#reservar"
              className="hidden sm:inline-flex bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
              data-testid="nav-book-btn"
            >
              {t.nav.book}
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              data-testid="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gray-900/95 backdrop-blur-md rounded-b-2xl pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="#reservar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-6 py-3 rounded-full font-semibold"
              >
                {t.nav.book}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-euj2h7e3f2e4?w=1920&h=1080&fit=crop"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6">
          {t.hero.badge}
        </span>
        
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t.hero.title.split(' ').slice(0, 2).join(' ')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            {t.hero.title.split(' ').slice(2).join(' ')}
          </span>
        </h1>
        
        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4">
          <a
            href="#reservar"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            data-testid="hero-book-btn"
          >
            {t.hero.bookNow}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#flota"
            className="border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            data-testid="hero-fleet-btn"
          >
            {t.hero.viewFleet}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
          {[
            { icon: Check, label: t.hero.stats.license, value: t.hero.stats.legal },
            { icon: Star, label: t.hero.stats.stars, value: t.hero.stats.trips },
            { icon: Users, label: t.hero.stats.drivers, value: t.hero.stats.certified },
            { icon: Globe, label: t.hero.stats.booking, value: "24/7" },
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm sm:text-base">{stat.label}</div>
              <div className="text-amber-400 text-xs sm:text-sm">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Booking Form Section
const BookingForm = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('airport');
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    luggage: '1',
    name: '',
    email: '',
    phone: '',
    vehicle: ''
  });

  const destinations = [
    { key: 'marbella', label: t.booking.destinations.marbella },
    { key: 'puertoBanus', label: t.booking.destinations.puertoBanus },
    { key: 'estepona', label: t.booking.destinations.estepona },
    { key: 'fuengirola', label: t.booking.destinations.fuengirola },
    { key: 'torremolinos', label: t.booking.destinations.torremolinos },
    { key: 'benalmadena', label: t.booking.destinations.benalmadena },
    { key: 'malagaCentro', label: t.booking.destinations.malagaCentro },
    { key: 'nerja', label: t.booking.destinations.nerja },
    { key: 'ronda', label: t.booking.destinations.ronda },
    { key: 'granada', label: t.booking.destinations.granada },
    { key: 'sevilla', label: t.booking.destinations.sevilla },
    { key: 'other', label: t.booking.destinations.other },
  ];

  const vehicles = [
    { key: 'mercedesE', label: t.booking.vehicles.mercedesE, price: '+0€' },
    { key: 'mercedesV', label: t.booking.vehicles.mercedesV, price: '+20€' },
    { key: 'mercedesS', label: t.booking.vehicles.mercedesS, price: '+40€' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Hola, me gustaría reservar:\n- Tipo: ${activeTab}\n- Recogida: ${formData.pickup}\n- Destino: ${formData.destination}\n- Fecha: ${formData.date}\n- Hora: ${formData.time}\n- Pasajeros: ${formData.passengers}\n- Maletas: ${formData.luggage}\n- Vehículo: ${formData.vehicle}\n- Nombre: ${formData.name}\n- Email: ${formData.email}\n- Teléfono: ${formData.phone}`;
    window.open(`https://wa.me/34600221794?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <section id="reservar" className="py-12 sm:py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-gray-700 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">{t.booking.title}</h2>

          {/* Tabs */}
          <div className="flex bg-gray-700/50 rounded-full p-1 mb-6 sm:mb-8 overflow-x-auto">
            {[
              { key: 'airport', label: t.booking.tabs.airport, icon: Plane },
              { key: 'hourly', label: t.booking.tabs.hourly, icon: Clock },
              { key: 'tours', label: t.booking.tabs.tours, icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-full transition-all text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-amber-500 text-gray-900 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
                data-testid={`tab-${tab.key}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.pickup} *</label>
                <input
                  type="text"
                  required
                  value={formData.pickup}
                  onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-pickup"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.destination} *</label>
                <select
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="select-destination"
                >
                  <option value="">{t.booking.selectDestination}</option>
                  {destinations.map((dest) => (
                    <option key={dest.key} value={dest.label}>{dest.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.date} *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-date"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.time} *</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-time"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.passengers}</label>
                <select
                  value={formData.passengers}
                  onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="select-passengers"
                >
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.luggage}</label>
                <select
                  value={formData.luggage}
                  onChange={(e) => setFormData({...formData, luggage: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="select-luggage"
                >
                  {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">{t.booking.vehicle} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.key}
                    type="button"
                    onClick={() => setFormData({...formData, vehicle: vehicle.label})}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                      formData.vehicle === vehicle.label
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                    }`}
                    data-testid={`vehicle-${vehicle.key}`}
                  >
                    <div className="flex items-center justify-between">
                      <Car className={`w-5 h-5 sm:w-6 sm:h-6 ${formData.vehicle === vehicle.label ? 'text-amber-400' : 'text-gray-400'}`} />
                      <span className="text-amber-400 text-xs sm:text-sm font-semibold">{vehicle.price}</span>
                    </div>
                    <div className={`text-xs sm:text-sm mt-2 ${formData.vehicle === vehicle.label ? 'text-white' : 'text-gray-300'}`}>
                      {vehicle.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.name} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.email} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.booking.phone} *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
              data-testid="submit-booking"
            >
              {t.booking.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    { icon: Plane, title: t.services.airport.title, desc: t.services.airport.desc },
    { icon: Clock, title: t.services.hourly.title, desc: t.services.hourly.desc },
    { icon: MapPin, title: t.services.tours.title, desc: t.services.tours.desc },
    { icon: Briefcase, title: t.services.corporate.title, desc: t.services.corporate.desc },
  ];

  return (
    <section id="servicios" className="py-12 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-amber-400 font-medium">{t.services.subtitle}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">{t.services.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-700 hover:border-amber-500/50 transition-all group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fleet Section
const Fleet = () => {
  const { t } = useLanguage();
  
  const cars = [
    {
      name: "Mercedes Clase E",
      type: t.fleet.sedan,
      image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/14xa6qhm_image.png",
      pax: "1-3",
      luggage: 3,
      photos: 3
    },
    {
      name: "Mercedes Clase E",
      type: t.fleet.sedan,
      image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/r87m5iy1_WhatsApp%20Image%202026-02-17%20at%2019.18.41.jpeg",
      pax: "1-3",
      luggage: 3,
      photos: 3
    },
    {
      name: "Mercedes Clase V",
      type: t.fleet.van,
      image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/4w52bumt_WhatsApp%20Image%202026-02-17%20at%2018.25.00.jpeg",
      pax: "4-7",
      luggage: 7
    },
    {
      name: "Mercedes Clase S",
      type: t.fleet.sedanLux,
      image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/02lpptha_image.png",
      pax: "1-3",
      luggage: 3
    },
  ];

  return (
    <section id="flota" className="py-12 sm:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-amber-400 font-medium">{t.fleet.subtitle}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">{t.fleet.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all group"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {car.photos && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                    {car.photos} {t.fleet.photos}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-amber-500 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                  {car.type}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">{car.name}</h3>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {car.pax} {t.fleet.pax}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {car.luggage} {t.fleet.luggage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Prices Section - Updated with +20€
const Prices = () => {
  const { t } = useLanguage();
  
  const prices = [
    { destination: t.booking.destinations.marbella, duration: 45, sedan: 95, van: 115 },
    { destination: t.booking.destinations.puertoBanus, duration: 50, sedan: 100, van: 120 },
    { destination: t.booking.destinations.estepona, duration: 60, sedan: 110, van: 135 },
    { destination: t.booking.destinations.fuengirola, duration: 25, sedan: 65, van: 80 },
    { destination: t.booking.destinations.torremolinos, duration: 15, sedan: 55, van: 65 },
    { destination: t.booking.destinations.benalmadena, duration: 20, sedan: 60, van: 75 },
    { destination: t.booking.destinations.malagaCentro, duration: 15, sedan: 50, van: 60 },
    { destination: t.booking.destinations.nerja, duration: 70, sedan: 130, van: 160 },
  ];

  return (
    <section id="tarifas" className="py-12 sm:py-20 bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-amber-400 font-medium">{t.prices.subtitle}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">{t.prices.title}</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-2xl mx-auto">{t.prices.description}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-amber-400">{t.prices.table.destination}</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-amber-400">{t.prices.table.duration}</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-amber-400">{t.prices.table.sedan}</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-amber-400">{t.prices.table.van}</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((row, index) => (
                  <tr key={index} className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white font-medium">{row.destination}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-400 text-center">{row.duration} {t.prices.min}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white text-center font-semibold">{row.sedan}€</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-white text-center font-semibold">{row.van}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-800/30 text-xs sm:text-sm text-gray-400">
            {t.prices.note}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      text: "Servicio impecable. El conductor nos esperaba con un cartel y el coche estaba inmaculado. Muy profesionales.",
      name: "María García",
      location: "Madrid"
    },
    {
      text: "Best transfer service we've used in Spain. Professional, punctual, and the Mercedes was fantastic.",
      name: "John Smith",
      location: "Londres"
    },
    {
      text: "Uso sus servicios para todos mis viajes de negocios a Málaga. Siempre puntuales y con vehículos de primera.",
      name: "Carlos Rodríguez",
      location: "Barcelona"
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-amber-400 font-medium">{t.testimonials.subtitle}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">{t.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-700"
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400/30 mb-4" />
              <p className="text-sm sm:text-base text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-gray-900 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="py-12 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <span className="text-amber-400 font-medium">{t.about.subtitle}</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2 mb-6">{t.about.title}</h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-300">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-400">10+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t.about.stats.years}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-400">500+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t.about.stats.clients}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-400">15K+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t.about.stats.km}</div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <img
              src="https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/9zohw34f_WhatsApp%20Image%202026-02-17%20at%2020.18.05.jpeg"
              alt="Interior de lujo"
              className="rounded-xl sm:rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-amber-500 text-gray-900 px-4 sm:px-6 py-3 sm:py-4 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold">24/7</div>
              <div className="text-xs sm:text-sm">Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:transferdelsur976@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contacto" className="py-12 sm:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-amber-400 font-medium">{t.contact.subtitle}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">{t.contact.title}</h2>
          <p className="text-sm sm:text-base text-gray-400 mt-4 max-w-2xl mx-auto">{t.contact.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">{t.contact.phone}</div>
                  <a href="tel:+34600221794" className="text-white font-semibold hover:text-amber-400 transition-colors">
                    +34 600 221 794
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">{t.contact.email}</div>
                  <a href="mailto:transferdelsur976@gmail.com" className="text-white font-semibold hover:text-amber-400 transition-colors text-sm sm:text-base break-all">
                    transferdelsur976@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">{t.contact.address}</div>
                  <div className="text-white font-semibold text-sm sm:text-base">
                    Aeropuerto de Málaga-Costa del Sol<br />
                    29004 Málaga, España
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Instagram</div>
                  <a href="https://instagram.com/transferdelsur" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-amber-400 transition-colors">
                    @transferdelsur
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/34600221794?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios%20VTC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-xl font-semibold transition-colors"
              data-testid="whatsapp-btn"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.contact.whatsapp}
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.contact.form.name} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="contact-name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.contact.form.email} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="contact-email"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.contact.form.phone}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="contact-phone"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.contact.form.subject} *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  data-testid="contact-subject"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">{t.contact.form.message} *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  data-testid="contact-message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                data-testid="contact-submit"
              >
                {t.contact.form.send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-gray-900" />
            </div>
            <span className="text-white font-bold">Transfer del Sur</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            © 2024 Transfer del Sur Costa del Sol. {t.footer.rights}.
          </p>
          <a 
            href="https://app.emergent.sh/?utm_source=emergent-badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 text-xs sm:text-sm hover:text-amber-400 transition-colors"
          >
            {t.footer.madeWith} Emergent
          </a>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <LanguageProvider>
      <div className="App bg-gray-900 min-h-screen">
        <Navbar />
        <Hero />
        <BookingForm />
        <Services />
        <Fleet />
        <Prices />
        <Testimonials />
        <About />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
