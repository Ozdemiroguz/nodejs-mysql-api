const pool = require("../database/index");

const addSensorController = {
    addTemperatureHumidity: async (req, res) => {
        try {
            const { roomID, temperature, humidity } = req.body;
            const sql = "INSERT INTO Temp_Hum (RoomID, Temperature, Humidity, Time) VALUES (?, ?, ?, NOW())";
            const [rows, fields] = await pool.query(sql, [roomID, temperature, humidity]);
            res.json({ data: rows });
        } catch (error) {
            console.log(error);
            res.json({ status: "error" });
        }
    },

    addGas: async (req, res) => {
        try {
            const { roomID, gas } = req.body;
            const sql = "INSERT INTO Gas (RoomID, Gas, Time) VALUES (?, ?, NOW())";
            const [rows, fields] = await pool.query(sql, [roomID, gas]);
            res.json({ data: rows });
        } catch (error) {
            console.log(error);
            res.json({ status: "error" });
        }
    },

    addFire: async (req, res) => {
        try {
            const { roomID, fire } = req.body;
            const sql = "INSERT INTO Fire (RoomID, Fire, Time) VALUES (?, ?, NOW())";
            const [rows, fields] = await pool.query(sql, [roomID, fire]);
            res.json({ data: rows });
        } catch (error) {
            console.log(error);
            res.json({ status: "error" });
        }
    },

    addMovement: async (req, res) => {
        try {
            const { roomID, move } = req.body;
            const sql = "INSERT INTO Move (RoomID, Move, Time) VALUES (?, ?, NOW())";
            const [rows, fields] = await pool.query(sql, [roomID, move]);
            res.json({ data: rows });
        } catch (error) {
            console.log(error);
            res.json({ status: "error" });
        }
    },

    addPotHumidity: async (req, res) => {
        try {
            const { potID, humidity, roomID } = req.body;
            const sql = "INSERT INTO Pot_Humidity (PotID, Humidity, Time, RoomID) VALUES (?, ?, NOW(), ?)";
            const [rows, fields] = await pool.query(sql, [potID, humidity, roomID]);
            res.json({ data: rows });
        } catch (error) {
            console.log(error);
            res.json({ status: "error" });
        }
    },
    deleteSensorTable: async (req, res) => {
        try {
            const { sensorType } = req.params;
            // Önce tabloyu varsa sil
            const deleteDataSQL = `DELETE FROM ${sensorType};`;
            await pool.query(deleteDataSQL);

            res.json({ message: `Sensor table ${sensorType} has been deleted successfully.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "An error occurred while deleting the sensor table." });
        }
    },


};

module.exports = addSensorController;

