import Icon from "@/components/ui/icon";
import { ROUTES, GALLERY_ITEMS, REVIEWS, PEOPLE_IMG, FilterState } from "@/components/data";

interface ToursSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  priceFrom: string;
  setPriceFrom: (v: string) => void;
  priceTo: string;
  setPriceTo: (v: string) => void;
  cityFrom: string;
  setCityFrom: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  hotel: string;
  setHotel: (v: string) => void;
  onBookRoute: (title: string) => void;
}

const difficultyColor = (d: string) => {
  if (d === "лёгкий") return "text-cyan-400 bg-cyan-400/10";
  if (d === "средний") return "text-violet-400 bg-violet-400/10";
  return "text-purple-400 bg-purple-400/10";
};

export default function ToursSection({
  filters, setFilters,
  priceFrom, setPriceFrom,
  priceTo, setPriceTo,
  cityFrom, setCityFrom,
  country, setCountry,
  hotel, setHotel,
  onBookRoute,
}: ToursSectionProps) {
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

  const resetFilters = () => {
    setFilters({ type: "все", duration: "все", price: "все", difficulty: "все" });
    setPriceFrom("");
    setPriceTo("");
    setCityFrom("");
    setCountry("");
    setHotel("");
  };

  return (
    <>
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

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
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
                        onClick={() => onBookRoute(route.title)}
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
              <p className="text-gray-300 leading-relaxed mb-6">Наша туристическая компания помогает клиентам открывать новые страны, знакомиться с уникальными культурами и отдыхать без лишних забот. Мы уверены: идеальный отпуск начинается не в аэропорту, а с профессиональной организации каждой детали поездки</p>
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
                className="relative overflow-hidden rounded-2xl group reveal opacity-0-init animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-full h-48 md:h-56 glass flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/10 hover:border-[#7c3aed]/40 transition-colors cursor-pointer">
                  <Icon name="ImagePlus" size={28} className="text-gray-600" />
                  <span className="text-gray-500 text-xs">{item.label}</span>
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
                <div className="font-oswald text-4xl font-bold text-gradient">4.9</div>
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
    </>
  );
}