import reqRes from '../middlewares/reqRes'
import express from 'express'
import userAuth from '../middlewares/userAuth'
import UserController from '../controller/user'

class UserRoutes {
    router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    signUp(req, res) {
        if (req.body.name && req.body.email && req.body.password) {
            UserController.signUp(req.body)
                .then((result) => {
                    reqRes.responseHandler('User added!', result, res);
                    res.end()
                })
                .catch((err) => {
                    reqRes.httpErrorHandler(err, res);
                    res.end();
                })
        } else {
            reqRes.httpErrorHandler({ code: 422, msg: "Error while creating user", error: 'Request body should have firstName, lastName, email, password, userTypeId' }, res);
            res.end();
        }
    }

    login(req, res) {
        if (req.body.email && req.body.password) {
            UserController.login(req.body)
                .then((message) => {
                    reqRes.responseHandler('Login Successful', message, res);
                    res.end();
                })
                .catch((err) => {
                    reqRes.httpErrorHandler(err, res)
                    res.end()
                })
        } else {
            reqRes.httpErrorHandler({ code: 422, msg: "Error while login", error: 'Request body should contain userName, password and deviceId' }, res);
            res.end();
        }
    }

    // refreshToken(req, res) {
    //     if (req.body.userId && req.body.userTypeId && req.body.refreshToken && req.body.deviceId) {
    //         UserController.getNewSessionToken(req.body)
    //             .then((message) => {
    //                 reqRes.responseHandler('New session token successfully generated', message, res);
    //                 res.end();
    //             })
    //             .catch((err) => {
    //                 reqRes.httpErrorHandler(err, res)
    //                 res.end()
    //             })
    //     } else {
    //         reqRes.httpErrorHandler({ code: 422, msg: "Error while getting new session token", error: 'Request body should contain userId, userTypeId, refreshToken and deviceId' }, res);
    //         res.end();
    //     }
    // }

    // verifyEmail(req, res) {
    //     if (req.query.email && req.query.token) {
    //         UserController.verifyEmail(req.query)
    //             .then((message) => {
    //                 reqRes.redirectViaResponse(message.path, res);
    //                 res.end();
    //             })
    //             .catch((err) => {
    //                 reqRes.httpErrorHandler(err, res)
    //                 res.end()
    //             })
    //     } else {
    //         reqRes.httpErrorHandler({ code: 422, msg: "Error while verifying user", error: 'Request should contain email and token' }, res);
    //         res.end();
    //     }
    // }

    // logout(req, res) {
    //     UserController.logout(req)
    //         .then((message) => {
    //             reqRes.responseHandler('User logout successfully', message, res);
    //             res.end();
    //         })
    //         .catch((err) => {
    //             reqRes.httpErrorHandler(err, res)
    //             res.end()
    //         })
    // }

    routes() {
        this.router.post('/', this.signUp)
        this.router.post('/login', this.login)
        // this.router.post('/logout', userAuth, this.logout)
        // this.router.post('/refreshToken', this.refreshToken)    
    }
}

export default new UserRoutes().router