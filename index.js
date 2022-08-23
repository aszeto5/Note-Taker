const { response } = require("express");
const express = require("express");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 8000; 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//app.use ("/", (req, res) => {
// res.send("Hello World.");
//});

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/notes.html");
});

app.get("/assets/script.js", (req, res) => {
    res.sendFile(__dirname + "/assets/script.js");
});

app.get("/assets/style.css", (req, res) => {
    res.sendFile(__dirname + "/assets/style.css");
});

app.get("/api/notes", (req, res) => {
    let content = fs.readFileSync("./db.json");
    console.log("sending notes - ");
    let data = content.toString();
    res.json(JSON.parse(data));
});

app.post("/api/notes", (req, res) => {
    console.log("request received:");
    console.log(req.body);
    let content = fs.readFileSync("./db.json");
    let notesObject = JSON.parse(content.toString());
    let note = req.body;
    note.id = uuid.v4();
    notesObject.push(note);
    fs.writeFileSync("./db.json", JSON.stringify(notesObject));

    res.send(note);
});

app.delete("/api/notes/:id", (req, res) => {
    let content = fs.readFileSync("./db.json");
    let notesObject = JSON.parse(content.toString());

    let noteId = req.params.id;
    let updatedNotes = notesObject.filter( n => n.id !== noteId);
    fs.writeFileSync("./db.json", JSON.stringify(updatedNotes));
    res.json({"msg": "success"});


})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log("server runnung at port:", PORT));