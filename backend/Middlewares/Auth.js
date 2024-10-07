const jwt  = require('jsonwebtoken')

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        res.status(403)
        .json({message:"Unauthorized, jwt token is required"})
    }

    try{
        const  decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(403)
        .json({message:"Unauthorized, jwt token is wrong or expired"})
    }
} 
module.exports = ensureAuthenticated;