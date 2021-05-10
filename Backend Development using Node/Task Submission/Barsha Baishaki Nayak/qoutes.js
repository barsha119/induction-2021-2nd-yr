const express = require("express");
const app = express();



const qoutesJSONArray = require('./qoutesList.json')
const obj = JSON.parse(JSON.stringify(qoutesJSONArray));



app.get('/qoutes/number', function (request, response) {
    let num = request.query.num;
    if(num < 10){
    for (let i = 0; i < num; i++) {
        response.send((obj[i]));
        
    }

}

else{
        console.log('Invalid Input');
    }
    
});

app.get('/qoutes/category', function (req, res) {
    if (req.query.cat == 'inspirational') {
        for (let i = 0; i < 10; i++) {
            if (obj[i].category == 'Inspirational') {
                console.log(obj[i]);
                
            }

        }
    }
   
    else if (req.query.cat == 'funny') {
        for (let i = 0; i < 10; i++) {
            if (obj[i].category == 'Funny') {
                console.log(obj[i]);
                
            }
            
        }
    }
    else
    {
        console.log('Invalid Input');
    }
});



app.listen(3000, function () {
    console.log("server started on port 3000");
});

