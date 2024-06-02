const express = require("express")
const jwt = require("jsonwebtoken")
const jwtPassword = "123456"

const app = express()
app.use(express.json())

const USERS = [
    {
        username : "dev",
        pass : "123",
        name : "Dev Bhangale"
    },
    {
        username : "babu",
        pass : "123babu",
        name : "babu shona"
    },
    {
        username : "pappu",
        pass : "pappupasshogaya",
        name : "RAGA"
    },
]

function userExists(username, password){
    let existance = false;
    for(let i = 0; i < USERS.length; i++){
        if (USERS[i].username  == username && USERS[i].pass == password) {
            existance = true
        }
    }
    return existance;
}


app.post("/signin", function(req, res){
    const user = req.body.username
    const pass = req.body.password

    if(!userExists(user, pass)){
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        })
    }

    var token = jwt.sign({username : user}, jwtPassword)
    return res.json({
        token,
    })
})


app.get("/users", function(req, res){
    const token = req.headers.auth
    const decoded = jwt.verify(token, jwtPassword)
    const username = decoded.username

    res.json({
        users: USERS.filter(function(User){
            if(Users.username == username){
                return false
            } else{
                return true
            }
        })
    })
    
})

app.use(function(err, req, res, next){
    res.json({
        msg : "Invalid token"
    })
})


app.listen(3000)