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
// Returns { data, error } so callers can distinguish empty data from failures
async function getData() {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });
    if (!response.ok) {
      console.error('JSONBin GET failed with status:', response.status);
      return { data: null, error: `JSONBin returned ${response.status}` };
    }
    const result = await response.json();
    const record = result.record || {};
    // Remove placeholder key used to keep JSONBin happy
    delete record._placeholder;
    return { data: record, error: null };
  } catch (error) {
    console.error('Error fetching from JSONBin:', error);
    return { data: null, error: error.message };
  }
}

// Helper function to save data to JSONBin
async function saveData(data) {
  const response = await fetch(JSONBIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_API_KEY
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`JSONBin PUT failed (${response.status}): ${body}`);
  }
  return await response.json();
}

// GET all availability
app.get('/api/availability', async (req, res) => {
  try {
    const { data, error } = await getData();
    if (error) {
      return res.status(502).json({ error: 'Failed to fetch data from storage' });
    }
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

    // Read current data fresh from JSONBin — abort if read fails
    const { data, error } = await getData();
    if (error) {
      console.error('Refusing to save: could not read current data:', error);
      return res.status(502).json({ error: 'Cannot read current data, save aborted to prevent data loss' });
    }

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
