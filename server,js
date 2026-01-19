const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// --------------------
// Fake DB (2 users)
// --------------------
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    status: 'active',
    avatar_url: null,
    phone_number: null,
    is_email_verified: true,
    is_phone_verified: false,
    created_at: new Date().toISOString(),
    updated_at: null,
    last_login_at: null,
  },
  {
    id: '2',
    email: 'user@example.com',
    passwordHash: bcrypt.hashSync('user123', 10),
    first_name: 'Normal',
    last_name: 'User',
    role: 'user',
    status: 'active',
    avatar_url: null,
    phone_number: null,
    is_email_verified: false,
    is_phone_verified: false,
    created_at: new Date().toISOString(),
    updated_at: null,
    last_login_at: null,
  },
];

// --------------------
// POST /api/login
// --------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.last_login_at = new Date().toISOString();

  const { passwordHash, ...safeUser } = user;
  res.json(safeUser);
});

// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
