import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/components/data";

interface NavBarProps {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, menuOpen, setMenuOpen, scrollTo }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(141,216,232,0.75)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8007a, #ff8c00)" }}>
            <Icon name="Plane" size={16} className="text-white" />
          </div>
          <div className="font-oswald font-bold text-lg tracking-wider leading-none">
            <span className="text-gradient">АВИА НЭКСТ</span>
            <span className="ml-1" style={{ color: "#3a0050" }}>ТУР</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm font-medium uppercase tracking-wide transition-colors ${activeSection === item.id ? "active" : ""}`}
              style={{ color: activeSection === item.id ? "#e8007a" : "#4a0060" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden rounded-lg p-2" style={{ background: "rgba(255,255,255,0.3)", color: "#3a0050" }} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3" style={{ background: "rgba(141,216,232,0.9)", borderColor: "rgba(255,255,255,0.4)" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm font-medium uppercase tracking-wide transition-colors py-1"
              style={{ color: "#4a0060" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}