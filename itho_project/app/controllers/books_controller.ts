import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

import { createBookValidator, updateBookValidator, deleteBookValidator } from '#validators/create_book'

export default class BooksController {
    public async index({ response }: HttpContext) {
        const books = await Book.all();
        return response.ok(books);
    }
    public async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createBookValidator)
        //const data = request.only(['title', 'author']);
        const books = await Book.create(payload);
        return response.created({ massage: 'Buku Berhasil Ditambahkan', books })
    }


    public async show({ params, response }: HttpContext) {
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'Buku Tidak Ditemukan' });

        }
        return response.ok(books);
    }

    public async update({ params, request, response }: HttpContext) {
        const books = await Book.find(params.id)
        const data = await request.validateUsing(updateBookValidator)
        if (!books) {
            return response.notFound({ message: 'Buku Tidak Ditemukan' })
        }
        books.merge(data);
        await books.save();
        return response.ok({ message: 'Buku Berhasil Diubah', books })
    }

    public async destroy({ request, response }: HttpContext) {
        const { params } = await request.validateUsing(deleteBookValidator)
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'Buku Tidak Ditemukan' });
        }

        await books.delete()
        return response.ok({ message: 'Buku Berhasil Dihapus' })
    }
}