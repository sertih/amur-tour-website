import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";
import { ROUTES } from "@/components/data";
import { SearchFilters } from "@/components/SearchFilterBar";

interface SearchResultsProps {
  filters: SearchFilters;
  onBookRoute: (title: string) => void;
  onClose: () => void;
}

function matchesNights(duration: number, nights: string) {
  if (nights === "Любое") return true;
  if (nights === "13+") return duration >= 13;
  const [from, to] = nights.split("-").map(Number);
  return duration >= from && duration <= to;
}

export default function SearchResults({ filters, onBookRoute, onClose }: SearchResultsProps) {
  const results = ROUTES.filter((r) => {
    const countryOk = filters.country === "Любая страна" || r.title === filters.country;
    const nightsOk = matchesNights(r.duration, filters.nights);
    return countryOk && nightsOk;
  });

  const dateLabel = filters.dateRange?.from
    ? filters.dateRange.to
      ? `${format(filters.dateRange.from, "d MMM", { locale: ru })} – ${format(filters.dateRange.to, "d MMM", { locale: ru })}`
      : format(filters.dateRange.from, "d MMM", { locale: ru })
    : null;

  return (
    <section id="search-results" className="px-4 pb-16 pt-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h3 className="font-oswald text-2xl font-bold" style={{ color: "#3a0050" }}>
              {results.length > 0 ? `Найдено туров: ${results.length}` : "Туры не найдены"}
            </h3>
            <p className="text-sm mt-1" style={{ color: "#7a4080" }}>
              {filters.city} • {filters.country}
              {dateLabel ? ` • ${dateLabel}` : ""} • {filters.people}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all"
            style={{ background: "rgba(255,255,255,0.6)", color: "#7a4080", border: "1px solid rgba(74,0,96,0.2)" }}
          >
            <Icon name="X" size={14} />
            Закрыть
          </button>
        </div>

        {results.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)" }}
          >
            <Icon name="SearchX" size={32} className="mx-auto mb-3" style={{ color: "#a060b0" }} />
            <p style={{ color: "#4a0060" }}>Попробуйте изменить параметры поиска — например, выберите другую страну или количество ночей.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl overflow-hidden card-hover"
                style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)" }}
              >
                <div className="relative h-44">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                  {r.tag && (
                    <span
                      className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full text-white"
                      style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}
                    >
                      {r.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="font-oswald font-bold text-lg mb-1" style={{ color: "#3a0050" }}>{r.title}</div>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: "#7a4080" }}>{r.description}</p>
                  <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "#a060b0" }}>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{r.duration} ночей</span>
                    <span className="flex items-center gap-1"><Icon name="Tag" size={12} />{r.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="font-oswald text-xl font-bold"
                      style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {r.price.toLocaleString("ru-RU")} ₽
                    </div>
                    <button
                      onClick={() => onBookRoute(r.title)}
                      className="btn-primary text-sm px-4 py-2 rounded-xl font-medium"
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
