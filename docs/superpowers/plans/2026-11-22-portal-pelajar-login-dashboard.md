# Portal Pelajar Login dan Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membuka akses Pelajar ke u Academy melalui website sampai halaman Dashboard Pelajar.

**Architecture:** Gunakan login API existing dan pola routing/protected route yang sudah dipakai Admin dan Pengajar. Tambah route login Pelajar, route protected `/mahasiswa/dashboard`, layout sederhana Portal Pelajar, dan dashboard awal tanpa perubahan backend.

**Tech Stack:** React 19, React Router 7, Vite, Tailwind CSS, Axios, Laravel Sanctum API existing.

**Spec:** `docs/portal-pelajar-plan.md`

## Global Constraints

- Fokus hanya akses u Academy oleh Pelajar melalui website.
- Backend, database, endpoint API, Admin, Pengajar, Mobile, CBT, gamifikasi, dan sertifikat tidak diubah.
- Gunakan project existing `D:\U-Academy\lms-frontend`.
- Semua perubahan lokal; tidak pull, merge, atau push.
- Gunakan role frontend `mahasiswa` karena backend saat ini mengembalikan role `Mahasiswa` dan `authService` menormalisasinya ke huruf kecil.

## Review Focus

- Role login berhasil diarahkan ke `/mahasiswa/dashboard`, bukan `/dosen/dashboard`.
- Pelajar tanpa token tidak dapat membuka dashboard dan diarahkan ke `/login-pelajar`.
- Admin dan Pengajar tetap memakai route dan login existing.
- Login API gagal tetap menampilkan pesan error existing.
- Dashboard tetap terbuka saat data profil belum tersedia atau API profil gagal.

---

### Task 1: Tambah akses Login Pelajar

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/auth/LoginForm.jsx`
- Modify: `src/schemas/authSchema.js`

**Interfaces:**
- Produces public route `/login-pelajar`.
- Reuses `LoginForm` with `role="mahasiswa"`.
- Reuses `authService.login`; no API change.

- [ ] **Step 1: Tambahkan schema login Pelajar**

  Tambahkan schema yang memvalidasi `identifier` dan `password` dengan aturan
  yang sama seperti login existing. Label Pelajar memakai “Email atau Nomor
  Induk”, bukan NIDN.

- [ ] **Step 2: Ubah `LoginForm` agar label mengikuti role**

  Bedakan tiga kondisi: `admin`, `dosen`, dan `mahasiswa`. Untuk Pelajar,
  tampilkan judul “Login Portal Pelajar”, label identifier “Email atau Nomor
  Induk”, dan tautan menuju Login Admin tanpa mengubah perilaku Admin/Dosen.

- [ ] **Step 3: Tambahkan route `/login-pelajar` di `src/App.jsx`**

  Render `<LoginForm role="mahasiswa" />` di dalam `AuthLayout`.

- [ ] **Step 4: Jalankan build**

  Run: `npm run build`

  Expected: build berhasil tanpa error.

- [ ] **Step 5: Uji manual route**

  Run: `npm run dev`

  Buka `http://localhost:5173/login-pelajar`.

  Expected: halaman menampilkan “Login Portal Pelajar” dan field “Email atau
  Nomor Induk”.

### Task 2: Tambah route protected dan layout Portal Pelajar

**Files:**
- Create: `src/layouts/mahasiswa/DashboardLayout.jsx`
- Create: `src/layouts/mahasiswa/Sidebar.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces protected route `/mahasiswa` with `allowedRole="mahasiswa"`.
- Child route `dashboard` renders `MahasiswaDashboard`.
- Logout reuses `useAuth().logout`.

- [ ] **Step 1: Buat layout Portal Pelajar**

  Gunakan pola `DosenDashboardLayout`: `ProfileProvider`, sidebar, header area,
  dan `<Outlet />`. Buat tampilan sederhana dengan warna serta spacing existing.

- [ ] **Step 2: Buat Sidebar Pelajar**

  Tampilkan brand u Academy, label “Pelajar”, menu “Dashboard”, dan tombol
  logout. Jangan menambahkan menu fitur lain.

- [ ] **Step 3: Tambahkan protected route di `src/App.jsx`**

  Tambahkan import layout dan dashboard. Route harus memakai:

  ```jsx
  <ProtectedRoute allowedRole="mahasiswa">
  ```

  Child route harus berada di path `dashboard`.

- [ ] **Step 4: Jalankan build**

  Run: `npm run build`

  Expected: build berhasil tanpa error.

### Task 3: Buat Dashboard Pelajar awal

**Files:**
- Create: `src/pages/mahasiswa/Dashboard.jsx`
- Create: `src/layouts/mahasiswa/Header.jsx`

**Interfaces:**
- Dashboard renders heading “Dashboard Pelajar”.
- Header reads optional user data through `useProfile()`.
- No new API call; profile data uses existing `ProfileProvider`.

- [ ] **Step 1: Buat header Pelajar**

  Tampilkan sapaan dan nama user jika tersedia. Jika belum tersedia, tampilkan
  fallback yang tidak menyebabkan error.

- [ ] **Step 2: Buat dashboard minimum**

  Tampilkan heading “Dashboard Pelajar”, teks “Portal Pelajar u Academy”, satu
  card “Course Saya”, dan pesan kosong yang jelas. Jangan membuat daftar course
  palsu atau menambah API baru.

- [ ] **Step 3: Jalankan build**

  Run: `npm run build`

  Expected: build berhasil tanpa error.

- [ ] **Step 4: Uji manual alur tanpa API**

  Dengan membuka `/mahasiswa/dashboard` tanpa token, browser harus diarahkan ke
  `/login-pelajar`.

- [ ] **Step 5: Uji manual alur dengan akun Pelajar**

  Login memakai akun Pelajar yang tersedia di lingkungan lokal.

  Expected: setelah login, URL menjadi `/mahasiswa/dashboard`, dashboard tampil,
  dan tombol logout menghapus sesi lalu kembali ke `/login-pelajar`.

### Task 4: Verifikasi batas perubahan

**Files:**
- No production file changes.

- [ ] **Step 1: Jalankan lint**

  Run: `npm run lint`

  Expected: tidak ada error baru dari file Portal Pelajar.

- [ ] **Step 2: Periksa status Git**

  Run: `git status --short --branch`

  Expected: hanya perubahan lokal pada frontend dan dokumen rencana; tidak ada
  perubahan pada backend.

- [ ] **Step 3: Catat hasil progres**

  Simpan screenshot login Pelajar dan dashboard untuk bahan diskusi dengan dosen.
