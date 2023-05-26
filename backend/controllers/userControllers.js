const jwt = require('jsonwebtoken')

const getInfo = async (req, res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified){
            return res.status(401).json({message: 'Unauthorized'})
        }
        res.send(verified)
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

module.exports = {getInfo}