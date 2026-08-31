const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Tempat menyimpan data user sementara di dalam memori server
let databaseUser = [];

// API untuk Register
app.post('/api/register', (req, res) => {
    const { nama, password } = req.body;

    if (!nama || !password) {
        return res.status(400).json({ sukses: false, pesan: "Nama dan password harus diisi!" });
    }

    const userSudahAda = databaseUser.find(user => user.nama === nama);
    if (userSudahAda) {
        return res.status(400).json({ sukses: false, pesan: "Username sudah terdaftar!" });
    }

    databaseUser.push({ nama: nama, password: password });
    console.log("Database Server Terbaru:", databaseUser);

    return res.json({ sukses: true, pesan: "Data kamu berhasil disimpan di Server Backend!" });
});

// API untuk Login
app.post('/api/login', (req, res) => {
    const { nama, password } = req.body;
    const userDitemukan = databaseUser.find(user => user.nama === nama);

    if (!userDitemukan) {
        return res.status(400).json({ sukses: false, pesan: "Akun belum terdaftar!" });
    }

    if (userDitemukan.password === password) {
        return res.json({ sukses: true, pesan: `Login Berhasil! Selamat datang kembali, ${nama}.` });
    } else {
        return res.status(400).json({ sukses: false, pesan: "Password salah!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server Backend aktif di http://localhost:${PORT}`);
});
