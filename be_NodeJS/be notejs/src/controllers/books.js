const connection = require('../config/DataBase')
const getBooks = (req, res) => {
    connection.query(
        'SELECT * FROM `books`',
        function (err, results, fields) {
            if (err) {
                res.status(500).json({ message: 'Internal Server Error' })
            }
            res.status(200).json(results)
        }
    );
}

module.exports = { getBooks }