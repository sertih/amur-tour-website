import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface SimpleCountryPageProps {
  title: string;
  icon?: string;
}

export default function SimpleCountryPage({ title, icon = "Palmtree" }: SimpleCountryPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const bookTour = () => {
    sessionStorage.setItem("bookTour", title);
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#b8ecf5" }}>
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003a50 0%, #004a60 50%, #001a30 100%)" }}
      >
        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-sm transition-all hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к турам
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
              <Icon name={icon} size={22} className="text-white" />
            </div>
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#ff8c00" }}>Направление</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4 uppercase">
            {title}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
            Мы уже подбираем лучшие туры по этому направлению — совсем скоро здесь появятся актуальные предложения
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="rounded-3xl p-10 md:p-14" style={{ background: "rgba(195,228,228,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))" }}>
            <Icon name="Clock" size={28} style={{ color: "#e8007a" } as React.CSSProperties} />
          </div>
          <h2 className="font-oswald text-2xl md:text-3xl font-bold mb-4" style={{ color: "#3a0050" }}>
            Туры уже в разработке
          </h2>
          <p className="text-base mb-8" style={{ color: "#7a4080" }}>
            Оставьте заявку — менеджер подберёт для вас лучшие варианты по направлению «{title}» и свяжется с вами лично
          </p>
          <button onClick={bookTour} className="btn-primary px-8 py-3 rounded-xl font-oswald text-lg uppercase tracking-wide">
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}
