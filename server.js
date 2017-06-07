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
  knex
      .select('*')
      .from('caloassortments')
      .then(function(response){
        //now that everything has been selected,
        //send in everything through template vars
        //and display on boxes page as cards.
        console.log("YEH RESPONSE HAI", response);
        console.log("image", response[0].box_image_url)

        var templateVars = {response: response};
        console.log(templateVars.boxImage);
        res.render("boxes", templateVars);
      })
})


app.get("/boxes/:id", (req, res) => {
  console.log("req",req.params)
  console.log("req",req.body)
  console.log("name",req.body.name)
  knex.select('*').from('caloassortments').where('box_id','=', req.params.id).then(function(response){
    console.log("YEH RESponse hai",response)
    var templateVars = {
      response: response
    }
    res.render("individual-box-page", templateVars);
  })
})


app.get("/dashboard", (req, res) => {
  if (req.session.userID){
    console.log("req.session.userID", req.session.userID)
    knex('calousers')
      .join('caloassortments_subscribed_to', 'users_id', 'caloassortments_subscribed_to.subscriber_id')
      .join('caloassortments', 'box_id', 'caloassortments_subscribed_to.assortment_id')
      .select('*')
      .where({users_id: req.session.userID})
      .then(function(subResponse){
        if(!subResponse[0]){
          console.log("the response is null");
          knex('calousers')
          .join('caloassortments_bought', 'users_id', 'caloassortments_bought.subscriber_id')
          .join('caloassortments', 'box_id', 'caloassortments_bought.assortment_id')
          .select('*')
          .where({users_id: req.session.userID})
          .then(function(buyResponse){
            console.log("buyResponse", buyResponse)
            var buyTemplateVars = {
            userID: req.session.userID,
            response: buyResponse
            }
            res.render("customer-dash", buyTemplateVars)
          })
        } else {
          console.log("YEH RESPONSE HAI",subResponse[0])
          var subTemplateVars = {
            userID: req.session.userID,
            response: subResponse
          }
          res.render('customer-dash', subTemplateVars)
        }
      })
  }else{
    res.redirect("/")
  }
})

// app.get("/boxes/:id", (req, res) => {
//   knex('caloassortments').select('*').where('')
// })

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
        console.log("RESPONSE BEFORE SECOND KNEX QUERY", resp)
        knex.select('users_id')
            .from('calousers')
            .where({email: req.body.Email})
            .then(function(resp){
              console.log("RESPONSE AFTER THE SECOND KNEX QUERY", resp)
              //res.send("DONE")
              //SET COOKIE HERE
              console.log("req.session.userID before", req.session.userID)
              req.session.userID = resp[0].users_id;
              console.log("req.session.userID after", req.session.userID)
              res.redirect("/dashboard");
            })
      })
    } else {
      return res.send("PASSWORD ENTERED DOES NOT MATCH. TRY AGAIN SUCKA!");
    }
  } else {
    return res.send("Your form is empty. Try again.");
  }
})


app.post("/login", (req, res) => {
  knex('calousers').where({
    email: req.body.loginEmail
  }).select('*')
  .then(function(response){
    console.log("THIS IS THE RESPONSE", req.body.loginPass)
    console.log("THIS IS THE RESPONSE also", response[0].password_hash)
    console.log("this is the response that hopefully has the id:", response);
    console.log("this is the also response that hopefully has the id:", response[0].users_id);
    var passMatch = bcrypt.compareSync(req.body.loginPass, response[0].password_hash);
    if (passMatch === true){
      req.session.userID = response[0].users_id;
      console.log('session with userID', req.session.userID);
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

// knex('calousers').where({email: req.body.loginEmail}).select('*').then(function(response){
//   console.log("this is the response that hopefully has the id:", response);
// })


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
