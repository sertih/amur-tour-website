import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const DESTINATIONS = [
  { label: "Таиланд", icon: "TreePalm", route: "/thailand" },
  { label: "Вьетнам", icon: "Waves", route: "/vietnam" },
  { label: "Китай", icon: "Landmark", route: "/china" },
  { label: "Бали", icon: "Flower2", route: "/bali" },
  { label: "Сейшелы", icon: "Anchor", route: "/seychelles" },
  { label: "Япония", icon: "Cherry", route: "/japan" },
];

interface QuizSectionProps {
  onBookRoute: (title: string) => void;
}

export default function QuizSection({ onBookRoute }: QuizSectionProps) {
  const navigate = useNavigate();

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ВЫБЕРИТЕ НАПРАВЛЕНИЕ</h2>
          <p className="text-lg mb-4" style={{ color: "#7a4080" }}>Нажмите на страну — и мы покажем все доступные туры</p>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
        </div>

        <div className="rounded-3xl p-8 md:p-12" style={{ background: "rgba(195,228,228,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.route}
                onClick={() => navigate(dest.route)}
                className="rounded-2xl p-5 flex items-center gap-4 text-left transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(74,0,96,0.15)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(232,0,122,0.1), rgba(255,140,0,0.1))";
                  (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid #e8007a";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid rgba(74,0,96,0.15)";
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))" }}>
                  <Icon name={dest.icon} size={22} style={{ color: "#e8007a" } as React.CSSProperties} />
                </div>
                <span className="font-oswald text-xl font-bold" style={{ color: "#3a0050" }}>{dest.label}</span>
                <Icon name="ChevronRight" size={18} className="ml-auto flex-shrink-0" style={{ color: "#a060b0" } as React.CSSProperties} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}