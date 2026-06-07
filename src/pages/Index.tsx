import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/NavBar";
import ToursSection from "@/components/ToursSection";
import BookingContactsSection from "@/components/BookingContactsSection";
import { HERO_IMG, FilterState, BookingForm, ContactForm } from "@/components/data";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0-init");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ type: "все", duration: "все", price: "все", difficulty: "все" });
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [country, setCountry] = useState("");
  const [hotel, setHotel] = useState("");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({ name: "", phone: "", route: "", date: "", people: "2" });
  const [contactForm, setContactForm] = useState<ContactForm>({ name: "", email: "", message: "" });

  useScrollReveal();

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookRoute = (title: string) => {
    setBookingForm((p) => ({ ...p, route: title }));
    scrollTo("booking");
  };

  return (
    <div className="min-h-screen bg-[#080614] font-montserrat text-white overflow-x-hidden">

      <NavBar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Авиа Некст Тур" className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080614]/70 via-transparent to-[#080614]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080614]/60 via-transparent to-[#080614]/40" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-[#06b6d4]/8 blur-3xl" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? "4px" : "2px",
                height: i % 2 === 0 ? "4px" : "2px",
                background: i % 2 === 0 ? "rgba(124,58,237,0.5)" : "rgba(6,182,212,0.5)",
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 18}%`,
                animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-left px-4 max-w-5xl mx-auto rounded-[0.25rem]">
          <div className={`transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-[#06b6d4] font-medium">
              <Icon name="Globe" size={14} />
              Туры по всему миру
            </div>
          </div>

          <h1
            className={`font-oswald font-bold mb-6 transition-all duration-1000 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            <span className="block text-3xl md:text-5xl text-white/80 tracking-widest uppercase mb-1">Отдыхайте спокойно —</span>
            <span className="block text-4xl md:text-6xl uppercase" style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.2,
            }}>мы позаботимся</span>
            <span className="block text-5xl md:text-7xl text-white uppercase tracking-tight" style={{ lineHeight: 1.1 }}>обо всём</span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Подбираем отдых под ваши пожелания, контролируем все детали поездки
            и остаёмся на связи, когда это важно.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-start transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <button onClick={() => scrollTo("routes")} className="btn-primary px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide">
              Подобрать тур
            </button>
            <button onClick={() => scrollTo("booking")} className="glass px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide hover:bg-white/10 transition-all">
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      <ToursSection
        filters={filters}
        setFilters={setFilters}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        cityFrom={cityFrom}
        setCityFrom={setCityFrom}
        country={country}
        setCountry={setCountry}
        hotel={hotel}
        setHotel={setHotel}
        onBookRoute={handleBookRoute}
      />

      <BookingContactsSection
        bookingForm={bookingForm}
        setBookingForm={setBookingForm}
        contactForm={contactForm}
        setContactForm={setContactForm}
      />

    </div>
  );
}