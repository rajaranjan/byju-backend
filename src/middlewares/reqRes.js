import logger from '../utils/logger';
import cred from '../config/const';

class reqRes {
    constructor(){
    }
    responseHandler(message, data, res) {
        return new Promise((resolve, reject) => {
            let response = {
                status: 200,
                message: message,
                data: data,
                error: ''
            };
            resolve(res.status(200).send(response));
        })
    }

    redirectViaResponse(path, res) {
        return new Promise((resolve, reject) => {
            resolve(res.redirect(path));
        })
    }

    //for handling http errors
    httpErrorHandler(err,res){
        
        return new Promise((resolve,reject) => {
            let error = {};
            error.status = err.code;
            error.message = err.msg;
            error.error = err.error;
            error.data = '';
            resolve(res.status(err.code).send(error));
        })
    }
}

export default new reqRes()