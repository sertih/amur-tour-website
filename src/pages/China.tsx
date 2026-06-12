import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const CHINA_TOURS = [
  {
    id: 1,
    title: "Palace Resort Yalong Bay Sanya 5*",
    subtitle: "Ялонг Бэй, Хайнань",
    duration: 13,
    price: 156415,
    type: "пляжный",
    tag: "Хит сезона",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/9867595d-0b65-419f-9c55-08ea10189184.jpg",
    description: "Удачное расположение — вдоль озера с живописными видами. Пляж в 5 минутах ходьбы, просторные номера, разнообразные завтраки. Прекрасно подойдёт для семейного отдыха.",
    highlights: ["Вид на озеро", "Пляж 5 мин.", "Семейный отдых", "Завтраки включены"],
  },
  {
    id: 2,
    title: "Harman Resort 5*",
    subtitle: "Хайнань",
    duration: 7,
    price: 134274,
    type: "все включено",
    tag: "Популярный",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/a9afcb9f-381a-48ce-9406-969b0a5f1590.jpg",
    description: "Первый отель «все включено» на Хайнане. Популярный семейный отель с видами на бухту Дадунхай, рядом со знаменитым ТЦ «Ананас». Русскоязычный персонал, ежедневные спортивные и развлекательные мероприятия, профессиональный детский клуб. На территории — центр традиционной китайской медицины «Надежда». Трёхразовое питание по системе «шведский стол», неограниченные напитки в двух барах.",
    highlights: ["Все включено", "Русский персонал", "Детский клуб", "Медицина «Надежда»"],
  },
  {
    id: 3,
    title: "Лето на Хайнане",
    subtitle: "Остров Хайнань",
    duration: 9,
    price: 65897,
    type: "городской",
    tag: "Новинка",
    img: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=800&q=80",
    description: "Водные развлечения и пляжи — пляжный релакс в бухтах, дайвинг на острове Учжичжоу, серфинг. Спасение от жары в тропических лесах — Парк Янода, Парк «Олень повернул голову». Культурная программа и вечерний досуг — центр буддизма, шоу Sanya Romance Park. Оздоровление и шопинг — термальные источники Наньтань, Haitang Bay Duty Free Mall.",
    highlights: ["Пляжи и дайвинг", "Парк Янода", "Sanya Romance Park", "Haitang Bay Duty Free Mall"],
  },
  {
    id: 4,
    title: "Гуйлинь — горы и реки",
    subtitle: "Природные чудеса Китая",
    duration: 9,
    price: 92000,
    type: "природный",
    tag: "",
    img: "https://images.unsplash.com/photo-1537471942344-fa0a51c42428?w=800&q=80",
    description: "Карстовые горы, изумрудные реки и террасные поля Лунцзи — пейзажи, как с картин древних мастеров. Речной круиз по Ли.",
    highlights: ["Река Ли", "Рисовые террасы", "Пещера тростниковой флейты", "Холмы слонового хобота"],
  },
  {
    id: 5,
    title: "Чэнду — родина панд",
    subtitle: "Гастрономия и природа Сычуани",
    duration: 7,
    price: 84000,
    type: "природный",
    tag: "",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "База по разведению больших панд, острая кухня Сычуань, исторический квартал Куанзайсянцзы и буддийская гора Эмэйшань.",
    highlights: ["База панд", "Гора Эмэйшань", "Сычуаньская кухня", "Чайные домики"],
  },
  {
    id: 6,
    title: "Сиань — древняя столица",
    subtitle: "Терракотовая армия и шёлковый путь",
    duration: 5,
    price: 71000,
    type: "экскурсионный",
    tag: "",
    img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    description: "Бывшая столица 13 династий, начало Великого шёлкового пути. Терракотовая армия — одно из главных чудес Древнего мира.",
    highlights: ["Терракотовая армия", "Городские стены", "Мусульманский квартал", "Пагода Диких гусей"],
  },
];

const typeColor: Record<string, string> = {
  пляжный: "#e8007a",
  экскурсионный: "#4a0060",
  городской: "#ff8c00",
  природный: "#007a40",
  "все включено": "#0077cc",
};

export default function China() {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const bookTour = (title: string) => {
    sessionStorage.setItem("bookTour", `Китай — ${title}`);
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #ff8c0010 0%, #e8007a08 40%, #b8ecf5 100%)" }}>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-sm mx-4"
            style={{ aspectRatio: "9/16" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://rutube.ru/play/embed/3ae8733a6b22a6796b2aa1d7df5e991e/?p=c3Lw_OybuZ2B-9IPQr26ZQ&autoplay=1"
              className="w-full h-full rounded-2xl"
              style={{ border: "none" }}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
            >
              <Icon name="X" size={28} />
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3a0050 0%, #4a0060 50%, #1a0030 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/9867595d-0b65-419f-9c55-08ea10189184.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
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
              <Icon name="Landmark" size={22} className="text-white" />
            </div>
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#ff8c00" }}>Направление</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            ТУРЫ В КИТАЙ
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
            {CHINA_TOURS.length} направлений — от тропических пляжей Хайнаня до Великой стены и терракотовой армии
          </p>
        </div>
      </div>

      {/* Tours grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHINA_TOURS.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.85)" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {tour.id === 3 ? (
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="block w-full h-full relative group cursor-pointer z-10"
                  >
                    <img
                      src="https://img.youtube.com/vi/JmvS563KCjE/maxresdefault.jpg"
                      alt="Хайнань"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Icon name="Play" size={24} className="ml-1" style={{ color: "#e8007a" }} />
                      </div>
                    </div>
                  </button>
                ) : (
                  <img src={tour.img} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                )}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(58,0,80,0.6), transparent)" }} />
                {tour.tag && (
                  <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                    {tour.tag}
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: typeColor[tour.type] || "#4a0060" }}
                  >
                    {tour.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-1">
                  <p className="text-xs uppercase tracking-wide" style={{ color: "#a060b0" }}>{tour.subtitle}</p>
                  <h3 className="font-oswald text-xl font-bold" style={{ color: "#3a0050" }}>{tour.title}</h3>
                </div>

                <p className="text-sm mt-2 mb-4 leading-relaxed flex-1" style={{ color: "#5a3070" }}>{tour.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tour.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(232,0,122,0.08)", color: "#a0005a" }}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(74,0,96,0.1)" }}>
                  <div>
                    <p className="text-xs" style={{ color: "#a060b0" }}>от</p>
                    <p className="font-oswald text-xl font-bold" style={{ color: "#e8007a" }}>{tour.price.toLocaleString("ru-RU")} ₽</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs flex items-center gap-1" style={{ color: "#7a4080" }}>
                      <Icon name="Clock" size={13} />
                      {tour.duration} дн.
                    </span>
                    <button
                      onClick={() => bookTour(tour.title)}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}