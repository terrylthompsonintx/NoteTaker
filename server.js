const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
var notes = [];
const shortid = require('shortid');
const { db } = require('./db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Serves html,css,js

function readFromDb(){}
function writeToDb(){}

app.get('/api/notes', (req, res) => {  //reads from returns all notes in the notes array
  readFromDb();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {  //recieves note and pushes to notes array and saves to db file.
  
  let newNote = {"title": req.body.title,"text":req.body.text,"id":shortid.generate() }
  notes.push(newNote);
  writeToDb();
  res.sendStatus(200);
})

app.delete('/api/notes/:id', (req, res) => {  //recieves note id and deletes from array
  console.log (notes);
  
  let newnotes = notes.filter(function(e){
    return e.id !== req.params.id;
  });

  notes= newnotes;
  console.log(notes);
  writeToDb();


  res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


/* */