// Dependencies
const path = require('path');

// Routing
module.exports = (app) => {

  // Creating Routes get'notes' should return to the notes.html file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // Get '*' should return to the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};