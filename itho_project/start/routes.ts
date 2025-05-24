import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'
import SiswasController from '#controllers/siswas_controller'

router.get('/', async () => {
  return {
    hello: 'el',
  }
})

router.group(() => {
  router.get('/', [BooksController, 'index'])
  router.post('/', [BooksController, 'store'])
  router.get('/:id', [BooksController, 'show'])
  router.put('/:id', [BooksController, 'update'])
  router.delete('/:id', [BooksController, 'destroy'])
}).prefix('/books')

router.group(() => {
  router.get('/', [SiswasController, 'index'])
  router.post('/', [SiswasController, 'store'])
  router.get('/:id', [SiswasController, 'show'])
  router.put('/:id', [SiswasController, 'update'])
  router.delete('/:id', [SiswasController, 'destroy'])
}).prefix('/siswas')