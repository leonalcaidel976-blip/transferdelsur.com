import { useState, useEffect, useRef } from "react";
import "@/App.css";

// SEO-optimized Transfer del Sur Costa del Sol Website
// Keywords: transfer aeropuerto Málaga, VTC Costa del Sol, transfer Marbella, luxury vehicles Malaga, tours

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1449965408869-ebd3fee56a1e?w=1920&q=80",
  mercedesE: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/14xa6qhm_image.png",
  mercedesE2: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/r87m5iy1_WhatsApp%20Image%202026-02-17%20at%2019.18.41.jpeg",
  mercedesV: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/4w52bumt_WhatsApp%20Image%202026-02-17%20at%2018.25.00.jpeg",
  mercedesS: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/02lpptha_image.png",
  interior: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/9zohw34f_WhatsApp%20Image%202026-02-17%20at%2020.18.05.jpeg",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  routes: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  events: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
};

const DESTINATIONS = [
  { value: "", label: "Seleccione destino" },
  { value: "marbella", label: "Marbella Centro" },
  { value: "puerto-banus", label: "Puerto Banús" },
  { value: "estepona", label: "Estepona" },
  { value: "fuengirola", label: "Fuengirola" },
  { value: "torremolinos", label: "Torremolinos" },
  { value: "benalmadena", label: "Benalmádena" },
  { value: "malaga", label: "Málaga Centro" },
  { value: "nerja", label: "Nerja" },
  { value: "ronda", label: "Ronda" },
  { value: "granada", label: "Granada" },
  { value: "sevilla", label: "Sevilla" },
  { value: "otro", label: "Otro destino" }
];

const PRICES = [
  { destino: "Marbella Centro", duracion: "45 min", claseE: "95€", claseV: "115€", claseS: "140€" },
  { destino: "Puerto Banús", duracion: "50 min", claseE: "100€", claseV: "120€", claseS: "145€" },
  { destino: "Estepona", duracion: "60 min", claseE: "110€", claseV: "135€", claseS: "155€" },
  { destino: "Fuengirola", duracion: "25 min", claseE: "65€", claseV: "80€", claseS: "110€" },
  { destino: "Torremolinos", duracion: "15 min", claseE: "55€", claseV: "65€", claseS: "100€" },
  { destino: "Benalmádena", duracion: "20 min", claseE: "60€", claseV: "75€", claseS: "105€" },
  { destino: "Málaga Centro", duracion: "15 min", claseE: "50€", claseV: "60€", claseS: "95€" },
  { destino: "Nerja", duracion: "70 min", claseE: "130€", claseV: "160€", claseS: "175€" }
];

const TESTIMONIALS = [
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
  }
];

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#reservar", label: "Reservar" },
    { href: "#servicios", label: "Servicios" },
    { href: "#flota", label: "Flota" },
    { href: "#tarifas", label: "Tarifas" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a962] to-[#8b7355] flex items-center justify-center">
              <i className="fas fa-car-side text-[#1a1a2e] text-lg"></i>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Transfer del Sur
              </h1>
              <p className="text-[10px] text-[#c9a962] tracking-[3px] uppercase">Costa del Sol</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#c9a962] transition-colors duration-300 tracking-wide"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+34600221794"
              className="btn-primary flex items-center gap-2"
              data-testid="nav-phone-btn"
            >
              <i className="fas fa-phone"></i>
              <span>+34 600 221 794</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#c9a962]/20 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-gray-300 hover:text-[#c9a962] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+34600221794"
              className="btn-primary inline-flex items-center gap-2 mt-4"
            >
              <i className="fas fa-phone"></i>
              <span>Llamar Ahora</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section with SEO H1
const HeroSection = () => {
  return (
    <section
      id="inicio"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMAGES.hero})` }}
      >
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <p className="section-subtitle animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Servicio Premium VTC
        </p>
        
        {/* SEO-optimized H1 */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 animate-fade-in-up"
          style={{ fontFamily: "Cormorant Garamond, serif", animationDelay: "0.2s" }}
          data-testid="hero-title"
        >
          Su Experiencia en la{" "}
          <span className="gradient-text font-semibold">Costa del Sol</span>
        </h1>
        
        {/* SEO-optimized description */}
        <p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up leading-relaxed"
          style={{ animationDelay: "0.3s" }}
          data-testid="hero-description"
        >
          Traslados de lujo al aeropuerto de Málaga, servicios por horas y tours exclusivos 
          por Marbella, Puerto Banús y alrededores. Conductores profesionales, vehículos Mercedes premium.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a href="#reservar" className="btn-primary" data-testid="hero-reserve-btn">
            Reservar Ahora
          </a>
          <a href="#flota" className="btn-secondary" data-testid="hero-fleet-btn">
            Ver Flota
          </a>
        </div>

        {/* Trust Badges */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { icon: "fa-id-card", label: "Licencia VTC", value: "100% Legal" },
            { icon: "fa-star", label: "5 Estrellas", value: "+500 Viajes" },
            { icon: "fa-user-tie", label: "Conductores", value: "Certificados" },
            { icon: "fa-calendar-check", label: "Reserva Online", value: "24/7" }
          ].map((badge, idx) => (
            <div key={idx} className="glass rounded-lg p-4" data-testid={`trust-badge-${idx}`}>
              <i className={`fas ${badge.icon} text-[#c9a962] text-2xl mb-2`}></i>
              <p className="text-xs text-gray-400">{badge.label}</p>
              <p className="text-sm font-semibold text-white">{badge.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-[#c9a962] text-2xl"></i>
      </div>
    </section>
  );
};

// Booking Section
const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("aeropuerto");
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    luggage: "0",
    vehicle: "",
    name: "",
    email: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hola, me gustaría reservar un transfer:\n` +
      `- Tipo: ${activeTab}\n` +
      `- Recogida: ${formData.pickup || "Aeropuerto Málaga"}\n` +
      `- Destino: ${formData.destination}\n` +
      `- Fecha: ${formData.date}\n` +
      `- Hora: ${formData.time}\n` +
      `- Pasajeros: ${formData.passengers}\n` +
      `- Maletas: ${formData.luggage}\n` +
      `- Vehículo: ${formData.vehicle || "Sin preferencia"}\n` +
      `- Nombre: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Teléfono: ${formData.phone}`
    );
    window.open(`https://wa.me/34600221794?text=${message}`, "_blank");
  };

  const tabs = [
    { id: "aeropuerto", label: "Aeropuerto", icon: "fa-plane" },
    { id: "horas", label: "Por Horas", icon: "fa-clock" },
    { id: "tours", label: "Tours", icon: "fa-map-marked-alt" }
  ];

  return (
    <section id="reservar" className="py-24 px-4" data-testid="booking-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-subtitle">Reserva Online</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Reservar <span className="gradient-text">Vehículo</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8" data-testid="booking-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#c9a962] text-[#1a1a2e]"
                  : "glass text-gray-300 hover:text-white"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8" data-testid="booking-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Punto de recogida *</label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleInputChange}
                placeholder={activeTab === "aeropuerto" ? "Aeropuerto de Málaga" : "Dirección de recogida"}
                className="luxury-input w-full"
                data-testid="input-pickup"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Destino *</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="luxury-select w-full"
                required
                data-testid="select-destination"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest.value} value={dest.value}>
                    {dest.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Fecha *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="luxury-input w-full"
                required
                data-testid="input-date"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Hora *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="luxury-input w-full"
                required
                data-testid="input-time"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Pasajeros</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleInputChange}
                className="luxury-select w-full"
                data-testid="select-passengers"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Maletas</label>
              <select
                name="luggage"
                value={formData.luggage}
                onChange={handleInputChange}
                className="luxury-select w-full"
                data-testid="select-luggage"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Vehículo preferido</label>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                className="luxury-select w-full"
                data-testid="select-vehicle"
              >
                <option value="">Sin preferencia</option>
                <option value="clase-e">Mercedes Clase E (Sedan Ejecutivo - 1-3 pax)</option>
                <option value="clase-v">Mercedes Clase V (Van Premium - 4-7 pax)</option>
                <option value="clase-s">Mercedes Clase S (Sedan Lujo - 1-3 pax) +45€</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Nombre completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="luxury-input w-full"
                required
                data-testid="input-name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="luxury-input w-full"
                required
                data-testid="input-email"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="luxury-input w-full"
                required
                data-testid="input-phone"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-8 py-4 text-base"
            data-testid="submit-booking-btn"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Reservar Ahora
          </button>
        </form>
      </div>
    </section>
  );
};

// Services Section - SEO optimized with H2/H3
const ServicesSection = () => {
  const services = [
    {
      icon: "fa-plane-arrival",
      title: "Traslados Aeropuerto Málaga",
      description: "Servicio premium de recogida y traslado al Aeropuerto de Málaga-Costa del Sol. Monitorización de vuelos incluida."
    },
    {
      icon: "fa-clock",
      title: "Servicio VTC por Horas",
      description: "Disposición de chófer y vehículo de lujo por el tiempo que necesite. Ideal para reuniones y eventos."
    },
    {
      icon: "fa-route",
      title: "Tours Exclusivos Costa del Sol",
      description: "Descubra Marbella, Ronda, Granada o Sevilla con nuestros tours personalizados en vehículos de lujo."
    },
    {
      icon: "fa-briefcase",
      title: "Transporte Corporativo",
      description: "Soluciones de transporte ejecutivo para empresas. Facturación mensual y tarifas especiales para corporativos."
    }
  ];

  return (
    <section id="servicios" className="py-24 px-4 bg-[#0a0a14]" data-testid="services-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Nuestros Servicios</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Experiencias <span className="gradient-text">Premium</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <article
              key={idx}
              className="luxury-card p-8 group"
              data-testid={`service-card-${idx}`}
            >
              <div className="w-16 h-16 rounded-full bg-[#c9a962]/10 flex items-center justify-center mb-6 group-hover:bg-[#c9a962]/20 transition-colors">
                <i className={`fas ${service.icon} text-[#c9a962] text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fleet Section - SEO optimized
const FleetSection = () => {
  const vehicles = [
    {
      image: IMAGES.mercedesE,
      category: "Sedan Ejecutivo",
      name: "Mercedes Clase E",
      passengers: "1-3 pax",
      luggage: "3 maletas",
      photos: 3
    },
    {
      image: IMAGES.mercedesE2,
      category: "Sedan Ejecutivo",
      name: "Mercedes Clase E",
      passengers: "1-3 pax",
      luggage: "3 maletas",
      photos: 3
    },
    {
      image: IMAGES.mercedesV,
      category: "Van Premium",
      name: "Mercedes Clase V",
      passengers: "4-7 pax",
      luggage: "7 maletas",
      photos: 1
    },
    {
      image: IMAGES.mercedesS,
      category: "Sedan Lujo",
      name: "Mercedes Clase S",
      passengers: "1-3 pax",
      luggage: "3 maletas",
      photos: 1
    }
  ];

  return (
    <section id="flota" className="py-24 px-4" data-testid="fleet-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Nuestra Flota</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Vehículos de <span className="gradient-text">Lujo</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, idx) => (
            <article
              key={idx}
              className="luxury-card overflow-hidden group"
              data-testid={`vehicle-card-${idx}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} - ${vehicle.category} para transfer VTC Costa del Sol`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {vehicle.photos > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded text-xs">
                    <i className="fas fa-images mr-1"></i>
                    {vehicle.photos} fotos
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-[#c9a962] text-[#1a1a2e] px-3 py-1 rounded text-xs font-semibold">
                  {vehicle.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  {vehicle.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span><i className="fas fa-user mr-1 text-[#c9a962]"></i>{vehicle.passengers}</span>
                  <span><i className="fas fa-suitcase mr-1 text-[#c9a962]"></i>{vehicle.luggage}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Prices Section - SEO optimized with structured data
const PricesSection = () => {
  return (
    <section id="tarifas" className="py-24 px-4 bg-[#0a0a14]" data-testid="prices-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Tarifas Transparentes</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Precios desde <span className="gradient-text">Aeropuerto</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Tarifas fijas sin sorpresas. El precio incluye peajes, parking y 60 minutos de espera gratis.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="luxury-table" data-testid="prices-table">
            <thead>
              <tr>
                <th>Destino</th>
                <th>Duración</th>
                <th>Clase E (1-3 pax)</th>
                <th>Clase V (4-7 pax)</th>
                <th>Clase S (1-3 pax)</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((row, idx) => (
                <tr key={idx} data-testid={`price-row-${idx}`}>
                  <td className="font-medium">{row.destino}</td>
                  <td className="text-gray-400">{row.duracion}</td>
                  <td className="text-[#c9a962] font-semibold">{row.claseE}</td>
                  <td className="text-[#c9a962] font-semibold">{row.claseV}</td>
                  <td className="text-[#c9a962] font-semibold">{row.claseS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>* Precios para trayecto simple. Consulte tarifas de ida y vuelta con descuento.</p>
          <p>** Mercedes Clase S incluye suplemento de +45€ sobre tarifa Clase E</p>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4" data-testid="testimonials-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Testimonios</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Lo Que Dicen Nuestros <span className="gradient-text">Clientes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <article
              key={idx}
              className="glass rounded-xl p-8"
              data-testid={`testimonial-${idx}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-[#c9a962]"></i>
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9a962]/20 flex items-center justify-center">
                  <i className="fas fa-user text-[#c9a962]"></i>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section - SEO rich content
const AboutSection = () => {
  return (
    <section className="py-24 px-4 bg-[#0a0a14]" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle">Sobre Nosotros</p>
            <h2 className="section-title mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Excelencia en Cada <span className="gradient-text">Kilómetro</span>
            </h2>
            
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Desde 2015, <strong className="text-white">Transfer del Sur Costa del Sol</strong> ha redefinido 
                el concepto de transporte premium en la región. Nacimos con una misión clara: ofrecer un servicio 
                de chófer que combine la elegancia europea con la calidez mediterránea.
              </p>
              <p>
                Nuestros conductores no son simplemente profesionales del volante; son embajadores de la Costa del Sol. 
                Hablan múltiples idiomas, conocen cada rincón de la región y están entrenados para anticipar sus 
                necesidades antes de que las exprese.
              </p>
              <p>
                Cada vehículo Mercedes de nuestra flota es seleccionado meticulosamente y mantenido con los más altos 
                estándares. Porque sabemos que los detalles marcan la diferencia entre un viaje y una experiencia inolvidable.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { value: "10+", label: "Años de Experiencia" },
                { value: "500+", label: "Clientes Satisfechos" },
                { value: "15K+", label: "Kilómetros Recorridos" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center" data-testid={`stat-${idx}`}>
                  <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={IMAGES.interior}
              alt="Interior de lujo de nuestros vehículos Mercedes VTC Costa del Sol"
              className="rounded-2xl w-full h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-6">
              <div className="flex items-center gap-3">
                <i className="fas fa-award text-[#c9a962] text-3xl"></i>
                <div>
                  <p className="font-semibold">Servicio Premium</p>
                  <p className="text-sm text-gray-400">Certificado VTC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Section - SEO content
const BlogSection = () => {
  const posts = [
    {
      image: IMAGES.restaurant,
      date: "15 Enero 2024",
      title: "Los Mejores Restaurantes de Marbella",
      excerpt: "Descubra los restaurantes más exclusivos de la Costa del Sol..."
    },
    {
      image: IMAGES.routes,
      date: "10 Enero 2024",
      title: "Rutas Panorámicas por Andalucía",
      excerpt: "Las carreteras más espectaculares para recorrer en nuestros tours..."
    },
    {
      image: IMAGES.events,
      date: "5 Enero 2024",
      title: "Eventos en la Costa del Sol 2024",
      excerpt: "Los eventos más importantes del año en Málaga y alrededores..."
    }
  ];

  return (
    <section className="py-24 px-4" data-testid="blog-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="section-subtitle">Blog & Noticias</p>
            <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Descubre la <span className="gradient-text">Costa del Sol</span>
            </h2>
          </div>
          <a href="#blog" className="hidden md:block text-[#c9a962] hover:underline" data-testid="view-all-blog">
            Ver Todos <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="luxury-card overflow-hidden group cursor-pointer"
              data-testid={`blog-post-${idx}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-[#c9a962] mb-2">{post.date}</p>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Contacto desde web:\n` +
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.phone}\n` +
      `Asunto: ${formData.subject}\n` +
      `Mensaje: ${formData.message}`
    );
    window.open(`https://wa.me/34600221794?text=${message}`, "_blank");
  };

  const contactInfo = [
    { icon: "fa-phone", label: "Teléfono", value: "+34 600 221 794", link: "tel:+34600221794" },
    { icon: "fa-envelope", label: "Email", value: "transferdelsur976@gmail.com", link: "mailto:transferdelsur976@gmail.com" },
    { icon: "fa-map-marker-alt", label: "Dirección", value: "Aeropuerto de Málaga-Costa del Sol, 29004 Málaga" },
    { icon: "fa-instagram", label: "Instagram", value: "@transferdelsur", link: "https://instagram.com/transferdelsur" }
  ];

  return (
    <section id="contacto" className="py-24 px-4 bg-[#0a0a14]" data-testid="contact-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-subtitle">Contacto</p>
          <h2 className="section-title" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            ¿Tiene Alguna <span className="gradient-text">Pregunta</span>?
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Estamos disponibles 24/7 para atender sus consultas y reservas. 
            No dude en contactarnos por el medio que le resulte más cómodo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-6 flex items-center gap-4"
                data-testid={`contact-info-${idx}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center">
                  <i className={`fas ${info.icon} text-[#c9a962]`}></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  {info.link ? (
                    <a href={info.link} className="text-white hover:text-[#c9a962] transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/34600221794?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20VTC"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-contact-btn"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              Contactar por WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8" data-testid="contact-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="luxury-input w-full"
                  required
                  data-testid="contact-input-name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="luxury-input w-full"
                  required
                  data-testid="contact-input-email"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="luxury-input w-full"
                data-testid="contact-input-phone"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Asunto *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="luxury-input w-full"
                required
                data-testid="contact-input-subject"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">Mensaje *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="luxury-input w-full h-32 resize-none"
                required
                data-testid="contact-input-message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-6"
              data-testid="contact-submit-btn"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-[#c9a962]/10" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a962] to-[#8b7355] flex items-center justify-center">
              <i className="fas fa-car-side text-[#1a1a2e] text-sm"></i>
            </div>
            <span className="text-sm text-gray-400">
              © 2024 Transfer del Sur Costa del Sol. Todos los derechos reservados.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/transferdelsur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c9a962] transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://wa.me/34600221794"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#c9a962] transition-colors"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/34600221794?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios%20VTC"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
      data-testid="whatsapp-floating-btn"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <HeroSection />
        <BookingSection />
        <ServicesSection />
        <FleetSection />
        <PricesSection />
        <TestimonialsSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
