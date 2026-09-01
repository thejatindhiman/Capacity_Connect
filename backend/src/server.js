import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Capacity Connect Backend Service',
    timestamp: new Date().toISOString()
  });
});

// Mock Auth Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  res.json({
    success: true,
    token: 'jwt_mock_token_capacity_connect_2026',
    user: {
      id: 'usr_101',
      name: email ? email.split('@')[0].toUpperCase() : 'USER',
      email: email || 'user@capacityconnect.gov',
      role: role || 'Trainee',
      department: 'Digital Infrastructure'
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Capacity Connect Backend] Server running on http://localhost:${PORT}`);
});
