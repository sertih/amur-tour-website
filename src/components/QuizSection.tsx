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
          ) : submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mx-auto mb-5">
                <Icon name="CheckCheck" size={30} className="text-white" />
              </div>
              <h3 className="font-oswald text-2xl font-bold mb-2">Заявка принята!</h3>
              <p className="text-gray-400 text-sm mb-6">Менеджер свяжется с вами в ближайшее время и подберёт идеальный тур</p>
              <button onClick={restart} className="glass rounded-xl px-6 py-3 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all mx-auto">
                <Icon name="RotateCcw" size={14} />
                Пройти заново
              </button>
            </div>
          ) : (
            <>
              {/* Result header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={26} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-1">Ваши результаты готовы!</h3>
                <p className="text-gray-400 text-sm">Оставьте контакты — менеджер подберёт тур по вашим ответам и свяжется с вами</p>
              </div>

              {/* Lead form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Ваше имя</label>
                  <div className="relative">
                    <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">Телефон</label>
                  <div className="relative">
                    <Icon name="Phone" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
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

              <button onClick={restart} className="mt-4 w-full glass rounded-xl py-3 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all">
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
