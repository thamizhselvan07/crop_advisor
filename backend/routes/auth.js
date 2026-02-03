const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, language } = req.body;
  try {
    // Check if user exists
    const existingUser = global.users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), name, email, password: hashedPassword, language };
    global.users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = global.users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, language: user.language } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;