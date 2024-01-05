const pool = require("../database/index");



const authMiddleware = (req, res, next) => {
    const apiKey = req.get('Authorization');

    if (!apiKey || apiKey !== 'YOUR_API_KEY') {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    // API anahtarı doğrulandı, isteği devam ettir
    next();
};

module.exports = authMiddleware;