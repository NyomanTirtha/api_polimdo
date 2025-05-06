//

import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    kode: "",
    nama: "",
    no_telp: "",
    jurusanId: 1,
    prodiId: 1,
  });

  const fetchUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        console.log("Data yang diterima: ", res.data);
        setUsers(res.data)
      })
      .catch((err) => console.error("Gagal mengambil data user:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      // Create
      axios.post("/users", form).then(() => {
        fetchUsers();
        resetForm();
      });
    } else {
      // Update
      axios.put(`/users/${form.id}`, form).then(() => {
        fetchUsers();
        resetForm();
      });
    }
  };

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      axios.delete(`/users/${id}`).then(() => fetchUsers());
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      kode: "",
      nama: "",
      no_telp: "",
      jurusanId: 1,
      prodiId: 1,
    });
  };

  return (
    <div>
      <h2>📄 Daftar User</h2>
      {/* kode, nama, no_telp, jurusanId, prodiId */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input name="kode" value={form.kode} onChange={handleChange} placeholder="Kode" required />
        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" required />
        <input name="no_telp" value={form.no_telp} onChange={handleChange} placeholder="No Telp" required />
        <input name="jurusanId" value={form.jurusanId} onChange={handleChange} placeholder="Jurusan ID" />
        <input name="prodiId" value={form.prodiId} onChange={handleChange} placeholder="Prodi ID" />
        <button type="submit">{form.id === null ? "Tambah" : "Update"}</button>
        {form.id !== null && (
          <button type="button" onClick={resetForm}>
            Batal
          </button>
        )}
        {/* ini menggunakan short circuit evaluation
         kalau form id tak null maka akan tertulis batal pada button*/}
      </form>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kode</th>
            <th>Nama</th>
            <th>No Telp</th>
            <th>Jurusan</th>
            <th>Prodi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.kode}</td>
              <td>{user.nama}</td>
              <td>{user.no_telp}</td>
              <td>{user.jurusan?.nama_jurusan}</td>
              {/* user.jurusan?.nama_jurusan  artinya kalau nama_jurusan null program tak akan error akan tertulis undefined */}
              <td>{user.prodi?.nama_prodi}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={{ color: "red" }}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
