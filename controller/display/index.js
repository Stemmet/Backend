const con = require("../../lib/dbConnection");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
// GET ALL USER
async function getUsers(req, res) {
  try {
    let sql = "SELECT * FROM Users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}

// GET A SINGLE USER
async function getSingleUser(req, res) {
  try {
    con.query(
      `SELECT * FROM Users where id= ${req.params.id} `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

// GET ALL PRODUCTS
async function getBlogPosts(req, res) {
  try {
    con.query("SELECT * FROM BlogPosts", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}

// GET SINGLE PRODUCT BY ID
async function SingleBlogPost(req, res) {
  try {
    con.query(
      `SELECT * FROM BlogPosts where id = ${req.params.id} `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  getBlogPosts,
  SingleBlogPost,
};
