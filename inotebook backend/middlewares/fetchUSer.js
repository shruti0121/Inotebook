const jwt = require('jsonwebtoken');
const JWT_SECRET = "Yash@1234";

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({"Error":"Token is not valid"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send({"Error":"Token is not valid"});
    }
}

module.exports = fetchUser;