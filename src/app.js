import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

import ping from './routes/ping'
import user from './routes/user'
import poll from './routes/poll'

//logger
import logger from './utils/logger';

class server {
    app

    constructor() {
        this.app = express();
        this.config();
        this.routes()
    }

    config() {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser())
    }

    routes() {
        const router = express.Router()

        this.app.use('/v1', ping)
        this.app.use('/v1/user', user)
        this.app.use('/v1/poll', poll)
    }
}

export default new server().app