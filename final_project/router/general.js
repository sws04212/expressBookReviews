const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
   // Check if email is provided in the request body
   if (req.body.email) {
    // Create or update friend's details based on provided email
    users[req.body.email] = {
        "firstName": req.body.firstName,
        // Add similarly for lastName
        // Add similarly for DOB
    };
}
// Send response indicating user addition
res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
      res.send(JSON.stringify(books,null,4));
});

let myPromise = new Promise((resolve, reject) => {
    public_users.get('/', function (req, res) {
      res.send(JSON.stringify(books, null, 4));
      resolve(); // Resolve the promise when the response is sent
    });
  });
  
  myPromise
    .then(() => {
      console.log('Promise resolved');
    })
    .catch((error) => {
      console.error('Promise rejected:', error);
    });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });

 let myPromise2 = new Promise((resolve, reject) => {
    public_users.get('/isbn/:isbn', function (req, res) {
      const isbn = req.params.isbn;
      res.send(books[isbn]);
      resolve(); // Resolve the promise when the response is sent
    });
  });
  
  myPromise2
    .then(() => {
      console.log('Promise resolved');
    })
    .catch((error) => {
      console.error('Promise rejected:', error);
    });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const matchingBooks = books.filter(book => book.author === author);
  if (matchingBooks.length === 0) {
    res.status(404).send('No book details found for the provided author.');
  } else {
    res.send(matchingBooks);
  }
});

let myPromise3 = new Promise((resolve, reject) => {
    public_users.get('/author/:author', function (req, res) {
      const author = req.params.author;
      const matchingBooks = books.filter((book) => book.author === author);
      if (matchingBooks.length === 0) {
        res.status(404).send('No book details found for the provided author.');
      } else {
        res.send(matchingBooks);
      }
      resolve(); // Resolve the promise when the response is sent
    });
  });
  
  myPromise3
    .then(() => {
      console.log('Promise resolved');
    })
    .catch((error) => {
      console.error('Promise rejected:', error);
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const matchingBooks = books.filter(book => book.title === title);
  if (matchingBooks.length === 0) {
    res.status(404).send('No books found for the provided title.');
  } else {
    res.send(matchingBooks);
  }
});

let myPromise4 = new Promise((resolve, reject) => {
    public_users.get('/title/:title', function (req, res) {
      const title = req.params.title;
      const matchingBooks = books.filter((book) => book.title === title);
      if (matchingBooks.length === 0) {
        res.status(404).send('No books found for the provided title.');
      } else {
        res.send(matchingBooks);
      }
      resolve(); // Resolve the promise when the response is sent
    });
  });
  
  myPromise4
    .then(() => {
      console.log('Promise resolved');
    })
    .catch((error) => {
      console.error('Promise rejected:', error);
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const matchingBooks = books.filter(book => book.isbn === isbn);
  if (matchingBooks.length === 0) {
    res.status(404).send('No book reviews found for the provided isbn.');
  } else {
    res.send(matchingBooks);
  }
});

module.exports.general = public_users;
