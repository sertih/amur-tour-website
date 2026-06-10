import Icon from "@/components/ui/icon";
import { ROUTES, REVIEWS, PEOPLE_IMG, FilterState } from "@/components/data";

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
  if (d === "лёгкий") return "bg-[#ff8c00]/15 text-[#b35c00]";
  if (d === "средний") return "bg-[#e8007a]/15 text-[#a0005a]";
  return "bg-[#4a0060]/15 text-[#4a0060]";
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
      <section id="routes" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Куда отправиться</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ГОРЯЩИЕ ТУРЫ</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
          </div>

          {/* Filters */}
          <div className="rounded-2xl p-6 mb-10 reveal opacity-0-init animate-fade-up animate-delay-200" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.7)" }}>
            <div className="flex items-center gap-2 mb-5" style={{ color: "#e8007a" }}>
              <Icon name="SlidersHorizontal" size={18} />
              <span className="font-medium">Фильтры туров</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Длительность</label>
                <div className="flex flex-wrap gap-1">
                  {["все", "1-7", "8-12", "13+"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setFilters((prev) => ({ ...prev, duration: o }))}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={filters.duration === o
                        ? { background: "linear-gradient(135deg, #e8007a, #ff8c00)", color: "white" }
                        : { background: "rgba(255,255,255,0.5)", color: "#4a0060", border: "1px solid rgba(74,0,96,0.2)" }
                      }
                    >
                      {o === "все" ? "все" : `${o} дн.`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Цена (₽)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="от"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}
                  />
                  <input
                    type="number"
                    placeholder="до"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Город вылета</label>
                <div className="relative">
                  <Icon name="PlaneTakeoff" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                  <input
                    type="text"
                    placeholder="Например, Москва"
                    value={cityFrom}
                    onChange={(e) => setCityFrom(e.target.value)}
                    className="w-full rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Страна</label>
                <div className="relative">
                  <Icon name="Globe" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                  <input
                    type="text"
                    placeholder="Например, Турция"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.5)", color: "#7a4080", border: "1px solid rgba(74,0,96,0.2)" }}
                >
                  <Icon name="RotateCcw" size={13} />
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>

          {filteredRoutes.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#7a4080" }}>
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p>Туры по выбранным параметрам не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map((route, i) => (
                <div
                  key={route.id}
                  className="rounded-2xl overflow-hidden card-hover cursor-pointer reveal opacity-0-init animate-fade-up flex flex-col"
                  style={{ animationDelay: `${i * 0.1}s`, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)" }}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img src={route.img} alt={route.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,0,80,0.6), transparent)" }} />
                    {route.tag && (
                      <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                        {route.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-oswald text-xl font-bold mb-2" style={{ color: "#3a0050" }}>{route.title}</h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#7a4080" }}>{route.description}</p>
                    <div className="flex items-center gap-1 text-sm mb-4" style={{ color: "#7a4080" }}>
                      <Icon name="Clock" size={14} />
                      <span>{route.duration} {route.duration < 5 ? "дня" : "дней"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-oswald text-2xl font-bold" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                          от {route.price.toLocaleString("ru-RU")} ₽
                        </span>
                        <span className="text-xs ml-1" style={{ color: "#a060b0" }}>/ чел.</span>
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
      <section id="about" className="py-24 px-4" style={{ background: "linear-gradient(160deg, #e8007a18 0%, #b8ecf5 60%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal opacity-0-init animate-slide-right">
              <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Кто мы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-6" style={{ color: "#3a0050" }}>
                О КОМПАНИИ<br />
                <span style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>АВИА НЕКСТ ТУР</span>
              </h2>
              <p className="leading-relaxed py-2.5 px-0 mx-[5px] my-[15px]" style={{ color: "#4a0060" }}>Наша туристическая компания помогает клиентам открывать новые страны, знакомиться с уникальными культурами и отдыхать без лишних забот. Мы уверены: идеальный отпуск начинается не в аэропорту, а с профессиональной организации каждой детали поездки</p>
              <p className="leading-relaxed mb-8" style={{ color: "#4a0060" }}>
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
                  <div key={f.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))" }}>
                      <Icon name={f.icon} size={20} style={{ color: "#e8007a" } as React.CSSProperties} />
                    </div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "#3a0050" }}>{f.label}</div>
                    <div className="text-xs" style={{ color: "#7a4080" }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal opacity-0-init animate-fade-up relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={PEOPLE_IMG} alt="О компании" className="w-full h-96 object-cover" style={{ objectPosition: "center 0%" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,0,80,0.4), transparent)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Что говорят клиенты</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ОТЗЫВЫ</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 card-hover reveal opacity-0-init animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-oswald font-bold text-white text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold" style={{ color: "#3a0050" }}>{r.name}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(r.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={14} style={{ color: "#ff8c00", fill: "#ff8c00" } as React.CSSProperties} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: "#a060b0" }}>{r.date}</span>
                </div>
                <p className="leading-relaxed text-sm text-left" style={{ color: "#4a0060" }}>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal opacity-0-init animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-2xl px-8 py-4" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)" }}>
              <div>
                <div className="font-oswald text-4xl font-bold" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4.9</div>
                <div className="text-xs" style={{ color: "#7a4080" }}>средняя оценка</div>
              </div>
              <div className="w-px h-12" style={{ background: "rgba(74,0,96,0.15)" }} />
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} style={{ color: "#ff8c00", fill: "#ff8c00" } as React.CSSProperties} />
                  ))}
                </div>
                <div className="text-xs" style={{ color: "#7a4080" }}>на основе 500+ отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}