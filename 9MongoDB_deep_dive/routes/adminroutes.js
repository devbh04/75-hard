const express = require("express")
const adminMiddleware = require("../middleware/adminM")
const { Admin, Course } = require("../db/dbmain")
const router = express.Router()
router.use(express.json())

router.post("/signup", async (req, res)=>{
    const username = req.headers.username
    const password = req.headers.password

    try{
        const createAdmin = await Admin.create({
            username : username,
            password : password
        })
        if(createAdmin){
            res.status(200).json({
                msg: "Admin created Successfully"
            })
        }
    }catch(error){
        res.status(200).json({
            msg: "There was an error creating admin"
        })
    }
})

router.post("/courses", adminMiddleware, async (req, res)=>{
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    try {
        const courseCreation = await Course.create({
            title,
            description,
            imageLink,
            price
        })
        if (courseCreation) {
            console.log(courseCreation)
            res.json({
                msg: "The course you created is " + courseCreation._id
            })
        }
    } catch (error) {
        res.json({
            msg: "The course could not be created created"
        })
    }
    
})

router.get("/courses", adminMiddleware, async (req, res)=>{
    const response = await Course.find({})
    res.json({
        courses: response
    })
})

module.exports = router
