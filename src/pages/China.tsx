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
    title: "Девичник на Хайнане",
    subtitle: "Остров Хайнань",
    duration: 8,
    price: 115000,
    type: "пляжный",
    tag: "",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/8fa869a4-020d-4f58-bc9a-02188b4f4a59.jpg",
    description: "Программа мечты:\n1 день — вылет на о. Хайнань.\n2 день — завтрак в отеле, свободное время, море, солнце, пляж.\n3 день — поездка на радоновые источники, ванны с лепестками роз.\n4 день — шопинг, йога, массаж.\n5 день — поездка на фотосессию на розовом пляже в стиле «Барби».\n6 день — морская прогулка вокруг о. Феникс.\n7 день — свободное время, экскурсии по желанию за доп. плату.\n8 день — трансфер в аэропорт, вылет в Хабаровск.",
    highlights: ["Радоновые источники", "Розовый пляж «Барби»", "Морская прогулка", "Йога и массаж"],
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
    <div style={{ minHeight: "100vh", background: "#b8ecf5" }}>

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
            <video
              src="https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/videos/hainan-summer.mp4"
              className="w-full h-full rounded-2xl"
              style={{ background: "#000" }}
              controls
              autoPlay
              playsInline
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
            {CHINA_TOURS.length} направления — тропические пляжи, девичники и незабываемый отдых на Хайнане
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
              style={{ background: "rgba(195,228,228,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {tour.id === 3 ? (
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="block w-full h-full relative group cursor-pointer z-10"
                  >
                    <img
                      src="https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/ba47d7f8-59cf-4534-9088-afc766dac9bd.jpg"
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

                <p className="text-sm mt-2 mb-4 leading-relaxed flex-1 whitespace-pre-line" style={{ color: "#5a3070" }}>{tour.description}</p>

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