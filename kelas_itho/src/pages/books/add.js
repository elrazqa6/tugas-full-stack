import { useState } from 'react';
import { useRouter } from "next/router";
import { createBook } from "../../../lib/api/books";
import BookForm from "../../components/BookForm";

export default function AddBook() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // const handleSubmit = async (formData) => {
    //     setError(null);
    //     setLoading(true);
    //     try {
    //         const { title, author, price, category } = formData;
    //         await createBook(title, author, price, category);
    //         router.push("/books");
    //     } catch (err) {
    //         setError(err.message || 'Terjadi kesalahan.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Add New Book</h1>
            <BookForm />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

const containerStyle = {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333'
};
