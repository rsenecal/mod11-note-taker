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
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});


// ******************************


app.delete('/api/notes/:id', function(req, res) {

  console.info ("USER CLICKED DELETE");
  var indexOfNote = notes.map(function(item) { return item.noteId; }).indexOf(req.params.noteId); //find the index of :id
  var indexOfNote2 = req.params.noteId;
  console.log(`Note ID: ${indexOfNote} and ${indexOfNote2}`)

  // var indexOfCouseInJson = json.map(function(item) { return item.noteId; }).indexOf(req.params.noteId); //find the index of :id
  //   if(indexOfCouseInJson === -1) {
  //     res.statusCode = 404;
  //     return res.send('Error 404: No quote found');
  //   }
  
  //   var result = json.splice(indexOfCouseInJson,1);
  //   fs.writeFile(jsonFilePath, JSON.stringify(result), function(err){
  //    if(err) throw err;
  //    res.json(true);
  //  });
  
  });



app.get('*',  (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});





app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});