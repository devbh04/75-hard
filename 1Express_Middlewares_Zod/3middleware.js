const express = require("express");
const port = 3000;

const app = express();

let numberOfRequests = 0;
let time = [];
let avgTime = 0;

function calculaterequests(req, res, next) {
    numberOfRequests++;
    console.log(numberOfRequests);
    console.log(time);
    console.log(avgTime);
    next();
}

function calculateaveragetime(req, res, next) {
    const startTime = new Date().getTime();

    res.on("finish", function () {
        const endTime = new Date().getTime();
        const requestTime = endTime - startTime;
        time.push(requestTime);

        let sumTime = 0;
        for (let i = 0; i < time.length; i++) {
            sumTime += time[i];
        }
        avgTime = sumTime / time.length;
    });

    next();
}

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    if (username === "dev" && password === "pass") {
        next();
    } else {
        res.status(403).json({
            "msg": "Wrong username or password"
        });
        return;
    }
}

function kidneyMiddleware(req, res, next) {
    const id = req.query.yourid;

    if (id === "1" || id === "2") {
        next();
    } else {
        res.status(411).json({
            "msg": "Wrong input for ID"
        });
        return;
    }
}

//Very IMP for requsting body from the user
app.use(express.json());
//---------------------------------

app.use(calculaterequests);
app.use(calculateaveragetime);

app.get("/login", userMiddleware, function (req, res) {
    res.send("You are logged in");
});

app.get("/kidney-checkup", kidneyMiddleware, function (req, res) {
    res.send("You have perfect kidneys");
});

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function (req, res) {
    res.send("You have the perfect health");
});

app.get("/get", function (req, res) {
    res.send("The number of requests are " + numberOfRequests.toString() + ". The average time is " + avgTime.toString() + " ms.");
});

// Note- *Input validation* is one o the most important thing for your code. Here we take an array of number of kidneys
//       supose user sent some bogus data and not an array. what would you do. This will crash your server and help client
//       with the information of the error for him to do nasty things. Zod is used for input validation.

app.post("/get_array", function(req, res){
    const kidneys = req.body.kidneys
    const noOfKidneys = kidneys.length

    res.send(`The number of kidneys are ${noOfKidneys}`)
});


//error handling
let errorCount=   0;

app.use(function(err, req, res, next){
    errorCount++;
    res.json({
        msg: "There was an  error here."
    }
    )
})

app.listen(port, function () {
    console.log("We are now live");
});
