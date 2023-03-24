const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pathSeats = path.join(__dirname, "/public/seats");


app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile("./public/index.html");

    /*if (fs.existsSync(pathSeats)) {
        var seats = [];

        fs.readFile("public/seats/seats.json", "utf8", (result, err) => { 
            if (err) console.log(err); 
        
            seats = result;
            return res.json(seats);   
        }); 
    }*/
});


app.post("/loadSeats", (req, res) => {
    if (!fs.existsSync(pathSeats)) fs.mkdirSync(pathSeats);

    console.log(req.body);

    // var array_seats = fs.readdirSync(pathSeats);
    var array_seats = req.body;
    var seats = [];
    // console.log(array_seats);
    
    if (array_seats.length == 0) return res.json({ status: "404", message: `• Directory is empty.` });
    else {
        for (var key in req.body) {
            var seat;
            if (req.body.hasOwnProperty(key)) {
                seat = req.body[key];
                console.log(item);
            }
            seats.push(seat);
        }

        console.log(seats);

        // console.log(JSON.stringify(seats, null, "\t"));
        fs.writeFile("public/seats/seats.json", JSON.stringify(seats, null, "\t"), (result, err) => { if(err) console.log(err); });
        return res.json(seats);
    }
});


module.exports = app;