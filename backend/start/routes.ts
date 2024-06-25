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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// books routes
router
  .group(() => {
    // auth router
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])

    // books router
    router.get('/books', [BooksController, 'index'])
    router.get('/books/:id', [BooksController, 'show'])
    router.post('/books', [BooksController, 'store'])
    router.put('/books/:id', [BooksController, 'update'])
    router.delete('/books/:id', [BooksController, 'destroy'])

    // users router
    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.post('/users', [UsersController, 'store'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'destroy'])
  })
  .prefix('api/v1')
