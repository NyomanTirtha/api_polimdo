const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mengambil semua prodi, termasuk relasi dengan jurusan dan users
exports.getAllProdi = async (req, res) => {
  try {
    const prodis = await prisma.prodi.findMany({
      include: {
        jurusan: true,  // Mengambil data relasi Jurusan
        users: true,    // Mengambil data relasi Users
      },
    });
    res.json(prodis);
  } catch (error) {
    console.error("Error getting all prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Mengambil prodi berdasarkan ID
exports.getProdiById = async (req, res) => {
  try {
    const prodi = await prisma.prodi.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: {
        jurusan: true,  // Mengambil data relasi Jurusan
        users: true,    // Mengambil data relasi Users
      },
    });

    if (!prodi) {
      return res.status(404).json({ error: "Prodi tidak ditemukan" });
    }

    res.json(prodi);
  } catch (error) {
    console.error("Error getting prodi by id:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Membuat prodi baru
exports.createProdi = async (req, res) => {
  try {
    const { nama_prodi, ketua_prodi, jurusanId } = req.body;

    const newProdi = await prisma.prodi.create({
      data: {
        nama_prodi,
        ketua_prodi,
        jurusanId: parseInt(jurusanId, 10),  // Mengaitkan dengan jurusan
      },
    });

    res.status(201).json(newProdi);
  } catch (error) {
    console.error("Error creating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan prodi." });
  }
};

// Memperbarui prodi berdasarkan ID
exports.updateProdi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_prodi, ketua_prodi, jurusanId } = req.body;

    const updatedProdi = await prisma.prodi.update({
      where: { id: parseInt(id, 10) },
      data: {
        nama_prodi,
        ketua_prodi,
        jurusanId: parseInt(jurusanId, 10),  // Memperbarui relasi dengan jurusan
      },
    });

    res.json(updatedProdi);
  } catch (error) {
    console.error("Error updating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui data prodi." });
  }
};

// Menghapus prodi berdasarkan ID
exports.deleteProdi = async (req, res) => {
  try {
    await prisma.prodi.delete({
      where: { id: parseInt(req.params.id, 10) },
    });

    res.json({ message: "Prodi deleted successfully" });
  } catch (error) {
    console.error("Error deleting prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus prodi." });
  }
};
