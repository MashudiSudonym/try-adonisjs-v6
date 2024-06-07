import Thread from '#models/thread'
import factory from '@adonisjs/lucid/factories'

export const ThreadFactory = factory
  .define(Thread, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.text(),
    }
  })
  .build()
