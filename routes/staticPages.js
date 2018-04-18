const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const nodemailer  = require('nodemailer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

var dynamicNavPouchNameObject = {};
var dynamicNavBigBoxNameObject = {};

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

// router.get('/contact-us', (req, res)=> {
//   if (req.session.userID) {
//     getNavPouches();
//     getNavBoxes();
//     setTimeout(function() {
//       var templateVars = {
//         name: req.session.name,
//         userID: req.session.userID,
//         email: req.session.email,
//         dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
//         dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
//       };
//       res.render("contact", templateVars);
//     }, 500);
//   } else {
//     getNavPouches();
//     getNavBoxes();
//     setTimeout(function() {
//       var templateVars = {
//         name: null,
//         userID: null,
//         email: null,
//         dynamicNavPouchNames: dynamicNavPouchNameObject.pouchNames,
//         dynamicNavBigBoxNames: dynamicNavBigBoxNameObject.bigBoxNames
//       };
//       res.render("contact", templateVars);
//     }, 500);
//   }
// })

// router.post('/contactEmail', (req, res)=> {
//   console.log('req.body', req.body)

//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'hello.calobox@gmail.com',
//       pass: process.env.NODEMAILER_PASS
//     }
//   });

//   let mailOptions = {
//     from: req.body.email,
//     to: 'hello@calobox.in',
//     subject: `${req.body.pName} wants to get in touch.`,
//     text: `${req.body.pName}, ${req.body.email}, ${req.body.message}`,
//     html: `<div><h4>${req.body.pName} (${req.body.pNumber}) ~ ${req.body.email}</h4> <p>${req.body.message}</p></div>`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("THERE IS AN ERROR",error)
//       var templateVar = {
//         message: "There has been a problem. Please try to contact us later. Or send us an email <a href='mailto:info@calobox.in'>here</a>."
//       }
//       res.send(JSON.stringify(templateVar))
//     }
//       console.log('Message %s sent: %s', info.messageId, info.response)
//       var templateVar = {
//         message: "Thank you for writing to us. We will get back to you very soon."
//       }
//       res.send(JSON.stringify(templateVar))
//   });
// })

router.get('/calo-club', (req, res) => {
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
      res.render("calo_club", templateVars);
    }, 500);
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
      res.render("calo_club", templateVars);
    }, 500);
  }
})

router.get('/about-us', (req, res)=> {
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
    }, 500);
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
    }, 500);
  }
})

router.get('/how-it-works', (req, res) => {
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
    }, 500);
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
    }, 500);
  }
})

router.get('/faq', (req, res) => {
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
      res.render("faq", templateVars);
    }, 500);
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
      res.render("faq", templateVars);
    }, 500);
  }
})

router.get('/calo-freaks', (req, res) => {
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
      res.render("caloFreaks", templateVars);
    }, 500);
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
      res.render("caloFreaks", templateVars);
    }, 500);
  }
})

router.get('/events', (req, res)=> {
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
    }, 500);
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
    }, 500);
  }
})

router.get('/nutrition-prep', (req, res) => {
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
    }, 500);
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
    }, 500);
  }
})

router.get('/health-safety', (req, res) => {
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
    }, 500);
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
    }, 500);
  }
})

router.get('/calo-recipes', (req, res) => {
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
      res.render("caloRecipes", templateVars);
    }, 500);
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
      res.render("caloRecipes", templateVars);
    }, 500);
  }
})


module.exports = router;
