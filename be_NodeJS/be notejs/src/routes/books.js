const {getBooks} = require('../controllers/books')
const { login } = require('../controllers/login')
const express = require('express')
const router = express.Router()

const InitAPIRoute = (app) => {
    router.get('/books', getBooks)
    router.post('/login', login);
    return app.use('/api/v1', router)
}

module.exports = InitAPIRoute