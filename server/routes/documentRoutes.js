const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

router.get('/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (doc) res.json(doc);
  else res.status(404).send("Document not found");
});

module.exports = router;
