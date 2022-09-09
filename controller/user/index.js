const con = require("../../lib/dbConnection");
const bcrypt = require("bcrypt");
// const { addProduct } = require("../admin");
require("dotenv").config();

// ADD USER
// async function addUser(req, res) {
//   const { fullname, email, password, userRole, phone, created, likedPosts } =
//     req.body;
//   try {
//     con.query(
//       `INSERT INTO Users (fullname,
//         email,
//         password,
//         userRole,
//         phone,
//         created,
//         likedPosts) values ("${fullname}","${email}","${password}","${userRole}","${phone}","${created}","${likedPosts}")`,
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error)
// }
// }
// EDIT USER
async function editUser(req, res) {
  const { name, surname, email, password, username, contact, type, profilePicture} =
    req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  try {
    con.query(
      `UPDATE Users SET name="${name}", surname="${surname}", email="${email}", password="${hash}", username="${username}", contact="${contact}", type="${type}", profilePicture="${profilePicture}" WHERE id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}

//DELETE USER
async function deleteUser(req, res) {
  if ((req.user.userRole = "admin" || "user")) {
    try {
      let sql = "Delete from Users WHERE ?";
      let users = { id: req.params.id };
      con.query(sql, users, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Not Allowed");
  }
}
// 
async function getlikedPostsItems(req, res) {
  let likedPosts = [];
  if (likedPosts.length !== 0) {
    try {
      let sql = "Select likedPosts FROM users WHERE ?";
      let users = { id: req.params.id };
      con.query(sql, users, (err, result) => {
        if (err) throw err;
        res.send(result[0].likedPosts);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
  } else {
    res.send("empty");
  }
}

async function addlikedPostsItem(req, res) {
  let likedPosts = [];
  con.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      user_id = result[0].id;
      let item = {
        id: req.body.id,
        title: req.body.title,
            restaurant: req.body.restaurant,
            rating: req.body.rating,
            review: req.body.review,
            foodimage: req.body.foodimage,
            createDate: req.body.createDate,
            logo: req.body.logo,
            user_id: req.body.user_id,
      };
      if (result[0].likedPosts !== "") {
        likedPosts = JSON.parse(result[0].likedPosts);
      }
      likedPosts.push(item);
      con.query(
        `UPDATE users SET likedPosts = ? WHERE id = ${req.params.id}`,
        JSON.stringify(likedPosts),
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    }
  );
}

// async function deletelikedPostsItem(req, res) {
//   let likedPosts = [];
//   let sql = "Delete from products WHERE ?";
//   let product = { id: req.params.id };
//   con.query(sql, product, (err, result) => {
//     if (result[0].likedPosts !== "") {
//       likedPosts = JSON.parse(result[0].likedPosts);
//     }
//     likedPosts.push(sql);
//     con.query(
//       `UPDATE users SET likedPosts = ? WHERE id = ${req.params.id}`,
//       JSON.stringify(likedPosts),
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   });
// }

async function clearlikedPostsItems(req, res) {
  // let likedPosts;
  // let sql = "update from users WHERE ?";
  // let users = { id: req.params.id };
  // con.query(sql, users, (err, result) => {
  //   if (result[0].likedPosts !== "") {
  //     likedPosts = [];
  //   }
  //   likedPosts.push(sql),
  //     (err, result) => {
  //       if (err) throw err;
  //       res.send(result);
  //     };
  // });

  let sql = `Select * from users where ?`;
  let user = {
    id: req.params.id,
  };
  con.query(sql, user, (err, result) => {
    if (err) throw err;
    let updatelikedPosts = `Update users set ?`;
    const likedPosts = {
      likedPosts: null,
    };
    con.query(updatelikedPosts, likedPosts, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
}

module.exports = {
  editUser,
  deleteUser,
  getlikedPostsItems,
  addlikedPostsItem,
  clearlikedPostsItems,
};
