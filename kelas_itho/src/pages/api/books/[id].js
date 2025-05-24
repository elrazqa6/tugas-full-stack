// /pages/api/books/[id].js atau /api/books/index.js
const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case 'GET': {
      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`);
        const data = await fetchRes.json();
        return res.status(fetchRes.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }

    case 'POST': {
      const { title, author, price, category } = body;
      try {
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

    case 'PUT': {
      const { title, author, price, category } = body;
      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author, price, category }),
        });
        const data = await fetchRes.json();
        return res.status(fetchRes.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }

    case 'DELETE': {
      try {
        const fetchRes = await fetch(`${BACKEND_URL}/books/${id}`, {
          method: 'DELETE',
        });
        if (fetchRes.status === 204) {
          return res.status(204).end();
        }
        const data = await fetchRes.json();
        return res.status(fetchRes.status).json(data);
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
}
