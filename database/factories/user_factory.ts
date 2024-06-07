import User from '#models/user'
import factory from '@adonisjs/lucid/factories'
import { ThreadFactory } from './thread_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      full_name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('threads', () => ThreadFactory)
  .build()
