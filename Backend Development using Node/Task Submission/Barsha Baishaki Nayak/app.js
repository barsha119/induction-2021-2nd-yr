const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { render } = require('ejs');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://barsha_1234:barsha1234@cluster0.b0eeh.mongodb.net/qoutesDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const qouteSchema = {
  qoutes: String,
  category: String
};

const Qoute = mongoose.model("qoutes", qouteSchema);

var data1 = [];
var data2 = [];
var check1 = 0;
var check2 = 0;

app.get('/', function (req, res) {

  Qoute.find(function (err, foundArticles) {
    var total = foundArticles.length;

    Qoute.find({ category: 'Inspirational' }, function (err, foundArticles) {
      var inspirl = foundArticles.length;

      res.render('index', { ilist: inspirl, flist: total - inspirl });
    });
  });
});
app.post('/', function (req, res) {
  Qoute.find(function (err, foundArticles) {

    let number = req.body.num;
    let cat = req.body.flexRadioDefault;

    
    var total = foundArticles.length;
    for (let i = 0; i < foundArticles.length; i++) {
      if (foundArticles[i].category == "Inspirational") {
        check1 = check1 + 1;
      }
      else {
        check2 = check2 + 1;
      }
    }
    if (cat == 'Inspirational') {
      if (number > check1 || number <= 0) {
        res.sendFile(__dirname + "/error.html");
      }
      else {
        for (let i = 0; i < foundArticles.length; i++) {
          if (foundArticles[i].category == 'Inspirational') {
            data1.push(foundArticles[i]);
          }
        }
        res.render('list', { newList: data1 });
      }
    }
    if (cat == 'Funny') {
      if (number > check2 || number <= 0) {
        res.sendFile(__dirname + "/error.html");
      }
      else {
        for (let i = 0; i < foundArticles.length; i++) {
          if (foundArticles[i].category == 'Funny') {
            data2.push(foundArticles[i]);
          }
        }
        res.render('list', { newList: data2 });
      }
    }
    data1.splice(0, data1.length);
    data2.splice(0, data2.length);
  });
});

app.get('/qoute.html', function (req, res) {
  res.sendFile(__dirname + '/qoute.html');
});
app.post('/qoute.html', function (req, res) {
  const newQoute = new Qoute({
    qoutes: req.body.add,
    category: req.body.options
  });
  newQoute.save();
  res.redirect('/success.html');
});
app.post('/delete', function (req, res) {
  let checks = req.body.button;
  Qoute.deleteOne({ _id: checks }, function (err) {
    if (err) {
      console.log("error");
    }
    else {
      res.sendFile(__dirname + '/delete.html');
    }
  });
});
app.get('/success.html', function (req, res) {
  res.sendFile(__dirname + '/success.html');
});

app.post('/update',function(req,res){
  var buttons = req.body.update;
  var quotes = req.body.quote;
  var opt = req.body.options;
  console.log(req.body);
  Qoute.updateOne({_id: buttons},{$set: {qoutes: quotes , category: opt}},function(err){
    if(err){
      console.log(error);
    }
    else{
      res.redirect('/');
    }
  });
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
