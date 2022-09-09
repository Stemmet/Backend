const con = require("../../lib/dbConnection");
const bcrypt = require("bcrypt");
// const { addProduct } = require("../admin");
require("dotenv").config();

// ADD USER
async function addUser(req, res) {
  const { fullname, email, password, userRole, phone, created, likedPosts } =
    req.body;
  try {
    con.query(
      `INSERT INTO Users (fullname,
        email,
        password,
        userRole,
        phone,
        created,
        likedPosts) values ("${fullname}","${email}","${password}","${userRole}","${phone}","${created}","${likedPosts}")`,
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

module.exports = {
  addUser,
  editUser,
  deleteUser,
};
