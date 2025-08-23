const express = require("express");
const path = require("path");
const fs = require("fs");


const port = 8080;
const app = express();




app.use(express.json());



app.use(express.static(path.join(__dirname,"public")));




function readUsers() {

    const data = fs.readFileSync(path.join(__dirname, "userslogindata.json"), "utf8");
    return JSON.parse(data);
  
}




function saveUsers(users) {
  fs.writeFileSync(path.join(__dirname, "userslogindata.json"), JSON.stringify(users, null, 2));
}




app.post("/api/oldusers", (req, res) => {
  const { name, password } = req.body;
  const users = readUsers();


  
  console.log(name,password);

  const user = users.find(u => u.name === name && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});






app.post("/api/newusers", (req, res) => {
  const { name, password } = req.body;
  console.log(name,password);
  const users = readUsers();





  if (users.find(u => u.name === name)) {
    return res.json({ success: false, message: "Username already exists" });
  }


  users.push({ name, password });



  saveUsers(users);

  res.json({ success: true, message: "Signup successful! You can now login." });
});




app.listen(port, () => {
    console.log(`The site is available at http://localhost:${port}`);
});