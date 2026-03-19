const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');  // ← обязательно!
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Временное хранилище
let users = [];
let lists = [];

// Тестовый route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

// Регистрация
app.post('/api/register', (req, res) => {
    console.log('Register request:', req.body);
    const { email, password, name } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password // в реальном проекте хешировать!
    };

    users.push(newUser);
    console.log('Users after register:', users);

    res.status(201).json({ message: 'Пользователь создан' });
});

// Вход
app.post('/api/login', (req, res) => {
    console.log('Login request:', req.body);
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Создаем JWT токен
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
    );

    res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email }
    });
});

// Получение списков
app.get('/api/lists', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        const userLists = lists.filter(list => list.userId === decoded.userId);
        res.json(userLists);
    } catch (error) {
        console.error('Token error:', error);
        res.status(401).json({ message: 'Неверный токен' });
    }
});

// Создание списка
app.post('/api/lists', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];
    const { text } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        const newList = {
            id: Date.now().toString(),
            userId: decoded.userId,
            text,
            createdAt: new Date()
        };

        lists.push(newList);
        console.log('Lists after create:', lists);
        res.status(201).json(newList);
    } catch (error) {
        console.error('Token error:', error);
        res.status(401).json({ message: 'Неверный токен' });
    }
});

// Удаление списка
app.delete('/api/lists/:id', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];
    const listId = req.params.id;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        const listIndex = lists.findIndex(l => l.id === listId && l.userId === decoded.userId);

        if (listIndex === -1) {
            return res.status(404).json({ message: 'Список не найден' });
        }

        lists.splice(listIndex, 1);
        console.log('Lists after delete:', lists);
        res.json({ message: 'Список удален' });
    } catch (error) {
        console.error('Token error:', error);
        res.status(401).json({ message: 'Неверный токен' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});