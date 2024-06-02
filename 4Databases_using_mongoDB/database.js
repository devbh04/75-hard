const express = require("express")
const app = express()
app.use(express.json())

const mongoose = require("mongoose")

mongoose.connect("Mongodb string goes here")

const User = mongoose.model("Users", {
    name: String,
    email: String,
    password: String
})

app.post("/signup", async function(req, res){
    const username = req.body.username
    const useremail = req.body.email
    const pass = req.body.password

    const existingUser = await User.findOne({email: useremail})
    console.log(existingUser)
    if (existingUser) {
        return res.status(400).json({
            msg: "User already exists with same email"
        })
    }

    const user = new User({
        name: username,
        email: useremail,
        password: pass
    })

    user.save()
    res.json({
        msg: "user is created"
    })
})

app.use(function(err, req, res, next){
    console.log(err)
    res.status(401).json({
        msg : "Something went wrong"
    }
    )
})

app.listen(3000)