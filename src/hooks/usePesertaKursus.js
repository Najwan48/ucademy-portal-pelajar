import { useEffect, useState } from "react";
import { pesertaKursusService } from "../services/pesertaKursusService";

const emptyData = { diambil: [], tersedia: [] };

const messageFrom = (err) =>
  err.response?.data?.message ||
  "Daftar course belum dapat dimuat. Periksa koneksi lalu coba lagi.";

export const usePesertaKursus = () => {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const result = await pesertaKursusService.getKursus();
        if (active) setData({ ...emptyData, ...(result.data ?? {}) });
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
  }, []);

  return { courses: data, loading, error };
};
