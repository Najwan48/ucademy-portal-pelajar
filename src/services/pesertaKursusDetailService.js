import api from "../config/api";

export const pesertaKursusDetailService = {
  getJadwal: async (idJadwal) => {
    const response = await api.get(`/jadwal-perkuliahan/${idJadwal}`);
    return response.data;
  },

  getSesi: async (idJadwal) => {
    const response = await api.get(`/sesi-pertemuan/jadwal/${idJadwal}`);
    const payload = response.data.data ?? response.data;
    return Array.isArray(payload) ? payload : [];
  },
};
