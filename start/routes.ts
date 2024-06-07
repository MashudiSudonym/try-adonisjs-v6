/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ThreadsController = () => import('#controllers/threads_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.resource('threads', ThreadsController).only(['store', 'destroy']).use('*', middleware.auth())

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
