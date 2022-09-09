const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
// const nodemailer = require('nodemailer');

// const middleware = require("../middleware/auth");
const authController = require("../controller/auth/index");
const passController = require("../controller/password/index");
const displayController = require("../controller/display/index");
const userController = require("../controller/user/index");


router.get("/",  (req, res) => {
  try {
    let sql = "SELECT * FROM Users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// GET SINGLE USER
router.get("/:id", (req, res) => {
    return displayController.getSingleUser(req, res);
  });
  
  //EDIT A USER
  router.put("/:id", (req, res) => {
    return userController.editUser(req, res);
  });
  
  // DELETE A USER
//   router.delete("/:id", middleware, (req, res) => {
//     return userController.deleteUser(req, res);
//   });
  
  // Register
  router.post("/register", (req, res) => {
    return authController.Register(req, res);
  });
  
  // Login
  router.post("/login", (req, res) => {
    console.log(req.body);
    return authController.Login(req, res);
  });
  
  // Verify
  router.get("/users/verify", (req, res) => {
    return authController.Verify(req, res);
  });
  
  // FORGOT PASSWORD
  router.post("/forgot-psw", (req, res) => {
    return passController.forgotPsw(req, res);
  });
  
  // Rest Password Route
  
  router.put("/reset-psw/:id", (req, res) => {
    return passController.resetPsw(req, res);
  });

  // liked posts

// view liked posts
router.get("/:id/likedPosts", (req, res) => {
    return userController.getlikedPostsItems(req, res);
  });
  
// 
  router.patch("/:id", (req, res) => {
    return userController.editUser(req, res);
  });
  
// delete a liked post
  router.delete(":/id/likedPosts", (req, res) => {
    return userController.deletelikedPostsItem(req, res);
  });
  
// clear liked posts
  router.patch(":/id/likedPosts/_id", (req, res) => {
    return userController.clearlikedPostsItems(req, res);
  });

// 
  router.put(":/id/likedPosts", (req, res) => {
    return userController.editlikedPosts(req, res);
  });
  
  
module.exports = router;