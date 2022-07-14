const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

async function CompanyAuth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message: 'No Authorization Header'
        })
    }
    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Invalid Token Format'
            })
        }
        const decode = await jwt.verify(token, SECRET_KEY);

        if(decode.role=='company'){
            req.user = decode
            next()
        }else{
            return res.status(401).json({
                message: 'Invalid Token',
                
            })
        }
      
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                error: error.message,
            })
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            })
        }
        res.status(500).json({
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack
        });
    }
}

module.exports = CompanyAuth