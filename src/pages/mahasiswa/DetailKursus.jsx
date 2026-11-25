import { Link, useParams } from "react-router-dom";
import { CalendarDays, Clock3, UserRound, UsersRound } from "lucide-react";
import { usePesertaKursusDetail } from "../../hooks/usePesertaKursusDetail";

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value) {
  return value ? String(value).substring(0, 5) : "-";
}

export default function DetailKursus() {
  const { idJadwal } = useParams();
  const { detail, sesi, loading, error } = usePesertaKursusDetail(idJadwal);

  if (loading) {
    return (
      <div>
        <Link to="/mahasiswa/kursus" className="text-[13px] font-bold text-[#167A61] hover:underline">
          Kembali ke Short Course
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[#1E293B]">Detail course</h1>
        <p className="mt-1 text-sm text-[#64748B]">Memuat detail course...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="max-w-lg rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <Link to="/mahasiswa/kursus" className="text-[13px] font-bold text-[#167A61] hover:underline">
          Kembali ke Short Course
        </Link>
        <p className="mt-4 text-sm font-bold text-[#1E293B]">Detail course belum dapat dimuat</p>
        <p className="mt-1 text-[13px] text-[#64748B]">
          {error || "Course tidak ditemukan."}
        </p>
      </div>
    );
  }

  const kursus = detail.mata_kuliah ?? {};
  const pengajar = detail.dosen?.nama_lengkap ?? "Tanpa Pengajar";
  const kelas = detail.kelas?.nama_kelas ?? "Kelas";

  return (
    <div className="space-y-6">
      <Link to="/mahasiswa/kursus" className="text-[13px] font-bold text-[#167A61] hover:underline">
        Kembali ke Short Course
      </Link>

      <section className="rounded-2xl border border-gray-100 border-l-4 border-l-[#0E5C46] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#1E293B]">
          {kursus.nama_mk ?? "Course"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B]">
          {kursus.deskripsi ?? "Tidak ada deskripsi tersedia."}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-6 border-t border-gray-100 pt-6 md:grid-cols-4">
          <div>
            <p className="text-xs text-[#64748B]">Jadwal</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#1E293B]">
              <CalendarDays size={15} className="text-[#167A61]" aria-hidden="true" />
              {detail.hari ?? "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#64748B]">Waktu</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#1E293B]">
              <Clock3 size={15} className="text-[#167A61]" aria-hidden="true" />
              {formatTime(detail.waktu_mulai)} - {formatTime(detail.waktu_berakhir)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#64748B]">Pengajar</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#1E293B]">
              <UserRound size={15} className="text-[#167A61]" aria-hidden="true" />
              {pengajar}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#64748B]">Kelas</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#1E293B]">
              <UsersRound size={15} className="text-[#167A61]" aria-hidden="true" />
              {kelas}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-8 py-5">
          <h2 className="text-base font-bold text-[#1E293B]">Sesi pembelajaran</h2>
          <p className="mt-1 text-[13px] text-[#64748B]">
            {sesi.length} sesi terjadwal dalam course ini.
          </p>
        </div>

        {sesi.length === 0 ? (
          <p className="px-8 py-12 text-center text-[13px] text-[#64748B]">
            Belum ada sesi yang dijadwalkan.
          </p>
        ) : (
          <ol className="divide-y divide-gray-100">
            {sesi.map((item, index) => (
              <li key={item.id_sesi} className="flex gap-5 px-8 py-5">
                <span className="mt-0.5 w-8 shrink-0 text-sm font-bold text-[#167A61]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">
                    {item.judul_sesi ?? `Pertemuan ${item.pertemuan_ke}`}
                  </p>
                  <p className="mt-1 text-[13px] text-[#64748B]">
                    {formatDate(item.tanggal_pelaksanaan)} · {formatTime(item.jam_mulai)} - {formatTime(item.jam_berakhir)}
                  </p>
                  {item.materi && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
                      {item.materi}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
