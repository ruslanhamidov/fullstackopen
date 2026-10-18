const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)


const initialBlogs = [
  {
    title: 'Welcome',
    author: 'John',
    url: '###',
    likes: 2,
  },
  {
    title: 'New blog',
    author: 'John',
    url: '###',
    likes: 1,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('blog api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('Welcome'), true)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Hey World',
      author: 'John',
      url: '###',
      likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
  })

  test('a valid blog with no like property created with 0 likes', async () => {
    const newBlog = {
      title: 'Fresh blog',
      author: 'John',
      url: '###',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[response.body.length - 1].likes, 0)
  })

  test('blog with missing title will return 400', async () => {
    const newBlog = {
      author: 'John',
      url: '###',
      likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })

  test('blog with missing author will return 400', async () => {
    const newBlog = {
      title: 'Fresh Blog',
      url: '###',
      likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
  })
  
  after(async () => {
    await mongoose.connection.close()
  })
})
