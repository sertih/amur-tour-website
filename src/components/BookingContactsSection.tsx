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
      <section id="booking" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Запишитесь прямо сейчас</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">БРОНИРОВАНИЕ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
          </div>
          <div className="glass rounded-3xl p-8 md:p-12 reveal opacity-0-init animate-scale-in">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text", icon: "User" },
                { key: "phone", label: "Телефон", placeholder: "+7 (999) 123-45-67", type: "tel", icon: "Phone" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">{f.label}</label>
                  <div className="relative">
                    <Icon name={f.icon} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={bookingForm[f.key as keyof BookingForm]}
                      onChange={(e) => setBookingForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Тур</label>
                <div className="relative">
                  <Icon name="Map" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <select
                    value={bookingForm.route}
                    onChange={(e) => setBookingForm((p) => ({ ...p, route: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-[#0e0b1f]">Выберите тур</option>
                    {ROUTES.map((r) => (
                      <option key={r.id} value={r.title} className="bg-[#0e0b1f]">{r.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Желаемая дата</label>
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 mb-2 block uppercase tracking-wide">Количество человек</label>
                <div className="flex gap-3">
                  {["1", "2", "3-5", "5+"].map((n) => (
                    <button
                      key={n}
                      onClick={() => setBookingForm((p) => ({ ...p, people: n }))}
                      className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                        bookingForm.people === n
                          ? "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white"
                          : "glass text-gray-300 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-8 py-4 rounded-xl font-oswald text-lg uppercase tracking-wide">
              Отправить заявку
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">
              Менеджер свяжется с вами в течение 30 минут
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 bg-[#0e0b1f]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal opacity-0-init animate-fade-up">
            <span className="text-[#06b6d4] font-medium uppercase tracking-widest text-sm">Свяжитесь с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-2 mb-4">КОНТАКТЫ</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto rounded-full" />
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
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-[#7c3aed]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{c.label}</div>
                      <div className="text-white font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="glass rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.593l-2.969-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.897.966z" fill="#29B6F6"/>
                  </svg>
                  Telegram
                </button>
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-medium">
                  <img src="https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/72c1c9f4-d4d8-4bf6-b147-1aca81763071.jpeg" width="20" height="20" style={{borderRadius: "6px", objectFit: "cover"}} />
                  MAX
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 reveal opacity-0-init animate-fade-up">
              <h3 className="font-oswald text-xl font-bold mb-6">Напишите нам</h3>
              <div className="space-y-4">
                {[
                  { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                  { key: "email", label: "Email", placeholder: "email@example.com", type: "email" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={contactForm[f.key as keyof ContactForm]}
                      onChange={(e) => setContactForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wide">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Ваш вопрос или пожелание..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 transition-all resize-none"
                  />
                </div>
                <button className="btn-primary w-full py-3 rounded-xl font-oswald uppercase tracking-wide">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
              <Icon name="Plane" size={16} className="text-white" />
            </div>
            <span className="font-oswald font-bold text-lg">
              <span className="text-gradient">АВИА НЕКСТ</span>
              <span className="text-white ml-1">ТУР</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © 2025 Авиа Некст Тур. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <button className="hover:text-[#7c3aed] transition-colors">Политика конфиденциальности</button>
          </div>
        </div>
      </footer>
    </>
  );
}