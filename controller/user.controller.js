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
            const sql = "INSERT INTO User (Mail, Name, Surname, Password, Phone, NumberOfRooms, Active) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [mail, name, surname, password, phone, numberOfRooms, active]);
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
    updateUser: async (req, res) => {
        try {
            const { mail, name, surname, password, phone, numberOfRooms, active } = req.body;
            const { id } = req.params;
            const sql = "UPDATE User SET Mail = ?, Name = ?, Surname = ?, Password = ?, Phone = ?, NumberOfRooms = ?, Active = ? WHERE UserID = ?";
            const [rows, fields] = await pool.query(sql, [mail, name, surname, password, phone, numberOfRooms, active, id]);
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

module.exports = smartHouseController;
