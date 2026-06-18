import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BALI_TOURS = [
  {
    id: 1,
    title: "Candi Beach Resort & Spa 4*",
    subtitle: "Остров Бали",
    duration: 13,
    price: 143000,
    type: "пляжный",
    tag: "Хит сезона",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/c2bfdf29-3f4c-45e4-a065-d56a571e704a.jpg",
    description: "Отель расположен в восточной части острова и это погружение в необузданную природу Бали. У отеля большая территория, которая представляет собой туманную долину из кокосовых пальм. Это райское место для того, чтобы побродить и подумать о своем, слушая изумительную тишину. Отель на первой линии, прямо у океана. Что важно: отливы/приливы не выражены, хороший заход в воду и сильные волны здесь случаются редко. Помимо номеров есть размещение в отдельно стоящих бунгало и на виллах с бассейнами. Курорт полностью самодостаточный, есть несколько ресторанов с разной кухней.",
    highlights: ["Первая линия океана", "Бунгало и виллы с бассейном", "Несколько ресторанов", "Кокосовая долина"],
  },
  {
    id: 2,
    title: "Maya Sanur Resort & Spa 5*",
    subtitle: "Остров Бали",
    duration: 13,
    price: 178000,
    type: "пляжный",
    tag: "Популярный",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/c2bfdf29-3f4c-45e4-a065-d56a571e704a.jpg",
    description: "Отель расположен в живописном регионе Санур с спокойным океаном, идеально подходящим для семейного отдыха и комфортного купания. Рядом находятся магазины, рестораны и основные достопримечательности острова.\n\nТерритория утопает в цветущих садах и впечатляет аутентичной балийской архитектурой. К услугам гостей 4 бассейна: пейзажный с видом на океан, бассейн-лагуна, семейный и детский бассейны.\n\nСтильные светлые номера оформлены с использованием натурального дерева; доступны варианты с прямым выходом к бассейну и расположением рядом с пляжем.\n\nСанур отлично подходит для прогулок и велопоездок вдоль живописной набережной. В отеле также доступны плавающие завтраки, романтические ужины при свечах, а также ежедневные занятия йогой и пилатесом.",
    highlights: ["4 бассейна с видом на океан", "Плавающие завтраки", "Йога и пилатес", "Балийская архитектура"],
  },
];

const typeColor: Record<string, string> = {
  пляжный: "#e8007a",
  экскурсионный: "#4a0060",
  городской: "#ff8c00",
  природный: "#007a40",
  "все включено": "#0077cc",
};

export default function Bali() {
  const navigate = useNavigate();

  const bookTour = (title: string) => {
    sessionStorage.setItem("bookTour", `Индонезия — ${title}`);
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#b8ecf5" }}>
      {/* Header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3a0050 0%, #4a0060 50%, #1a0030 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${BALI_TOURS[0].img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(58,0,80,0.85), rgba(26,0,48,0.9))" }} />

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
              <Icon name="Flower2" size={22} className="text-white" />
            </div>
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#ff8c00" }}>Направление</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            ТУРЫ В ИНДОНЕЗИЮ
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
            {BALI_TOURS.length} направление — необузданная природа, океан и виллы с бассейнами на острове Бали
          </p>
        </div>
      </div>

      {/* Tours grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BALI_TOURS.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "rgba(195,228,228,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)" }}
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img src={tour.img} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(58,0,80,0.6), transparent)" }} />
                {tour.tag && (
                  <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                    {tour.tag}
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: typeColor[tour.type] ?? "#4a0060" }}
                  >
                    {tour.type}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "#a060b0" }}>{tour.subtitle}</p>
                <h3 className="font-oswald text-xl font-bold mb-2" style={{ color: "#3a0050" }}>{tour.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#7a4080" }}>{tour.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.highlights.map((h) => (
                    <span key={h} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(232,0,122,0.1)", color: "#a0005a" }}>
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(74,0,96,0.1)" }}>
                  <div>
                    <div className="font-oswald text-2xl font-bold" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      от {tour.price.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "#a060b0" }}>
                      <Icon name="Clock" size={11} />
                      {tour.duration} дней
                    </div>
                  </div>
                  <button
                    onClick={() => bookTour(tour.title)}
                    className="btn-primary px-4 py-2 rounded-xl text-sm font-oswald uppercase"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}