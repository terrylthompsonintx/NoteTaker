const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Serves html,css


app.get('/api/notes', (req, res) => {  //returns all notes in the notes array
  res.json(notes);
});
app.post('/api/notes', (req, res) => {  //recieves note and pushes to notes array
  console.log(req.body);
  res.send('Hello!');
});
app.delete('/api/note', (req, res) => {  //recieves note and deletes from array
  res.send('Hello!');
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


/* */