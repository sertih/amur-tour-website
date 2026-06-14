import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/NavBar";
import ToursSection from "@/components/ToursSection";
import QuizSection from "@/components/QuizSection";
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

  useEffect(() => {
    const tour = sessionStorage.getItem("bookTour");
    if (tour) {
      sessionStorage.removeItem("bookTour");
      setBookingForm((p) => ({ ...p, route: tour }));
      setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 400);
    }
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
    <div className="min-h-screen font-montserrat text-[#3a0050] overflow-x-hidden" style={{ background: "#b8ecf5" }}>

      <NavBar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#b8ecf5" }}>
        {/* Фоновое фото курорта */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/f6a89bdb-2e40-46c9-9320-5380f4116fd1.jpg"
            alt="Тропический курорт"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(141,216,232,0.88) 0%, rgba(100,190,210,0.80) 50%, rgba(58,0,80,0.25) 100%)" }} />
        </div>

        {/* Плавающие точки */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? "5px" : "3px",
                height: i % 2 === 0 ? "5px" : "3px",
                background: i % 2 === 0 ? "rgba(232,0,122,0.6)" : "rgba(255,140,0,0.6)",
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
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm font-medium" style={{ color: "#3a0050" }}>
              <Icon name="Globe" size={14} />
              Туры по всему миру
            </div>
          </div>

          <h1
            className={`font-oswald font-bold mb-6 transition-all duration-1000 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ textShadow: "0 2px 20px rgba(255,255,255,0.3)" }}
          >
            <span className="block text-3xl md:text-5xl tracking-widest uppercase mb-1" style={{ color: "#3a0050" }}>Отдыхайте спокойно —</span>
            <span className="block text-4xl md:text-6xl uppercase" style={{ color: "#3a0050", lineHeight: 1.2 }}>мы позаботимся</span>
            <span className="block text-5xl md:text-7xl uppercase tracking-tight" style={{ lineHeight: 1.1, color: "#3a0050" }}>обо всём</span>
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ color: "#4a0060cc" }}>
            Подбираем отдых под ваши пожелания, контролируем все детали поездки
            и остаёмся на связи, когда это важно.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-start transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <button onClick={() => scrollTo("quiz")} className="btn-primary px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide">
              Подобрать тур
            </button>
            <button onClick={() => scrollTo("booking")} className="glass px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide transition-all hover:bg-white/30" style={{ color: "#3a0050" }}>
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      <QuizSection onBookRoute={handleBookRoute} />

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