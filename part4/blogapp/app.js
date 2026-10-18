const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const {setServers} = require('node:dns/promises')

setServers(["1.1.1.1", "8.8.8.8"])

const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
