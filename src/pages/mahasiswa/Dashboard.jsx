import { AlertCircle, BookOpen, CalendarDays, RefreshCw } from "lucide-react";
import { usePesertaDashboard } from "../../hooks/usePesertaDashboard";

function ProgressRing({ value }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const filled = (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#E5EDE9" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#0E5C46"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#0E5C46]">{value}%</span>
        <span className="text-[11px] font-semibold text-[#64748B]">selesai</span>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2EE] text-[#167A61]">
        <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p className="text-sm font-bold text-[#1E293B]">{title}</p>
      <p className="mt-1 max-w-[280px] text-[13px] leading-relaxed text-[#64748B]">
        {description}
      </p>
    </div>
  );
}

export default function MahasiswaDashboard() {
  const { dashboard, loading, error, refetch } = usePesertaDashboard();

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Pelajar</h1>
          <p className="mt-1 text-sm text-[#64748B]">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 shrink-0 text-red-500" size={20} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold text-[#1E293B]">Dashboard belum dapat dimuat</p>
            <p className="mt-1 text-[13px] text-[#64748B]">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0E5C46] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#0A4736] focus:outline-none focus:ring-2 focus:ring-[#167A61] focus:ring-offset-2"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Coba lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { user, progress, jadwal_hari_ini: jadwal, materi_terbaru: materi } = dashboard;

  return (
    <div className="space-y-7">
      <section>
        <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Pelajar</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Portal Pelajar u Academy untuk mengakses pembelajaran short course.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 px-7 py-5">
              <CalendarDays size={17} className="text-[#167A61]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#1E293B]">Jadwal hari ini</h2>
            </div>

            {jadwal.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="Belum ada jadwal hari ini"
                description="Sesi yang dijadwalkan hari ini akan muncul di sini."
              />
            ) : (
              <ul className="divide-y divide-gray-100">
                {jadwal.map((item) => (
                  <li key={item.id} className="px-7 py-5">
                    <p className="text-sm font-bold text-[#1E293B]">{item.title}</p>
                    <p className="mt-1 text-[13px] text-[#64748B]">
                      {item.pertemuan} · {item.time} · {item.lecturer}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 px-7 py-5">
              <BookOpen size={17} className="text-[#167A61]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#1E293B]">Materi terbaru</h2>
            </div>

            {materi.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="Belum ada materi"
                description="Materi dari course yang kamu ikuti akan muncul di sini."
              />
            ) : (
              <ul className="divide-y divide-gray-100">
                {materi.map((item) => (
                  <li key={item.id} className="px-7 py-5">
                    <p className="text-sm font-bold text-[#1E293B]">{item.judul}</p>
                    <p className="mt-1 text-[13px] text-[#64748B]">{item.course ?? "Kursus"}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 border-l-4 border-l-[#0E5C46] bg-white p-7 shadow-sm">
            <h2 className="text-base font-bold text-[#1E293B]">Progres belajar</h2>
            <p className="mt-1 text-[13px] text-[#64748B]">
              {user.nama_lengkap || "Pelajar"} telah menyelesaikan {progress.completed_modules} modul.
            </p>
            <div className="mt-6 flex justify-center">
              <ProgressRing value={progress.percentage} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
            <h2 className="text-base font-bold text-[#1E293B]">Course saya</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#64748B]">
              {dashboard.diambil?.length
                ? `${dashboard.diambil.length} course sedang diikuti.`
                : "Belum ada course yang diikuti. Course yang tersedia bisa dilihat dari katalog."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
