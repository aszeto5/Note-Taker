// Dependencies 
const path = require('path');
const fs = require('fs')

// NPM package which allows for unique id's
var uniqid = require('uniqid');

// Routing
module.exports = (app) => {

  // Get '/api/notes' should read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // Post '/api/notes' receives a new note to save and adds it to the db.json file, and returns the new note to the client
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    // Body for the note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // Create a unique id for each note
      id: uniqid(),
    };
    // Pushes note to db.json
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
  });

  // Delete '/api/notes/:id' should receive a query parameter containing the id of a note to delete
  app.delete('/api/notes/:id', (req, res) => {
    // Reads note from db.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // Removes note with matching id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  })
};