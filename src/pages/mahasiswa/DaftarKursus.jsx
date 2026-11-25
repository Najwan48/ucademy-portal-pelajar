import { useState } from "react";
import { BookOpen, Clock3, UserRound } from "lucide-react";
import { usePesertaKursus } from "../../hooks/usePesertaKursus";

function CourseRow({ course }) {
  const initials = course.title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <li className="flex gap-5 border-b border-gray-100 px-7 py-6 last:border-b-0">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#EAF2EE] text-lg font-bold text-[#0E5C46]">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-[#1E293B]">{course.title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-[#64748B]">
          {course.deskripsi}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#64748B]">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="text-[#167A61]" aria-hidden="true" />
            {course.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserRound size={14} className="text-[#167A61]" aria-hidden="true" />
            {course.dosen}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={14} className="text-[#167A61]" aria-hidden="true" />
            {course.type}
          </span>
        </div>
      </div>
    </li>
  );
}

export default function DaftarKursus() {
  const { courses, loading, error } = usePesertaKursus();
  const [tab, setTab] = useState("tersedia");

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">Short Course</h1>
        <p className="mt-1 text-sm text-[#64748B]">Memuat daftar course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <p className="text-sm font-bold text-[#1E293B]">Daftar course belum dapat dimuat</p>
        <p className="mt-1 text-[13px] text-[#64748B]">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-[#0E5C46] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#0A4736] focus:outline-none focus:ring-2 focus:ring-[#167A61] focus:ring-offset-2"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  const active = tab === "diambil" ? courses.diambil : courses.tersedia;

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-[#1E293B]">Short Course</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Pilih course yang ingin kamu ikuti.
        </p>
      </section>

      <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1">
        {[
          { key: "tersedia", label: "Tersedia", count: courses.tersedia.length },
          { key: "diambil", label: "Saya Ikuti", count: courses.diambil.length },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            aria-pressed={tab === item.key}
            className={`rounded-lg px-4 py-2 text-[13px] font-bold transition ${
              tab === item.key
                ? "bg-[#0E5C46] text-white"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {active.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2EE] text-[#167A61]">
              <BookOpen size={18} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-[#1E293B]">
              {tab === "diambil" ? "Belum ada course yang diikuti" : "Belum ada course tersedia"}
            </p>
            <p className="mt-1 max-w-[300px] text-[13px] leading-relaxed text-[#64748B]">
              {tab === "diambil"
                ? "Course yang kamu daftari akan muncul di sini."
                : "Course baru akan muncul setelah dibuka oleh pengelola."}
            </p>
          </div>
        ) : (
          <ul>
            {active.map((course) => (
              <CourseRow key={course.id} course={course} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
