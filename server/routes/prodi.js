// Mengimpor Express dan membuat instance router
const express = require("express");
const router = express.Router();

// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const prodiController = require("../controllers/prodiController");
const multer = require("multer");
const upload = multer(); // digunakan untuk body > form-data pada postman

// Mendefinisikan rute-rute untuk API Prodi
router.get("/", prodiController.getAllProdi); // Mengambil semua prodi
router.get("/:id", prodiController.getProdiById); // Mengambil prodi berdasarkan ID
router.post("/", upload.none(), prodiController.createProdi); // Menambahkan prodi baru
router.put("/:id", prodiController.updateProdi); // Memperbarui prodi berdasarkan ID
router.delete("/:id", prodiController.deleteProdi); // Menghapus prodi berdasarkan ID

module.exports = router;
