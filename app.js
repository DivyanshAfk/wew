const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const city =  req.body.cityName;
const api="228cf4e76217952220e8c1e5467ecd0f";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const tits = JSON.parse(data);
      const icon = tits.weather[0].icon;
      // console.log("The temperature is : " + tits.main.temp);
      // // console.log(JSON.parse(data));
      // console.log("The weather status is :" + tits.weather[0].description);
      res.write(" <h1>The Temperature in "+city+" is : "+tits.main.temp +"<\h1>");
      res.write("<h2>The weather condition is currently : "+ tits.weather[0].description + "<\h2>")
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<img src ="+imageURL+">")
    });
  });

});

app.listen(port, function () {
  console.log("The server is running at " + port);
});
