"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetailBuku() {
  const { id } = useParams();
  const [buku, setBuku] = useState(null);

  const getDetail = async () => {
    const res = await fetch(`/api/buku/${id}`);
    const result = await res.json();
    if (result.success) setBuku(result.data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (!buku) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">{buku.judul}</h1>

      <img
        src={`/img/${buku.gambar}`}
        className="w-60 h-80 object-cover rounded"
      />

      <p className="mt-4">Kategori: {buku.nama_kategori}</p>
      <p>Penerbit: {buku.penerbit}</p>
      <p>Pengarang: {buku.pengarang}</p>
      <p>Tahun: {buku.tahun_terbit}</p>
      <p className="mt-2 text-green-600 font-bold">Stok: {buku.stok}</p>

      <button
        className="mt-5 bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => alert("Pinjam API nanti dihubungkan")}
      >
        Pinjam Buku
      </button>
    </div>
  );
}
    