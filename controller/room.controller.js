const pool = require("../database/index");

const roomController = {
    getRoomById: async (req, res) => {
        try {
            const { roomId } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM Room WHERE RoomID = ?", [roomId]);
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
    getRoomsByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM Room WHERE UserID = ?", [userId]);
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
    createRoom: async (req, res) => {
        try {
            const { userId } = req.params;
            const { roomName, optimumTemperature, optimumHumidity, optimumGase, roomType } = req.body;
            const sql = "INSERT INTO Room (UserID, RoomName, OptimumTemperature, OptimumHumidity, OptimumGase, RoomType) VALUES (?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [userId, roomName, optimumTemperature, optimumHumidity, optimumGase, roomType]);
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
    updateRoom: async (req, res) => {
        try {
            const { userId, roomId } = req.params;
            const { roomName, optimumTemperature, optimumHumidity, optimumGase, roomType } = req.body;
            const sql = "UPDATE Room SET RoomName = ?, OptimumTemperature = ?, OptimumHumidity = ?, OptimumGase = ?, RoomType = ? WHERE RoomID = ? AND UserID = ?";
            const [rows, fields] = await pool.query(sql, [roomName, optimumTemperature, optimumHumidity, optimumGase, roomType, roomId, userId]);
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
    deleteRoom: async (req, res) => {
        try {
            const { userId, roomId } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM Room WHERE RoomID = ? AND UserID = ?", [roomId, userId]);
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

module.exports = roomController;
