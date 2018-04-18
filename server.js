"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const axios       = require('axios');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const bcrypt      = require('bcrypt');
const stripe      = require('stripe')("sk_test_U3Ww6tPuCCQruhOiLMtFgLBg")
const session     = require('express-session');
const nodemailer  = require('nodemailer');
const request     = require('request');
const Airtable    = require('airtable');
const base        = new Airtable({apiKey: 'keyljw93pxQj3jgzN'}).base('appFavqH50Zhl3Wpf');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const staticPages = require("./routes/staticPages");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(session(
  {
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
  }
));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.json());
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
app.use("/", staticPages)

let dynamicNavPouchNameObject = {};
let dynamicNavBigBoxNameObject = {};
let nutritionInfoArray = [];

function getNavPouches() {
  knex.select('pouch_name', 'quick_desc')
      .from('pouches')
  .then((pouchResponse)=> {
    //console.log('a pouch response has been received. this might actually work', pouchResponse);
    console.log('pouch IS RIGHT HERE ', pouchResponse)
    dynamicNavPouchNameObject = {
      pouchNames: pouchResponse
    };
    console.log(dynamicNavPouchNameObject)
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
    console.log(dynamicNavBigBoxNameObject)
  })
}

function getNutritionInfo(snackName) {
  base('Snack Nutrition Info').select({
    // Selecting the first 3 records in Grid view:
    // maxRecords: 3,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      if(record.get('Snack Name') === snackName) {
        console.log('Retrieved', record.get('Quality Characteristics'), '~', record.get('Results'));
        const nutritionObj = {
          //[record.get('Quality Characteristics')]: record.get('Results')
          characteristic: record.get('Quality Characteristics'),
          result: record.get('Results')
        }
        nutritionInfoArray.push(nutritionObj)
        console.log("PUSHED.")
      }
    });
    console.log("KEMCHO", nutritionInfoArray)
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}

app.get('/email', (req, res) => {
  //url structure: /email/?all=true&template={templateName}
  //or
  //url structure: /email/?test=true&template={templateName}&to={emailAddress}
  console.log("KCDJKdns", req.query)

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hello.calobox@gmail.com',
      pass: process.env.NODEMAILER_PASS
    }
  });

  // let mailOptions = {
  //   from: 'Calobox',
  //   to: req.params.email,
  //   subject: `Welcome to Calo Club!`,
  //   html: { path: 'emailTemplates/caloClub1.html' }
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("THERE IS AN ERROR", error)
  //     res.send("There has been an error, maybe you used the wrong email? Not sure.")
  //   }
  //     console.log('Message %s sent: %s', info.messageId, info.response)
  //     res.send("Email sent. Now LEAVE ME ALONE.")
  // });

  if(req.query.all === 'true') {
    knex.select('*')
      .from('users')
    .then(users => {
      console.log("res sauce", users)
      users.map(user => {

        let mailOptions = {
          from: 'Calobox',
          to: user.email,
          subject: `Calo Club Email Update!`,
          html: { path: `emailTemplates/${req.query.template}.html` }
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("THERE IS AN ERROR", error)
            res.send("There has been an error, maybe you used the wrong email or url? Not sure.")
          }
            console.log('Message %s sent: %s', info.messageId, info.response)
            res.send("Email sent. Now LEAVE ME ALONE.")
        });

      })
    })
  } else if (req.query.test === 'true') {
    let mailOptions = {
      from: 'Calobox',
      to: req.query.to,
      subject: `Calo Club Email Update!`,
      html: { path: `emailTemplates/${req.query.template}.html` }
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("THERE IS AN ERROR", error)
        res.send("There has been an error, maybe you used the wrong email or url? Not sure.")
      }
        console.log('Message %s sent: %s', info.messageId, info.response)
        res.send("Email sent. Now LEAVE ME ALONE.")
    });
  } else if (!req.query.test || !req.query.all) {
    res.send("WRONG. FAKE NEWS. INCOORECT URL.")
  }

})

app.post('/postToStyledge', (req, res) => {
  console.log('ORDER ON THE BACKEND, ', req.body.orderInfo)
  var order = req.body.orderInfo;
  let productDescArray = [];
  order.items.map(item => {
    console.log("item name: ", item.name)
    console.log('item quantity: ', item.quantity)
    const itemString = `${item.quantity} --> ${item.name}`;
    console.log("ITEM STRING: ", itemString)
    productDescArray.push(itemString)
  })
  console.log("PRODUCT DESC ARRAY: ", productDescArray.toString())
  var productDescString = productDescArray.toString();

  request.post({
    url:'http://ship.styledgeshop.com/api/create/package.php',
    form: {
      user: 'calofoods',
      password: 'styledge123',
      order_no: order.invoiceNumber,
      consignee: order.shippingAddress.fullName,
      city: order.shippingAddress.city,
      state: order.shippingAddress.provice,
      address: order.shippingAddress.address1,
      address2: order.shippingAddress.address2,
      Pincode: order.shippingAddress.postalCode,
      phone: order.shippingAddress.phone,
      weight: order.totalWeight,
      mode: 'COD',
      emailc: order.email,
      amount: order.total,
      product: productDescString
    }
  },
    function(err,httpResponse,body){
      var status = {};
      if (err) {
        console.log("REQUEST ERROR", err);
        status = {
          code: 401,
          message: "Post request not successful."
        }
        res.send(JSON.stringify(status))
      } else if (body) {
        status = {
          code: 200,
          message: "Post request made successfully."
        };
        console.log("REQUEST BODY, ", body);
        res.send(JSON.stringify(status))
      }
  })

})

app.post("/webhooks/shipping", (req, res) => {
  console.log("HEY, Hi, how are you? are you looking for this? ", req.body);
  console.log("You sure got it right!")
  let shippingRate;
  var total = req.body.content.summary.subtotal;

  if(total < 500) {
    shippingRate = {
      "rates": [
        {
          "cost": 70,
          "description": "Rs. 70 standard shipping"
        }
      ]
    };
    res.status(200);
    res.send(shippingRate);
  } else if (total >= 500){
    shippingRate = {
      "rates": [
        {
          "cost": 0,
          "description": "Free shipping!"
        }
      ]
    };
    res.status(200);
    res.send(shippingRate);
  }

})

// app.get("/yolo/:snackName", (req, res) => {
//   getNutritionInfo(req.params.snackName)
//   setTimeout(function() {
//     console.log("Does this work? OR NOT?", nutritionInfoArray)
//   }, 1000);
//   res.send("CHECK CONSOLE.")
// })


// Home page
app.get("/", (req, res) => {
  console.log("REQ.SESSION", req.session);
  if(req.session.userID){
    knex.select('*')
        .from('pouches')
    .then(function(response){
      console.log("response, ", response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          userID: req.session.userID,
          name: req.session.name,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames,
          response: response
        };
        res.render('home', templateVars)
      }, 500);
    })
  } else {
    knex.select('*')
        .from('pouches')
    .then(function(response){
      console.log("RESPONSE, ", response)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          userID: null,
          name: null,
          email: null,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames,
          response: response
        };
        res.render("home", templateVars)
      }, 500);
    })
  }
});


app.get('/login', (req, res)=> {
  if(req.session.userID) {
    res.redirect('/')
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
      }
      res.render('login', templateVars)
    }, 500);
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
      // res.send(JSON.stringify(templateVars));
      res.redirect('/');
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
        name: null,
        userID: null,
        email: null,
        dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
        dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
      }
      res.render('register', templateVars)
    }, 500);
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

      //email one
      let transporter1 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hello.calobox@gmail.com',
          pass: process.env.NODEMAILER_PASS
        }
      });

      let mailOptions1 = {
        from: 'Calobox',
        to: req.body.email,
        subject: `Welcome to Calobox!`,
        html: { path: 'emailTemplates/welcome.html' }
      };

      transporter1.sendMail(mailOptions1, (error, info) => {
        if (error) {
          console.log("THERE IS AN ERROR", error)
        }
          console.log('Message %s sent: %s', info.messageId, info.response)
      });


      //email two
      let transporter2 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hello.calobox@gmail.com',
          pass: process.env.NODEMAILER_PASS
        }
      });

      let mailOptions2 = {
        from: 'Calobox',
        to: req.body.email,
        subject: `Welcome to Calo Club!`,
        html: { path: 'emailTemplates/caloClub1.html' }
      };

      transporter2.sendMail(mailOptions2, (error, info) => {
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
      // res.send(JSON.stringify(templateVars));
      res.redirect('/');
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
      const sortedResponse = response.sort((a, b) => a.pouch_price - b.pouch_price)
      console.log("sortedResponse is here!!", sortedResponse)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: sortedResponse,
          name: req.session.name,
          userID: req.session.userID,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("pouches", templateVars);
      }, 500);
    })
  } else {
    knex.select('*')
        .from('pouches')
    .then((response)=> {
      // console.log("YEH RESPONSE HAI", response);
      const sortedResponse = response.sort((a, b) => a.pouch_price - b.pouch_price)
      console.log("sortedResponse is here!!", sortedResponse)
      getNavPouches();
      getNavBoxes();
      setTimeout(function() {
        var templateVars = {
          response: sortedResponse,
          name: null,
          userID: null,
          email: null,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
        };
        //console.log(templateVars.boxImage);
        res.render("pouches", templateVars);
      }, 500);
    })
  }
})

// getNutritionInfo(req.params.snackName)
//   setTimeout(function() {
//     console.log("Does this work? OR NOT?", nutritionInfoArray)
//   }, 1000);

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
      getNutritionInfo(req.params.product_name);
      setTimeout(function() {
        var templateVars = {
          response: response,
          userID: req.session.userID,
          name: req.session.name,
          email: req.session.email,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames,
          nutritionArray: nutritionInfoArray
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
      getNutritionInfo(req.params.product_name);
      setTimeout(function() {
        console.log("SEnDING TO THE FRONTEND", nutritionInfoArray)
        var templateVars = {
          userID: null,
          name: null,
          email: null,
          response: response,
          dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
          dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames,
          nutritionArray: nutritionInfoArray
        }
        res.render("individual-pouch-page", templateVars);
        nutritionInfoArray = [];
      }, 1000);
    })
    // nutritionInfoArray = [];
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
      }, 500);
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
      }, 500);
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
      }, 500);
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
      }, 500);
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
