// const bcrypt = require("bcryptjs");
const con = require("../../lib/dbConnection");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// ADD BlogPost
// async function addBlogPost(req, res) {

//     try {
//       let date = new Date().toISOString().slice(0, 19).replace("T", " ");
//       let sql = "INSERT INTO BlogPosts SET ?";
//       let BlogPost = ({
//         title: req.body.title,
//         img: req.body.img,
//         thumbnail: req.body.thumbnail,
//         price: req.body.price,
//         color: req.body.color,
//         description: req.body.description,
//         quantity: req.body.quantity,
//         category: req.body.category,
//         sku: req.body.sku,
//         available: req.body.available,
//       } = req.body);
//       con.query(sql, BlogPost, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       });
//     };
// }

// ADD BlogPost
async function addBlogPost(req, res) {
  const {
    title,
    content,
    postImage,
    authorId,
  } = req.body;
  try {
    con.query(
      
      `INSERT INTO BlogPosts (
        title,
        restaurant,
        rating,
        review,
        foodimage,
        logo,
        user_id) VALUES ( "${title}", ${restaurant}", ${rating}", "${review}", ${foodimage}",  "${logo}",  "${user_id}" )`,
      (err, result) => {
        if (err) throw err;
        res.send("BlogPost successfully created");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }}
  

// EDIT BlogPost
async function editBlogPost(req, res) {
  if (req.user.userRole === "admin" || req.user.userRole === "user") {
    try {
      let sql = " SELECT * FROM BlogPosts WHERE ? ";
      let BlogPost = { id: req.params.id };
      con.query(sql, BlogPost, (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
          let updateSql = `UPDATE BlogPosts SET ? WHERE id = ${req.params.id}`;
          let updateBlogPost = {
            title: req.body.title,
            restaurant: req.body.restaurant,
            rating: req.body.rating,
            review: req.body.review,
            foodimage: req.body.foodimage,
            createDate: req.body.createDate,
            logo: req.body.logo,
            user_id: req.body.user_id,
          };
          con.query(updateSql, updateBlogPost, (err, updated) => {
            if (err) throw err;
            res.send("Successfully updated BlogPost");
          });
        } else {
          res.send("BlogPost not found");
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
  }
}

async function deleteBlogPost(req, res) {
  if (req.user.userRole === "admin")
    try {
      let sql = "Delete from BlogPosts WHERE ?";
      let BlogPost = { id: req.params.id };
      con.query(sql, BlogPost, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
}
module.exports = {
  addBlogPost,
  editBlogPost,
  deleteBlogPost,
};