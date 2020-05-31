const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
var notes = [];
var thestring ='';
const shortid = require('shortid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Serves html,css,js

function readFromDb(){
  let db = fs.readFileSync(path.join(__dirname, './db/db.json'));
  notes = JSON.parse(db);
  //console.log(notes);
}
function writeToDb(){
  thestring =JSON.stringify(notes);
  fs.writeFile(path.join(__dirname, './db/db.json'), thestring , function (err) {
    if (err) throw err;
    
  });
}

app.get('/api/notes', (req, res) => {  //reads fropm db, coverts to array, returns array
  readFromDb();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {  //recieves note and pushes to notes array and saves to db file.
  let newNote = {"title": req.body.title,"text":req.body.text,"id":shortid.generate() }
  notes.push(newNote);
  writeToDb();
  res.sendStatus(200);
});

app.delete('/api/notes/:id', (req, res) => {  //recieves note id and deletes from array writes new array to db
  let newnotes = notes.filter(function(e){
    return e.id !== req.params.id;
  });
  notes= newnotes;
  writeToDb();
  res.sendStatus(200);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


