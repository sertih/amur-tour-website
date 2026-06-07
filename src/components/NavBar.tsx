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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
            <Icon name="Plane" size={16} className="text-white" />
          </div>
          <div className="font-oswald font-bold text-lg tracking-wider leading-none">
            <span className="text-gradient">АВИА НЕКСТ</span>
            <span className="text-white ml-1">ТУР</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm font-medium uppercase tracking-wide transition-colors ${activeSection === item.id ? "text-[#7c3aed] active" : "text-gray-300 hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden glass rounded-lg p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-[#7c3aed] transition-colors py-1"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
