const pool = require("../database/index");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM User");
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM User WHERE UserID = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    createUser: async (req, res) => {
        try {
            const { mail, name, surname, password, phone, numberOfRooms, active } = req.body;

            // Şifreyi hash'le
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = "INSERT INTO User (Mail, Name, Surname, Password, Phone, NumberOfRooms, Active) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [mail, name, surname, hashedPassword, phone, numberOfRooms, active]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    changePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;

            // Yeni şifreyi hash'le
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Yeni şifreyi veritabanında güncelle
            const updateSql = "UPDATE User SET Password = ? WHERE UserID = ?";
            const [updateRows, updateFields] = await pool.query(updateSql, [hashedNewPassword, id]);

            res.json({ status: "success", message: "Şifre başarıyla güncellendi." });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "İşlem sırasında bir hata oluştu." });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { mail, name, surname, phone, numberOfRooms, active } = req.body;
            const { id } = req.params;

            const sql = "UPDATE User SET Mail = ?, Name = ?, Surname = ?, Phone = ?, NumberOfRooms = ?, Active = ? WHERE UserID = ?";
            const [rows, fields] = await pool.query(sql, [mail, name, surname, phone, numberOfRooms, active, id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM User WHERE UserID = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
};

module.exports = userController;
