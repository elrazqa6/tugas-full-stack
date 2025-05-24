import { useState, useEffect } from "react";
import { createBook } from "../../lib/api/books";
import { useRouter } from "next/router";

export default function BookForm({ initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [similarTitles, setSimilarTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setAuthor(initialData.author || "");
      setPrice(initialData.price || "");
      setCategory(initialData.category || "");
    }
  }, [initialData]);

  useEffect(() => {
    const allTitles = ["Laskar Pelangi", "Negeri 5 Menara", "Ayat-Ayat Cinta", "Bumi", "Sang Pemimpi"];
    if (title.length > 2) {
      const filtered = allTitles.filter(t =>
        t.toLowerCase().includes(title.toLowerCase()) && t.toLowerCase() !== title.toLowerCase()
      );
      setSimilarTitles(filtered);
    } else {
      setSimilarTitles([]);
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createBook(title, author, price, category);
      router.push("/books");
    } catch (err) {
      console.error("Error saat createBook:", err);
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        padding: '2rem',
        maxWidth: '500px',
        margin: '2rem auto',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
      }}
    >
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600', color: '#0056b3' }}>
        📘 Form Buku
      </h2>

      {error && <p style={{ color: 'darkred', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="title" style={labelStyle}>Judul:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Laskar Pelangi"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="author" style={labelStyle}>Penulis:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Contoh: Andrea Hirata"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="price" style={labelStyle}>Harga (Rp):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Contoh: 75000"
          min={1}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category" style={labelStyle}>Kategori:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">-- Pilih Kategori --</option>
          <option value="fiksi">Fiksi</option>
          <option value="nonfiksi">Non-Fiksi</option>
          <option value="novel">Novel</option>
          <option value="biografi">Biografi</option>
          <option value="pendidikan">Pendidikan</option>
        </select>
      </div>

      {similarTitles.length > 0 && (
        <div style={{ marginBottom: '1rem', color: '#444' }}>
          <p><strong>🔍 Judul mirip ditemukan:</strong></p>
          <ul style={{ paddingLeft: '1rem' }}>
            {similarTitles.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={previewStyle}>
        <strong>📋 Preview:</strong><br />
        <em>{title || "Judul buku belum diisi"}</em> oleh <em>{author || "Penulis belum diisi"}</em><br />
        Kategori: <em>{category || "Belum dipilih"}</em><br />
        Harga: <em>{price ? `Rp ${Number(price).toLocaleString('id-ID')}` : "Belum diisi"}</em><br />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? '#888' : '#0056b3',
          color: 'white',
          padding: '0.6rem 1.2rem',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background 0.2s ease-in-out',
          fontSize: '1rem',
        }}
      >
        {loading ? '⏳ Mengirim...' : 'Submit'}
      </button>
    </form>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  marginTop: '0.25rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  color: '#333',
  fontSize: '1rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#333',
};

const previewStyle = {
  marginBottom: '1rem',
  background: '#f1f3f5',
  padding: '1rem',
  borderRadius: '6px',
  color: '#333',
};
