const jwt = require('jsonwebtoken');
const jwt_SECRET = 'Nasirkhsnisagood$oy';

const fetchuser=(req,res,next)=> {
  //Get user from the jwt token and add id to req object
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error : "Please Authenticate using valid token"});
}

try {
    const data = jwt.verify(token,jwt_SECRET);
  req.user = data.user;
  next(); 
} catch (error) {
    res.status(401).send({error : "Please Authenticate using valid token"});
}
 
}

 module.exports = fetchuser;