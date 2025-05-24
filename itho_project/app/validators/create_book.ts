import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(10),
        author: vine.string().trim().minLength(5).maxLength(10),
        price: vine.number().positive(),
        category: vine.string().trim().minLength(3).maxLength(50),
    })
)

export const updateBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(10).optional(),
        author: vine.string().trim().minLength(5).maxLength(10).optional(),
        price: vine.number().positive().optional(),
        category: vine.string().trim().minLength(3).maxLength(50).optional(),
    })
)

export const deleteBookValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().positive(),
        }),
    })
)