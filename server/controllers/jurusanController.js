const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mengambil semua jurusan, termasuk relasi dengan users dan prodis
exports.getAllJurusan = async (req, res) => {
  try {
    const jurusans = await prisma.jurusan.findMany({
      include: {
        users: true, // Mengambil data relasi User
        prodis: true, // Mengambil data relasi Prodi
      },
    });
    res.json(jurusans);
  } catch (error) {
    console.error("Error getting all jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data jurusan." });
  }
};

// Mengambil jurusan berdasarkan ID, termasuk relasi dengan users dan prodis
exports.getJurusanById = async (req, res) => {
  try {
    const jurusan = await prisma.jurusan.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: {
        users: true, // Mengambil data relasi User
        prodis: true, // Mengambil data relasi Prodi
      },
    });

    if (!jurusan) {
      return res.status(404).json({ error: "Jurusan tidak ditemukan" });
    }

    res.json(jurusan);
  } catch (error) {
    console.error("Error getting jurusan by id:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data jurusan." });
  }
};

// Membuat jurusan baru (tidak ada perubahan pada relasi)
exports.createJurusan = async (req, res) => {
  try {
    const { nama_jurusan, ketua_jurusan } = req.body;

    const newJurusan = await prisma.jurusan.create({
      data: {
        nama_jurusan,
        ketua_jurusan,
      },
    });

    res.status(201).json(newJurusan);
  } catch (error) {
    console.error("Error creating jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan jurusan." });
  }
};

// Memperbarui jurusan berdasarkan ID
exports.updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_jurusan, ketua_jurusan } = req.body;

    const updatedJurusan = await prisma.jurusan.update({
      where: { id: parseInt(id, 10) },
      data: {
        nama_jurusan,
        ketua_jurusan,
      },
    });

    res.json(updatedJurusan);
  } catch (error) {
    console.error("Error updating jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui data jurusan." });
  }
};

// Menghapus jurusan berdasarkan ID
exports.deleteJurusan = async (req, res) => {
  try {
    await prisma.jurusan.delete({
      where: { id: parseInt(req.params.id, 10) },
    });

    res.json({ message: "Jurusan deleted successfully" });
  } catch (error) {
    console.error("Error deleting jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus jurusan." });
  }
};
