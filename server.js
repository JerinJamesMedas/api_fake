const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// --------------------
// Fake Users DB
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
    passwordHash: bcrypt.hashSync('User@123#', 10),
    first_name: 'john',
    last_name: 'doe',
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
// Fake Homes (Projects) DB
// --------------------
const homes = [
  {
    id: '1',
    name: 'Website Redesign',
    owner_id: '1',
    status: 'active',
    visibility: 'private',
    priority: 'high',
    due_date: '2026-02-01T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Redesign company website UI',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    owner_id: '1',
    status: 'in_progress',
    visibility: 'team',
    priority: 'medium',
    due_date: '2026-03-15T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Build first Flutter MVP',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
    {
    id: '',
    name: 'Mobile App -project manager',
    owner_id: '1',
    status: 'in_progress',
    visibility: 'team',
    priority: 'medium',
    due_date: '2026-03-15T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Build first Flutter MVP',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
    {
    id: '3',
    name: 'Mobile App eclinic',
    owner_id: '1',
    status: 'in_progress',
    visibility: 'team',
    priority: 'medium',
    due_date: '2026-03-15T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Build first Flutter MVP',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
    {
    id: '4',
    name: 'Mobile App doctor-view',
    owner_id: '1',
    status: 'in_progress',
    visibility: 'team',
    priority: 'medium',
    due_date: '2026-03-15T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Build first Flutter MVP',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
    {
    id: '5',
    name: 'Mobile App easy-pay',
    owner_id: '1',
    status: 'in_progress',
    visibility: 'team',
    priority: 'medium',
    due_date: '2026-03-15T00:00:00.000Z',
    member_ids: ['1'],
    description: 'Build first Flutter MVP',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

// --------------------
// POST /api/login
// --------------------

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  user.last_login_at = new Date().toISOString();
  const { passwordHash, ...safeUser } = user;

  // // Fake but realistic tokens
  // const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '15m' });
  // const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    data: {
      user: safeUser,
      tokens: {
      },
    },
  });
})

// --------------------
// GET /homes/get?id=1
// --------------------
app.get('/homes/get', (req, res) => {
  const { id } = req.query;
  const home = homes.find(h => h.id === id);

  if (!home) {
    return res.status(404).json({ message: 'Home not found' });
  }

  res.json(home);
});

// --------------------
// GET /homes/getall
// --------------------
app.get('/homes/getall', (req, res) => {
  res.json({ data: homes });
});
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
