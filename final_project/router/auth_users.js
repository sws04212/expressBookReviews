const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
    // Check if email is provided in the request body
    if (req.body.email) {
      // Create or update user's details based on the provided email
      const email = req.body.email;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const DOB = req.body.DOB;
  
      users[email] = {
        firstName: firstName,
        lastName: lastName,
        DOB: DOB
      };
  
      // Send response indicating user addition
      res.send(`The user ${firstName} has been added!`);
    } else {
      // Send response indicating missing email
      res.status(400).send("Email is required.");
    }
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.username; // Assuming the username is stored in the session
    const existingReviewIndex = books.findIndex(book => book.isbn === isbn && book.reviews.some(review => review.username === username));
    if (existingReviewIndex !== -1) {
      const existingReview = books[existingReviewIndex].reviews.find(review => review.username === username);
      existingReview.review = req.query.review; // Assuming the review is passed as a query parameter
      res.send(`Review for ISBN ${isbn} has been updated for user ${username}.`);
    } else {
      const newReview = {
        username: username,
        review: req.query.review // Assuming the review is passed as a query parameter
      };
      const bookIndex = books.findIndex(book => book.isbn === isbn);
      if (bookIndex !== -1) {
        books[bookIndex].reviews.push(newReview);
        res.send(`Review for ISBN ${isbn} has been added for user ${username}.`);
      } else {
        const newBook = {
          isbn: isbn, reviews: [newReview]
        };
        books.push(newBook);
        res.send(`Review for ISBN ${isbn} has been added for user ${username}.`);
      }
    }
  });

regd_users.delete("/auth/review/:isbn", (req, res) => {
    // Extract email parameter from request URL
    const reviews = req.params.reviews;
    if (reviews) {
        // Delete friend from 'friends' object based on provided email
        delete users[reviews];
    }
    
    // Send response confirming deletion of friend
    res.send(`book review deleted.`);
})


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
