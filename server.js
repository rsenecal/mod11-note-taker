const express = require('express');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const { fstat } = require('fs');
const fs = require('fs'); 
const path = require('path');



const notes= require('./db/db.json');

// console.log(notes);

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/notes',  (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});


app.get('/api/notes', (req, res) => res.json(notes));


// GET Route for retrieving all the tips
// app.get('/api/notes', (req, res) => {
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });



// POST Route for a new UX/UI tip
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const noteId = uuidv4();
  console.log(`note id = ${noteId}`)
  if (req.body) {
    const newNote = {
      title,
      text,
      noteId
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});


// ******************************


app.get('*',  (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});





app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});