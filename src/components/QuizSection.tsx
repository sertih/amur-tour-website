import { useState } from "react";
import Icon from "@/components/ui/icon";

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
    id: "hotel",
    question: "Какой отель предпочитаете?",
    icon: "Building",
    options: [
      { label: "Бюджетный 3★", value: "budget", icon: "Star" },
      { label: "Комфортный 4★", value: "comfort", icon: "Star" },
      { label: "Люкс 5★", value: "luxury", icon: "Crown" },
    ],
  },
];

type Answers = Record<string, string>;

interface QuizSectionProps {
  onBookRoute: (title: string) => void;
}

export default function QuizSection({ onBookRoute }: QuizSectionProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const current = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = (step / total) * 100;

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
    setName("");
    setPhone("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (name.trim() && phone.trim()) {
      setSubmitted(true);
      onBookRoute(answers["country"] || "");
    }
  };

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: "linear-gradient(160deg, #ff8c0018 0%, #e8007a12 50%, #b8ecf5 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>ПОДБЕРЁМ ЛУЧШИЙ ВАРИАНТ ТУРА</h2>
          <p className="text-lg mb-4" style={{ color: "#7a4080" }}>Ответьте на несколько вопросов и получите персональное предложение на самых выгодных условиях</p>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
        </div>

        <div className="rounded-3xl p-8 md:p-12" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)" }}>
          {!done ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide" style={{ color: "#a060b0" }}>Вопрос {step + 1} из {total}</span>
                <span className="text-xs font-medium" style={{ color: "#e8007a" }}>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "rgba(74,0,96,0.1)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "linear-gradient(to right, #e8007a, #ff8c00)" }}
                />
              </div>

              {/* Question */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.2), rgba(255,140,0,0.2))" }}>
                  <Icon name={current.icon} size={20} style={{ color: "#e8007a" } as React.CSSProperties} />
                </div>
                <h3 className="font-oswald text-2xl font-bold" style={{ color: "#3a0050" }}>{current.question}</h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className="rounded-2xl p-4 flex items-center gap-3 text-left transition-all"
                    style={answers[current.id] === opt.value
                      ? { background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))", border: "1.5px solid #e8007a" }
                      : { background: "rgba(255,255,255,0.6)", border: "1.5px solid rgba(74,0,96,0.15)" }
                    }
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))" }}>
                      <Icon name={opt.icon} size={16} style={{ color: "#e8007a" } as React.CSSProperties} />
                    </div>
                    <span className="font-medium" style={{ color: "#3a0050" }}>{opt.label}</span>
                  </button>
                ))}
                {"allowCustom" in current && current.allowCustom && (
                  <button
                    onClick={() => setShowCustomInput((v) => !v)}
                    className="rounded-2xl p-4 flex items-center gap-3 text-left transition-all"
                    style={showCustomInput
                      ? { background: "rgba(232,0,122,0.08)", border: "1.5px dashed #e8007a" }
                      : { background: "rgba(255,255,255,0.5)", border: "1.5px dashed rgba(74,0,96,0.3)" }
                    }
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,0,122,0.1)" }}>
                      <Icon name="PenLine" size={16} style={{ color: "#e8007a" } as React.CSSProperties} />
                    </div>
                    <span className="font-medium" style={{ color: "#7a4080" }}>Свой вариант</span>
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
                    className="flex-1 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" }}
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
                  className="mt-6 text-sm flex items-center gap-1 transition-colors"
                  style={{ color: "#a060b0" }}
                >
                  <Icon name="ChevronLeft" size={14} />
                  Назад
                </button>
              )}
            </>
          ) : submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                <Icon name="CheckCheck" size={30} className="text-white" />
              </div>
              <h3 className="font-oswald text-2xl font-bold mb-2" style={{ color: "#3a0050" }}>Заявка принята!</h3>
              <p className="text-sm mb-6" style={{ color: "#7a4080" }}>Менеджер свяжется с вами в ближайшее время и подберёт идеальный тур</p>
              <button onClick={restart} className="rounded-xl px-6 py-3 text-sm flex items-center justify-center gap-2 transition-all mx-auto" style={{ background: "rgba(255,255,255,0.6)", color: "#7a4080", border: "1px solid rgba(74,0,96,0.2)" }}>
                <Icon name="RotateCcw" size={14} />
                Пройти заново
              </button>
            </div>
          ) : (
            <>
              {/* Result header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
                  <Icon name="Sparkles" size={26} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-1" style={{ color: "#3a0050" }}>Ваши результаты готовы!</h3>
                <p className="text-sm" style={{ color: "#7a4080" }}>Оставьте контакты — менеджер подберёт тур по вашим ответам и свяжется с вами</p>
              </div>

              {/* Lead form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Ваше имя</label>
                  <div className="relative">
                    <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all"
                      style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Телефон</label>
                  <div className="relative">
                    <Icon name="Phone" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                    <input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all"
                      style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !phone.trim()}
                className="btn-primary w-full py-4 rounded-xl font-oswald text-lg uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Получить подборку туров
              </button>

              <button onClick={restart} className="mt-4 w-full rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-all" style={{ background: "rgba(255,255,255,0.5)", color: "#7a4080", border: "1px solid rgba(74,0,96,0.15)" }}>
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