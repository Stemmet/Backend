const bcrypt = require("bcrypt");
const con = require("../../lib/dbConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// LOGIN FUNCTION

async function Login(req, res) {
//   console.log(req.body);
  try {
    let sql = "SELECT * FROM Users WHERE ?";
    let user = {
      email: req.body.email,
      };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(400).json({
          status: "error",
          msg: "Email Not Found",
        });
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        console.log(req.body.password, result[0].password);
        if (!isMatch) {
          res.status(400).json({
            status: "error",
            msg: "Password Incorrect",
          });
          console.log(isMatch);
        } else {
          // The information the should be stored inside token
          const payload = {
            user: {
              id: result[0].id,
              name: result[0].name,
              surname: result[0].surname,
              email: result[0].email,
              password: result[0].password,
              type: result[0].type,
              contact: result[0].contact,
              registerDate: result[0].registerDate,
              username: result[0].username,
              profilePicture: result[0].profilePicture,
            },
          };
          // Creating a token and setting expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;

              res.json({ 
                msg: "Login Successful",
                user: payload.user,
                token : token
               });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}



// REGISTER FUNCTION
async function Register(req, res) {
  try {
    let sql = `INSERT INTO Users ( name, surname, email, password, username) VALUES(? , ? , ? , ? , ? );`;
    // let date = new Date().toISOString().slice(0, 10);
    let { name, surname, email, password,  username,} = req.body;
    // let cart;
    // if (userRole === "" || userRole === null) {
    //   userRole = "user";
    // }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
      let user = {
        name: name,
          surname: surname,
          email: email,
        password: hash,
        username: username,
    };
    con.query(
      sql,
        [
        user.name,
        user.surname,
        user.email,
        user.password,
        user.username,
          
      ],
      (err, result) => {
        if (err) throw err;
        console.log(result);
        // res.json(`User ${(user.fullname, user.email)} created successfully`);
        res.json({
          msg: "Regitration Successful",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}

async function Verify(req, res) {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: " client must authenticate!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
}

module.exports = {
  Login,
  Register,
  Verify,
};