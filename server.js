"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt      = require('bcrypt');
const stripe      = require('stripe')("sk_test_U3Ww6tPuCCQruhOiLMtFgLBg")
const session     = require('express-session');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(session({secret: 'ssshhhhh', resave: true,
    saveUninitialized: true}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
//app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  console.log("REQ.SESSION", req.session);
  console.log("req.session.email", req.session.email)
  if(req.session.email){
    res.redirect("/dashboard");
  } else {
    res.render("home")
  }
});


//Publishable:    pk_test_zpgFMVyId6qVSFL5slAhndxM
//Secret:         sk_test_U3Ww6tPuCCQruhOiLMtFgLBg


app.get("/boxes", (req, res) => {
  res.render("boxes")
})

app.get("/dashboard", (req, res) => {
  if (req.session.email){
    console.log("req.session.email", req.session.email)
    var templateVars = {
      emale: req.session.email
    }
    res.render("customer-dash", templateVars)
  }else{
    res.redirect("/")
  }

})

// app.get("/boxes/:id", (req, res) => {
//   knex('caloassortments').select('*').where('')
// })

app.post("/sign-up", (req, res) => {
  console.log(req.body);
  if (req.body.name !== '' && req.body.email !== '' && req.body.Password !== '' && req.body.PasswordConfirm !== ''){
    if (req.body.Password === req.body.PasswordConfirm) {
      var hashedPassword = bcrypt.hashSync(req.body.PasswordConfirm, 10);
      console.log(req.body.Password);
      console.log(hashedPassword);
      knex('calousers')
      .insert([{
                full_name: req.body.Name,
                email: req.body.Email,
                password_hash: hashedPassword
              }])
      .then(function (resp){
        console.log(resp)
        //res.send("DONE")
        //SET COOKIE HERE
        console.log("req.session", req.session)
        console.log("req.session.email", req.session.email)
        req.session.email = req.body.Email;
        console.log("ACTUAL THING:", req.session.email)
        res.redirect("/dashboard");
      })
    } else {
      return res.send("PASSWORD ENTERED DOES NOT MATCH. TRY AGAIN SUCKA!");
    }
  } else {
    return res.send("Your form is empty. Try again.");
  }
})

app.get('/logout', (req, res) => {
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log(req.session)
    res.redirect('/');
  }
})
});

app.post("/charge", (req, res) =>{
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: 'inr',
    source: token
  }, function (err, charge){
    if (err && err.type === "StripeCardError"){
      console.log("card declined")
    } else {
      res.redirect("/")
    }
  })
})

app.post("/login", (req, res) => {
  knex('calousers').where({
    email: req.body.loginEmail
  }).select('password_hash')
  .then(function(response){
    console.log("THIS IS THE RESPONSE", req.body.loginPass)
    console.log("THIS IS THE RESPONSE also", response[0].password_hash)
    var passMatch = bcrypt.compareSync(req.body.loginPass, response[0].password_hash);
    if (passMatch === true){
      req.session.email = req.body.loginEmail;
      // var templateVars = {
      //   emale: req.session.email
      // }
      res.redirect('/dashboard'/*, templateVars*/)
    } else {
      //console.log("THIS IS THE ERROR", err);
      res.send("I DONT KNOW YOU. SIGN UP FIRST SUCKA.")
    }
  })
})




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
