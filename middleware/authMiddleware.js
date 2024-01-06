const pool = require("../database/index");


const authMiddleware = (req, res, next) => {
    // API anahtarını kontrol et
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const apiKey = authHeader.substring(7); // "Bearer " kısmını atla

    if (apiKey !== 'YOUR_API_KEY') {
        return res.status(402).json({ message: 'Unauthorized' });
    }


    // Bir sonraki middleware veya route'a devam et
    next();
};

module.exports = authMiddleware;