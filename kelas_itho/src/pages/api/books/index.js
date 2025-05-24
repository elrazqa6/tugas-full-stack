const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            try {
                // Mengambil data buku dari backend
                const fetchRes = await fetch(`${BACKEND_URL}/books`);
                const data = await fetchRes.json();
                return res.status(fetchRes.status).json(data);
            } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }

        case 'POST': {
            const { title, author, price, category } = req.body;

            // Validasi inputan
            if (!title || !author || price == null) {
                return res.status(400).json({ message: 'Judul, penulis, dan harga wajib diisi.' });
            }

            try {
                // Mengirim data buku baru ke backend
                const fetchRes = await fetch(`${BACKEND_URL}/books`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, author, price, category }),
                });

                const data = await fetchRes.json();
                return res.status(fetchRes.status).json(data);
            } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }

        default: {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    }
}
