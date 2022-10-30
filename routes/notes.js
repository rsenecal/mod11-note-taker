const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


// GET Route for retrieving all the tips
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new UX/UI tip
  notes.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        tip_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

  module.exports = notes;