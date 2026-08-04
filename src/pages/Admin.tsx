import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import funcUrls from "../../backend/func2url.json";

interface TourItem {
  id: number;
  title: string;
  type: string;
  duration: number;
  price: number;
  difficulty: string;
  img: string;
  description: string;
  tag: string;
  is_active: boolean;
}

const EMPTY_TOUR: Omit<TourItem, "id"> = {
  title: "",
  type: "пляжный",
  duration: 7,
  price: 0,
  difficulty: "лёгкий",
  img: "",
  description: "",
  tag: "",
  is_active: true,
};

const inputStyle = { background: "rgba(255,255,255,0.7)", color: "#3a0050", border: "1.5px solid rgba(74,0,96,0.2)" };

export default function Admin() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("adminToken"));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<TourItem | Omit<TourItem, "id"> | null>(null);
  const [saving, setSaving] = useState(false);

  const loadTours = (authToken: string) => {
    setLoading(true);
    fetch(funcUrls["manage-tours"], { headers: { "X-Auth-Token": authToken } })
      .then((res) => res.json())
      .then((data) => setTours(data.tours || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) loadTours(token);
  }, [token]);

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(funcUrls["manage-tours"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Ошибка входа");
        return;
      }
      sessionStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } catch {
      setLoginError("Не удалось подключиться к серверу");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setToken(null);
  };

  const handleSave = async () => {
    if (!token || !editing) return;
    setSaving(true);
    const isNew = !("id" in editing);
    try {
      const res = await fetch(funcUrls["manage-tours"], {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", "X-Auth-Token": token },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setEditing(null);
        loadTours(token);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Удалить этот тур?")) return;
    await fetch(`${funcUrls["manage-tours"]}?id=${id}`, {
      method: "DELETE",
      headers: { "X-Auth-Token": token },
    });
    loadTours(token);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#34dcdc" }}>
        <div
          className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, #e8007a, #4a0060)" }}>
              <Icon name="Lock" size={24} className="text-white" />
            </div>
            <h1 className="font-oswald text-2xl font-bold" style={{ color: "#3a0050" }}>Вход в админку</h1>
          </div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-xl px-4 py-3 mb-3 focus:outline-none"
            style={inputStyle}
          />
          {loginError && <p className="text-sm text-red-500 mb-3">{loginError}</p>}
          <button
            onClick={handleLogin}
            disabled={loggingIn || !password}
            className="btn-primary w-full py-3 rounded-xl font-oswald text-lg uppercase tracking-wide disabled:opacity-50"
          >
            {loggingIn ? "Входим…" : "Войти"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 text-sm text-center"
            style={{ color: "#7a4080" }}
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-montserrat" style={{ background: "#34dcdc" }}>
      <nav className="sticky top-0 z-40" style={{ background: "rgba(210,235,235,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-oswald font-bold text-lg" style={{ color: "#3a0050" }}>Управление турами</div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-sm font-medium flex items-center gap-1" style={{ color: "#4a0060" }}>
              <Icon name="Home" size={16} />
              На сайт
            </button>
            <button onClick={handleLogout} className="text-sm font-medium flex items-center gap-1" style={{ color: "#e8007a" }}>
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-oswald text-2xl font-bold" style={{ color: "#3a0050" }}>
            Туры ({tours.length})
          </h2>
          <button
            onClick={() => setEditing({ ...EMPTY_TOUR })}
            className="btn-primary px-5 py-2.5 rounded-xl font-medium flex items-center gap-2"
          >
            <Icon name="Plus" size={16} />
            Добавить тур
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Icon name="Loader2" size={28} className="mx-auto animate-spin" style={{ color: "#e8007a" }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tours.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl p-4 flex gap-4"
                style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.8)", opacity: t.is_active ? 1 : 0.5 }}
              >
                <img src={t.img} alt={t.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-oswald font-bold truncate" style={{ color: "#3a0050" }}>{t.title}</span>
                    {!t.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-300 text-gray-600 flex-shrink-0">скрыт</span>}
                  </div>
                  <div className="text-xs mb-2" style={{ color: "#7a4080" }}>{t.duration} ночей • {t.type}</div>
                  <div className="font-oswald font-bold" style={{ color: "#e8007a" }}>{t.price.toLocaleString("ru-RU")} ₽</div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditing(t)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(74,0,96,0.08)", color: "#4a0060" }}
                  >
                    <Icon name="Pencil" size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(232,0,122,0.08)", color: "#e8007a" }}
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(58,0,80,0.5)" }}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-oswald text-xl font-bold" style={{ color: "#3a0050" }}>
                {"id" in editing ? "Редактировать тур" : "Новый тур"}
              </h3>
              <button onClick={() => setEditing(null)} style={{ color: "#a060b0" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Название</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Тип</label>
                  <input
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Сложность</label>
                  <input
                    value={editing.difficulty}
                    onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })}
                    className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Ночей</label>
                  <input
                    type="number"
                    value={editing.duration}
                    onChange={(e) => setEditing({ ...editing, duration: Number(e.target.value) })}
                    className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Цена (₽)</label>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Ссылка на фото</label>
                <input
                  value={editing.img}
                  onChange={(e) => setEditing({ ...editing, img: e.target.value })}
                  className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Метка (например, "Хит сезона")</label>
                <input
                  value={editing.tag}
                  onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  className="w-full rounded-xl px-4 py-2.5 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide mb-1 block" style={{ color: "#7a4080" }}>Описание</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl px-4 py-2.5 focus:outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.is_active}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm" style={{ color: "#4a0060" }}>Показывать на сайте</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-3 rounded-xl font-medium"
                style={{ background: "rgba(74,0,96,0.08)", color: "#4a0060" }}
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.title}
                className="btn-primary flex-1 py-3 rounded-xl font-medium disabled:opacity-50"
              >
                {saving ? "Сохраняем…" : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}