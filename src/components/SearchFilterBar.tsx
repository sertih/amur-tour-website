import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useTours } from "@/hooks/useTours";

export interface SearchFilters {
  city: string;
  country: string;
  dateRange?: DateRange;
  nights: string;
  people: string;
}

interface SearchFilterBarProps {
  onSearch: (filters: SearchFilters) => void;
}

const CITIES = ["Хабаровск", "Владивосток", "Москва", "Новосибирск", "Иркутск"];
const NIGHTS = ["Любое", "1-7", "8-12", "13+"];
const PEOPLE = ["1 взрослый", "2 взрослых", "3 взрослых", "4+ взрослых"];

function DropdownField({
  icon,
  label,
  value,
  options,
  onSelect,
  borderLeft,
}: {
  icon: string;
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  borderLeft?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex-1 px-5 py-4 text-left w-full"
          style={borderLeft ? { borderTop: "1px solid rgba(74,0,96,0.12)", borderLeft: "1px solid rgba(74,0,96,0.12)" } : undefined}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Icon name={icon} size={13} style={{ color: "#a060b0" }} />
            <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#7a4080" }}>
              {label}
            </span>
          </div>
          <div className="font-oswald font-semibold text-base truncate" style={{ color: "#3a0050" }}>
            {value}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" style={{ background: "white" }} align="start">
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onSelect(o);
                setOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm transition-all"
              style={value === o
                ? { background: "linear-gradient(135deg, #e8007a, #ff8c00)", color: "white" }
                : { color: "#3a0050" }
              }
              onMouseEnter={(e) => { if (value !== o) (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,0,122,0.08)"; }}
              onMouseLeave={(e) => { if (value !== o) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              {o}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function SearchFilterBar({ onSearch }: SearchFilterBarProps) {
  const { tours } = useTours();
  const [city, setCity] = useState("Хабаровск");
  const [country, setCountry] = useState("Любая страна");
  const [nights, setNights] = useState("Любое");
  const [people, setPeople] = useState("2 взрослых");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);

  const countries = ["Любая страна", ...Array.from(new Set(tours.map((t) => t.title)))];

  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "d MMM", { locale: ru })} - ${format(dateRange.to, "d MMM", { locale: ru })}`
      : format(dateRange.from, "d MMM", { locale: ru })
    : "Выберите даты";

  const handleSearch = () => {
    onSearch({ city, country, dateRange, nights, people });
  };

  return (
    <section className="px-4 pb-4" style={{ background: "#b8ecf5" }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl overflow-hidden flex flex-col lg:flex-row"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
        >
          <DropdownField icon="PlaneTakeoff" label="Город вылета" value={city} options={CITIES} onSelect={setCity} />
          <DropdownField icon="MapPin" label="Страна" value={country} options={countries} onSelect={setCountry} borderLeft />

          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex-1 px-5 py-4 text-left w-full"
                style={{ borderTop: "1px solid rgba(74,0,96,0.12)", borderLeft: "1px solid rgba(74,0,96,0.12)" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon name="CalendarDays" size={13} style={{ color: "#a060b0" }} />
                  <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#7a4080" }}>
                    Даты вылета
                  </span>
                </div>
                <div className="font-oswald font-semibold text-base truncate" style={{ color: "#3a0050" }}>
                  {dateLabel}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" style={{ background: "white" }} align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                locale={ru}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>

          <DropdownField icon="Clock" label="Ночей" value={nights === "Любое" ? "Любое" : `${nights} дн.`} options={NIGHTS} onSelect={setNights} borderLeft />
          <DropdownField icon="User" label="Туристы" value={people} options={PEOPLE} onSelect={setPeople} borderLeft />

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