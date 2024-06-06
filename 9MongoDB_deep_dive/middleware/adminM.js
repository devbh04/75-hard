const { Admin } = require("../db/dbmain")

async function adminMiddleware(req, res, next){
    const username = req.headers.username
    const password = req.headers.password
    
    try {
        const adminFound = await Admin.findOne({
            username: username,
            password: password
        })

        if(adminFound){
            next()
        }else{
            res.status(403).json({
                msg: "Could not find an admin with such credentials"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Internal server Error"
        })
    }
}

module.exports = adminMiddleware