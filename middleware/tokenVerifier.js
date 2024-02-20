const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(404).json({msg: "there is no token"});
    }else{

        try{
            const jwtPayload = jwt.verify(token, process.env.SECRETA)

            req.user = jwtPayload.user;//=> { id: '141641s1dfs1f4s1df41df6s'}
            //req.user.id = '141641s1dfs1f4s1df41df6s'
            
            next();//get out and then carry on...

        }catch(error){
            res.json({ msg: error.message})
        }
    }
}