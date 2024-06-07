import { ThreadFactory } from '#database/factories/thread_factory'
import { UserFactory } from '#database/factories/user_factory'
import Thread from '#models/thread'
import { group, test } from '#tests/db'

group('Thread', () => {
  test('can create thread', async ({ client }) => {
    const input = await ThreadFactory.make()
    const user = await UserFactory.create()
    const response = await client
      .post('/threads')
      .loginAs(user)
      .json(input.serialize({ fields: ['title', 'body'] }))

    response.assertStatus(200)

    const thread = await Thread.firstOrFail()
    response.assertBodyContains(thread.serialize({ fields: ['id', 'title', 'body'] }))
  })

  test('can delete thread', async ({ client }) => {
    const user = await UserFactory.with('threads').create()
    const response = await client.delete(`threads/${user.threads[0].id}`).loginAs(user)

    response.assertStatus(200)
  })

  test('unauthenticated user cannot create threads', async ({ client }) => {
    const input = await ThreadFactory.make()
    const response = await client
      .post('/threads')
      .json(input.serialize({ fields: ['title', 'body'] }))

    response.assertStatus(401)
  })
})
