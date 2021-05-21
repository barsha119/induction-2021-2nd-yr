const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://barsha_1234:barsha_1234@cluster0.b0eeh.mongodb.net/qoutesDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const qouteSchema = {
  qoutes: String,
  category: String
};

const Qoutes = mongoose.model("Qoutes", qouteSchema);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function (req, res) {

  var item = req.body.flexRadioDefault;
  var number = req.body.num;

  if (number > 10 || number < 1) {

    res.render('list', { qlist: '*Maximum 10 Inputs is allowed' });


  }

  else {
    Qoutes.find({ category: item }, { _id: 0 }, function (err, results) {
      for (var i = 0; i < number; i++) {
        var myObject = results[i];
        var result = JSON.parse(JSON.stringify(myObject));

        res.write(" " + myObject);

      }

      res.end();
    });
  }


});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

 
app.listen(port, function () {
  console.log("Server started on port 3000");
});
