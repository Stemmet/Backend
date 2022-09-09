const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
// const middleware = require("../middleware/auth");  if middleware needed

//tst comment. get all comments
router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM Comments", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});
//get comments for a blog post
router.get("/blogposts/:id", (req, res) => {

    try {  //get the comments with the same blog post id from the route paramters 
        con.query(`SELECT * FROM Comments WHERE blogpostID = "${req.params.id}"`, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post("/",(req,res) => {
 
    try { // to post a comment first get the blog post id 
        con.query(`SELECT * FROM BlogPosts WHERE id = "${req.body.blogpostID}" `, (err, result) => {
            if (err) throw err.message;
           if(result === 0){
               res.send("no such post")}
            else{
                const comment = {
                    userID: req.body.userID,
                    blogpostID: req.body.blogpostID,
                    comment:req.body.comment,
                    comUsername:req.body.comUsername
                  } 
                  try {
                    let sql = "INSERT INTO Comments SET ?"
                    con.query(sql, comment
                      , (err, result) => {
                        if (err) throw err.message;
                        res.send(result)})
                  } catch (error) {
                      console.log(error);
                      res.status(400).send(error)
                  }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete("/:id",(req, res) => {
    // if (user.user_type === "admin") {
        try {
            con.query(`DELETE FROM Comments WHERE id = "${req.params.id}"`, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    // } else {
    //     res.send("Access Denied");
    // }
});

module.exports = router;