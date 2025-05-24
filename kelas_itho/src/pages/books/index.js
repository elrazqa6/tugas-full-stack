import { useEffect, useState } from "react";
import Link from 'next/link';
import { getBooks, deleteBook as apiDeleteBook } from '../../../lib/api/books';

export default function Booklist() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('default');
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const deleteBook = async (id, title) => {
    const confirmDelete = window.confirm(`Apakah kamu yakin ingin menghapus buku "${title}"?`);
    if (!confirmDelete) return;

    try {
      await apiDeleteBook(id);
      setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('ALL');
    setSortOption('default');
  };

  const filteredBooks = books.filter(book => {
    const matchTitle = book.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'ALL' || book.category === category.toLowerCase();
    return matchTitle && matchCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === 'a-z') return a.title.localeCompare(b.title);
    if (sortOption === 'z-a') return b.title.localeCompare(a.title);
    if (sortOption === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#333' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0070f3', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>SES PLUS Project</h2>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Book List XI SIJA 2</h1>
      </div>

      {/* Content Section */}
      <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Filter Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>FILTER</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              margin: '1rem auto',
              display: 'block',
              fontWeight: 500,
              color: '#0070f3'
            }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <>
              {/* Search */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>SEARCH</h4>
                <input
                  type="text"
                  placeholder="Search book title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    width: '100%',
                    maxWidth: '400px'
                  }}
                />
              </div>

              {/* Category */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>CATEGORY</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['ALL', 'Fiksi', 'Nonfiksi', 'Novel', 'Biografi', 'Pendidikan'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        backgroundColor: category === cat ? '#0070f3' : 'white',
                        color: category === cat ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>SORT BY</h4>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    minWidth: '200px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="default">Default</option>
                  <option value="a-z">Title (A-Z)</option>
                  <option value="z-a">Title (Z-A)</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: '0.85rem'
                }}
              >
                RESET FILTERS
              </button>
            </>
          )}
        </div>

        {/* Book List Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>📚 Book List</h2>
          <Link href="/books/add" style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '0.6rem 1rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Add Books
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : sortedBooks.length === 0 ? (
          <p style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '6px' }}>
            No books found matching your criteria.
          </p>
        ) : (
          <>
            <p style={{ marginBottom: '1rem' }}><strong>Total Books: {sortedBooks.length}</strong></p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                border: '1px solid #e1e1e1',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <thead style={{ backgroundColor: '#f1f3f5' }}>
                  <tr>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Author</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBooks.map(book => (
                    <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>{book.title}</td>
                      <td style={tdStyle}>{book.author}</td>
                      <td style={tdStyle}>{book.category}</td>
                      <td style={tdStyle}>Rp {Number(book.price).toLocaleString('id-ID')}</td>
                      <td style={tdStyle}>
                        <Link href={`/books/${book.id}`} style={linkButton}>Edit</Link>
                        <button
                          onClick={() => deleteBook(book.id, book.title)}
                          style={deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: '0.75rem',
  textAlign: 'left',
  fontWeight: '600',
  color: '#333',
  borderBottom: '1px solid #ccc'
};

const tdStyle = {
  padding: '0.75rem',
  color: '#333'
};

const linkButton = {
  marginRight: '0.5rem',
  textDecoration: 'none',
  padding: '0.3rem 0.6rem',
  backgroundColor: '#0070f3',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.85rem'
};

const deleteButton = {
  background: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};
