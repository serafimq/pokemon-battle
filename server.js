import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const BATTLE_STATS_FILE = path.join(__dirname, 'src', 'data', 'battleStats.json');

// Получить все битвы
app.get('/api/battles', (req, res) => {
  try {
    if (fs.existsSync(BATTLE_STATS_FILE)) {
      const data = JSON.parse(fs.readFileSync(BATTLE_STATS_FILE, 'utf8'));
      res.json(data);
    } else {
      res.json({ battles: [] });
    }
  } catch (error) {
    console.error('Error reading battles:', error);
    res.status(500).json({ error: 'Failed to read battles' });
  }
});

// Сохранить битву
app.post('/api/battles', (req, res) => {
  try {
    let data = { battles: [] };
    
    if (fs.existsSync(BATTLE_STATS_FILE)) {
      data = JSON.parse(fs.readFileSync(BATTLE_STATS_FILE, 'utf8'));
    }
    
    const newBattle = req.body;
    if (!newBattle.id) {
      newBattle.id = data.battles.length > 0 
        ? Math.max(...data.battles.map(b => b.id)) + 1 
        : 1;
    }
    
    if (!newBattle.date) {
      newBattle.date = new Date().toISOString();
    }
    
    data.battles.push(newBattle);
    
    fs.writeFileSync(BATTLE_STATS_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, battle: newBattle });
  } catch (error) {
    console.error('Error saving battle:', error);
    res.status(500).json({ error: 'Failed to save battle' });
  }
});

// Очистить все битвы
app.delete('/api/battles/clear', (req, res) => {
  try {
    const data = { battles: [] };
    fs.writeFileSync(BATTLE_STATS_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'All battles cleared' });
  } catch (error) {
    console.error('Error clearing battles:', error);
    res.status(500).json({ error: 'Failed to clear battles' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Battle Stats API server running on http://localhost:${PORT}`);
});

