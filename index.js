const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));


//middleware 1
// app.use(function(req, res, next) {
//     req.myName = 'protyush';
//     console.log('middleware 1 is called!');
//     next();
// })

// //middleware 2
// app.use(function(req, res, next) {
//     console.log('my name from MW1 is', req.myName);
//     console.log('middleware 2 is called!');
//     next();
// });

//  var contactList = [
//      {
//          name : 'Elon Musk',
//          phone : "1234567890"
//      },
//      {
//          name : 'Bill Gates',
//          phone : "9876245367"
//      },
//      {
//          name : 'Steve Jobs',
//          phone : "9876542221"
//      }
//  ]



app.get('/', function(req, res) {
    console.log('My name from app.get controller is', req.myName);

    Contact.find({}, function(err,contacts) {
        if(err){
            console.log('Error in frtching contacts from the db');
            return;
        }

        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    });
    // return res.render('home', {
    //     title : "My Contacts List",
    //     contact_list : contacts
    // });
});


// app.get('/practice', function(req,res) {
//     return res.render('practice', {
//         title : "Playground"
//     });
// });

//without using mongo DB , creating the contact list
// app.post('/create-contact', function(req,res){
//     //console.log(req);
//     // console.log(req.body);
//     // console.log(req.body.name);
//     // console.log(req.body.phone);
    
//     
//     // contactList.push({
//     //     name : req.body.name,
//     //     phone : req.body.phone
//     // });

//     // return res.redirect("/");

// });


//using mongo db to create the contact list
app.post('/create-contact', function(req, res){
    
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});

// app.get('/delete-contact/', function(req,res) {
//     //using string params to get the id, we have to pass the route as /detele-contact/:param
//     console.log(req.params);
//     console.log(req.params.phone);

//     //using query params to get the id, we have to pass the route as /detele-contact
//     console.log(req.query);
//     console.log(req.query.phone);

//     console.log(req.query);
//     let phone = req.query.phone;
//     let contactIndex = contactList.findIndex(person => person.phone === phone);

//     if(contactIndex !== -1) {
//     contactList.splice(contactIndex,1);
//     }

//     return res.redirect("back");
    
// });

app.get('/delete-contact/', function(req,res) {
    console.log(req.query);
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting the contact');
            return;
        }
        return res.redirect('back');
    })
});


app.listen(port, function(err) {
    if(err) {
        console.log('error:', err);
    }
    else {
        console.log('listening on port:', port);
    }
});