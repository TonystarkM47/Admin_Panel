var express = require('express');
var router = express.Router();
var glance = require('../Models/glance');
var admin_data = require('../Models/admin');
var user_data = require('../Models/user')
var category_data = require('../Models/category');
var product_data = require('../Models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/Add', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.post('/Add', function(req, res, next) {
  var body = {
    pname: req.body.txt1,
    pprice: req.body.txt2
  };
  var myd = new glance(body);
  myd.save(req.body)
    .then((data) => {
      res.redirect('/View'); // Redirect to the View page after insertion
    })
    .catch(err => {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    });
});
// here we will display 
router.get('/View', function(req, res, next) {
  glance.find()
    .then(data => {
      res.render('table', { products: data }); // Pass data to the view
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    });
});
//     Edit 
router.get('/edit/:id', (req, res, next) => {
  var myid = req.params.id;
  glance.findById(myid)
    .then(data => {
      res.render('edit', { product: data });
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    });
});

router.post('/edit/:id',(req, res, next) => {
  var myid = req.params.id;
  var product = {
    pname: req.body.txt1,
    pprice: req.body.txt2
  };
  glance.findByIdAndUpdate(myid,product)
    .then(data => {
      res.redirect('/View');
    })
    .catch(err => {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    });
});

//      delete
router.get('/delete/:id', function(req, res, next){
  var myid = req.params.id;
  glance.findByIdAndDelete(myid)
  .then(data => {
    res.redirect('/View');
  })
  .catch(err => console.log("Error" + err));
});


                    // All control hub code starts from here
router.get('/Admin', function(req, res, next){
  res.render('Admin');
});

router.post('/Admin', function(req, res, next){
  //Admin Data 
    var bodydata = {
      admin_id: req.body.txt1,
      admin_name: req.body.txt2,
      admin_email: req.body.txt3,
      admin_password: req.body.txt4
  }
    var mydata = admin_data (bodydata);
    mydata.save(req.body)
    .then(data => {
      res.redirect('/display-admin')
    })
    .catch(err => console.log("Error In Query" + err));
  });
  //Display-Admin Data for control hub
router.get('/display-admin', function(req, res, next){
    admin_data.find()
      .then(Data =>{
        console.log(Data);
        res.render('display-admin', {mydata:Data});
      })
      .catch(err => console.log("Error" + err));
  });
  
  // it is use to delete
router.get('/delete1/:id', function(req, res, next){
  var myid = req.params.id;
  admin_data.findByIdAndDelete(myid)
  .then(data => {
    res.redirect('/display-admin');
  })
  .catch(err => console.log("Error" + err));
});

 //it is use to edit
 router.get('/edit1/:id', (req, res) => {
  var myid = req.params.id;
  admin_data.findById(myid)
   .then(data => {
      res.render('edit-admin', { mydata1: data });
    })
   .catch(err => console.log("Error" + err));
});

router.post('/edit1/:id', (req, res) => {
  var myid = req.params.id;
  var mydata1 = {
    admin_id: req.body.txt1,
    admin_name: req.body.txt2,
    admin_email: req.body.txt3,
    admin_password: req.body.txt4
  }
  admin_data.findByIdAndUpdate(myid,mydata1)
   .then(data => {
      res.redirect('/display-admin');
    })
   .catch(err => console.log("Error" + err));
});
//          USer Information
router.get('/User', function(req, res, next){
  res.render('User');
})
router.post('/User', function(req, res, next){
  var bodydata2 = {
    user_id: req.body.txt5,
    user_name: req.body.txt6,
    user_gender: req.body.txt7, 
    user_email: req.body.txt8,
    user_mobile: req.body.txt9,
    user_address: req.body.txt10
}
  var mydata2 = user_data(bodydata2);
  mydata2.save(req.body)
  .then(data => {
    res.redirect('/display-user')
  })
  .catch(err => console.log("Error In Query" + err));
});
//Display-User Data for control hub
router.get('/display-User', function(req, res, next){
  user_data.find()
    .then(Data =>{
      console.log(Data);
      res.render('display-user', {mydata2:Data});
    })
    .catch(err => console.log("Error" + err));
  });
//     user delete
router.get('/delete2/:id', function(req, res, next){
  var myid = req.params.id;
  user_data.findByIdAndDelete(myid)
  .then(data => {
    res.redirect('/display-user');
  })
  .catch(err => console.log("Error" + err));
});
//      user edit 
router.get('/edit2/:id', (req, res) => {
  var myid = req.params.id;
  user_data.findById(myid)
   .then(data => {
      res.render('edit-user', { mydata2: data });
    })
   .catch(err => console.log("Error" + err));
});

router.post('/edit2/:id', (req, res) => {ww
  var myid = req.params.id;
  var mydata2 = {
    user_id: req.body.txt5,
    user_name: req.body.txt6,
    user_gender: req.body.txt7, 
    user_email: req.body.txt8,
    user_mobile: req.body.txt9,
    user_address: req.body.txt10
  }
  user_data.findByIdAndUpdate(myid,mydata2)
   .then(data => {
      res.redirect('/display-user');
    })
   .catch(err => console.log("Error" + err));
});

     //Category information
router.get('/Category', function(req, res, next){
  res.render('Category');
});
router.post('/Category', function(req, res, next){
  var bodydata3 = {
    category_id: req.body.txt11,
    category_name: req.body.txt12,
}
  var mydata3 = new category_data (bodydata3);
  mydata3.save(req.body)
  .then(data => {
    res.redirect('/display-category')
  })
  .catch(err => console.log("Error In Query" + err));
});
//Display-Category Data for control hub
router.get('/display-category', function(req, res, next){
  category_data.find()
    .then(Data =>{
      console.log(Data);
      res.render('Display-Category', {mydata3:Data});
    })
    .catch(err => console.log("Error" + err));
  });
 // it is use to delete
router.get('/delete3/:id', function(req, res, next){
  var myid3 = req.params.id;
  category_data.findByIdAndDelete(myid3)
  .then(data => {
    res.redirect('/display-category');
  })
  .catch(err => console.log("Error" + err));
});
   //category edit code
router.get('/edit3/:id', (req, res) => {
  var myid = req.params.id;
  category_data.findById(myid)
    .then(data => {
      res.render('edit-category', { mydata3: data });
    })
    .catch(err => console.log("Error" + err));
});
  
router.post('/edit3/:id', (req, res) => {
  var myid = req.params.id;
  var mydata3 = {
    category_id: req.body.txt11,
    category_name: req.body.txt12,
  }
  category_data.findByIdAndUpdate(myid,mydata3)
  .then(data => {
    res.redirect('/display-category');
  })
  .catch(err => console.log("Error" + err));
});
//          product information
router.get('/Product', function(req, res, next){
  res.render('Product');
});
router.post('/Product', function(req, res, next){
  var bodydata4 = {
    product_id: req.body.txt13,
    product_title: req.body.txt14,
    product_details: req.body.txt15,
    product_price: req.body.txt16,
    product_image_path: req.body.txt17,
    category_id: req.body.txt18
}
  var mydata4 = product_data (bodydata4);
  mydata4.save(req.body)
  .then(data => {
    res.redirect('/display-product')
  })
  .catch(err => console.log("Error In Query" + err));
});
//Display-Product Data for control hub
router.get('/display-product', function(req, res, next){
  product_data.find()
    .then(Data =>{
      console.log(Data);
      res.render('Display-Product', {mydata4:Data});
    })
    .catch(err => console.log("Error" + err));
});
//         delete section code    
router.get('/delete4/:id', function(req, res, next){
  var myid = req.params.id;
  product_data.findByIdAndDelete(myid)
  .then(data => {
    res.redirect('/display-product');
  })
  .catch(err => console.log("Error" + err));
});
//       edit product section code
router.get('/edit4/:id', (req, res) => {
  var myid = req.params.id;
  product_data.findById(myid)
    .then(data => {
      res.render('edit-product', { mydata4: data });
    })
    .catch(err => console.log("Error" + err));
});
  
router.post('/edit4/:id', (req, res) => {
  var myid = req.params.id;
  var mydata4 = {
    product_id: req.body.txt13,
    product_title: req.body.txt14,
    product_details: req.body.txt15,
    product_price: req.body.txt16,
    product_image_path: req.body.txt17,
    category_id: req.body.txt18
  }
  product_data.findByIdAndUpdate(myid,mydata4)
  .then(data => {
    res.redirect('/display-product');
  })
  .catch(err => console.log("Error" + err));
});
module.exports = router;
console.log('http://127.0.0.1:4001');