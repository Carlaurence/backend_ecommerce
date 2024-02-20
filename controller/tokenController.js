const { response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'env' })

/** POST CREATE NEW TOKEN * http://localhost:4002/api/login **/
exports.createToken = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            res.status(200).json({ msg: 'User does not exist' })
        } else {
            const passwordCompare = await bcryptjs.compare(req.body.password, findUser.password)

            if (!passwordCompare) {//false
                res.status(200).json({ msg: 'email or password incorrect' })
            } else {//true
                const payload = { user: { id: findUser._id } }

                jwt.sign(
                    payload,
                    process.env.SECRETA,
                    { expiresIn: '1h' },
                    (error, token) => {
                        if (error) throw error;
                        res.status(200).json({ token });//return an objetc { 'token': jndnvjsnvsv54d51v1x}
                    }
                )
            }
        }
    } catch (error) {
        res.json({ msg: error.message })
    }
}

/** POST * VALIDATE DIGITAL SIGNATURE * http://localhost:4002/api/login/:token **/
exports.validateTokenAuthenticity = async (req, res) => {

    const { token } = req.params;
    console.log(token)
    try {
        if (token === '' || token === null || token === undefined) {
            res.status(200).json({ msg: 'there is no token AQUIIIII' })
        } else {
            return res.status(200).json( jwt.verify(token, process.env.SECRETA) )
            /**
             * Posibles Errores lanzados por jwt.verify
             * "msg": "jwt must be provided"
             * "msg": "jwt malformed"
             * "msg": "invalid signature"
             * "msg": "jwt must be a string"
             * "msg": "jwt expired"
             */
        }
    } catch (error) {
        res.json({ msg: error.message })
    }
}
