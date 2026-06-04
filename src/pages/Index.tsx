import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/fb060798-e85e-4d7b-9081-3dc80e2f3b09.jpg";
const HIKE_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/aed9daef-e5d3-4f4c-9fee-f30df68b46a7.jpg";
const BOAT_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/f20ad677-7805-4fc6-b399-c6d819db350c.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "routes", label: "Маршруты" },
  { id: "about", label: "О компании" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

const ROUTES = [
  { id: 1, title: "По берегам Амура", type: "водный", duration: 7, price: 45000, difficulty: "лёгкий", img: BOAT_IMG, description: "Живописный сплав по великой реке с остановками в уникальных природных местах", tag: "Хит сезона" },
  { id: 2, title: "Таёжная тропа", type: "пеший", duration: 5, price: 32000, difficulty: "средний", img: HIKE_IMG, description: "Погружение в дикую тайгу: редкие животные, кристальные родники, ночёвки у костра", tag: "" },
  { id: 3, title: "Великий Амур", type: "комбинированный", duration: 10, price: 68000, difficulty: "сложный", img: HERO_IMG, description: "Полное погружение в природу Дальнего Востока — от горных перевалов до речных долин", tag: "Новинка" },
  { id: 4, title: "Семейный выходной", type: "пеший", duration: 2, price: 12000, difficulty: "лёгкий", img: HIKE_IMG, description: "Короткий маршрут для всей семьи с детьми. Безопасно, весело, незабываемо", tag: "" },
  { id: 5, title: "Ночная рыбалка", type: "водный", duration: 3, price: 18000, difficulty: "средний", img: BOAT_IMG, description: "Рыбалка на Амуре с профессиональным гидом. Гарантированный улов и незабываемые закаты", tag: "" },
  { id: 6, title: "Горный перевал", type: "пеший", duration: 8, price: 52000, difficulty: "сложный", img: HIKE_IMG, description: "Экстремальный маршрут через горные хребты с панорамными видами на весь регион", tag: "Экстрим" },
];

const REVIEWS = [
  { name: "Алексей Петров", rating: 5, text: "Невероятное путешествие! Гиды профессионалы, природа потрясающая. Уже планируем второй тур с Амуром.", date: "Март 2024", avatar: "А" },
  { name: "Марина Соколова", rating: 5, text: "Ездили с семьёй на семейный маршрут — дети в восторге! Всё организовано на высшем уровне.", date: "Апрель 2024", avatar: "М" },
  { name: "Дмитрий Новиков", rating: 5, text: "Таёжная тропа превзошла все ожидания. Дикая природа, чистый воздух и отличная команда гидов.", date: "Май 2024", avatar: "Д" },
  { name: "Ольга Кузнецова", rating: 4, text: "Прекрасный тур по Амуру. Рекомендую всем, кто хочет увидеть настоящий Дальний Восток.", date: "Май 2024", avatar: "О" },
];

const GALLERY_ITEMS = [
  { img: HERO_IMG, label: "Закат на Амуре" },
  { img: HIKE_IMG, label: "Таёжный поход" },
  { img: BOAT_IMG, label: "Утренняя рыбалка" },
  { img: HERO_IMG, label: "Речные просторы" },
  { img: HIKE_IMG, label: "Горные тропы" },
  { img: BOAT_IMG, label: "Туман над рекой" },
];

type FilterState = {
  type: string;
  duration: string;
  price: string;
  difficulty: string;
};

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
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", route: "", date: "", people: "2" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  useScrollReveal();

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredRoutes = ROUTES.filter((r) => {
    if (filters.type !== "все" && r.type !== filters.type) return false;
    if (filters.difficulty !== "все" && r.difficulty !== filters.difficulty) return false;
    if (filters.duration !== "все") {
      if (filters.duration === "1-3" && !(r.duration >= 1 && r.duration <= 3)) return false;
      if (filters.duration === "4-7" && !(r.duration >= 4 && r.duration <= 7)) return false;
      if (filters.duration === "8+" && r.duration < 8) return false;
    }
    if (filters.price !== "все") {
      if (filters.price === "до 20к" && r.price > 20000) return false;
      if (filters.price === "20-50к" && !(r.price >= 20000 && r.price <= 50000)) return false;
      if (filters.price === "50к+" && r.price < 50000) return false;
    }
    return true;
  });

  const difficultyColor = (d: string) => {
    if (d === "лёгкий") return "text-green-400 bg-green-400/10";
    if (d === "средний") return "text-yellow-400 bg-yellow-400/10";
    return "text-red-400 bg-red-400/10";
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] font-montserrat text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b2b] to-[#f59e0b] flex items-center justify-center">
              <Icon name="Waves" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider text-gradient">АМУР</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium uppercase tracking-wide transition-colors ${activeSection === item.id ? "text-[#ff6b2b] active" : "text-gray-300 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden glass rounded-lg p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark border-t border-white/5 px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-[#ff6b2b] transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Амур"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/70 via-transparent to-[#0a0f1e]/40" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#ff6b2b]/40"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 20}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-[#f59e0b] font-medium">
              <Icon name="MapPin" size={14} />
              Дальний Восток России
            </div>
          </div>

          <h1
            className={`font-oswald text-6xl md:text-8xl font-bold leading-none mb-4 transition-all duration-1000 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="text-white">ТУРЫ</span>
            <br />
            <span className="text-gradient">НА АМУР</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Незабываемые путешествия по великой реке и нетронутой тайге.
            Откройте для себя настоящий Дальний Восток.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <button
              onClick={() => scrollTo("routes")}
              className="btn-primary px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide"
            >
              Смотреть маршруты
            </button>
            <button
              onClick={() => scrollTo("booking")}
              className="glass px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide hover:bg-white/10 transition-all"
            >
              Забронировать тур
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 glass-dark">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "500+", label: "Довольных туристов" },
              { value: "15", label: "Уникальных маршрутов" },
              { value: "8 лет", label: "Опыта в туризме" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-oswald text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section id="routes" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Куда поехать</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">НАШИ МАРШРУТЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] mx-auto rounded-full" />
          </div>

          {/* Filters */}
          <div className="glass rounded-2xl p-6 mb-10 reveal opacity-0-init animate-fade-up animate-delay-200">
            <div className="flex items-center gap-2 mb-4 text-[#f59e0b]">
              <Icon name="SlidersHorizontal" size={18} />
              <span className="font-medium">Фильтры маршрутов</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: "type", label: "Тип", opts: ["все", "водный", "пеший", "комбинированный"] },
                { key: "duration", label: "Длительность", opts: ["все", "1-3", "4-7", "8+"] },
                { key: "price", label: "Цена", opts: ["все", "до 20к", "20-50к", "50к+"] },
                { key: "difficulty", label: "Сложность", opts: ["все", "лёгкий", "средний", "сложный"] },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">{f.label}</label>
                  <div className="flex flex-wrap gap-1">
                    {f.opts.map((o) => (
                      <button
                        key={o}
                        onClick={() => setFilters((prev) => ({ ...prev, [f.key]: o }))}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all capitalize ${
                          filters[f.key as keyof FilterState] === o
                            ? "bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] text-white"
                            : "glass text-gray-300 hover:text-white"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route cards */}
          {filteredRoutes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Маршруты по выбранным фильтрам не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map((route, i) => (
                <div
                  key={route.id}
                  className="glass rounded-2xl overflow-hidden card-hover cursor-pointer reveal opacity-0-init animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={route.img} alt={route.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                    {route.tag && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {route.tag}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="glass text-xs px-2 py-1 rounded-lg capitalize text-gray-200">{route.type}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-oswald text-xl font-bold mb-2">{route.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{route.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Icon name="Clock" size={14} />
                        <span>{route.duration} {route.duration === 1 ? "день" : route.duration < 5 ? "дня" : "дней"}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg capitalize ${difficultyColor(route.difficulty)}`}>
                        {route.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-oswald text-2xl font-bold text-gradient">
                          {route.price.toLocaleString("ru-RU")} ₽
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/ чел.</span>
                      </div>
                      <button
                        onClick={() => { setBookingForm((p) => ({ ...p, route: route.title })); scrollTo("booking"); }}
                        className="btn-primary px-4 py-2 rounded-lg text-sm font-oswald uppercase"
                      >
                        Забронировать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 bg-[#0d1b3e]/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal opacity-0-init animate-slide-right">
              <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Кто мы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-6">О КОМПАНИИ<br /><span className="text-gradient">АМУР</span></h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Туристическая компания «Амур» — это команда настоящих энтузиастов Дальнего Востока. 
                С 2016 года мы открываем красоту великой реки Амур и нетронутой тайги для тысяч туристов из разных уголков России и мира.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Каждый наш маршрут разработан с любовью к природе и заботой о безопасности путешественников. 
                Наши гиды — местные жители, которые знают каждую тропинку и каждый изгиб реки.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", label: "Безопасность", desc: "Все маршруты сертифицированы" },
                  { icon: "Users", label: "Опытные гиды", desc: "Профессионалы своего дела" },
                  { icon: "Star", label: "Уникальные места", desc: "Только лучшие локации" },
                  { icon: "Heart", label: "Экотуризм", desc: "Бережное отношение к природе" },
                ].map((f) => (
                  <div key={f.label} className="glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b2b]/20 to-[#f59e0b]/20 flex items-center justify-center mb-3">
                      <Icon name={f.icon} size={20} className="text-[#ff6b2b]" />
                    </div>
                    <div className="font-semibold text-sm mb-1">{f.label}</div>
                    <div className="text-gray-400 text-xs">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0-init animate-fade-up relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={HIKE_IMG} alt="О компании" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b2b] to-[#f59e0b] flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-lg">ТОП-3</div>
                    <div className="text-xs text-gray-400">туркомпаний ДФО 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Фотографии</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">ГАЛЕРЕЯ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group reveal opacity-0-init animate-scale-in ${i === 0 || i === 4 ? "row-span-1" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-medium text-sm">{item.label}</span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass rounded-full p-2">
                    <Icon name="ZoomIn" size={14} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-4 bg-[#0d1b3e]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Что говорят туристы</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">ОТЗЫВЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 card-hover reveal opacity-0-init animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b2b] to-[#f59e0b] flex items-center justify-center font-oswald font-bold text-white text-lg flex-shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{r.name}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(r.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">{r.date}</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">"{r.text}"</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal opacity-0-init animate-fade-up">
            <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-4">
              <div>
                <div className="font-oswald text-4xl font-bold text-gradient">4.9</div>
                <div className="text-xs text-gray-400">средняя оценка</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-[#f59e0b] fill-[#f59e0b]" />
                  ))}
                </div>
                <div className="text-xs text-gray-400">на основе 200+ отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Запишитесь прямо сейчас</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">БРОНИРОВАНИЕ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] mx-auto rounded-full" />
          </div>
          <div className="glass rounded-3xl p-8 md:p-12 reveal opacity-0-init animate-scale-in">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text", icon: "User" },
                { key: "phone", label: "Телефон", placeholder: "+7 (999) 123-45-67", type: "tel", icon: "Phone" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">{f.label}</label>
                  <div className="relative">
                    <Icon name={f.icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={bookingForm[f.key as keyof typeof bookingForm]}
                      onChange={(e) => setBookingForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/50 transition-all"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Маршрут</label>
                <div className="relative">
                  <Icon name="Map" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <select
                    value={bookingForm.route}
                    onChange={(e) => setBookingForm((p) => ({ ...p, route: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-[#0d1b3e]">Выберите маршрут</option>
                    {ROUTES.map((r) => (
                      <option key={r.id} value={r.title} className="bg-[#0d1b3e]">{r.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Дата</label>
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Количество человек</label>
                <div className="flex gap-3">
                  {["1", "2", "3-5", "5+"].map((n) => (
                    <button
                      key={n}
                      onClick={() => setBookingForm((p) => ({ ...p, people: n }))}
                      className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                        bookingForm.people === n
                          ? "bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] text-white"
                          : "glass text-gray-300 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide">
              Отправить заявку на бронирование
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">
              Менеджер свяжется с вами в течение 30 минут
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 bg-[#0d1b3e]/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#ff6b2b] font-medium uppercase tracking-widest text-sm">Свяжитесь с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">КОНТАКТЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff6b2b] to-[#f59e0b] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal opacity-0-init animate-slide-right">
              <div className="space-y-6 mb-8">
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Хабаровск, ул. Амурская, 42" },
                  { icon: "Phone", label: "Телефон", value: "+7 (4212) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "info@amur-tour.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00, Сб: 10:00–15:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b2b]/20 to-[#f59e0b]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-[#ff6b2b]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{c.label}</div>
                      <div className="text-white font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone", label: "WhatsApp" },
                  { icon: "Globe", label: "VK" },
                ].map((s) => (
                  <button key={s.label} className="glass rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
                    <Icon name={s.icon} size={16} className="text-[#ff6b2b]" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 reveal opacity-0-init animate-fade-up">
              <h3 className="font-oswald text-xl font-bold mb-6">Напишите нам</h3>
              <div className="space-y-4">
                {[
                  { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                  { key: "email", label: "Email", placeholder: "email@example.com", type: "email" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={contactForm[f.key as keyof typeof contactForm]}
                      onChange={(e) => setContactForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/50 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Ваш вопрос или пожелание..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/50 transition-all resize-none"
                  />
                </div>
                <button className="btn-primary w-full py-3 rounded-xl font-oswald uppercase tracking-wide">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b2b] to-[#f59e0b] flex items-center justify-center">
              <Icon name="Waves" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg text-gradient">АМУР</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © 2024 Туристическая компания «Амур». Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <button className="hover:text-[#ff6b2b] transition-colors">Политика конфиденциальности</button>
          </div>
        </div>
      </footer>
    </div>
  );
}