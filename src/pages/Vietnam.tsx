import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const VIETNAM_TOURS = [
  {
    id: 1,
    title: "Tui Blue Nha Trang 5*",
    subtitle: "Нячанг",
    duration: 12,
    price: 185263,
    type: "пляжный",
    tag: "",
    img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/2bcc5874-6a20-44a4-9b7a-906ff86e3b8d.jpg",
    video: null,
    description: "Современные номера после обновления в 2023 году — стильный интерьер, уютная атмосфера и высокий уровень сервиса.\n\nУдачное расположение в центре Нячанга. В пешей доступности находятся знаменитая Башня Лотос, Ночной рынок, многочисленные рестораны, кафе и спа-центры.\n\nДо городского пляжа всего около 250 метров — море совсем рядом.\n\nДля гостей работают открытый бассейн с красивыми видами на город, фитнес-зал и ресторан с разнообразными завтраками.",
    highlights: ["Обновлён в 2023 году", "250 м до пляжа", "Бассейн с видом на город", "Центр Нячанга"],
  },
];

const typeColor: Record<string, string> = {
  пляжный: "#e8007a",
  экскурсионный: "#4a0060",
  городской: "#ff8c00",
  природный: "#007a40",
  "все включено": "#0077cc",
};

export default function Vietnam() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const bookTour = (title: string) => {
    sessionStorage.setItem("bookTour", `Вьетнам — ${title}`);
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#b8ecf5" }}>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-sm mx-4"
            style={{ aspectRatio: "9/16" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              className="w-full h-full rounded-2xl"
              style={{ background: "#000" }}
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => setActiveVideo(null)}
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
        style={{ background: "linear-gradient(135deg, #003a50 0%, #004a60 50%, #001a30 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${VIETNAM_TOURS[0].img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,58,80,0.85), rgba(0,26,48,0.9))" }} />

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
              <Icon name="Palmtree" size={22} className="text-white" />
            </div>
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#ff8c00" }}>Направление</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            ТУРЫ ВО ВЬЕТНАМ
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
            {VIETNAM_TOURS.length} направление — тёплое море, современные курорты и атмосфера Юго-Восточной Азии
          </p>
        </div>
      </div>

      {/* Tours grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIETNAM_TOURS.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "rgba(195,228,228,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)" }}
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {tour.video ? (
                  <button
                    onClick={() => setActiveVideo(tour.video)}
                    className="block w-full h-full relative group cursor-pointer z-10"
                  >
                    <img
                      src={tour.img}
                      alt={tour.title}
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
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,58,80,0.6), transparent)" }} />
                {tour.tag && (
                  <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                    {tour.tag}
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-white text-xs font-bold px-2 py-1 rounded-lg"
                    style={{ background: typeColor[tour.type] ?? "#004a60" }}
                  >
                    {tour.type}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "#a060b0" }}>{tour.subtitle}</p>
                <h3 className="font-oswald text-xl font-bold mb-2" style={{ color: "#003a50" }}>{tour.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1 whitespace-pre-line" style={{ color: "#7a4080" }}>{tour.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.highlights.map((h) => (
                    <span key={h} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(232,0,122,0.1)", color: "#a0005a" }}>
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(0,74,96,0.1)" }}>
                  <div>
                    <div className="font-oswald text-2xl font-bold" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      от {tour.price.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: "#a060b0" }}>
                      <Icon name="Clock" size={11} />
                      {tour.duration} ночей
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
