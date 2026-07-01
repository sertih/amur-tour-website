import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    title: "Банк данных исполнительных производств (ФССП)",
    description: "Официальный сервис судебных приставов. Проверьте наличие исполнительных производств по вашему имени.",
    url: "https://fssp.gov.ru/iss/ip",
    icon: "Scale",
    color: "#e8007a",
  },
  {
    title: "Налоговая задолженность (ФНС)",
    description: "Проверьте задолженность по налогам и сборам через личный кабинет налогоплательщика.",
    url: "https://lkfl2.nalog.ru/lkfl/login",
    icon: "Receipt",
    color: "#4a0060",
  },
  {
    title: "Госуслуги — все задолженности",
    description: "Единый портал госуслуг. Проверьте все виды задолженностей в одном месте: штрафы, налоги, судебные долги.",
    url: "https://www.gosuslugi.ru/pay/debt",
    icon: "Shield",
    color: "#ff8c00",
  },
  {
    title: "Штрафы ГИБДД",
    description: "Проверьте наличие неоплаченных штрафов за нарушения правил дорожного движения.",
    url: "https://xn--90adear.xn--p1ai/check/fines",
    icon: "Car",
    color: "#007a40",
  },
  {
    title: "Кредитная история (НБКИ)",
    description: "Проверьте свою кредитную историю и задолженности перед банками в Национальном бюро кредитных историй.",
    url: "https://www.nbki.ru/service/service-individuals/",
    icon: "CreditCard",
    color: "#0066cc",
  },
  {
    title: "Задолженность ЖКХ",
    description: "Проверьте долги за жилищно-коммунальные услуги через портал ГИС ЖКХ.",
    url: "https://dom.gosuslugi.ru",
    icon: "Home",
    color: "#8b4513",
  },
];

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

      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, #e8007a, #4a0060)" }}>
            <Icon name="AlertTriangle" size={28} className="text-white" />
          </div>
          <h1 className="font-oswald font-bold text-3xl md:text-4xl mb-4" style={{ color: "#4a0060" }}>
            Проверь долги перед выездом
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Задолженности могут стать причиной запрета на выезд за рубеж. Проверьте все долги заблаговременно — за 2–4 недели до поездки.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex gap-4">
          <Icon name="Info" size={22} className="flex-shrink-0 mt-0.5" style={{ color: "#ff8c00" }} />
          <div>
            <p className="font-semibold mb-1" style={{ color: "#4a0060" }}>Важно знать</p>
            <p className="text-sm text-gray-600">Судебные приставы могут ограничить выезд при долге от 10 000 ₽. После погашения долга снятие запрета занимает до 14 дней. Проверяйте заранее!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service) => (
            <a
              key={service.title}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col gap-3 border border-white/60"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${service.color}18` }}>
                  <Icon name={service.icon} size={22} style={{ color: service.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1 leading-snug group-hover:underline" style={{ color: "#4a0060" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium mt-1" style={{ color: service.color }}>
                Перейти к проверке
                <Icon name="ExternalLink" size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #e8007a, #4a0060)" }}
          >
            <Icon name="Plane" size={16} />
            Вернуться к турам
          </button>
        </div>
      </div>
    </div>
  );
}