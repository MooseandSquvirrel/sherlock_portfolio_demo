var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {message: false});
});

router.post('/', function(req, result, next) {
  console.log(req.body.password)
  email = req.body.email
  password = req.body.password
  let db = new sqlite3.Database('REDACTED', (err) => {
    if (err) {
      return console.error(err.message);
    } else {
      let sql = 'SELECT one email, two pwd FROM sher_auth WHERE one = ?';
      console.log('Connected to the in-memory SQlite database.');
      db.get(sql, [email], (err, row) => {
        if (err) {
          throw err;
        }
        if (row == undefined){
          console.log("undefined")
          result.render('login', {message:"Try Again."})
        } else {
          bcrypt.compare(req.body.password, row.pwd, function(err, res) {
            if (err) {
              console.log(err)
              result.render('login', {message:"Try Again."})
            } 
            if (res && email == 'REDACTED') {
              result.render('index', {cadet: "Who's it gonna be.", answer: "Tis time to deduce..."})
            } else {
              result.render('login', {message:"Try Again."})
            }
          })
        }
        
      });
  
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });

    }
  });
});

// UNCOMMENT IF CREATING USER REGISTRATION 

// router.get('/create', function(req, res, next) {
//   res.render('register', {message: false});
// });

// router.post('/create', function(req, result, next) {
//   pwd = req.body.password
//   pwd2 = req.body.passwordTwo
//   email = req.body.email
//   if (pwd != pwd2) {
//     console.log("Passwords don't match.")
//     message = "Passwords don't match."
//     result.render('register', {message: true});
//   } else {
//     bcrypt.hash(pwd, 10, function(err, hash) {
//       let db = new sqlite3.Database('/Users/agardner/sherlock_holmes/git_sherlock/sherlock/public/images/sherlock_db', (err) => {
//         if (err) {
//           return console.error(err.message);
//         } else {
//           console.log("Connection to db")
//         }
//         db.run('INSERT INTO sher_auth (one, two) VALUES( ?, ? )', [email, hash], function(err){
//           if (err) {
//             console.log(err)
//           } else {
//             console.log("User: " + email + " added to db.")
//             console.log("pwd: " + hash)
//             result.render('login', {message: false });
//           }
//         });
//       });
//     });
//   }
// });

module.exports = router;
