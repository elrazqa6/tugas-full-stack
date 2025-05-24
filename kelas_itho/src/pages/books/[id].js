import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookForm from '../../components/BookForm';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.category) {
            data.category = ""; 
          }
          setBook(data);
        });
    }
  }, [id]);

  const updateBook = async (updatedData) => {
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    router.push('/books');
  };

  if (!book) return <p>⏳ Memuat data buku...</p>;

  return <BookForm initialData={book} onSubmit={updateBook} />;
}
