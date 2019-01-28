import bunyan from 'bunyan'

class logger {

    constructor() {
        
        // Overwriting console.log function to output all info logs to bunyan
        /*console.log = (message) => {
            this.info(message)
        }*/

        // Overwriting console.error function to output all error logs to bunyan
        /*console.error = (message) => {
            this.warn(message)
        }*/
        // Overwriting console.debug function to output all debug logs to buyan
        /*console.debug = (message) => {
            this.debug(message)
        }*/

    }

    log = bunyan.createLogger({
        name: 'woohoo-app',
        streams: [{
            level: 'debug',
            stream: process.stdout
        },{
            level: 'debug',
            stream: process.stdout
        }]        
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
}

export default new logger()