const express = require("express");
const path = require("path");
const fs = require("fs");

const port = 8080;
const app = express();




app.use(express.json());


app.use(express.static(path.join(__dirname,"public")));




app.listen(port, () => {
    console.log(`The site is available at http://localhost:${port}`);
});