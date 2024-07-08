const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configure Sequelize
const sequelize = new Sequelize('adsser_login', 'adsser_login', 'Ssaa112233++', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define User model
const User = sequelize.define('User', {
    number: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    avatar: DataTypes.STRING
}, {
    timestamps: true
});

const JWT_SECRET = 'your-very-secure-secret';

app.post('/register', async (req, res) => {
    const { number, password, fullname } = req.body;

    const existingUser = await User.findOne({ where: { number } });
    if (existingUser) {
        return res.status(409).json({ error: 'เบอร์โทรซ่ำกลับข้อมูลในระบบ กรุณใส่เบอร์โทรอื่น' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            number,
            password: hashedPassword,
            fullname,
        });

        res.status(201).json({ status: 'ok', message: 'User registered successfully', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { number, password } = req.body;

    try {
        const user = await User.findOne({ where: { number } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, number: user.number }, JWT_SECRET, { expiresIn: '48h' });
        res.status(200).json({ status: 'ok', name: user.fullname, email: user.number, message: 'เข้าสู่ระบบสำเร็จ', accessToken: token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Get user profile data
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.dataValues;
        res.json({ user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Server setup
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
