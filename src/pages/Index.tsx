import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import TopToursBanner from "@/components/TopToursBanner";
import SearchFilterBar, { SearchFilters } from "@/components/SearchFilterBar";
import SearchResults from "@/components/SearchResults";
import ToursSection from "@/components/ToursSection";
import BookingContactsSection from "@/components/BookingContactsSection";
import { BookingForm, ContactForm } from "@/components/data";

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

  const [bookingForm, setBookingForm] = useState<BookingForm>({ name: "", phone: "", route: "", date: "", people: "2" });
  const [contactForm, setContactForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  useScrollReveal();

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

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setTimeout(() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="min-h-screen font-montserrat text-[#3a0050] overflow-x-hidden" style={{ background: "#b8ecf5" }}>

      <NavBar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <TopToursBanner onBookRoute={handleBookRoute} />

      <SearchFilterBar onSearch={handleSearch} />

      {searchFilters && (
        <SearchResults
          filters={searchFilters}
          onBookRoute={handleBookRoute}
          onClose={() => setSearchFilters(null)}
        />
      )}

      <div id="home" />

      <ToursSection onBookRoute={handleBookRoute} />

      <BookingContactsSection
        bookingForm={bookingForm}
        setBookingForm={setBookingForm}
        contactForm={contactForm}
        setContactForm={setContactForm}
      />

    </div>
  );
}