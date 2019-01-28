import cred from "../config/const";
import jwt from "jsonwebtoken";
import reqRes from '../middlewares/reqRes'

export default function validateUser(req, res, next) {
    var token = req.header('Authorization') || req.query.state;
    if (token) {
        console.log('In jwt verify middleware for userId');
        jwt.verify(token, cred().secret, function (err, decoded) {
            if (err) {
                reqRes.httpErrorHandler({
                    code: 401,
                    msg: 'Failed to authenticate user.',
                    error: err
                }, res)
                res.end()
            } else {
                req.userId = decoded.userId
                next()
            }
        });
    } else {
        reqRes.httpErrorHandler({
            code: 401,
            msg: 'Failed to authenticate user.',
            error: 'No session token provided'
        }, res)
        res.end()
        /*return res.status(401).json({
            success: false,
            message: "Failed to authenticated user",
            error: 'No session token provided'
        });*/
    }
}