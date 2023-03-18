const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;

  if(username && password) {
    let matchedusers = users.filter((user) => {
        return username === user.username
    })
    if(matchedusers.length > 0 ){
        return res.status(404).json({message: "User already exists!"});
    }
    else {
        users.push({"username":username, "password":password})
        return res.status(200).json({message: "User successfully registered."});
    }
  } else {
      return res.status(200).json({message: "Unable to register user."});
  }
});

/*
// Get the book list available in the shop synchronously
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books));
});
*/

// Get the book list available in the shop USING PROMISES
public_users.get('/',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        let response = res.status(200).send(JSON.stringify(books))
        resolve(response);
    });
    myPromise.then((response) => {
        return response
    })
});


/*
// Get book details based on ISBN SYNCHRONOUSLY
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn]));
 });
 */

 // Get book details based on ISBN using PROMISES
public_users.get('/isbn/:isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        let isbn = req.params.isbn;
        let response = res.status(200).send(JSON.stringify(books[isbn]));
        resolve(response);
    });
    myPromise.then((response) => {
        return response
    })
});


/*
// Get book details based on author SYNCHRONOUSLY
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let matchedbooks = []
  for(isbn in books) {
    let book = books[isbn];
    if(author === book.author) {
        matchedbooks.push(book);
    }
  }
  return res.status(200).send(JSON.stringify(matchedbooks));
});
*/

// Get book details based on author using PROMISES
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let matchedbooks = []
    for(isbn in books) {
      let book = books[isbn];
      if(author === book.author) {
          matchedbooks.push(book);
      }
    }

    let myPromise = new Promise((resolve,reject) => {
        let response = res.status(200).send(JSON.stringify(matchedbooks));
        resolve(response);
    });
    myPromise.then((response) => {
        return response
    })
});

/*
// Get all books based on title SYNCHRONOUSLY
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let matchedbooks = [];
  for(isbn in books) {
    let book = books[isbn];
    if(title === book.title) {
        matchedbooks.push(book);
    }
  }
  return res.status(200).send(JSON.stringify(matchedbooks));
});
*/
// Get all books based on title using PROMISES
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let matchedbooks = [];
    for(isbn in books) {
      let book = books[isbn];
      if(title === book.title) {
          matchedbooks.push(book);
      }
    }
    let myPromise = new Promise((resolve,reject) => {
        let response = res.status(200).send(JSON.stringify(matchedbooks));
        resolve(response);
    });
    myPromise.then((response) => {
        return response
    })
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn]
  if(book) {
      let reviews = book["reviews"]
      if(!Object.keys(reviews).length) {
        return res.status(204).json({message: "No reviews for this book yet."})
      } else {
      return res.status(200).send(JSON.stringify(reviews));
      }
  }
});

module.exports.general = public_users;
