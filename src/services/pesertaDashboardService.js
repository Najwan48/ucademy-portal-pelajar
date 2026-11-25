import api from "../config/api";

export const pesertaDashboardService = {
  getDashboard: async () => {
    const response = await api.get("/mahasiswa/dashboard");
    return response.data;
  },
};
