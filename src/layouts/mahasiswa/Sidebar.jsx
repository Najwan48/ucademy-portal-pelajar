import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LogoutPopup from "../../components/ui/LogoutPopup";
import bgAside from "../../assets/images/bg-aside.svg";

const menuItems = [
  { name: "Dashboard", path: "/mahasiswa/dashboard" },
  { name: "Short Course", path: "/mahasiswa/kursus" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <LogoutPopup
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />

      <aside className="relative flex h-full w-[260px] flex-shrink-0 flex-col overflow-hidden bg-gradient-to-r from-[#167A61] to-[#0E5C46] px-5 py-8 text-white">
        <div className="mb-6 px-2">
          <h1 className="text-3xl font-black tracking-tight">u-Cademy</h1>
          <p className="mt-[2px] text-sm font-normal uppercase text-[#FCEEA7]">
            Pelajar
          </p>
        </div>

        <hr className="mb-6 border-white/10" />

        <nav className="flex flex-1 flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full rounded-lg px-4 py-3 text-left text-[15px] transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-white font-semibold text-[#0E5C46] shadow-sm"
                  : "font-normal text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="relative -mx-5 -mb-8 flex h-[240px] items-end px-5 pb-8">
          <img
            src={bgAside}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-full w-full select-none object-cover object-bottom"
          />
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="relative z-10 w-full rounded-lg border border-red-500/30 bg-red-500/10 py-3 text-[15px] text-[#FECDD3] transition-all hover:border-red-500/40 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
