import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useWeather } from "@/hooks/useWeather";

interface TourRow {
  flag: string;
  label: string;
  route: string;
  weatherKey: string;
  price: number | null;
}

const TOURS: TourRow[] = [
  { flag: "🇨🇳", label: "Китай", route: "/china", weatherKey: "china", price: 65897 },
  { flag: "🇹🇭", label: "Таиланд", route: "/thailand", weatherKey: "thailand", price: 158211 },
  { flag: "🇻🇳", label: "Вьетнам", route: "/vietnam", weatherKey: "vietnam", price: 173626 },
  { flag: "🇰🇭", label: "Камбоджа", route: "/cambodia", weatherKey: "cambodia", price: null },
  { flag: "🇹🇳", label: "Тунис", route: "/tunisia", weatherKey: "tunisia", price: null },
  { flag: "🇲🇾", label: "Малайзия", route: "/malaysia", weatherKey: "malaysia", price: null },
  { flag: "🇪🇬", label: "Египет", route: "/egypt", weatherKey: "egypt", price: null },
  { flag: "🇰🇷", label: "Ю. Корея и КНДР", route: "/south-korea", weatherKey: "south-korea", price: null },
  { flag: "🇹🇿", label: "Танзания (Занзибар)", route: "/zanzibar", weatherKey: "zanzibar", price: null },
  { flag: "🇨🇺", label: "Куба", route: "/cuba", weatherKey: "cuba", price: null },
  { flag: "🇸🇬", label: "Сингапур", route: "/singapore", weatherKey: "singapore", price: null },
  { flag: "🇲🇻", label: "Мальдивы", route: "/maldives", weatherKey: "maldives", price: null },
  { flag: "🇦🇪", label: "ОАЭ", route: "/uae", weatherKey: "uae", price: null },
  { flag: "🇮🇩", label: "Индонезия", route: "/bali", weatherKey: "bali", price: 95000 },
  { flag: "🇧🇭", label: "Бахрейн", route: "/bahrain", weatherKey: "bahrain", price: null },
  { flag: "🇵🇭", label: "Филиппины (Боракай)", route: "/boracay", weatherKey: "boracay", price: null },
  { flag: "🇲🇺", label: "Маврикий", route: "/mauritius", weatherKey: "mauritius", price: null },
  { flag: "🇩🇴", label: "Доминикана", route: "/dominicana", weatherKey: "dominicana", price: null },
  { flag: "🇯🇵", label: "Япония", route: "/japan", weatherKey: "japan", price: 174000 },
  { flag: "🇸🇨", label: "Сейшелы", route: "/seychelles", weatherKey: "seychelles", price: 115661 },
];

export default function QuizSection() {
  const navigate = useNavigate();
  const { weather } = useWeather();

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ТУРЫ ИЗ ХАБАРОВСКА</h2>
          <p className="text-lg mb-4" style={{ color: "#7a4080" }}>Нажмите на страну — и мы покажем все доступные туры</p>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div className="hidden sm:grid grid-cols-[1.6fr_1fr_1fr_auto] gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#a060b0", borderBottom: "1px solid rgba(74,0,96,0.1)" }}>
            <span>Страна</span>
            <span>Погода</span>
            <span className="text-right">Цена</span>
            <span />
          </div>

          <div>
            {TOURS.map((t, i) => {
              const w = weather[t.weatherKey];
              return (
                <button
                  key={t.route}
                  onClick={() => navigate(t.route)}
                  className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_1fr_1fr_auto] items-center gap-2 px-6 py-4 text-left transition-colors"
                  style={{
                    background: i % 2 === 0 ? "rgba(255,255,255,0.4)" : "transparent",
                    borderBottom: i !== TOURS.length - 1 ? "1px solid rgba(74,0,96,0.08)" : "none",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,122,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = i % 2 === 0 ? "rgba(255,255,255,0.4)" : "transparent"; }}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl leading-none flex-shrink-0">{t.flag}</span>
                    <span className="font-semibold text-sm sm:text-base truncate" style={{ color: "#3a0050" }}>{t.label}</span>
                  </span>

                  <span className="hidden sm:flex items-center gap-3 text-sm" style={{ color: "#4a0060" }}>
                    {w ? (
                      <>
                        <span className="flex items-center gap-1">
                          <Icon name="Sun" size={14} style={{ color: "#ff8c00" } as React.CSSProperties} />
                          +{w.sun}
                        </span>
                        {w.water !== null && (
                          <span className="flex items-center gap-1">
                            <Icon name="Droplet" size={14} style={{ color: "#0090c0" } as React.CSSProperties} />
                            +{w.water}
                          </span>
                        )}
                      </>
                    ) : (
                      <span style={{ color: "#a060b0" }}>—</span>
                    )}
                  </span>

                  <span className="hidden sm:block text-right font-oswald font-bold text-base" style={{ color: t.price ? "#3a0050" : "#a060b0" }}>
                    {t.price ? `от ${t.price.toLocaleString("ru-RU")} ₽` : "—"}
                  </span>

                  <span className="sm:hidden text-right font-oswald font-bold text-sm" style={{ color: t.price ? "#3a0050" : "#a060b0" }}>
                    {t.price ? `${t.price.toLocaleString("ru-RU")} ₽` : "—"}
                  </span>

                  <Icon name="ChevronRight" size={18} className="hidden sm:block flex-shrink-0" style={{ color: "#a060b0" } as React.CSSProperties} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
