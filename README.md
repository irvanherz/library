# README

Library API adalah sebuah Application Programming Interfaces (APIs) backend berbasis MVC yang didesain secara terstruktur. Aplikasi ini dikembangkan untuk mejembatani integrasi antara aplikasi perpustakaan dengan databasenya.


## Cara Pemakaian
Sebelum memulai menggunakan library API, clone source code ke folder, lalu dilanjutkan dengan menginstall dependensi package yang diperlukan.
```sh
$ git clone https://github.com/irvanherz/library.git
$ cd library
$ yarn install
```
Library API server menggunakan MySQL untuk dapat berjalan. Sehingga pastikan sebelum menjalankan, MySQL sudah terinstal dan berjalan service-nya. 

Jangan lupa juga untuk mengimpor skema dasar database yang sudah di sediakan pada source tree (`library.sql`). Selain itu, Anda juga perlu mengubah konfigurasi database dari file `.env` yang bisa ditemukan di folder root. Contoh konfigurasinya sebagai berikut.
```
HOST=127.0.0.1
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=toor
DB_NAME=library
```

Setelahnya API server dapat segera dijalankan dengan *yarn*.
```
$ yarn start
```
## Struktur Folder
Direktori :
  - `/src/routes/`: berisi kode untuk menangani routing berdasarkan url dan request.
  - `/src/controller/`: berisi kode controller yang menjadi jembatan antara request dan model.
  - `/src/model`: berisi kode untuk abstraksi akses database
  - `/src/middleware/`: berisi kode middleware, kebanyakan untuk filtering dan validasi.
  - `/src/helper/`: berisi kode helper untuk membantu jalannya aplikasi.

## Dokumentasi API
[Lihat Dokumentasi](https://documenter.getpostman.com/view/10136401/SzS2x8Yj?version=latest)
