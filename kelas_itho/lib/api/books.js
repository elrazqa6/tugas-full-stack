export async function getBooks() {
    const res = await fetch('/api/books');
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
}

export async function getBook(id) {
    const res = await fetch(`/api/books/${id}`);
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
}

export async function createBook(title, author, price, category) {
    const res = await fetch('/api/books', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, author, price, category }),
    })
    if (!res.ok) throw new Error('Failed to create book')
    return res.json()
}

export async function updateBook(id, title, author, price, category) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, author, price, category }),
    })
    if (!res.ok) throw new Error('Failed to update book')
    return res.json()
}

export async function deleteBook(id) {
    const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete book')
    return res.json()
}