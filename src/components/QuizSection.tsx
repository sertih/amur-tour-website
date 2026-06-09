import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ROUTES } from "@/components/data";

const QUESTIONS = [
  {
    id: "country",
    question: "Какую страну хотели бы посетить?",
    icon: "Globe",
    options: [
      { label: "Турция", value: "Турция", icon: "Sun" },
      { label: "Египет", value: "Египет", icon: "Pyramid" },
      { label: "Таиланд", value: "Таиланд", icon: "TreePalm" },
      { label: "Вьетнам", value: "Вьетнам", icon: "Waves" },
      { label: "Китай", value: "Китай", icon: "Landmark" },
      { label: "Бали", value: "Бали", icon: "Flower2" },
      { label: "Мальдивы", value: "Мальдивы", icon: "Anchor" },
    ],
    allowCustom: true,
  },
  {
    id: "duration",
    question: "Сколько дней планируете отдыхать?",
    icon: "Calendar",
    options: [
      { label: "До 7 дней", value: "short", icon: "Clock" },
      { label: "8–12 дней", value: "medium", icon: "CalendarDays" },
      { label: "Две недели и больше", value: "long", icon: "CalendarRange" },
    ],
  },
  {
    id: "budget",
    question: "Какой у вас бюджет на человека?",
    icon: "Wallet",
    options: [
      { label: "До 60 000 ₽", value: "low", icon: "BadgeRussianRuble" },
      { label: "60 000 – 100 000 ₽", value: "mid", icon: "Banknote" },
      { label: "Более 100 000 ₽", value: "high", icon: "Gem" },
    ],
  },
  {
    id: "company",
    question: "С кем путешествуете?",
    icon: "Users",
    options: [
      { label: "Один / одна", value: "solo", icon: "User" },
      { label: "Вдвоём", value: "couple", icon: "Heart" },
      { label: "С семьёй и детьми", value: "family", icon: "Baby" },
      { label: "Компания друзей", value: "group", icon: "Users" },
    ],
  },
  {
    id: "climate",
    question: "Какой климат предпочитаете?",
    icon: "Sun",
    options: [
      { label: "Жарко и солнечно", value: "hot", icon: "Sun" },
      { label: "Тепло и комфортно", value: "warm", icon: "CloudSun" },
      { label: "Прохладно и свежо", value: "cool", icon: "Wind" },
    ],
  },
  {
    id: "hotel",
    question: "Какой отель предпочитаете?",
    icon: "Building",
    options: [
      { label: "Бюджетный 3★", value: "budget", icon: "Star" },
      { label: "Комфортный 4★", value: "comfort", icon: "Star" },
      { label: "Люкс 5★", value: "luxury", icon: "Crown" },
    ],
  },
  {
    id: "activity",
    question: "Как хотите проводить время?",
    icon: "Zap",
    options: [
      { label: "Только отдыхать у моря", value: "relax", icon: "Umbrella" },
      { label: "Активный туризм", value: "active", icon: "Mountain" },
      { label: "Экскурсии и культура", value: "culture", icon: "Map" },
      { label: "Всего понемногу", value: "mix", icon: "Shuffle" },
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendations(answers: Answers) {
  return ROUTES.filter((r) => {
    const duration = answers["duration"];
    const budget = answers["budget"];

    if (duration === "short" && r.duration > 7) return false;
    if (duration === "medium" && (r.duration < 8 || r.duration > 12)) return false;
    if (duration === "long" && r.duration < 13) return false;

    if (budget === "low" && r.price > 60000) return false;
    if (budget === "mid" && (r.price < 60000 || r.price > 100000)) return false;
    if (budget === "high" && r.price < 100000) return false;

    return true;
  });
}

interface QuizSectionProps {
  onBookRoute: (title: string) => void;
}

export default function QuizSection({ onBookRoute }: QuizSectionProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const current = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = ((step) / total) * 100;

  const choose = (value: string) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    setShowCustomInput(false);
    setCustomValue("");
    if (step + 1 < total) {
      setTimeout(() => setStep(step + 1), 220);
    } else {
      setTimeout(() => setDone(true), 220);
    }
  };

  const submitCustom = () => {
    if (customValue.trim()) choose(customValue.trim());
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
    setCustomValue("");
    setShowCustomInput(false);
  };

  const results = done ? getRecommendations(answers) : [];

  return (
    <section id="quiz" className="py-24 px-4 bg-[#0e0b1f]/60">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
          <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Подберём лучший вариант</span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">КВИЗ — ПОДБОР ТУРА</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          {!done ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Вопрос {step + 1} из {total}</span>
                <span className="text-xs text-[#7c3aed] font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/30 to-[#06b6d4]/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={current.icon} size={20} className="text-[#7c3aed]" />
                </div>
                <h3 className="font-oswald text-2xl font-bold">{current.question}</h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className={`glass rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-white/10 transition-all border border-white/5 hover:border-[#7c3aed]/40 group ${
                      answers[current.id] === opt.value ? "border-[#7c3aed]/60 bg-[#7c3aed]/10" : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#7c3aed]/40 group-hover:to-[#06b6d4]/40 transition-all">
                      <Icon name={opt.icon} size={16} className="text-[#06b6d4]" />
                    </div>
                    <span className="font-medium text-white">{opt.label}</span>
                  </button>
                ))}
                {"allowCustom" in current && current.allowCustom && (
                  <button
                    onClick={() => setShowCustomInput((v) => !v)}
                    className={`glass rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-white/10 transition-all border border-dashed border-white/20 hover:border-[#7c3aed]/40 group ${showCustomInput ? "border-[#7c3aed]/40 bg-[#7c3aed]/5" : ""}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="PenLine" size={16} className="text-[#06b6d4]" />
                    </div>
                    <span className="font-medium text-gray-300">Свой вариант</span>
                  </button>
                )}
              </div>
              {"allowCustom" in current && current.allowCustom && showCustomInput && (
                <div className="mt-4 flex gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Введите страну..."
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitCustom()}
                    className="flex-1 glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
                  />
                  <button
                    onClick={submitCustom}
                    disabled={!customValue.trim()}
                    className="btn-primary px-5 py-3 rounded-xl font-oswald uppercase disabled:opacity-40"
                  >
                    Далее
                  </button>
                </div>
              )}

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-sm text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                >
                  <Icon name="ChevronLeft" size={14} />
                  Назад
                </button>
              )}
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={26} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-1">
                  {results.length > 0 ? "Мы подобрали туры для вас!" : "Индивидуальный подбор"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {results.length > 0
                    ? `По вашим ответам подходит ${results.length} ${results.length === 1 ? "тур" : "тура"}`
                    : "По вашим параметрам подберём тур индивидуально — оставьте заявку"}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {results.map((r) => (
                    <div key={r.id} className="glass rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img src={r.img} alt={r.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-oswald font-bold text-lg leading-tight truncate">{r.title}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{r.duration} дн. · {r.price.toLocaleString("ru-RU")} ₽/чел.</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onBookRoute(r.title)}
                        className="btn-primary px-4 py-2 rounded-xl text-sm font-oswald uppercase flex-shrink-0"
                      >
                        Забронировать
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-2xl p-6 text-center mb-6">
                  <p className="text-gray-300 text-sm mb-4">Наши менеджеры работают круглосуточно и подберут тур именно под ваши пожелания</p>
                  <button
                    onClick={() => onBookRoute("")}
                    className="btn-primary px-6 py-3 rounded-xl font-oswald uppercase"
                  >
                    Оставить заявку
                  </button>
                </div>
              )}

              <button
                onClick={restart}
                className="w-full glass rounded-xl py-3 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                <Icon name="RotateCcw" size={14} />
                Пройти заново
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}