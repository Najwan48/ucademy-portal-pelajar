import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ProfileProvider } from "../../hooks/useProfile";

export default function MahasiswaDashboardLayout() {
  return (
    <ProfileProvider>
      <div className="flex h-screen overflow-hidden bg-[#F0F4F3]">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="px-10 pb-9 pt-8">
            <Header />
          </div>

          <main className="flex-1 overflow-y-auto px-10 pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}
