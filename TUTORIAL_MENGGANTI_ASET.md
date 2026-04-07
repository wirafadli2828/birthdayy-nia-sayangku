# ✨ Panduan Mengganti Foto dan Musik Ulang Tahun ❤️

Website ini dirancang khusus agar mudah disesuaikan dengan kenangan berdua kalian. Ikuti langkah-langkah simpel di bawah ini untuk memasukkan foto dan lagu ke dalam website.

---

## 🎵 1. Cara Mengganti Musik Latar (Background Music)

Website ini sudah diatur agar lagu otomatis terputar secara magis begitu Nia memasukkan kombinasi angka dan menekan tombol *Unlock*.

1. Siapkan lagu romantis pilihan Anda (pastikan formatnya **.mp3**).
2. Ubah nama file lagu tersebut menjadi persis seperti ini: **`music.mp3`** (semua huruf kecil, tanpa spasi).
3. Pindahkan file `music.mp3` tersebut ke dalam folder **`public/`** di dalam proyek ini (`D:\ulangtahun nia sayangku2\public\`).

*Gimana kalau nama file lagu saya berbeda? (Misal: 'lagu-kita.mp3')*
- Kalau Anda tidak mau repot mengganti nama file, Anda bisa mengedit kode pemanggilnya. Buka file `src\app\page.tsx`.
- Cari baris kode berikut (di awal-awal baris):
  ```tsx
  useEffect(() => {
    setAudio(new Audio('/music.mp3'));
  }, []);
  ```
- Ubah tulisan `'/music.mp3'` sesuai dengan nama file Anda, contoh: `'/lagu-kita.mp3'`.

---

## 📸 2. Cara Mengganti Foto di Timeline Kenangan (Memories Timeline)

Di bagian *Memories Timeline*, terdapat 3 kartu kenangan yang akan masuk secara perlahan (animasi menggeser dari luar layar) saat Nia nge-scroll ke bawah.

1. Siapkan 3 foto terbaik kalian (disarankan yang berbentuk kotak atau tegak / *portrait*, agar hasilnya menawan).
2. Ubah nama ketiga foto itu menjadi:
   - **`photo1.jpg`**
   - **`photo2.jpg`**
   - **`photo3.jpg`**
3. Masukkan ketiga foto tersebut ke dalam folder **`public/`**. 
   *(Posisi peletakannya persis di samping folder `src`, atau letakkan bersebelahan di tempat Anda melihat file `INSTRUCTIONS.txt`)*.

---

## 🖋️ 3. Cara Mengubah Kata-Kata & Cerita di Masing-Masing Foto

Selain mengganti foto, tentu ceritanya juga harus sesuai dengan momen aslinya.
1. Buka file **`src\components\Timeline.tsx`**.
2. Anda akan menemukan kode daftar memori ini di bagian atas:
   ```ts
   const memories = [
     {
       id: 1,
       title: "The First Time We Met",
       date: "A special beginning",
       text: "Momen awal yang nggak akan pernah aku lupakan. Senyum kamu waktu itu...",
       image: "/photo1.jpg"
     },
     // ...
   ]
   ```
3. Silakan modifikasi teks di dalam tanda kutip `"..."` pada bagian `title`, `date`, dan `text` sesuai kata-kata Anda sendiri.
4. Jika jenis fotonya `.png` (bukan `.jpg`), Anda bisa mengubah bagian `image: "/photo1.png"` agar cocok.

---

### Selesai! 🎉
Setelah langkah tersebut dilakukan, aset Anda akan terbaca secara otomatis oleh *website*, dan jika di-*deploy* ke **Vercel** atau di*run* dengan **npm run dev**, foto dan lagu spesial kalian akan berkumandang! 
