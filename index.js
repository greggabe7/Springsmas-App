const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JSONBin.io configuration
// You'll need to set these environment variables in Render:
// JSONBIN_API_KEY - Your JSONBin.io API key (X-Master-Key)
// JSONBIN_BIN_ID - Your bin ID (create one at jsonbin.io)
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Helper function to fetch data from JSONBin
async function getData() {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });
    const result = await response.json();
    const record = result.record || {};
    // Remove placeholder key used to keep JSONBin happy
    delete record._placeholder;
    return record;
  } catch (error) {
    console.error('Error fetching from JSONBin:', error);
    return {};
  }
}

// Helper function to save data to JSONBin
async function saveData(data) {
  try {
    const response = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving to JSONBin:', error);
    throw error;
  }
}

// GET all availability
app.get('/api/availability', async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    console.error('GET error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// POST user availability (single cell update)
app.post('/api/availability', async (req, res) => {
  try {
    const { name, weekend, status } = req.body;
    if (!name || !weekend) {
      return res.status(400).json({ error: 'Name and weekend are required' });
    }

    // Read current data fresh from JSONBin
    let data = await getData();

    // Apply single-cell delta
    if (!status || status === '') {
      // Remove this weekend entry
      if (data[name]) {
        delete data[name][weekend];
        if (Object.keys(data[name]).length === 0) {
          delete data[name];
        }
      }
    } else {
      if (!data[name]) {
        data[name] = {};
      }
      data[name][weekend] = status;
    }

    // JSONBin rejects empty objects, so add a placeholder if needed
    const toSave = Object.keys(data).length === 0 ? { _placeholder: true } : data;
    await saveData(toSave);

    res.json({ success: true, data });
  } catch (error) {
    console.error('POST error:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Reset endpoint (for testing)
app.post('/api/reset', async (req, res) => {
  try {
    await saveData({ _placeholder: true });
    res.json({ success: true, message: 'Data reset' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Springsmas 2026 server running on port ${PORT}`);
  if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
    console.warn('WARNING: JSONBIN_API_KEY or JSONBIN_BIN_ID not set!');
    console.warn('Set these environment variables for data persistence.');
  }
});
