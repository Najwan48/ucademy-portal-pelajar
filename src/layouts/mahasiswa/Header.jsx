import { useLocation } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function Header() {
  const location = useLocation();
  const { user } = useProfile();
  const fullName = user?.nama_lengkap || user?.name || "";
  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "P";

  const titles = {
    "/mahasiswa/dashboard": "Dashboard Pelajar",
    "/mahasiswa/kursus": "Short Course",
  };

  const title = titles[location.pathname] ?? "Portal Pelajar";

  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="mb-0.5 text-sm font-semibold text-[#64748B]">
          Assalamu&apos;alaikum{fullName ? `, ${fullName}` : "."}
        </p>
        <h2 className="text-3xl font-bold leading-tight text-[#1E293B]">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2.5 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm">
        <div className="text-right">
          <p className="text-sm font-bold leading-none text-[#1E293B]">
            Pelajar
          </p>
          <p className="mt-0.5 text-xs text-[#64748B]">
            {fullName || "Memuat..."}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#167A61] to-[#0E5C46] text-base text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}
