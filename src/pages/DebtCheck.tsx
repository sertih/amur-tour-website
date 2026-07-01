import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function DebtCheck() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 50%, #f5f0ff 100%)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(210,235,235,0.82)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
              <Icon name="Plane" size={16} className="text-white" />
            </div>
            <div className="font-oswald font-bold text-lg tracking-wider leading-none">
              <span className="text-gradient">АВИА НЭКСТ ТУР</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "#4a0060" }}
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8" style={{ background: "linear-gradient(135deg, #e8007a, #4a0060)" }}>
            <Icon name="AlertTriangle" size={36} className="text-white" />
          </div>

          <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-10" style={{ color: "#4a0060" }}>
            Перед вылетом рекомендуем Вам в обязательном порядке проверить наличие задолженности
          </p>

          <a
            href="https://fssp.gov.ru/iss/ip/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-bold text-2xl transition-opacity hover:opacity-90 shadow-lg"
            style={{ background: "linear-gradient(135deg, #e8007a, #4a0060)" }}
          >
            Здесь
            <Icon name="ExternalLink" size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
