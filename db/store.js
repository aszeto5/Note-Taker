const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  getNotes() {
    return readFileAsync("db/db.json", "utf-8").then((notes) => {
      let parsedNotes;
      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  writeNote(newNote) {
    return this.getNotes()
      .then((notes) => {
          
        return [...notes, newNote];
      })
      .then((updatedNotes) => {
        return writeFileAsync("db/db.json", JSON.stringify(updatedNotes));
      })
      .then(() => newNote);
  }
}

module.exports = new Store();