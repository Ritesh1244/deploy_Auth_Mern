const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Usermodel = require('../Models/user');  

const signup = async (req, res) => {  
    try {  
        const { name, email, password } = req.body;  
        const user = await Usermodel.findOne({ email });  
        
        if (user) {  
            return res.status(409).json({  
                message: "User already exists, you can log in",  
                success: false  
            });  
        }  

        const usermodel = new Usermodel({ name, email, password });  
        usermodel.password = await bcrypt.hash(password, 10);  
        await usermodel.save();  

        res.status(201).json({  
            message: "Sign-Up Successfully",  
            success: true  
        });  
    } catch (err) {  
        res.status(500).json({  
            message: "Internal server error",  
            success: false  
        });  
    }  
};  

const login = async (req, res) => {  
    try {  
        const { email, password } = req.body;  
        const user = await Usermodel.findOne({ email });
        const errormessage =   "Authentication  failed email or password is wrong"

        if (!user) {  
            return res.status(403).json({  
                message: errormessage,  
                success: false  
            });  
        }  

        const ispasswordEqual = await  bcrypt.compare(password, user.password);  

        if(!ispasswordEqual){
            return res.status(403).json({  
                message: errormessage,  
                success: false  
            });
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200).json({  
            message: "log-in Successfully",  
            success: true,
            jwtToken,
            email,
            name:user.name,
        });  
    } catch (err) {  
        console.log(err)
        res.status(500).json({  
            message: "Internal server error",  
            success: false  
        });  
    }  
};  

module.exports = {
    signup,
    login
}