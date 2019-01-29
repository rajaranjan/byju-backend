import http from 'http'
import server from './app'
import cred from './config/const'
import logger from './utils/logger'
import cluster from 'cluster'
import os from 'os'


const cores = os.cpus().length
const app = http.createServer(server)
app.setTimeout(2000000)
app.listen(process.env.PORT || cred().port)
app.on('error', error)
app.on('listening', connected)

function connected() {
    if (cluster.isMaster) {
        logger.info(`Master started at ${ new Date() }, PID: ${ process.pid } at ${cred().port}`)

        if (process.env.NODE_ENV) {
            for (let i = 0; i < cores; i++) {
                cluster.fork()
                logger.info(`Worked ${ process.pid } started at ${ new Date() }`)
            }
            cluster.on('exit', (worker, code, signal) => {
                logger.warn(`Worker ${ process.pid } died at ${ new Date() }`)
            })            
        }    

    } else {
        logger.info(`Worker ${ process.pid } started at ${ new Date() }`)
    }
}

function error() {
    if (error.syscall !== 'listen') { 
        console.log(error)
    }
    const bind = (typeof cred().port === 'string') ? 'Pipe ' + cred().port : 'Port ' + cred().port;
    switch (error.code) {
    case 'EACCES':
        logger.warn(`${ bind } requires elevated privileges`)
        process.exit(1);
        break;
    case 'EADDRINUSE':
        logger.warn(`${ bind } is already in use`)
        process.exit(1);
        break;
    default:
        throw error;
    }     
}


