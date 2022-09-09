const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");
// const nodemailer = require('nodemailer');

const adminController = require("../controller/admin/index");
const displayController = require("../controller/display/index");


//get all blogs

router.get("/", (req, res) => {
  
  try {
    let sql = "SELECT * FROM BlogPosts";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//ADD A BlogPost
router.post("/",  (req, res) => {
  return adminController.addBlogPost(req, res);
});

// GET SINGLE BlogPost
router.get("/:id", (req, res) => {
  return displayController.SingleBlogPost(req, res);
});

//EDIT A BlogPost
router.put("/:id", middleware, (req, res) => {
  return adminController.editBlogPost(req, res);
});
// router.patch("/:id", (req, res) => {
//   const P = {
    
//   }
// }
// try {
//   con.query(`UPDATE Topics SET ? WHERE topic_id ="${req.params.id}"`,topic, (err, result) => {
//       if (err) throw err.message;
//       res.send(result);
//   });
// } catch (error) {
// console.log(error);
// res.status(400).send(error)
// }

// DELETE A BlogPost
router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteBlogPost(req, res);
});

module.exports = router;