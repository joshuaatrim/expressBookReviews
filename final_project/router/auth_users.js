const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
      //ensure username and password were provided
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
      //check that provided credentials match what is registered  
    if (authenticatedUser(username,password)) {
        //sign an access token on success
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 }); //60*60 seconds = 1 hour.
  
      //use this token/username as this session authorization
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});
  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn
  let reviews = books[isbn].reviews
  let username = req.session.authorization.username
  let newReview = req.query.message

  reviews[username] = newReview

  return res.status(200).json({message: "Successfully added review"});
});


//deleter review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn
    let username = req.session.authorization.username
    let review = books[isbn].reviews[username]
  
    if(review) {
        delete (books[isbn].reviews[username])
        return res.status(200).json({message: "Successfully deleted review"});
    }
    else {
        return res.status(200).json({message: "No review to delete"});
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
