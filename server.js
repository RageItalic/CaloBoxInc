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
const nodemailer  = require('nodemailer');

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

var dynamicNavPouchNameObject = {};
var dynamicNavBigBoxNameObject = {};

function getNavPouches() {
  knex.select('pouch_name')
      .from('pouches')
  .then((pouchResponse)=> {
    //console.log('a pouch response has been received. this might actually work', pouchResponse);
    console.log('pouch', pouchResponse)
    dynamicNavPouchNameObject = {
      pouchNames: pouchResponse
    };
    console.log('bhai yeh kya hai?', dynamicNavPouchNameObject)
  })
}

function getNavBoxes() {
  knex.select('big_box_name')
      .from('big_boxes')
  .then((bigBoxResponse)=> {
    console.log('big box', bigBoxResponse)
    dynamicNavBigBoxNameObject = {
      bigBoxNames: bigBoxResponse
    };
    console.log('bhai tu theek toh hai na?', dynamicNavBigBoxNameObject)
  })
}

// Home page
app.get("/", (req, res) => {
  console.log("REQ.SESSION", req.session);
  if(req.session.userID){
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        userID: req.session.userID,
        name: req.session.name,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render('home', templateVars)
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        userID: null,
        name: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("home", templateVars)
    }, 1000);
  }
});

app.get('/contact-us', (req, res)=> {
  if (req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("contact", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("contact", templateVars);
    }, 1000);
  }
})

app.post('/contactEmail', (req, res)=> {
  console.log('req.body', req.body)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hello.calobox@gmail.com',
      pass: process.env.NODEMAILER_PASS
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: 'hello@calobox.in',
    subject: `${req.body.pName} wants to get in touch.`,
    text: `${req.body.pName}, ${req.body.email}, ${req.body.message}`,
    html: `<div><h4>${req.body.pName} (${req.body.pNumber}) ~ ${req.body.email}</h4> <p>${req.body.message}</p></div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("THERE IS AN ERROR",error)
      var templateVar = {
        message: "There has been a problem. Please try to contact us later. Or send us an email <a href='mailto:info@calobox.in'>here</a>."
      }
      res.send(JSON.stringify(templateVar))
    }
      console.log('Message %s sent: %s', info.messageId, info.response)
      var templateVar = {
        message: "Thank you for writing to us. We will get back to you very soon."
      }
      res.send(JSON.stringify(templateVar))
  });
})

app.get('/about-us', (req, res)=> {
  if (req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("about", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("about", templateVars);
    }, 1000);
  }
})

app.get('/how-it-works', (req, res) => {
  if(req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("howItWorks", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("howItWorks", templateVars);
    }, 1000);
  }
})

app.get('/calo-freaks', (req, res) => {
  if(req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("comingSoon", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("comingSoon", templateVars);
    }, 1000);
  }
})

app.get('/events', (req, res)=> {
  if(req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("events", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("events", templateVars);
    }, 1000);
  }
})

app.get('/nutrition-prep', (req, res) => {
  if(req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("nutritionAndPrep", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("nutritionAndPrep", templateVars);
    }, 1000);
  }
})

app.get('/health-safety', (req, res) => {
  if(req.session.userID) {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: req.session.name,
        userID: req.session.userID,
        email: req.session.email,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("healthAndSafety", templateVars);
    }, 1000);
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      };
      res.render("healthAndSafety", templateVars);
    }, 1000);
  }
})

app.get('/login', (req, res)=> {
  if(req.session.userID) {
    res.redirect('/')
  } else {
    getNavPouches();
    getNavBoxes();
    setTimeout(function() {
      var templateVars = {
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      }
      res.render('login', templateVars)
    }, 1000);
  }
})

app.post("/loggingIn", (req, res) => {
  //new DB made. These routes should work.
  knex('users').where({
    email: req.body.email
  }).select('*')
  .then(function(response){
    // console.log("THIS IS THE RESPONSE also", response[0].password_hash)
    // console.log("this is the response that hopefully has the id:", response);
    // console.log("this is the also response that hopefully has the id:", response[0].users_id);
    var passwordEntered = req.body.password;
    var existingPassword = response[0].password_hash;
    var passMatch = bcrypt.compareSync(passwordEntered, existingPassword);
    if (passMatch === true){
      //The 3 lines below are fine. No need to change them.
      req.session.userID = response[0].users_id;
      req.session.name = response[0].first_name;
      req.session.email = response[0].email;
      //session exists now
      console.log('session with userID', req.session);
      var templateVars = {
        status: 200,
        message: null
      };
      res.send(JSON.stringify(templateVars));
    } else {
      //console.log("THIS IS THE ERROR", err);
      var templateVars = {
        status: 404,
        message: 'The email or password you entered is incorrect. Try again.'
      };
      res.send(JSON.stringify(templateVars));
    }
  }).catch((err) => {
    console.log('ERROROROROR', err);
    var templateVars = {
      status: 404,
      message: 'I dont know you... try <a href="/signup">signing up</a> first!'
    };
    res.send(JSON.stringify(templateVars));
  })
})

app.get('/signup', (req, res)=> {
  if(req.session.userID) {
    res.redirect('/')
  } else {
    getNavBoxes();
    getNavPouches();
    setTimeout(function() {
      var templateVars = {
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      }
      res.render('register', templateVars)
    }, 1000);
  }
})

app.post("/signingUp", (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.confirmPassword, 10);
  // console.log(req.body.confirmPassword);
  console.log(hashedPassword);
  //need entirely new DB the routes below will not work.
  knex('users')
  .insert([{
            first_name: req.body.fName,
            last_name: req.body.lName,
            email: req.body.email,
            password_hash: hashedPassword,
            phone_number: req.body.pNumber,
            address: null,
            zipcode: null
          }])
  .then(function(resp){
    console.log("RESPONSE BEFORE SECOND KNEX QUERY", resp)
    knex.select('*')
        .from('users')
        .where({
          email: req.body.email
        })
    .then(function(resp){

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hello.calobox@gmail.com',
          pass: process.env.NODEMAILER_PASS
        }
      });

      let mailOptions = {
        from: 'Calobox',
        to: req.body.email,
        subject: `Welcome to Calobox!`,
        html: { path: 'emailTemplates/welcome.html' }
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("THERE IS AN ERROR", error)
        }
          console.log('Message %s sent: %s', info.messageId, info.response)
      });

      //res.send("DONE")
      //SET COOKIE HERE
      console.log("req.session.userID before", req.session.userID)
      //The 3 lines below are fine. No need to change them.
      req.session.userID = resp[0].users_id;
      req.session.name = resp[0].first_name;
      req.session.email = resp[0].email;
      console.log("req.session after", req.session)
      var templateVars = {
        status: 200,
        message: null
      };
      res.send(JSON.stringify(templateVars));
    })
  }).catch((err) => {
    console.log('ERROR BUD', err)
    console.log('mmaybe this person already exists. email does have a .unique() thing in the db. Remember to handle this error.')
    var templateVars = {
      status: 404,
      message: 'I already know you... try <a href="/login">logging in</a> here!'
    };
    res.send(JSON.stringify(templateVars));
  })
})

//Publishable:    pk_test_zpgFMVyId6qVSFL5slAhndxM
//Secret:         sk_test_U3Ww6tPuCCQruhOiLMtFgLBg


app.get("/individual-snacks", (req, res) => {
  if (req.session.userID) {
    knex.select('*')
        .from('pouches')
    .then(function(response){
      //now that everything has been selected,
      //send in everything through template vars
      //and display on boxes page as cards.
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          name: req.session.name,
          userID: req.session.userID,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("pouches", templateVars);
      }, 1000);
    })
  } else {
    knex.select('*')
        .from('pouches')
    .then((response)=> {
      console.log("YEH RESPONSE HAI", response);
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          name: null,
          userID: null,
          email: null,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("pouches", templateVars);
      }, 1000);
    })
  }
})


app.get("/individual-snacks/:product_name", (req, res) => {
  if(req.session.userID) {
    console.log("req",req.params)
    console.log("req",req.body)
    console.log("name",req.body.name)
    knex.select('*')
        .from('pouches')
        .where('pouch_name','=', req.params.product_name)
    .then(function(response){
      console.log("YEH RESponse hai",response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          userID: req.session.userID,
          name: req.session.name,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        }
        res.render("individual-pouch-page", templateVars);
      }, 1000);
    })
  } else {
    console.log("req",req.params)
    knex.select('*')
        .from('pouches')
        .where('pouch_name','=', req.params.product_name)
    .then(function(response){
      console.log("YEH RESponse hai",response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        console.log('LOOOOOOOOOK', dynamicNavPouchNameObject.pouchNames.length)
        console.log('LOOOOOOOOOK again', dynamicNavBigBoxNameObject.bigBoxNames.length)
        var templateVars = {
          response: response,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames,
          userID: null,
          name: null,
          email: null
        }
        res.render("individual-pouch-page", templateVars);
      }, 1000);
    })
  }
})

app.get('/snack-boxes', (req, res)=> {
  if(req.session.userID) {
    knex.select('*')
        .from('big_boxes')
    .then((response)=> {
      console.log("YEH RESPONSE HAI", response);
      //console.log("image", response[0].box_image_url)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          name: req.session.name,
          userID: req.session.userID,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("big_boxes", templateVars);
      }, 1000);
    })
  } else {
    knex.select('*')
        .from('big_boxes')
    .then((response)=> {
      console.log("YEH RESPONSE HAI", response);
      //console.log("image", response[0].box_image_url)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          name: null,
          userID: null,
          email: null,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("big_boxes", templateVars);
      }, 1000);
    })
  }
})

app.get('/snack-boxes/:product_name', (req, res)=> {
  if (req.session.userID) {
    knex.select('*')
        .from('big_boxes')
        .where('big_box_name', '=', req.params.product_name)
    .then((response)=> {
      console.log("YEH RESponse hai",response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          userID: req.session.userID,
          name: req.session.name,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        }
        res.render("individual-big-box-page", templateVars);
      }, 1000);
    })
  } else {
    knex.select('*')
        .from('big_boxes')
        .where('big_box_name', '=', req.params.product_name)
    .then((response)=> {
      console.log("YEH RESponse hai",response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: response,
          userID: null,
          name: null,
          email: null,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        }
        res.render("individual-big-box-page", templateVars);
      }, 1000);
    })
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

app.use((req, res) => {
  res.send('404 error. No clue what you want. This page will be coming soon... I guess.')
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
