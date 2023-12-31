const pool = require("../database/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { email, password, name, surname, phone, numberOfRooms, active } = req.body;

            // Email kontrolü
            const [user,] = await pool.query("SELECT * FROM User WHERE Mail = ?", [email]);
            if (user[0]) {
                return res.json({ error: "Email already exists!" });
            }

            // Şifreyi hashle
            const hash = await bcrypt.hash(password, 10);

            // Kullanıcıyı veritabanına ekle
            const userSql = "INSERT INTO User (Mail, Password, Name, Surname, Phone, NumberOfRooms, Active) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [userRows, userFields] = await pool.query(userSql, [email, hash, name, surname, phone, numberOfRooms, active]);

            if (userRows.affectedRows) {
                return res.json({ message: "Registration successful" });
            } else {
                return res.json({ error: "Registration failed" });
            }
        } catch (error) {
            console.log(error);
            res.json({
                error: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const [user,] = await pool.query("SELECT * FROM User WHERE Mail = ?", [email]);
            if (!user[0]) return res.json({ error: "Invalid email!" });

            const { Password: hash, UserID, Name } = user[0];

            const check = await bcrypt.compare(password, hash);

            if (check) {
                const accessToken = jwt.sign({ userId: UserID }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({
                    accessToken,
                    data: {
                        userId: UserID,
                        name: Name,
                        email
                    }
                });
            }

            return res.json({ error: "Wrong password!" });

        } catch (error) {
            console.log(error);
            res.json({
                error: error.message
            });
        }
    },
};

module.exports = authController;
