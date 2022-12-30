# bookshelfApi
submission dicoding bookshelf API Backend<br>
Untuk menjalankan project ini, pastikan `npm` sudah terinstall pada komputer/laptop Anda.
---
Tata cara menjalankan project:

1. Install node modules

```
npm install
```

2. Jalankan project

```
npm run start
```

Fitur :<BR>
<h3>(+)Fitur query parameters pada route GET /books (Mendapatkan seluruh buku).</h3>
- name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. Contoh /books?name=”dicoding”, maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive  (tidak peduli besar dan kecil huruf).<br>
- reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.<br>
- finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.<br>
<h3>(+)Menerapkan CORS pada seluruh resource yang ada.<br>
(+)Menggunakan ESLint dan salah satu style guide agar gaya penulisan kode JavaScript lebih konsisten.</h3>
