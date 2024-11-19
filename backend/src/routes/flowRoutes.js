const express = require('express');
const router = express.Router();
const Flow = require('../models/Flow');

router.post('/start', async (req, res) => {
  try {
    const flow = new Flow();
    flow.logs.push({ message: 'Sending first reminder' });
    await flow.save();
    res.json(flow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, log } = req.body;
    const flow = await Flow.findById(id);
    
    if (!flow) {
      return res.status(404).json({ error: 'Flow not found' });
    }

    flow.status = status;
    if (log) {
      flow.logs.push({ message: log });
    }
    
    await flow.save();
    res.json(flow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const flow = await Flow.findById(req.params.id);
    if (!flow) {
      return res.status(404).json({ error: 'Flow not found' });
    }
    res.json(flow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;