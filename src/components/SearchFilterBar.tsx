import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SearchFilterBarProps {
  onSearch: (summary: string) => void;
}

const FIELDS = [
  { key: "city", icon: "PlaneTakeoff", label: "Город вылета", placeholder: "Хабаровск" },
  { key: "country", icon: "MapPin", label: "Страна", placeholder: "Турция" },
  { key: "dates", icon: "CalendarDays", label: "Даты вылета", placeholder: "27 июл - 5 авг" },
  { key: "nights", icon: "Clock", label: "Ночей", placeholder: "6 - 14" },
  { key: "people", icon: "User", label: "Туристы", placeholder: "2 взрослых" },
] as const;

export default function SearchFilterBar({ onSearch }: SearchFilterBarProps) {
  const [values, setValues] = useState({ city: "Хабаровск", country: "", dates: "", nights: "", people: "2 взрослых" });

  const handleChange = (key: string, value: string) => {
    setValues((p) => ({ ...p, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(
      `Город вылета: ${values.city || "—"}, страна: ${values.country || "—"}, даты: ${values.dates || "—"}, ночей: ${values.nights || "—"}, туристы: ${values.people || "—"}`
    );
  };

  return (
    <section className="px-4 pb-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl overflow-hidden flex flex-col lg:flex-row"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
        >
          {FIELDS.map((f, i) => (
            <div
              key={f.key}
              className="flex-1 px-5 py-4"
              style={i > 0 ? { borderTop: "1px solid rgba(74,0,96,0.12)", borderLeft: "1px solid rgba(74,0,96,0.12)" } : undefined}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon name={f.icon} size={13} style={{ color: "#a060b0" }} />
                <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#7a4080" }}>
                  {f.label}
                </span>
              </div>
              <input
                type="text"
                value={values[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="w-full font-oswald font-semibold text-base bg-transparent focus:outline-none placeholder:opacity-50"
                style={{ color: "#3a0050" }}
              />
            </div>
          ))}

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 px-8 py-4 lg:py-0 font-oswald text-lg uppercase tracking-wide transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #ff8c00, #ff6a00)", color: "white" }}
          >
            <Icon name="Search" size={18} />
            Найти туры
          </button>
        </div>
      </div>
    </section>
  );
}
