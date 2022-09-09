// Import needed libraries
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const BlogPostRoute = require("./routes/BlogPostsRoute");
const UsersRoute = require("./routes/UsersRoute");
const CommentsRoute = require("./routes/CommentsRoute");

// Configure Server
const app = express(); // Initialize express as an app variable

app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests


app.use(cors());//

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//cors error fixes
app.use(cors({
  origin: ['http://192.168.9.115:8080', 'http://localhost:8080'],
  credentials: true
}));
// credentials will allow you to access the cookie on your fetch(url, 
// {
// credentials: 'include'
// }) function

//use static 
app.use(express.static("public"));

// This is where we check URLs and Request methods to create functionality


//get static index page on loadup
app.get("/" , (req , res)=> {
  res.sendFile(__dirname + "/index");
  

})

// GET '/' is always what will be displayed on the home page of your application
// app.get("/", (req, res) => {  to get a basic message page
//   res.json({ msg: "Welcome" });
// });

app.use("/blogposts", BlogPostRoute);
app.use("/users", UsersRoute);
app.use("/comments", CommentsRoute);

// Set up server to start listening for requests
app.listen(app.get("port"), () => {
console.log("server running")
});
  
module.exports = {
  devServer: {
    Proxy: "*",
  },
};