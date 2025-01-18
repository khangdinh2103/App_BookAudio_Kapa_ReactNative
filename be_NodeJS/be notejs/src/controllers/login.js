const bcrypt = require('bcrypt'); // Dùng để kiểm tra mật khẩu
const jwt = require('jsonwebtoken'); // Dùng để tạo token
const connection = require('../config/DataBase');
const { v4: uuidv4 } = require('uuid');

const login = (req, res) => {

    const { email, password } = req.body;

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

                // Tạo token nếu mật khẩu khớp
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.SECRET_KEY,  // Lưu secret key trong file .env
                    { expiresIn: '1d' }  // Thời gian hết hạn của token (1 ngày)
                );

                // Nếu mật khẩu khớp, trả về thông tin người dùng và token
                res.status(200).json({
                    message: 'Đăng nhập thành công!',
                    token: token,
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

const register = (req, res) => {
    const { email, password, name } = req.body;

    // Kiểm tra thông tin đầu vào
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, mật khẩu và tên là bắt buộc!' });
    }

    // Kiểm tra xem email đã tồn tại chưa
    connection.query(
        'SELECT * FROM `users` WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi hệ thống!' });
            }

            if (results.length > 0) {
                return res.status(409).json({ message: 'Email đã tồn tại!' }); // Email đã tồn tại
            }

            // Nếu email chưa tồn tại, tiến hành hash mật khẩu và tạo người dùng mới
            const hashedPassword = bcrypt.hashSync(password, 10); // Hash mật khẩu với salt round là 10
            const userId = uuidv4(); // Tạo UUID cho user

            connection.query(
                'INSERT INTO `users` (id, email, password, name) VALUES (?, ?, ?, ?)',
                [userId, email, hashedPassword, name],
                (insertErr, insertResults) => {
                    if (insertErr) {
                        return res.status(500).json({ message: 'Lỗi hệ thống khi tạo người dùng!' });
                    }

                    // Tạo token sau khi đăng ký thành công
                    const token = jwt.sign(
                        { id: userId, email },
                        process.env.SECRET_KEY, // Lấy secret key từ file .env
                        { expiresIn: '2d' } // Token hết hạn sau 2 ngày
                    );

                    // Trả về thông tin người dùng và token
                    res.status(201).json({
                        message: 'Đăng ký thành công!',
                        token: token,
                        user: {
                            id: userId,
                            name: name,
                            email: email,
                        },
                    });
                }
            );
        }
    );
};

module.exports = { login, register };
