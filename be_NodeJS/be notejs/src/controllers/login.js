const bcrypt = require('bcrypt'); // Dùng để kiểm tra mật khẩu
const connection = require('../config/DataBase');

const login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body ;

    // Kiểm tra xem thông tin đầu vào có hợp lệ không
    if (!email || !password) {
        return res.status(400).json({ message: 'Email và mật khẩu là bắt buộc!' });
    }

    // Truy vấn cơ sở dữ liệu để tìm người dùng theo email
    connection.query(
        'SELECT * FROM `users` WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi hệ thống!' });
            }

            // Kiểm tra nếu không tìm thấy người dùng
            if (results.length === 0) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
            }

            const user = results[0]; // Lấy thông tin người dùng
            // So sánh mật khẩu được nhập với mật khẩu được lưu trong DB
            bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
                if (bcryptErr) {
                    return res.status(500).json({ message: 'Lỗi hệ thống!' });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
                }

                // Nếu mật khẩu khớp, trả về thông tin người dùng (có thể bỏ thông tin nhạy cảm như password)
                res.status(200).json({
                    message: 'Đăng nhập thành công!',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        zalo: user.zalo,
                        fbUrl: user.fbUrl,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            });
        }
    );
};

module.exports = { login };
