import bunyan from 'bunyan'
import logstash from 'bunyan-logstash-tcp'
var path = require('path')

class logger {

    constructor() {
        // Overwriting console.log function to output all info logs to bunyan
        console.log = (message) => {
            this.info(message)
        }

        // Overwriting console.error function to output all error logs to bunyan
        console.error = (message) => {
            this.error(message)
        }
        // Overwriting console.debug function to output all debug logs to buyan
        console.debug = (message) => {
            this.debug(message)
        }
        // Overwriting console.warn function to output all warn logs to buyan
        console.warn = (message) => {
            this.warn(message)
        }

    }

    log = bunyan.createLogger({
        name: 'byju',
        streams: [{
            level: 'debug',
            stream: process.stdout
        }, {
            type: 'rotating-file',
            level: 'error',
            path: `${path.join(__dirname, '..', '..', 'build', 'logs', 'error.log')}`,
            period: '86400000ms',
            count: 10
        }, {
            type: 'rotating-file',
            level: 'info',
            path: `${path.join(__dirname, '..', '..', 'build', 'logs', 'info.log')}`,
            period: '86400000ms',
            count: 10
        }, {
            type: 'rotating-file',
            level: 'warn',
            path: `${path.join(__dirname, '..', '..', 'build', 'logs', 'warn.log')}`,
            period: '86400000ms',
            count: 10
        },

        ]
    })

    info(message) {
        this.log.info(message)
    }

    warn(message) {
        this.log.warn(message)
    }

    debug(message) {
        this.log.debug(message)
    }
    error(message) {
        this.log.error(message)
    }
}

export default new logger()
