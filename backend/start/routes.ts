/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BooksController = () => import('#controllers/books_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthorsController from '#controllers/authors_controller'

router.where('id', router.matchers.number()) //define global cast for param id

// books routes
router
  .group(() => {
    // auth router
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.delete('/logout', [AuthController, 'logout']).use(middleware.auth({}))

    router
      .group(() => {
        // books router
        router
          .group(() => {
            router.get('/', [BooksController, 'index']).use(middleware.pagination())
            router.get('/:id', [BooksController, 'show'])
            router.post('/', [BooksController, 'store'])
            router.put('/:id', [BooksController, 'update'])
            router.delete('/:id', [BooksController, 'destroy'])
          })
          .prefix('/books')

        // users router
        router
          .group(() => {
            router.get('/', [UsersController, 'index']).use(middleware.pagination())
            router.get('/:id', [UsersController, 'show'])
            // router.post('/', [UsersController, 'store'])
            router.put('/:id', [UsersController, 'update'])
            router.delete('/:id', [UsersController, 'destroy'])
          })
          .prefix('/users')

        // authors router
        router
          .group(() => {
            router.get('/', [AuthorsController, 'index']).use(middleware.pagination())
            router.get('/:id', [AuthorsController, 'show'])
            router.post('/', [AuthorsController, 'store'])
            router.put('/:id', [AuthorsController, 'update'])
            router.delete('/:id', [AuthorsController, 'destroy'])
          })
          .prefix('/authors')
      })
      .use(middleware.auth({}))
  })
  .prefix('api/v1')
