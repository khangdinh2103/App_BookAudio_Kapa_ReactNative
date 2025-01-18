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
const getBookByName = (req, res) => {
    const { name } = req.query; // Lấy tên sách từ query parameter

    if (!name) {
        return res.status(400).json({ message: 'Tên sách là bắt buộc!' });
    }

    const query = `
        SELECT name, author, rating, description, genre, durating, imgsrc, audioSrc 
        FROM books 
        WHERE LOWER(name) LIKE LOWER(?);
    `;

    const searchPattern = `%${name}%`; // Tạo chuỗi tìm kiếm với ký tự đại diện %

    connection.query(query, [searchPattern], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách nào!' });
        }

        res.status(200).json({ message: 'Thành công!', data: results });
    });
};
const getBooksByRanking = (req, res) => {
    const query = `
        SELECT id, name, author, rating, description, genre, durating, imgsrc, audioSrc, chapter
        FROM books
        ORDER BY CAST(SUBSTRING_INDEX(rating, ' ', 1) AS DECIMAL(10,2)) DESC
        LIMIT 5;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách nào!' });
        }

        res.status(200).json({ message: 'Thành công!', data: results });
    });
};

module.exports = { getBooks, getBookByName, getBooksByRanking }