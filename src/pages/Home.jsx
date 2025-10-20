import { useEffect, useState } from "react";
import api from "../api/api";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import ProdukModal from "../components/ProdukModal";

function Home() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const getProduk = async () => {
    try {
      const res = await api.get("/");
      setProduk(res.data);
    } catch {
      alert("Gagal memuat data produk");
    }
  };

  useEffect(() => {
    getProduk();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await api.delete(`/${id}`);
      getProduk();
    }
  };

  const filtered = produk.filter(
    (p) =>
      p.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      p.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Daftar Produk</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Cari produk berdasarkan nama/kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
        >
          + Tambah Produk
        </Button>
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.kode_produk}</td>
              <td>{p.nama_produk}</td>
              <td>{p.kategori}</td>
              <td>{p.harga}</td>
              <td>{p.stok}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelected(p);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <ProdukModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        selected={selected}
        refresh={getProduk}
      />
    </div>
  );
}

export default Home;
