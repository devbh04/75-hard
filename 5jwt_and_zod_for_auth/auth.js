const express = require("express")
const app = express()
app.use(express.json())

const zod = require("zod")

const jwt = require("jsonwebtoken")
const jwtSecret = "secret_key"

const infoObject = {
    msg : "This is a secret message. If you see this it means you have the correct JWT"
}

function validateEmailPass(req, res, next){
    const emailPassObject = {
        email : req.body.useremail,
        pass : req.body.userpass
    }
    const emailPassValidationSchema = zod.object({
        email : zod.string().email(),
        pass : zod.string().min(6)
    })

    const validate = emailPassValidationSchema.safeParse(emailPassObject)
    console.log(validate)

    if(validate.success == true){
        req.validatedUser = emailPassObject
        next()
    }else{
        res.status(400).json({
            msg: "Invalid email or password"
        })
    }
}

function createJWT(req, res, next){
    const {email, pass} = req.validatedUser
    const token = jwt.sign({email}, jwtSecret)
    req.token = token
    next()
}

function verifyJWT(req, res, next){
    const authToken = req.headers.auth
    console.log(authToken)
    if(!authToken){
        res.status(401).json({
            msg: "There was no token provided"
        })
        return
    }

    try{
        const verification = jwt.verify(authToken, jwtSecret)
        req.verifierduser = verification
        next()
    } catch(e){
        res.status(401).json({
            msg : "The auth token was invalid"
        })
    }

    return
}

function decodeJWT(req, res, next){
    const authToken = req.headers.auth
    const decoded = jwt.decode(authToken)
    if(!decoded){
        res.status(401).json({
            msg: "there was a problem with the token's decoding"
        })
    }
    req.decodeduser = decoded
    next()
}

app.post("/signup", validateEmailPass, createJWT, function(req,res){
    res.status(200).json({
        msg: "The token is " + req.token
    })
})

app.get("/info", verifyJWT, function(req,res){
    res.status(200).json(infoObject)
})

app.get("/myinfo", decodeJWT, function(req,res){
    res.status(200).json(req.decodeduser)
})

app.listen(3000)