import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';

// Helper for ESM/CJS compatibility
let currentDir: string;
try {
  const __filename = fileURLToPath(import.meta.url);
  currentDir = path.dirname(__filename);
} catch (e) {
  // @ts-ignore
  currentDir = __dirname;
}

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database setup with fallback
let db: any;

async function initDb() {
  try {
    const { default: Database } = await import('better-sqlite3');
    db = new Database('./salon.db');
    console.log('Connected to better-sqlite3 database.');
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.error('Failed to initialize SQLite, falling back to JSON storage:', err);
    // Fallback to a simple JSON-based store if SQLite fails
    const mockDb = {
      bookings: [] as any[],
      contact_messages: [] as any[],
      save: () => {
        fs.writeFileSync('./mock_db.json', JSON.stringify({ bookings: mockDb.bookings, contact_messages: mockDb.contact_messages }));
      },
      load: () => {
        if (fs.existsSync('./mock_db.json')) {
          const data = JSON.parse(fs.readFileSync('./mock_db.json', 'utf8'));
          mockDb.bookings = data.bookings;
          mockDb.contact_messages = data.contact_messages;
        }
      }
    };
    mockDb.load();
    db = {
      prepare: (query: string) => ({
        run: (...args: any[]) => {
          if (query.includes('INSERT INTO bookings')) {
            mockDb.bookings.push({ fullName: args[0], email: args[1], phone: args[2], service: args[3], date: args[4], time: args[5], createdAt: new Date().toISOString() });
          } else if (query.includes('INSERT INTO contact_messages')) {
            mockDb.contact_messages.push({ name: args[0], email: args[1], message: args[2], createdAt: new Date().toISOString() });
          }
          mockDb.save();
          return { lastInsertRowid: Date.now() };
        }
      })
    };
  }
}

// API Routes
app.post('/api/bookings', (req, res) => {
  const { fullName, email, phone, service, date, time } = req.body;
  if (!fullName || !email || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO bookings (fullName, email, phone, service, date, time) VALUES (?, ?, ?, ?, ?, ?)';
    const result = db.prepare(query).run(fullName, email, phone, service, date, time);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Booking successful' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
    const result = db.prepare(query).run(name, email, message);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Message sent successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend
async function startServer() {
  await initDb();
  
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
