const { User } = require("../db/dbmain.js")

async function userMiddleware(req, res, next){
    const username = req.headers.username
    const password = req.headers.password
    
    try {
        const userFound = await User.findOne({
            username:  username,
            password: password
        })

        if(userFound){
            next()
        }else{
            res.status(403).json({
                msg: "Could not find an user with such credentials"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Internal server Error"
        })
    }
}

module.exports = userMiddleware