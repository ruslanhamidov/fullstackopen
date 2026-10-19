const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    name: 'John',
    username: 'Doeee',
    passwordHash: async () => {await bcrypt.hash('hello1', 10)},
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('users endpoint', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('a valid user can be added', async () => {
    const newUser = {
      name: 'Jane',
      username: 'msDo',
      password: 'hello2',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    assert.strictEqual(response.body.length, initialUsers.length + 1)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
