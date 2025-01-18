const connection = require('../config/DataBase')
const getPodcasts = (req, res) => {
    const query = `
        SELECT name, host, rating, description, genre, imgsrc, audioSrc, episode
        FROM podcasts;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy podcast nào!' });
        }

        res.status(200).json({ message: 'Thành công!', data: results });
    });
};

module.exports = { getPodcasts };
