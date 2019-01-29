export default function cred() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
        return {
            port: 9001,
            db: {
                mongodb: {
                    //url: 'mongodb://165.227.240.215:27017/byju_db',
                    url: 'mongodb://byju:byju12345@ds115035.mlab.com:15035/heroku_5q5hh93k',
                    // url: 'mongodb://enterpriseadmin:woohoo123@localhost:27017/woohoo_enterprise_db?authSource=woohoo_enterprise_db',
                    // username: 'byjuadmin',
                    // password: 'pass@123'
                }
            },
            secret: 'byjubackend',
            activateAccountSecret: 'byjubackend'
        }
    } else if (process.env.NODE_ENV === 'prod') {
        return {
            port: 9001,
            db: {
                mongodb: {
                    // url: 'mongodb://165.227.240.215:27017/byju_db',
                    url: 'mongodb://byju:byju12345@ds115035.mlab.com:15035/heroku_5q5hh93k'
                    // url: 'mongodb://enterpriseadmin:woohoo123@localhost:27017/woohoo_enterprise_db?authSource=woohoo_enterprise_db',
                    // username: 'byjuadmin',
                    // password: 'pass@123'
                }
            },
            secret: 'byjubackend',
            activateAccountSecret: 'byjubackend'
        }
    }
}