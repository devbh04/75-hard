const express = require("express")
const userMiddleware = require("../middleware/userM")
const { Course, User } = require("../db/dbmain")
const router = express.Router()
router.use(express.json())

router.post("/signup", async (req, res)=>{
    const username = req.headers.username
    const password = req.headers.password

    try{
        const createUser = await User.create({
            username : username,
            password : password
        })
        if(createUser){
            res.status(200).json({
                msg: "User created Successfully"
            })
        }
    }catch(error){
        res.json({
            msg: "There was an error creating User"
        })
    }
})

router.post("/courses/:courseId", userMiddleware, async (req, res)=>{
    const courseId = req.params.courseId
    const username = req.headers.username

    try{
        const findIfcourseIsBought = await User.findOne({
            username: username,
            purchasedCourses:{
                "$in": [courseId]
            }
        })
        if(findIfcourseIsBought){
            res.json({
                msg:"Your already have this course"
            })
            return
        }
        const updateCourse = await User.updateOne({
            username: username
        },{
            "$push": {
                purchasedCourses: courseId
            }
        })
        res.json({
            msg: "Course added"
        })
    }catch(error){
        res.json({
            msg: "Could not add the course"
        })
    }
})

router.get("/courses", async (req, res)=>{
    const response = await Course.find({})
    res.json({
        courses: response
    })
})

router.get("/courses/purchasedcourses", userMiddleware, async (req, res)=>{
    const username = req.headers.username
    try{
        const user = await User.findOne({
            username: username,
        })
        if(user){
            const courses = await Course.find({
                _id:{
                    "$in": user.purchasedCourses
                }
            })
            res.json({
                courses: courses
            })
        }
    }catch(error){
        res.json({
            msg: "Could not get your courses"
        })
    }
})

module.exports = router