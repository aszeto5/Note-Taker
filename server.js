const express = require("express");

const PORT = process.env.PORT || 3003;

const apiRoute = require("./routes/apiRoute");
const htmlRoute = require("./routes/htmlRoute");

const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoute);
app.use("/", htmlRoute);




app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});