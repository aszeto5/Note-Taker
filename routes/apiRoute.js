const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.post("/notes", (req, res) => {
  store
    .writeNote(req.body)
    .then((note) => {
      return res.json(note);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


module.exports = router;