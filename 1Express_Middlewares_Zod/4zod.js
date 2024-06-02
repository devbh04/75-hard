const express =  require("express")
const zod =  require("zod")
const app = express()
const schema = zod.array(zod.number())

app.use(express.json())

function validateEmailPass(req, res, next){
    const object = {
        email : req.body.email,
        password : req.body.password
    }
    
    const validation = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })

    const validated = validation.safeParse(object);
    console.log(validated)
    if(validated.success === true){
        next();
    }else{
        res.send("Wrong email or password")
    }
    
}

app.post("/check", function(req, res){
    const arrayOfNumbers= req.body.array
    const response = schema.safeParse(arrayOfNumbers)
    res.send(response)
})

app.post("/multiple-checks", validateEmailPass, function(req, res){
    res.send("The email and pass was correct")
})

app.use(function(err, req, res, next){
    res.json({
        msg: "There was an error"
    })

})

app.listen(3000)