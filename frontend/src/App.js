import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Plane, Clock, Map, Car, Users, Shield, Star, Phone, Mail, 
  MapPin, Instagram, Menu, X, ChevronRight, Quote, Calendar,
  Briefcase, Check, Send, MessageCircle
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Services data
const services = [
  {
    icon: Plane,
    title: "Traslados Aeropuerto",
    description: "Servicio premium de recogida y traslado al Aeropuerto de Málaga. Monitorización de vuelos incluida."
  },
  {
    icon: Clock,
    title: "Servicio por Horas",
    description: "Disposición de chófer y vehículo por el tiempo que necesite. Ideal para reuniones y eventos."
  },
  {
    icon: Map,
    title: "Tours Exclusivos",
    description: "Descubra la Costa del Sol, Ronda, Granada o Sevilla con nuestros tours personalizados."
  },
  {
    icon: Briefcase,
    title: "Servicio Corporativo",
    description: "Soluciones de transporte para empresas. Facturación mensual y tarifas especiales."
  }
];

// Fleet data
const fleet = [
  {
    name: "Mercedes Clase E",
    category: "Sedan Ejecutivo",
    passengers: "1-3",
    luggage: "3",
    image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/14xa6qhm_image.png",
    gallery: [
      "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/14xa6qhm_image.png",
      "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/4j0y6w9u_image.png",
      "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/os5xodrl_image.png"
    ]
  },
  {
    name: "Mercedes Clase V",
    category: "Van Premium",
    passengers: "4-7",
    luggage: "7",
    image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/4w52bumt_WhatsApp%20Image%202026-02-17%20at%2018.25.00.jpeg"
  },
  {
    name: "Mercedes Clase S",
    category: "Sedan Lujo",
    passengers: "1-3",
    luggage: "3",
    image: "https://customer-assets.emergentagent.com/job_telegram-bot-backup/artifacts/02lpptha_image.png"
  }
];

// Prices data
const prices = [
  { destination: "Marbella Centro", duration: "45 min", sedan: "75€", van: "95€" },
  { destination: "Puerto Banús", duration: "50 min", sedan: "80€", van: "100€" },
  { destination: "Estepona", duration: "60 min", sedan: "90€", van: "115€" },
  { destination: "Fuengirola", duration: "25 min", sedan: "45€", van: "60€" },
  { destination: "Torremolinos", duration: "15 min", sedan: "35€", van: "45€" },
  { destination: "Benalmádena", duration: "20 min", sedan: "40€", van: "55€" },
  { destination: "Málaga Centro", duration: "15 min", sedan: "30€", van: "40€" },
  { destination: "Nerja", duration: "70 min", sedan: "110€", van: "140€" }
];

// Testimonials
const testimonials = [
  {
    name: "María García",
    location: "Madrid",
    text: "Servicio impecable. El conductor nos esperaba con un cartel y el coche estaba inmaculado. Muy profesionales.",
    rating: 5
  },
  {
    name: "John Smith",
    location: "Londres",
    text: "Best transfer service we've used in Spain. Professional, punctual, and the Mercedes was fantastic.",
    rating: 5
  },
  {
    name: "Carlos Rodríguez",
    location: "Barcelona",
    text: "Uso sus servicios para todos mis viajes de negocios a Málaga. Siempre puntuales y con vehículos de primera.",
    rating: 5
  }
];

// Blog posts
const blogPosts = [
  {
    title: "Los Mejores Restaurantes de Marbella",
    excerpt: "Descubra los restaurantes más exclusivos de la Costa del Sol...",
    date: "15 Enero 2024",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
  },
  {
    title: "Rutas Panorámicas por Andalucía",
    excerpt: "Las carreteras más espectaculares para recorrer en nuestros tours...",
    date: "10 Enero 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
  },
  {
    title: "Eventos en la Costa del Sol 2024",
    excerpt: "Los eventos más importantes del año en Málaga y alrededores...",
    date: "5 Enero 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
  }
];

// Destinations for select
const destinations = [
  "Marbella Centro",
  "Puerto Banús",
  "Estepona",
  "Fuengirola",
  "Torremolinos",
  "Benalmádena",
  "Málaga Centro",
  "Nerja",
  "Ronda",
  "Granada",
  "Sevilla",
  "Otro destino"
];

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "bg-opacity-100" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2" data-testid="logo">
            <span className="text-2xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Transfer del Sur
            </span>
            <span className="text-gold text-xs uppercase tracking-widest hidden sm:block">Costa del Sol</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#hero" className="nav-link">Inicio</a>
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#flota" className="nav-link">Flota</a>
            <a href="#tarifas" className="nav-link">Tarifas</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contacto" className="nav-link">Contacto</a>
            <a href="tel:+34600221794" className="nav-link flex items-center gap-2">
              <Phone size={14} /> +34600221794
            </a>
            <Link to="/admin" className="btn-outline text-xs" data-testid="admin-btn">Admin</Link>
            <a href="#reservar" className="btn-primary text-xs" data-testid="reserve-btn">Reservar</a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#hero" className="nav-link" onClick={() => setIsOpen(false)}>Inicio</a>
              <a href="#servicios" className="nav-link" onClick={() => setIsOpen(false)}>Servicios</a>
              <a href="#flota" className="nav-link" onClick={() => setIsOpen(false)}>Flota</a>
              <a href="#tarifas" className="nav-link" onClick={() => setIsOpen(false)}>Tarifas</a>
              <a href="#nosotros" className="nav-link" onClick={() => setIsOpen(false)}>Nosotros</a>
              <a href="#contacto" className="nav-link" onClick={() => setIsOpen(false)}>Contacto</a>
              <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>Admin</Link>
              <a href="#reservar" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Reservar</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => (
  <section 
    id="hero" 
    className="hero"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1722600522755-8dd1e8cf1884?w=1920&q=80')" }}
    data-testid="hero-section"
  >
    <div className="hero-overlay"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
      <p className="section-label">Servicio Premium VTC</p>
      <h1 className="text-5xl md:text-7xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Su Experiencia<br />
        <span className="italic">en la Costa del Sol</span>
      </h1>
      <p className="text-gray-400 max-w-xl mb-8 text-lg">
        Traslados de lujo al aeropuerto, servicios por horas y tours exclusivos por Málaga y alrededores. 
        Conductores profesionales, vehículos premium.
      </p>
      <div className="flex flex-wrap gap-4">
        <a href="#reservar" className="btn-primary flex items-center gap-2" data-testid="hero-reserve-btn">
          Reservar Ahora <ChevronRight size={16} />
        </a>
        <a href="#flota" className="btn-outline">Ver Flota</a>
      </div>

      <div className="stats-bar mt-12">
        <div className="stat-item">
          <Shield className="stat-icon" size={20} />
          <div>
            <p className="stat-label">Licencia VTC</p>
            <p className="stat-value">100% Legal</p>
          </div>
        </div>
        <div className="stat-item">
          <Star className="stat-icon" size={20} />
          <div>
            <p className="stat-label">5 Estrellas</p>
            <p className="stat-value">+500 Viajes</p>
          </div>
        </div>
        <div className="stat-item">
          <Users className="stat-icon" size={20} />
          <div>
            <p className="stat-label">Conductores</p>
            <p className="stat-value">Certificados</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Booking Form Section
const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("aeropuerto");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pickup_location: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    luggage: "1",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/reservations`, {
        ...formData,
        service_type: activeTab,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage)
      });
      setSuccess(true);
      setFormData({
        pickup_location: "",
        destination: "",
        date: "",
        time: "",
        passengers: "1",
        luggage: "1",
        name: "",
        email: "",
        phone: "",
        notes: ""
      });
      setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Error al crear la reserva. Por favor, inténtelo de nuevo.");
    }
    setLoading(false);
  };

  return (
    <section id="reservar" className="py-24 bg-[#0A0A0B]" data-testid="booking-section">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label">Reserva Online</p>
          <h2 className="section-title">Reservar Vehículo</h2>
        </div>

        <div className="card">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              className={`tab-button ${activeTab === "aeropuerto" ? "active" : ""}`}
              onClick={() => setActiveTab("aeropuerto")}
              data-testid="tab-aeropuerto"
            >
              <Plane size={16} /> Aeropuerto
            </button>
            <button
              className={`tab-button ${activeTab === "por_horas" ? "active" : ""}`}
              onClick={() => setActiveTab("por_horas")}
              data-testid="tab-horas"
            >
              <Clock size={16} /> Por Horas
            </button>
            <button
              className={`tab-button ${activeTab === "tours" ? "active" : ""}`}
              onClick={() => setActiveTab("tours")}
              data-testid="tab-tours"
            >
              <Map size={16} /> Tours
            </button>
          </div>

          {success && (
            <div className="bg-green-900/30 border border-green-500 text-green-400 p-4 rounded mb-6 flex items-center gap-2">
              <Check size={20} />
              ¡Reserva enviada correctamente! Recibirá confirmación por email y WhatsApp.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Punto de recogida *</label>
                <input
                  type="text"
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder={activeTab === "aeropuerto" ? "Aeropuerto de Málaga (AGP)" : "Dirección de recogida"}
                  required
                  data-testid="input-pickup"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Destino *</label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="input-field"
                  required
                  data-testid="select-destination"
                >
                  <option value="">Seleccione destino</option>
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fecha *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input-field"
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
                  onChange={handleChange}
                  className="input-field"
                  required
                  data-testid="input-time"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Pasajeros</label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="input-field"
                  data-testid="select-passengers"
                >
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Maletas</label>
                <select
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleChange}
                  className="input-field"
                  data-testid="select-luggage"
                >
                  {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Su nombre"
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
                  onChange={handleChange}
                  className="input-field"
                  placeholder="email@ejemplo.com"
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+34 600 000 000"
                  required
                  data-testid="input-phone"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={loading}
              data-testid="submit-reservation"
            >
              {loading ? "Enviando..." : "Reservar Ahora"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => (
  <section id="servicios" className="py-24" data-testid="services-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <p className="section-label">Nuestros Servicios</p>
        <h2 className="section-title">Experiencias Premium</h2>
        <div className="gold-underline"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <div key={i} className="service-card" data-testid={`service-card-${i}`}>
            <div className="service-icon">
              <service.icon size={28} />
            </div>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Fleet Section
const FleetSection = () => (
  <section id="flota" className="py-24 bg-[#0d0d0f]" data-testid="fleet-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <p className="section-label">Nuestra Flota</p>
        <h2 className="section-title">Vehículos de Lujo</h2>
        <div className="gold-underline"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {fleet.map((car, i) => (
          <div key={i} className="fleet-card" data-testid={`fleet-card-${i}`}>
            <img src={car.image} alt={car.name} className="fleet-image" />
            <div className="fleet-info">
              <p className="text-gold text-xs uppercase tracking-wider mb-1">{car.category}</p>
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {car.name}
              </h3>
              <div className="flex gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Users size={14} /> {car.passengers} pax
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase size={14} /> {car.luggage} maletas
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Prices Section
const PricesSection = () => (
  <section id="tarifas" className="py-24" data-testid="prices-section">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="section-label">Tarifas Transparentes</p>
        <h2 className="section-title">Precios desde Aeropuerto</h2>
        <p className="text-gray-400 mt-4">
          Tarifas fijas sin sorpresas. El precio incluye peajes, parking y 60 minutos de espera gratis.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="price-table">
          <thead>
            <tr>
              <th>Destino</th>
              <th>Duración</th>
              <th>Sedan (1-3 pax)</th>
              <th>Van (4-7 pax)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, i) => (
              <tr key={i} data-testid={`price-row-${i}`}>
                <td className="font-medium">{price.destination}</td>
                <td className="text-gray-400">{price.duration}</td>
                <td className="text-gold font-semibold">{price.sedan}</td>
                <td className="text-gold font-semibold">{price.van}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        * Precios para trayecto simple. Consulte tarifas de ida y vuelta con descuento.
      </p>
    </div>
  </section>
);

// Testimonials Section
const TestimonialsSection = () => (
  <section className="py-24 bg-[#0d0d0f]" data-testid="testimonials-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="section-label">Testimonios</p>
        <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card" data-testid={`testimonial-${i}`}>
            <Quote className="testimonial-quote" size={48} />
            <div className="flex gap-1 mb-4 mt-8">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} size={16} className="text-gold fill-current" />
              ))}
            </div>
            <p className="text-gray-300 mb-6 italic">"{t.text}"</p>
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// About Section
const AboutSection = () => (
  <section id="nosotros" className="py-24" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label">Sobre Nosotros</p>
          <h2 className="section-title">Excelencia en Cada Kilómetro</h2>
          <div className="gold-underline mb-8"></div>
          
          <div className="space-y-6 text-gray-400">
            <p>
              Desde 2015, Transfer del Sur Costa del Sol ha redefinido el concepto de transporte 
              premium en la región. Nacimos con una misión clara: ofrecer un servicio de chófer 
              que combine la elegancia europea con la calidez mediterránea.
            </p>
            <p>
              Nuestros conductores no son simplemente profesionales del volante; son embajadores 
              de la Costa del Sol. Hablan múltiples idiomas, conocen cada rincón de la región y 
              están entrenados para anticipar sus necesidades antes de que las exprese.
            </p>
            <p>
              Cada vehículo de nuestra flota es seleccionado meticulosamente y mantenido con los 
              más altos estándares. Porque sabemos que los detalles marcan la diferencia entre 
              un viaje y una experiencia inolvidable.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="about-stat">
              <p className="about-stat-number">10+</p>
              <p className="about-stat-label">Años de Experiencia</p>
            </div>
            <div className="about-stat">
              <p className="about-stat-number">500+</p>
              <p className="about-stat-label">Clientes Satisfechos</p>
            </div>
            <div className="about-stat">
              <p className="about-stat-number">15K+</p>
              <p className="about-stat-label">Kilómetros Recorridos</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1760552973934-93752b5352bd?w=600&h=700&fit=crop"
            alt="Interior de lujo"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  </section>
);

// Blog Section
const BlogSection = () => (
  <section id="blog" className="py-24 bg-[#0d0d0f]" data-testid="blog-section">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <div>
          <p className="section-label">Blog & Noticias</p>
          <h2 className="section-title">Descubre la Costa del Sol</h2>
        </div>
        <a href="#blog" className="text-gold text-sm hover:underline hidden md:block">Ver Todos</a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <div key={i} className="blog-card" data-testid={`blog-post-${i}`}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <p className="blog-date mb-3">{post.date}</p>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Contact Section
const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error al enviar el mensaje. Por favor, inténtelo de nuevo.");
    }
    setLoading(false);
  };

  return (
    <section id="contacto" className="py-24" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label">Contacto</p>
          <h2 className="section-title">¿Tiene Alguna Pregunta?</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Estamos disponibles 24/7 para atender sus consultas y reservas. 
            No dude en contactarnos por el medio que le resulte más cómodo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="contact-item">
              <div className="contact-icon"><Phone size={20} /></div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Teléfono</p>
                <a href="tel:+34600221794" className="text-lg hover:text-gold transition">+34 600 221 794</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <a href="mailto:transferdelsur976@gmail.com" className="text-lg hover:text-gold transition">
                  transferdelsur976@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Dirección</p>
                <p>Aeropuerto de Málaga-Costa del Sol</p>
                <p className="text-gray-400">29004 Málaga, España</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Instagram size={20} /></div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Instagram</p>
                <a href="https://instagram.com/transferdelsur" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
                  @transferdelsur
                </a>
              </div>
            </div>

            <a
              href="https://wa.me/34600221794?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios%20VTC"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 mt-8"
              data-testid="whatsapp-btn"
            >
              <MessageCircle size={18} /> Contactar por WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="card">
            {success && (
              <div className="bg-green-900/30 border border-green-500 text-green-400 p-4 rounded mb-6 flex items-center gap-2">
                <Check size={20} />
                ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                    data-testid="contact-email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    data-testid="contact-phone"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Asunto *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                    data-testid="contact-subject"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Mensaje *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field min-h-[150px]"
                  required
                  data-testid="contact-message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={loading}
                data-testid="contact-submit"
              >
                {loading ? "Enviando..." : <><Send size={16} /> Enviar Mensaje</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer data-testid="footer">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-2xl font-light italic mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Transfer del Sur
          </p>
          <p className="text-sm text-gray-500">Costa del Sol</p>
        </div>
        <div className="text-center text-sm text-gray-500">
          © 2024 Transfer del Sur. Todos los derechos reservados.
        </div>
        <a 
          href="https://app.emergent.sh/?utm_source=emergent-badge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gold transition"
        >
          Made with Emergent
        </a>
      </div>
    </div>
  </footer>
);

// WhatsApp Float Button
const WhatsAppFloat = () => (
  <a
    href="https://wa.me/34600221794?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20sus%20servicios%20VTC"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
    data-testid="whatsapp-float"
  >
    <MessageCircle size={28} />
  </a>
);

// Main Home Page
const HomePage = () => (
  <>
    <Navbar />
    <HeroSection />
    <BookingSection />
    <ServicesSection />
    <FleetSection />
    <PricesSection />
    <TestimonialsSection />
    <AboutSection />
    <BlogSection />
    <ContactSection />
    <Footer />
    <WhatsAppFloat />
  </>
);

// Admin Login Page
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Panel de Administración
          </h1>
          <p className="text-gold text-sm">Transfer del Sur Costa del Sol</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
              data-testid="admin-email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              data-testid="admin-password"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
            data-testid="admin-login-btn"
          >
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Credenciales: admin@transferdelsur.es / admin123
        </p>

        <div className="text-center mt-6">
          <Link to="/" className="text-gold text-sm hover:underline">← Volver al sitio</Link>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reservations");
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [resRes, contactRes, statsRes] = await Promise.all([
        axios.get(`${API}/reservations`, { headers }),
        axios.get(`${API}/contacts`, { headers }),
        axios.get(`${API}/admin/stats`, { headers })
      ]);
      setReservations(resRes.data);
      setContacts(contactRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/reservations/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar esta reserva?")) return;
    try {
      await axios.delete(`${API}/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const serviceNames = {
    aeropuerto: "Aeropuerto",
    por_horas: "Por Horas",
    tours: "Tours"
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" data-testid="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="mb-8">
          <p className="text-xl font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Transfer del Sur
          </p>
          <p className="text-gold text-xs">Admin Panel</p>
        </div>

        <nav>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`admin-nav-item w-full text-left ${activeTab === "reservations" ? "active" : ""}`}
            data-testid="nav-reservations"
          >
            <Calendar size={18} /> Reservas
            {stats.pending > 0 && (
              <span className="ml-auto bg-gold text-black text-xs px-2 py-0.5 rounded-full">
                {stats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`admin-nav-item w-full text-left ${activeTab === "contacts" ? "active" : ""}`}
            data-testid="nav-contacts"
          >
            <Mail size={18} /> Mensajes
            {stats.unread_contacts > 0 && (
              <span className="ml-auto bg-gold text-black text-xs px-2 py-0.5 rounded-full">
                {stats.unread_contacts}
              </span>
            )}
          </button>
        </nav>

        <div className="mt-auto pt-8">
          <Link to="/" className="admin-nav-item">
            <ChevronRight size={18} /> Ver Sitio
          </Link>
          <button onClick={handleLogout} className="admin-nav-item w-full text-left text-red-400" data-testid="logout-btn">
            <X size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="admin-stat-card">
            <p className="text-3xl text-gold font-light">{stats.total_reservations || 0}</p>
            <p className="text-sm text-gray-400">Total Reservas</p>
          </div>
          <div className="admin-stat-card">
            <p className="text-3xl text-yellow-500 font-light">{stats.pending || 0}</p>
            <p className="text-sm text-gray-400">Pendientes</p>
          </div>
          <div className="admin-stat-card">
            <p className="text-3xl text-green-500 font-light">{stats.confirmed || 0}</p>
            <p className="text-sm text-gray-400">Confirmadas</p>
          </div>
          <div className="admin-stat-card">
            <p className="text-3xl text-blue-500 font-light">{stats.completed || 0}</p>
            <p className="text-sm text-gray-400">Completadas</p>
          </div>
        </div>

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div>
            <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Reservas Recientes
            </h2>
            
            {reservations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay reservas todavía</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Fecha/Hora</th>
                      <th>Cliente</th>
                      <th>Servicio</th>
                      <th>Ruta</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id} data-testid={`reservation-${r.id}`}>
                        <td>
                          <p className="font-medium">{r.date}</p>
                          <p className="text-sm text-gray-500">{r.time}</p>
                        </td>
                        <td>
                          <p className="font-medium">{r.name}</p>
                          <p className="text-sm text-gray-500">{r.phone}</p>
                        </td>
                        <td>
                          <p>{serviceNames[r.service_type] || r.service_type}</p>
                          <p className="text-sm text-gray-500">{r.passengers} pax, {r.luggage} maletas</p>
                        </td>
                        <td>
                          <p className="text-sm">{r.pickup_location}</p>
                          <p className="text-sm text-gold">→ {r.destination}</p>
                        </td>
                        <td>
                          <span className={`status-badge status-${r.status}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <select
                              value={r.status}
                              onChange={(e) => updateStatus(r.id, e.target.value)}
                              className="input-field text-xs py-1 px-2"
                              data-testid={`status-select-${r.id}`}
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="confirmada">Confirmada</option>
                              <option value="completada">Completada</option>
                              <option value="cancelada">Cancelada</option>
                            </select>
                            <button
                              onClick={() => deleteReservation(r.id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                              data-testid={`delete-${r.id}`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div>
            <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Mensajes de Contacto
            </h2>

            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay mensajes todavía</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className={`card ${!c.read ? "border-gold" : ""}`} data-testid={`contact-${c.id}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-gray-500">{c.email} • {c.phone || "Sin teléfono"}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(c.created_at).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <p className="text-gold text-sm mb-2">{c.subject}</p>
                    <p className="text-gray-400">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
