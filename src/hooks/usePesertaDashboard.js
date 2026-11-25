import { useCallback, useEffect, useState } from "react";
import { pesertaDashboardService } from "../services/pesertaDashboardService";

const emptyDashboard = {
  user: { nama_lengkap: "", foto_profil: null },
  progress: { percentage: 0, completed_modules: 0 },
  jadwal_hari_ini: [],
  materi_terbaru: [],
  unread_notif: 0,
};

const messageFrom = (err) =>
  err.response?.data?.message ||
  "Dashboard belum dapat dimuat. Periksa koneksi lalu coba lagi.";

export const usePesertaDashboard = () => {
  const [data, setData] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const result = await pesertaDashboardService.getDashboard();
        if (active) setData({ ...emptyDashboard, ...(result.data ?? {}) });
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

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await pesertaDashboardService.getDashboard();
      setData({ ...emptyDashboard, ...(result.data ?? {}) });
    } catch (err) {
      setError(messageFrom(err));
    } finally {
      setLoading(false);
    }
  }, []);

  return { dashboard: data, loading, error, refetch };
};
