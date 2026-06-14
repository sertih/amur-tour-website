import { useState } from "react";
import Icon from "@/components/ui/icon";
import { REVIEWS, PEOPLE_IMG } from "@/components/data";

interface ToursSectionProps {
  onBookRoute: (title: string) => void;
}

export default function ToursSection({ onBookRoute }: ToursSectionProps) {
  const [duration, setDuration] = useState("все");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [country, setCountry] = useState("");

  const resetFilters = () => {
    setDuration("все");
    setPriceFrom("");
    setPriceTo("");
    setCityFrom("");
    setCountry("");
  };

  const handleSearch = () => {
    onBookRoute(`Длительность: ${duration}, цена: ${priceFrom}–${priceTo}, вылет: ${cityFrom}, страна: ${country}`);
  };

  return (
    <>
      {/* AGGREGATOR */}
      <section id="routes" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Куда отправиться</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ПОДОБРАТЬ ТУР</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
          </div>

          <div className="rounded-2xl p-8 reveal opacity-0-init animate-fade-up animate-delay-200" style={{ background: "rgba(195,228,228,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Длительность</label>
                <div className="flex flex-wrap gap-2">
                  {["все", "1-7", "8-12", "13+"].map((o) => (
                    <button
                      key={o}
                      onClick={() => setDuration(o)}
                      className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
                      style={duration === o
                        ? { background: "linear-gradient(135deg, #e8007a, #ff8c00)", color: "white" }
                        : { background: "rgba(255,255,255,0.5)", color: "#4a0060", border: "1px solid rgba(74,0,96,0.2)" }
                      }
                    >
                      {o === "все" ? "Любая" : `${o} дн.`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Бюджет (₽)</label>
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
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSearch}
                className="btn-primary flex-1 py-3 rounded-xl font-oswald text-lg uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <Icon name="Search" size={18} />
                Найти туры
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-sm"
                style={{ background: "rgba(255,255,255,0.5)", color: "#7a4080", border: "1px solid rgba(74,0,96,0.2)" }}
              >
                <Icon name="RotateCcw" size={14} />
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal opacity-0-init animate-slide-right">
              <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Кто мы</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-6" style={{ color: "#3a0050" }}>
                О КОМПАНИИ<br />
                <span style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>АВИА НЭКСТ ТУР</span>
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
                <img src={PEOPLE_IMG} alt="О компании" className="w-full h-96 object-cover" style={{ objectPosition: "center 20%" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,0,80,0.4), transparent)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-4 bg-[#b8ecf596]" style={{ background: "#b8ecf5" }}>
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