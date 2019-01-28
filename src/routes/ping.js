import express from "express";


class PingPong {
    router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    test(req, res) {
        res.status(200).send({
            success: true,
            data: 'pong'
        });
        res.end();
    }

    routes() {
        this.router.get('/ping', this.test);
    }
}




export default new PingPong().router