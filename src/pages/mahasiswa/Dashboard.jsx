export default function MahasiswaDashboard() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Pelajar</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Portal Pelajar uCademy untuk mengakses pembelajaran short course.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-bold text-[#1E293B]">Course Saya</h2>
        <p className="mt-3 text-sm text-[#64748B]">
          Course yang diikuti akan tampil di sini.
        </p>
      </section>
    </div>
  );
}
