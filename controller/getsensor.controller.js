const pool = require("../database/index");

const getSensorController = {
    getLatestSensorReading: async (req, res) => {
        try {
            const { sensorType, roomID } = req.query;

            if (!sensorType || !roomID) {
                return res.status(400).json({ message: "Invalid parameters for reading latest sensor data." });
            }

            // API anahtarını kontrol et
            const apiKey = req.headers.authorization;

            if (!apiKey || apiKey !== 'Bearer YOUR_API_KEY') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // API anahtarı doğrulandı, işlemi devam ettir

            const sql = `SELECT * FROM ${sensorType} WHERE RoomID = ? ORDER BY Time DESC LIMIT 1`;
            const [rows, fields] = await pool.query(sql, [roomID]);

            res.json({ data: rows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error" });
        }
    },

    getSensorReadings10: async (req, res) => {
        try {
            const { sensorType, roomID } = req.query;

            if (!sensorType || !roomID) {
                return res.status(400).json({ message: "Invalid parameters for reading sensor data." });
            }

            // API anahtarını kontrol et
            const apiKey = req.headers.authorization;

            if (!apiKey || apiKey !== 'YOUR_API_KEY') {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // API anahtarı doğrulandı, işlemi devam ettir

            const sql = `SELECT * FROM ${sensorType} WHERE RoomID = ? ORDER BY Time DESC LIMIT 10`;
            const [rows, fields] = await pool.query(sql, [roomID]);

            res.json({ data: rows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error" });
        }
    },

    getAllLatestSensorReadings: async (req, res) => {
        try {
            const { roomID } = req.query;

            const sql = `
            SELECT sensor_type, MAX(Time) as last_reading, value
            FROM (
                SELECT 'Temperature' as sensor_type, Time, Temperature as value FROM Temp_Hum WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Humidity' as sensor_type, Time, Humidity as value FROM Temp_Hum WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Gas' as sensor_type, Time, Gas as value FROM Gas WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Fire' as sensor_type, Time, Fire as value FROM Fire WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Move' as sensor_type, Time, Move as value FROM Move WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Pot_Humidity' as sensor_type, Time, Pot_Humidity as value FROM Pot_Humidity WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
            ) as all_sensors
            GROUP BY sensor_type
            `;

            const [rows, fields] = await pool.query(sql, [roomID, roomID, roomID, roomID, roomID, roomID]);

            res.json({ data: rows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error" });
        }
    },

    getAllSensorReadings10: async (req, res) => {
        try {
            // API anahtarını kontrol et
            const apiKey = req.headers.authorization;

            if (!apiKey || apiKey !== 'YOUR_API_KEY') {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // API anahtarı doğrulandı, işlemi devam ettir

            // Burada roomID'yi doğrudan req.query üzerinden alabilirsiniz
            const { roomID } = req.query;

            const sql = `
            SELECT sensor_type, MAX(Time) as last_reading, value
            FROM (
                SELECT 'Temperature' as sensor_type, Time, Temperature as value FROM Temp_Hum WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Humidity' as sensor_type, Time, Humidity as value FROM Temp_Hum WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Gas' as sensor_type, Time, Gas as value FROM Gas WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Fire' as sensor_type, Time, Fire as value FROM Fire WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Move' as sensor_type, Time, Move as value FROM Move WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
                UNION ALL
                SELECT 'Pot_Humidity' as sensor_type, Time, Pot_Humidity as value FROM Pot_Humidity WHERE RoomID = ? ORDER BY Time DESC LIMIT 1
            ) as all_sensors
            GROUP BY sensor_type;
            
            `;

            const [rows, fields] = await pool.query(sql, [roomID, roomID, roomID, roomID, roomID, roomID]);

            res.json({ data: rows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error" });
        }
    },
};

module.exports = getSensorController;