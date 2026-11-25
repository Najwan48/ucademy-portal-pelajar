# Draft Perencanaan Akses Pelajar u Academy melalui Website

Status: draft, menunggu arahan dosen
Tanggal: 22 November 2026

## 1. Fokus Skripsi

Membuat sistem u Academy dapat diakses oleh Pelajar melalui website.

Skripsi berfokus pada sisi akses dan pengalaman Pelajar, bukan pengembangan
seluruh role atau seluruh platform u Academy.

Pengerjaan utama berada di project frontend:

```text
D:\U-Academy\lms-frontend
```

Backend Laravel tetap digunakan sebagai sumber API existing. Perubahan backend,
struktur database, dan penamaan endpoint belum dilakukan sebelum dikonfirmasi
dengan dosen.

## 2. Tujuan

- Menyediakan akses website untuk Pelajar.
- Memudahkan Pelajar masuk ke sistem u Academy.
- Memudahkan Pelajar mengakses course yang diikuti.
- Menampilkan pembelajaran Pelajar melalui satu portal website.

## 3. Ruang Lingkup Awal

### Fitur akses Pelajar

1. Login Pelajar.
2. Dashboard Pelajar.
3. Melihat short course.
4. Melihat detail course.
5. Mengakses course yang diikuti.
6. Melihat sesi pembelajaran.
7. Mengakses materi pembelajaran.
8. Melihat progres belajar.

### Di luar scope

- Portal Admin.
- Portal Pengajar.
- Mobile Apps.
- Pengembangan atau perubahan CBT.
- Gamifikasi evaluasi Pengajar.
- Pengembangan atau perubahan sertifikat.
- Perubahan backend/API sebelum ada arahan dosen.
- Perombakan seluruh sistem u Academy.

Tugas, presensi, forum, nilai, notifikasi, dan profil hanya dikerjakan jika
terbukti diperlukan agar Pelajar dapat mengakses sistem dan sesuai arahan
dosen.

## 4. Alur Akses Pelajar

```text
Pelajar membuka website
    -> Login
    -> Dashboard Pelajar
    -> Memilih course
    -> Membuka sesi pembelajaran
    -> Mengakses materi
    -> Melihat progres belajar
```

## 5. Rencana Halaman Website Pelajar

| Halaman | Prioritas | Keterangan |
|---|---:|---|
| Login Pelajar | 1 | Akses masuk berdasarkan role Pelajar |
| Dashboard Pelajar | 1 | Ringkasan course dan progres |
| Daftar Short Course | 1 | Memilih course yang ingin diakses |
| Detail Short Course | 1 | Melihat informasi course |
| Detail Sesi/Materi | 1 | Mengakses pembelajaran |
| Progres Belajar | 1 | Melihat perkembangan belajar |

## 6. Kondisi Repository Saat Ini

- Backend sudah memiliki refactor short course terbaru.
- Frontend sudah memiliki refactor UI dan penamaan ke sistem kursus.
- Frontend belum memiliki halaman Portal Pelajar khusus.
- API Pelajar sudah memiliki endpoint dashboard, kursus, jadwal, progres,
  enrollment, dan materi.
- Sebagian endpoint, relasi, dan nama variabel masih memakai istilah LMS lama.

## 7. Keputusan yang Perlu Ditanyakan ke Dosen

1. Apakah backend/API perlu dirapikan seluruhnya ke istilah short course?
2. Atau cukup API yang digunakan Portal Pelajar?
3. Istilah resmi yang digunakan dalam skripsi: Pelajar atau Peserta?
4. Apakah role backend tetap `Mahasiswa` atau perlu diubah?
5. Fitur apa yang wajib ada saat demo?
6. Apakah tugas, presensi, forum, dan nilai masuk scope utama?
7. Apakah enrollment dilakukan melalui token, daftar course, atau mekanisme lain?

## 8. Target Progres Minggu Ini

- Fokus skripsi sudah ditetapkan: akses u Academy oleh Pelajar melalui website.
- Alur akses Pelajar sudah dirancang.
- Daftar halaman website Pelajar sudah dibuat.
- Kondisi backend/API sudah dicatat tanpa mengubah kode.
- Pertanyaan teknis untuk dosen sudah disiapkan.

## 9. Batasan Pengerjaan Sementara

- Semua pengerjaan dilakukan lokal.
- Tidak melakukan push ke GitHub.
- Tidak melakukan perubahan backend sebelum ada arahan dosen.
- Tidak melakukan rename endpoint atau tabel untuk sementara.
