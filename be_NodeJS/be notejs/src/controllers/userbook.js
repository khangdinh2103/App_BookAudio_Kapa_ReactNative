const connection = require('../config/DataBase')
const getUserBooksWithUser = (req, res) => {
    const { userId } = req.query; 

    if (!userId) {
        return res.status(400).json({ message: 'userId là bắt buộc!' });
    }

    const query = `
        SELECT 
            ub.bookId, ub.userId, ub.rating AS userRating, ub.status, ub.startAt, ub.finishedAt,
            b.name AS bookName, b.author, b.rating AS bookRating, b.description, b.genre, b.durating, b.imgsrc, b.audioSrc, b.chapter
        FROM 
            userbooks AS ub
        INNER JOIN 
            books AS b
        ON 
            ub.bookId = b.id
        WHERE 
            ub.userId = ?;
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách nào cho người dùng này!' });
        }

        res.status(200).json({ message: 'Thành công!', data: results });
    });
};
const createStatusBookHandler = (req, res) => {
    const { userId, bookId, status, rating } = req.body;

    // Kiểm tra xem các tham số có hợp lệ không
    if (!userId || !bookId || !status) {
        return res.status(400).json({ message: 'Thông tin bắt buộc: userId, bookId và status!' });
    }

    // Nếu không có rating, gán giá trị mặc định là 5
    const userRating = rating || 5;

    // Truy vấn SQL để chèn trạng thái sách vào bảng `user_books`
    const query = `
        INSERT INTO userbooks (userId, bookId, status, rating, startAt, finishedAt) 
        VALUES (?, ?, ?, ?, NOW(), NULL);
    `;

    connection.query(query, [userId, bookId, status, userRating], (err, results) => {
        if (err) {
            console.error("Lỗi khi tạo trạng thái sách:", err);
            return res.status(500).json({ message: 'Lỗi hệ thống khi tạo trạng thái sách', error: err.message });
        }

        // Nếu truy vấn thành công, trả về thông tin kết quả
        res.status(201).json({
            message: 'Tạo trạng thái sách thành công',
            data: results
        });
    });
};
module.exports = { getUserBooksWithUser, createStatusBookHandler };
