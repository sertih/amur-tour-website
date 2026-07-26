import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { ROUTES } from "@/components/data";

interface TopToursBannerProps {
  onBookRoute: (title: string) => void;
}

export default function TopToursBanner({ onBookRoute }: TopToursBannerProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % ROUTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const tour = ROUTES[active];
  const next = () => setActive((p) => (p + 1) % ROUTES.length);
  const prev = () => setActive((p) => (p - 1 + ROUTES.length) % ROUTES.length);

  return (
    <section className="pt-24 pb-4 px-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px]">
          <img
            key={tour.img}
            src={tour.img}
            alt={tour.title}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(58,0,80,0.78) 0%, rgba(58,0,80,0.4) 45%, transparent 75%)" }}
          />

          <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-[85%] max-w-sm">
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <span className="font-medium uppercase tracking-widest text-xs" style={{ color: "#e8007a" }}>
                Горящее предложение
              </span>
              <div className="font-oswald text-2xl md:text-3xl font-bold mt-1 mb-1" style={{ color: "#3a0050" }}>
                {tour.title}
              </div>
              <div className="text-sm mb-4" style={{ color: "#7a4080" }}>
                {tour.duration} ночей
              </div>
              <div className="flex items-center justify-between gap-4">
                <div
                  className="font-oswald text-2xl md:text-3xl font-bold"
                  style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {tour.price.toLocaleString("ru-RU")} ₽
                </div>
                <button
                  onClick={() => onBookRoute(tour.title)}
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}
                >
                  <Icon name="ChevronRight" size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-3 bottom-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/80"
            style={{ background: "rgba(255,255,255,0.6)" }}
          >
            <Icon name="ChevronLeft" size={16} style={{ color: "#3a0050" }} />
          </button>
          <button
            onClick={next}
            className="absolute left-[3.75rem] bottom-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/80"
            style={{ background: "rgba(255,255,255,0.6)" }}
          >
            <Icon name="ChevronRight" size={16} style={{ color: "#3a0050" }} />
          </button>

          <div className="absolute right-4 bottom-4 flex gap-1.5">
            {ROUTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-2 rounded-full transition-all"
                style={{ background: i === active ? "#e8007a" : "rgba(255,255,255,0.6)", width: i === active ? "20px" : "8px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
