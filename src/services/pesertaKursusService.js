import api from "../config/api";

export const pesertaKursusService = {
  getKursus: async () => {
    const response = await api.get("/mahasiswa/mata-kuliah");
    return response.data;
  },
};
