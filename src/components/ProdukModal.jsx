import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/api";

function ProdukModal({ show, handleClose, selected, refresh }) {
  const [produk, setProduk] = useState({
    kode_produk: "",
    nama_produk: "",
    kategori: "",
    harga: "",
    stok: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (selected) setProduk(selected);
    else
      setProduk({
        kode_produk: "",
        nama_produk: "",
        kategori: "",
        harga: "",
        stok: "",
        deskripsi: "",
      });
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduk({
      ...produk,
      [name]: name === "harga" || name === "stok" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await api.put(`/${selected.id}`, produk);
        alert("Produk berhasil diperbarui!");
      } else {
        await api.post("/", produk);
        alert("Produk berhasil ditambahkan!");
      }
      handleClose();
      refresh();
    } catch (err) {
      alert("Gagal menyimpan produk. Periksa input atau server backend.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selected ? "Edit Produk" : "Tambah Produk Baru"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Kode Produk</Form.Label>
            <Form.Control
              name="kode_produk"
              value={produk.kode_produk}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              name="nama_produk"
              value={produk.nama_produk}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Kategori</Form.Label>
            <Form.Control
              name="kategori"
              value={produk.kategori}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="number"
              name="harga"
              value={produk.harga}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              name="stok"
              value={produk.stok}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="deskripsi"
              value={produk.deskripsi}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProdukModal;
