const { resolveSoa } = require("dns");
const express  = require("express");
const { get } = require("http");
const https  = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  
   const query= req.body.cityName;
   const apikey ="32d97cde95d1fcf26083528651c6991f";
   const unit= "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
        https.get(url,function(response){
               console.log(response.statusCode);
               response.on("data",function(data){
                   const weatherdata = JSON.parse(data);
                //    console.log(weatherdata);
                //    const des = weatherdata.weather[0].description;
                //    console.log(des);
                const temp = weatherdata.main.temp;
                const feels_like = weatherdata.main.feels_like;
                const temp_min = weatherdata.main.temp_min;
                const temp_max = weatherdata.main.temp_max;
                const pressure = weatherdata.main.pressure;
                const humidity = weatherdata.main.humidity;
                const icon = weatherdata.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/"+ icon+ "@2x.png"
                //   res.write("<h1 style =\"color:crimson;background-image: radial-gradient(white,pink);background-repeat: no-repeat;display:flex;flex-direction: column;justify-content: center;align-items: center;font-family:sans-serif;font-weight:800;\">the temp in "+query+" is "+temp+" in degree celcius</h1>");
                  const des = weatherdata.weather[0].description;
                  const country = weatherdata.sys.country;
                  const lon = weatherdata.coord.lon;
                  const lat = weatherdata.coord.lat;
                  const wind_speed= weatherdata.wind.speed;
                  res.write("<h1 style =\"color:crimson;background-image: radial-gradient(white,pink);background-repeat: no-repeat;display:flex;flex-direction: column;justify-content: center;align-items: center;font-family:sans-serif;font-weight:800;border:5px solid crimson;border-radius:10px;margin:0px;padding:0px;\"><br> "+query+"<br>  Country   :   "+country+"<br> Coordinates  :  longitude  :  "+lon+" , latitude  :  "+lat+"<br> Temperature in "+query+" is "+temp+" in degree Celcius.<br> But it Feels like "+feels_like+" in degree Celcius.<br> Min. Temperature  :  "+temp_min+"<br> Max. Temperature  :  "+temp_max+"<br> Pressure : "+pressure+"<br> Humidity : "+humidity+"<br> Weather in "+query+" is "+des+".<br> Wind Speed is "+wind_speed+".<span style=\"color:crimson;font-family:sans-serif;font-size:20px;;padding:20px;\"> Copyright@MyWeatherWebApplication</span></h1>")
                //   res.write("<h1 style =\"color:crimson;background-image: radial-gradient(white,pink);background-repeat: no-repeat;display:flex;flex-direction: column;justify-content: center;align-items: center;font-family:sans-serif;font-weight:800;\">"+Name+"</h1>");
                //   res.write("<h1 style =\"color:crimson;background-image: radial-gradient(white,pink);background-repeat: no-repeat;display:flex;flex-direction: column;justify-content: center;align-items: center;font-family:sans-serif;font-weight:800;\">"+country+"</h1>");
                  res.send();
               });
        })
})
  


    // console.log("Server is up and running");



app.listen(3000,function(){
    console.log("Server is runnning on port 3000");
});