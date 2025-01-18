const {getBooks, getBookByName, getBooksByRanking} = require('../controllers/books')
const { login, register } = require('../controllers/login')
const { getPodcasts } = require('../controllers/podcart')
const {getUserBooksWithUser, createStatusBookHandler} = require('../controllers/userbook')
const express = require('express')
const router = express.Router()

const InitAPIRoute = (app) => {
    router.get('/books', getBooks)
    router.get('/books/name', getBookByName);
    router.get('/books/ranking', getBooksByRanking);

    router.post('/login', login);
    router.post('/register', register);

    router.get('/podcasts', getPodcasts);

    router.get('/userbook/userId', getUserBooksWithUser);
    router.post('/userbook/createuserbook', createStatusBookHandler);

    return app.use('/api/v1', router)
}

module.exports = InitAPIRoute