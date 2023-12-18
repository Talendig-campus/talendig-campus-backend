const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');


const auth = async(req, res, next) => {

    try {
        const authorization = req.get('authorization');

        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
            const token = authorization.substring(7);
            // console.log(token);
            if (!token) return res.status(401).json({message:'No authorized'});
            
            const decode = jwt.verify(token, process.env.SECRETJWT || 'TalendigFactory5');
            const user = await UserModel.findOne({_id:decode, "tokens.token":token}).populate('accessLevel', {createdAt: 0, updatedAt: 0});
            // console.log(user);

            if (user === null) return res.status(401).json({message:'No authorized'});
            
            req.user = user;
            req.token = token;
            next();
        } else {
            
            return res.status(401).json({message:'No authorized'});
        }
        

    } catch (error) {
        return res.status(401).json({message:'No authorized', error: error.message});
    }

}


module.exports =  auth;