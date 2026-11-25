import { useEffect, useState } from "react";
import { pesertaKursusDetailService } from "../services/pesertaKursusDetailService";

const messageFrom = (err) =>
  err.response?.data?.message ||
  "Detail course belum dapat dimuat. Periksa koneksi lalu coba lagi.";

export const usePesertaKursusDetail = (idJadwal) => {
  const [detail, setDetail] = useState(null);
  const [sesi, setSesi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [jadwal, daftarSesi] = await Promise.all([
          pesertaKursusDetailService.getJadwal(idJadwal),
          pesertaKursusDetailService.getSesi(idJadwal),
        ]);

        if (active) {
          setDetail(jadwal);
          setSesi(daftarSesi);
        }
      } catch (err) {
        if (active) setError(messageFrom(err));
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [idJadwal]);

  return { detail, sesi, loading, error };
};
