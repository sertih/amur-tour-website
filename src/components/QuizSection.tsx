import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface TourRow {
  flag: string;
  label: string;
  route: string;
  sun: number;
  water: number | null;
  date: string;
  price: number;
}

const TOURS: TourRow[] = [
  { flag: "🇨🇳", label: "Китай", route: "/china", sun: 25, water: 25, date: "29 ноя", price: 38659 },
  { flag: "🇹🇭", label: "Таиланд", route: "/thailand", sun: 32, water: 28, date: "28 авг", price: 51562 },
  { flag: "🇻🇳", label: "Вьетнам", route: "/vietnam", sun: 32, water: 27, date: "17 сен", price: 64421 },
  { flag: "🇰🇭", label: "Камбоджа", route: "/cambodia", sun: 31, water: 27, date: "12 сен", price: 68900 },
  { flag: "🇹🇳", label: "Тунис", route: "/tunisia", sun: 29, water: 24, date: "5 сен", price: 74300 },
  { flag: "🇲🇾", label: "Малайзия", route: "/malaysia", sun: 31, water: 28, date: "20 сен", price: 79500 },
  { flag: "🇪🇬", label: "Египет", route: "/egypt", sun: 33, water: 28, date: "27 авг", price: 91924 },
  { flag: "🇰🇷", label: "Ю. Корея и КНДР", route: "/south-korea", sun: 24, water: 21, date: "10 сен", price: 98700 },
  { flag: "🇹🇿", label: "Танзания (Занзибар)", route: "/zanzibar", sun: 30, water: 27, date: "3 окт", price: 112400 },
  { flag: "🇨🇺", label: "Куба", route: "/cuba", sun: 31, water: 28, date: "15 окт", price: 128900 },
  { flag: "🇸🇬", label: "Сингапур", route: "/singapore", sun: 31, water: 27, date: "22 сен", price: 135600 },
  { flag: "🇲🇻", label: "Мальдивы", route: "/maldives", sun: 30, water: 27, date: "25 сен", price: 142169 },
  { flag: "🇦🇪", label: "ОАЭ", route: "/uae", sun: 40, water: 32, date: "15 авг", price: 146096 },
  { flag: "🇮🇩", label: "Индонезия", route: "/bali", sun: 33, water: 27, date: "1 ноя", price: 146496 },
  { flag: "🇧🇭", label: "Бахрейн", route: "/bahrain", sun: 38, water: 31, date: "8 сен", price: 151200 },
  { flag: "🇵🇭", label: "Филиппины (Боракай)", route: "/boracay", sun: 31, water: 28, date: "18 окт", price: 158700 },
  { flag: "🇲🇺", label: "Маврикий", route: "/mauritius", sun: 28, water: 26, date: "5 ноя", price: 187400 },
  { flag: "🇩🇴", label: "Доминикана", route: "/dominicana", sun: 30, water: 27, date: "12 ноя", price: 214900 },
  { flag: "🇯🇵", label: "Япония", route: "/japan", sun: 26, water: null, date: "8 сен", price: 236800 },
  { flag: "🇸🇨", label: "Сейшелы", route: "/seychelles", sun: 29, water: 26, date: "7 авг", price: 340273 },
];

export default function QuizSection() {
  const navigate = useNavigate();

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ТУРЫ ИЗ ХАБАРОВСКА</h2>
          <p className="text-lg mb-4" style={{ color: "#7a4080" }}>Нажмите на страну — и мы покажем все доступные туры</p>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div className="hidden sm:grid grid-cols-[1.6fr_1fr_1fr_1fr_auto] gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#a060b0", borderBottom: "1px solid rgba(74,0,96,0.1)" }}>
            <span>Страна</span>
            <span>Погода</span>
            <span>Дата тура</span>
            <span className="text-right">Цена</span>
            <span />
          </div>

          <div>
            {TOURS.map((t, i) => (
              <button
                key={t.route}
                onClick={() => navigate(t.route)}
                className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_1fr_1fr_1fr_auto] items-center gap-2 px-6 py-4 text-left transition-colors"
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
                  <span className="flex items-center gap-1">
                    <Icon name="Sun" size={14} style={{ color: "#ff8c00" } as React.CSSProperties} />
                    +{t.sun}
                  </span>
                  {t.water !== null && (
                    <span className="flex items-center gap-1">
                      <Icon name="Droplet" size={14} style={{ color: "#0090c0" } as React.CSSProperties} />
                      +{t.water}
                    </span>
                  )}
                </span>

                <span className="hidden sm:block text-sm" style={{ color: "#7a4080" }}>{t.date}</span>

                <span className="hidden sm:block text-right font-oswald font-bold text-base" style={{ color: "#3a0050" }}>
                  {t.price.toLocaleString("ru-RU")} ₽
                </span>

                <span className="sm:hidden text-right font-oswald font-bold text-sm" style={{ color: "#3a0050" }}>
                  {t.price.toLocaleString("ru-RU")} ₽
                </span>

                <Icon name="ChevronRight" size={18} className="hidden sm:block flex-shrink-0" style={{ color: "#a060b0" } as React.CSSProperties} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
