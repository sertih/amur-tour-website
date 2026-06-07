import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/caf940d1-8aef-49fc-8d6d-0d394d1c26f4.jpg";
const PEOPLE_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/567735db-d77b-4a71-bb75-949b07452454.jpg";
const RESORT_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/66625b0b-7835-4bcd-942b-1f9f016ccb4b.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "routes", label: "Туры" },
  { id: "about", label: "О компании" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

const ROUTES = [
  { id: 1, title: "ОАЭ — Дубай Deluxe", type: "пляжный", duration: 7, price: 89000, difficulty: "лёгкий", img: RESORT_IMG, description: "Роскошный отдых в сердце Эмиратов: небоскрёбы, золотые пляжи, шоппинг и спа", tag: "Хит сезона" },
  { id: 2, title: "Турция — Анталья All Inclusive", type: "пляжный", duration: 10, price: 52000, difficulty: "лёгкий", img: RESORT_IMG, description: "Отдых для всей семьи в лучших отелях Антальи с системой «всё включено»", tag: "" },
  { id: 3, title: "Таиланд — Пхукет & Самуи", type: "экзотика", duration: 14, price: 115000, difficulty: "средний", img: HERO_IMG, description: "Экзотика Юго-Восточной Азии: тропические острова, храмы и уличная кухня", tag: "Новинка" },
  { id: 4, title: "Мальдивы — Медовый месяц", type: "романтика", duration: 7, price: 195000, difficulty: "лёгкий", img: RESORT_IMG, description: "Бунгало над водой, кораллы, приватный пляж — идеально для двоих", tag: "Эксклюзив" },
  { id: 5, title: "Европа — Grand Tour", type: "экскурсионный", duration: 12, price: 78000, difficulty: "средний", img: PEOPLE_IMG, description: "10 стран, 20 городов: Париж, Рим, Барселона, Вена — настоящий европейский маршрут", tag: "" },
  { id: 6, title: "Кипр — семейный отдых", type: "пляжный", duration: 8, price: 64000, difficulty: "лёгкий", img: RESORT_IMG, description: "Тёплое Средиземноморье, безопасные пляжи и насыщенная инфраструктура для детей", tag: "" },
];

const REVIEWS = [
  { name: "Алексей Петров", rating: 5, text: "Летали в Дубай через Авиа Некст Тур — всё на высшем уровне! Визы оформили быстро, трансфер встретил вовремя. Отель превзошёл ожидания.", date: "Март 2025", avatar: "А" },
  { name: "Марина Соколова", rating: 5, text: "Ездили с семьёй в Турцию — дети в полном восторге! Менеджеры помогли подобрать идеальный отель с хорошим детским клубом.", date: "Апрель 2025", avatar: "М" },
  { name: "Дмитрий Новиков", rating: 5, text: "Тур по Европе организован безупречно. Каждая деталь продумана, гид профессиональный. Уже планируем следующее путешествие с вами!", date: "Май 2025", avatar: "Д" },
  { name: "Ольга Кузнецова", rating: 5, text: "Мальдивы на медовый месяц — это была сказка. Спасибо Авиа Некст Тур за идеальную организацию нашего особенного путешествия!", date: "Май 2025", avatar: "О" },
];

const GALLERY_ITEMS = [
  { img: HERO_IMG, label: "Полёт над облаками" },
  { img: PEOPLE_IMG, label: "Счастливые путешественники" },
  { img: RESORT_IMG, label: "Тропический рай" },
  { img: HERO_IMG, label: "Бизнес-перелёты" },
  { img: RESORT_IMG, label: "Отдых у моря" },
  { img: PEOPLE_IMG, label: "Групповые туры" },
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
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [country, setCountry] = useState("");
  const [hotel, setHotel] = useState("");
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
    if (filters.duration !== "все") {
      if (filters.duration === "1-7" && !(r.duration >= 1 && r.duration <= 7)) return false;
      if (filters.duration === "8-12" && !(r.duration >= 8 && r.duration <= 12)) return false;
      if (filters.duration === "13+" && r.duration < 13) return false;
    }
    if (priceFrom && r.price < Number(priceFrom)) return false;
    if (priceTo && r.price > Number(priceTo)) return false;
    return true;
  });

  const difficultyColor = (d: string) => {
    if (d === "лёгкий") return "text-cyan-400 bg-cyan-400/10";
    if (d === "средний") return "text-violet-400 bg-violet-400/10";
    return "text-purple-400 bg-purple-400/10";
  };

  return (
    <div className="min-h-screen bg-[#080614] font-montserrat text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
              <Icon name="Plane" size={16} className="text-white" />
            </div>
            <div className="font-oswald font-bold text-lg tracking-wider leading-none">
              <span className="text-gradient">АВИА НЕКСТ</span>
              <span className="text-white ml-1">ТУР</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium uppercase tracking-wide transition-colors ${activeSection === item.id ? "text-[#7c3aed] active" : "text-gray-300 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden glass rounded-lg p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-dark border-t border-white/5 px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-[#7c3aed] transition-colors py-1"
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
          <img src={HERO_IMG} alt="Авиа Некст Тур" className="w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080614]/70 via-transparent to-[#080614]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080614]/60 via-transparent to-[#080614]/40" />
          {/* Purple glow */}
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

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-[#06b6d4] font-medium">
              <Icon name="Globe" size={14} />
              Туры по всему миру
            </div>
          </div>

          <h1 className={`font-oswald text-5xl md:text-7xl font-bold leading-tight mb-4 transition-all duration-1000 delay-200 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-white">ОТДЫХАЙТЕ</span>
            <br />
            <span className="text-gradient">СПОКОЙНО —</span>
            <br />
            <span className="text-white">МЫ ПОЗАБОТИМСЯ</span>
            <br />
            <span className="text-gradient">ОБО ВСЁМ</span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Подбираем отдых под ваши пожелания, контролируем все детали поездки
            и остаёмся на связи, когда это важно.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <button onClick={() => scrollTo("routes")} className="btn-primary px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide">
              Подобрать тур
            </button>
            <button onClick={() => scrollTo("booking")} className="glass px-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide hover:bg-white/10 transition-all">
              Оставить заявку
            </button>
          </div>
        </div>

      </section>

      {/* TOURS */}
      <section id="routes" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Куда отправиться</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">ПОПУЛЯРНЫЕ ТУРЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
          </div>

          {/* Filters */}
          <div className="glass rounded-2xl p-6 mb-10 reveal opacity-0-init animate-fade-up animate-delay-200">
            <div className="flex items-center gap-2 mb-5 text-[#06b6d4]">
              <Icon name="SlidersHorizontal" size={18} />
              <span className="font-medium">Фильтры туров</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Длительность */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Длительность</label>
                <div className="flex flex-wrap gap-1">
                  {["все", "1-7", "8-12", "13+"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setFilters((prev) => ({ ...prev, duration: o }))}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                        filters.duration === o
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white"
                          : "glass text-gray-300 hover:text-white"
                      }`}
                    >
                      {o === "все" ? "все" : `${o} дн.`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Цена от/до */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Цена (₽)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="от"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="w-full glass rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/60 transition-all"
                  />
                  <input
                    type="number"
                    placeholder="до"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="w-full glass rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/60 transition-all"
                  />
                </div>
              </div>

              {/* Город вылета */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Город вылета</label>
                <div className="relative">
                  <Icon name="PlaneTakeoff" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Например, Москва"
                    value={cityFrom}
                    onChange={(e) => setCityFrom(e.target.value)}
                    className="w-full glass rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/60 transition-all"
                  />
                </div>
              </div>

              {/* Страна */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Страна</label>
                <div className="relative">
                  <Icon name="Globe" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Например, Турция"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full glass rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/60 transition-all"
                  />
                </div>
              </div>

              {/* Отель */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Отель</label>
                <div className="relative">
                  <Icon name="Building2" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Название отеля"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    className="w-full glass rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/60 transition-all"
                  />
                </div>
              </div>

              {/* Сброс */}
              <div className="flex items-end">
                <button
                  onClick={() => { setFilters({ type: "все", duration: "все", price: "все", difficulty: "все" }); setPriceFrom(""); setPriceTo(""); setCityFrom(""); setCountry(""); setHotel(""); }}
                  className="glass text-xs text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  <Icon name="RotateCcw" size={13} />
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>

          {filteredRoutes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Туры по выбранным параметрам не найдены</p>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080614] via-transparent to-transparent" />
                    {route.tag && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {route.tag}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="glass text-xs px-2 py-1 rounded-lg capitalize text-gray-200">{route.type}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-oswald text-xl font-bold mb-2">{route.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{route.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Icon name="Clock" size={14} />
                        <span>{route.duration} {route.duration < 5 ? "дня" : "дней"}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${difficultyColor(route.difficulty)}`}>
                        {route.difficulty === "лёгкий" ? "стандарт" : "комфорт"}
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
      <section id="about" className="py-24 px-4 bg-[#0e0b1f]/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal opacity-0-init animate-slide-right">
              <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Кто мы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-6">
                О КОМПАНИИ<br />
                <span className="text-gradient">АВИА НЕКСТ ТУР</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                «Авиа Некст Тур» — туристическое агентство с 10-летним опытом. Мы организуем путешествия
                по всему миру: от пляжного отдыха на Мальдивах до культурных туров по Европе.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Каждый тур подбирается индивидуально под ваши пожелания и бюджет. Мы берём на себя
                всё: авиабилеты, визы, трансфер, страховку и размещение в лучших отелях.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Plane", label: "Авиабилеты", desc: "Лучшие цены на перелёты" },
                  { icon: "FileText", label: "Визы и документы", desc: "Полное сопровождение" },
                  { icon: "Shield", label: "Страховки", desc: "Надёжная защита в дороге" },
                  { icon: "Headphones", label: "Поддержка 24/7", desc: "Всегда на связи с вами" },
                ].map((f) => (
                  <div key={f.label} className="glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center mb-3">
                      <Icon name={f.icon} size={20} className="text-[#7c3aed]" />
                    </div>
                    <div className="font-semibold text-sm mb-1">{f.label}</div>
                    <div className="text-gray-400 text-xs">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0-init animate-fade-up relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={PEOPLE_IMG} alt="О компании" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080614]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-lg">ТОП-5</div>
                    <div className="text-xs text-gray-400">агентств России 2024</div>
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
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Наши направления</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">ГАЛЕРЕЯ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl cursor-pointer group reveal opacity-0-init animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={item.img} alt={item.label} className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
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
      <section id="reviews" className="py-24 px-4 bg-[#0e0b1f]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Что говорят клиенты</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">ОТЗЫВЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 card-hover reveal opacity-0-init animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center font-oswald font-bold text-white text-lg flex-shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{r.name}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(r.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={14} className="text-[#06b6d4] fill-[#06b6d4]" />
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
                <div className="font-oswald text-4xl font-bold text-gradient">5.0</div>
                <div className="text-xs text-gray-400">средняя оценка</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-[#06b6d4] fill-[#06b6d4]" />
                  ))}
                </div>
                <div className="text-xs text-gray-400">на основе 500+ отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Запишитесь прямо сейчас</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">БРОНИРОВАНИЕ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
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
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Тур</label>
                <div className="relative">
                  <Icon name="Map" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <select
                    value={bookingForm.route}
                    onChange={(e) => setBookingForm((p) => ({ ...p, route: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-[#0e0b1f]">Выберите тур</option>
                    {ROUTES.map((r) => (
                      <option key={r.id} value={r.title} className="bg-[#0e0b1f]">{r.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Желаемая дата</label>
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all [color-scheme:dark]"
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
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white"
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
              Отправить заявку
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">
              Менеджер свяжется с вами в течение 30 минут
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 bg-[#0e0b1f]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Свяжитесь с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">КОНТАКТЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal opacity-0-init animate-slide-right">
              <div className="space-y-6 mb-8">
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Тверская, 15, офис 304" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "info@avianexttour.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–19:00, Сб: 10:00–16:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-[#7c3aed]" />
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
                    <Icon name={s.icon} size={16} className="text-[#7c3aed]" />
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
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
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
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all resize-none"
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
              <Icon name="Plane" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg">
              <span className="text-gradient">АВИА НЕКСТ</span>
              <span className="text-white ml-1">ТУР</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © 2025 Авиа Некст Тур. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <button className="hover:text-[#7c3aed] transition-colors">Политика конфиденциальности</button>
          </div>
        </div>
      </footer>
    </div>
  );
}