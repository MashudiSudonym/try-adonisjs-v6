import Thread from '#models/thread'
import type { HttpContext } from '@adonisjs/core/http'

export default class ThreadsController {
  async store({ auth, request, response }: HttpContext) {
    const thread = await auth.user?.related('threads').create(request.only(['title', 'body']))

    return response.json(thread)
  }

  async destroy({ params }: HttpContext) {
    const thread = await Thread.findOrFail(params.id)

    await thread.delete
  }
}
