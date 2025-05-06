// Mengimpor Express dan membuat instance router
const express = require("express");
const router = express.Router();

// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const jurusanController = require("../controllers/jurusanController");
const multer = require("multer");
const upload = multer(); // digunakan untuk body > form-data pada postman

// Mendefinisikan rute-rute untuk API jurusan
router.get("/", jurusanController.getAllJurusan); // Mengambil semua jurusan
router.get("/:id", jurusanController.getJurusanById); // Mengambil jurusan berdasarkan ID
router.post("/", upload.none(), jurusanController.createJurusan); // Menambahkan jurusan baru
router.put("/:id", jurusanController.updateJurusan); // Memperbarui jurusan berdasarkan ID
router.delete("/:id", jurusanController.deleteJurusan); // Menghapus jurusan berdasarkan ID

module.exports = router;
