import Icon from "@/components/ui/icon";
import { ROUTES, BookingForm, ContactForm } from "@/components/data";

interface BookingContactsSectionProps {
  bookingForm: BookingForm;
  setBookingForm: React.Dispatch<React.SetStateAction<BookingForm>>;
  contactForm: ContactForm;
  setContactForm: React.Dispatch<React.SetStateAction<ContactForm>>;
}

export default function BookingContactsSection({
  bookingForm, setBookingForm,
  contactForm, setContactForm,
}: BookingContactsSectionProps) {
  return (
    <>
      {/* BOOKING */}
      <section id="booking" className="py-24 px-4" style={{ background: "#b8ecf5" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Запишитесь прямо сейчас</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>БРОНИРОВАНИЕ</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
          </div>
          <div className="rounded-3xl p-8 md:p-12 reveal opacity-0-init animate-scale-in" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)" }}>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text", icon: "User" },
                { key: "phone", label: "Телефон", placeholder: "+7 (999) 123-45-67", type: "tel", icon: "Phone" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>{f.label}</label>
                  <div className="relative">
                    <Icon name={f.icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={bookingForm[f.key as keyof BookingForm]}
                      onChange={(e) => setBookingForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all"
                      style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" }}
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Тур</label>
                <div className="relative">
                  <Icon name="Map" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                  <select
                    value={bookingForm.route}
                    onChange={(e) => setBookingForm((p) => ({ ...p, route: e.target.value }))}
                    className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all appearance-none"
                    style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" }}
                  >
                    <option value="" style={{ background: "#e8f8fc" }}>Выберите тур</option>
                    {ROUTES.map((r) => (
                      <option key={r.id} value={r.title} style={{ background: "#e8f8fc" }}>{r.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Желаемая дата</label>
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a060b0" } as React.CSSProperties} />
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all"
                    style={{ background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)", colorScheme: "light" }}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm mb-2 block uppercase tracking-wide" style={{ color: "#7a4080" }}>Количество человек</label>
                <div className="flex gap-3">
                  {["1", "2", "3-5", "5+"].map((n) => (
                    <button
                      key={n}
                      onClick={() => setBookingForm((p) => ({ ...p, people: n }))}
                      className="flex-1 py-3 rounded-xl font-medium text-sm transition-all"
                      style={bookingForm.people === n
                        ? { background: "linear-gradient(135deg, #e8007a, #ff8c00)", color: "white" }
                        : { background: "rgba(255,255,255,0.6)", color: "#4a0060", border: "1.5px solid rgba(74,0,96,0.2)" }
                      }
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="btn-primary w-full mt-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide"
              onClick={() => {
                const text = [
                  `✈️ Новая заявка на бронирование — Авиа Нэкст Тур`,
                  ``,
                  `👤 Имя: ${bookingForm.name || "—"}`,
                  `📞 Телефон: ${bookingForm.phone || "—"}`,
                  `🌍 Тур: ${bookingForm.route || "—"}`,
                  `📅 Дата: ${bookingForm.date || "—"}`,
                  `👥 Человек: ${bookingForm.people || "—"}`,
                ].join("\n");
                window.open(`https://wa.me/79141793837?text=${encodeURIComponent(text)}`, "_blank");
              }}
            >
              Отправить заявку
            </button>
            <p className="text-center text-xs mt-4" style={{ color: "#a060b0" }}>
              Менеджер свяжется с вами в течение 30 минут
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4" style={{ background: "linear-gradient(160deg, #e8007a12 0%, #b8ecf5 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="font-medium uppercase tracking-widest text-sm" style={{ color: "#e8007a" }}>Свяжитесь с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4" style={{ color: "#3a0050" }}>КОНТАКТЫ</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(to right, #e8007a, #ff8c00)" }} />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal opacity-0-init animate-slide-right">
              <div className="space-y-6 mb-8">
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Хабаровск, ул. Радищева, 6/2" },
                  { icon: "Phone", label: "Телефон", value: "+7 (909) 824-16-07" },
                  { icon: "Clock", label: "Режим работы", value: "Круглосуточно" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(232,0,122,0.15), rgba(255,140,0,0.15))" }}>
                      <Icon name={c.icon} size={18} style={{ color: "#e8007a" } as React.CSSProperties} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-0.5" style={{ color: "#a060b0" }}>{c.label}</div>
                      <div className="font-medium" style={{ color: "#3a0050" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://t.me/naekvatorekhv" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 flex items-center gap-2 transition-all text-sm font-medium" style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.593l-2.969-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.897.966z" fill="#29B6F6"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://max.ru/join/_epclTfantWzVhzhNUthxROCbw-XK8CuoBWxp5WgTsw" target="_blank" rel="noopener noreferrer" className="rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all" style={{ background: "rgba(255,255,255,0.6)", color: "#3a0050", border: "1px solid rgba(74,0,96,0.2)" }}>
                  <img src="https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/733a3b65-944a-4d88-b4f7-945e23578f9d.png" width="28" height="28" />
                  MAX
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden reveal opacity-0-init animate-fade-up" style={{ border: "1px solid rgba(255,255,255,0.85)", minHeight: "360px" }}>
              <h3 className="font-oswald text-xl font-bold px-6 py-4" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", color: "#3a0050" }}>Мы на карте</h3>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=135.073638%2C48.480736&z=17&pt=135.073638%2C48.480736,pm2rdm&text=%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%A0%D0%B0%D0%B4%D0%B8%D1%89%D0%B5%D0%B2%D0%B0%206%2F2"
                width="100%"
                height="360"
                style={{ border: "none", display: "block" }}
                allowFullScreen
                title="Офис на карте"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4" style={{ borderTop: "1px solid rgba(74,0,96,0.15)", background: "#8dd8e8" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
              <Icon name="Plane" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg">
              <span style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>АВИА НЕКСТ</span>
              <span className="ml-1" style={{ color: "#3a0050" }}>ТУР</span>
            </span>
          </div>
          <p className="text-sm text-center" style={{ color: "#7a4080" }}>
            © 2025 Авиа Некст Тур. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="transition-colors" style={{ color: "#a060b0" }}>Политика конфиденциальности</button>
          </div>
        </div>
      </footer>
    </>
  );
}