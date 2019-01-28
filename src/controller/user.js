import userModel from '../models/user'
import bcrypt from 'bcrypt-nodejs'
import refreshTokenService from '../services/tokenService'
import cred from '../config/const'
import jwt from 'jsonwebtoken'
let randToken = require('rand-token').generator()
var Promise = require('bluebird')

var SALT_WORK_FACTOR = 10
var compare = Promise.promisify(bcrypt.compare)

class UserController {

    constructor() { }

    // user signup and token creation
    signUp(data) {

        let emailExists;
        let isPasswordValid = false
        console.log(data.email)

        return new Promise((resolve, reject) => {
            this.checkIfEmailExists(data.email)
                .then((exists) => {
                    emailExists = exists
                    console.log("ss")
                    if (data.password.length >= 8) {
                        isPasswordValid = true
                    }
                    if (exists == false && isPasswordValid == true) {
                        return this.encryptPassword(data.password)
                    } else {
                        return null
                    }
                })
                .then((encryptedPassword) => {
                    if (encryptedPassword) {
                        data.password = encryptedPassword
                        return refreshTokenService.refreshTokenGenerator()
                    } else {
                        return null
                    }
                })
                .then((token) => {
                    if (token) {
                        data.token = token
                        data.mobile = ''
                        console.log(data)
                        return userModel.create(data)
                    } else {
                        return null
                    }
                })
                .then((created) => {
                    if (isPasswordValid == false) {
                        reject({ code: 500, msg: "Error while creating user", error: "Password length should be greater than 8" })
                    }
                    if (emailExists == true) {
                        reject({ code: 500, msg: "Error while creating user", error: "Email already exists." })
                    }
                    if (created) {
                        created.password = ""
                        resolve(created)
                    }
                })
                .catch((errorWhileGeneratingToken) => {
                    reject({ code: 500, msg: "Error while creating user", error: errorWhileGeneratingToken })
                })
        })
    }

    encryptPassword(password) {
        return new Promise((resolve, reject) => {

            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) {
                    reject(err)
                }
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash)
                })
            })
        })
    }

    login(data) {
        let refreshToken;
        let userFound;
        return new Promise((resolve, reject) => {
            this.checkIfEmailExists(data.email)
                .then((exists) => {
                    if(exists) {
                        return userModel.findOne({
                            "email": data.email
                        })
                        
                    } else {
                        reject({ code: 500, msg: "User doesn't exist", error: err })
                    }
                })
                .then((user) => {
                    if(user) {
                        console.log("compared",user);
                        userFound = user;
                        //return bcrypt.compare(data.password, user.password)
                        // return bcrypt.compare(data.password, user.password)
                        //     .then(res => {
                        //         if (res) {
                        //             return res;
                        //         }
                        //         throw new Error('password is incorrect');
                        //     });

                            return new Promise((resolve, reject) => {
                                bcrypt.compare(data.password, user.password, (err,res) => {
                                     if(res) {
                                         resolve(res);
                                     }
                                     else {
                                         reject("Problem here");
                                     }
                                    console.log(res);
                        
                                });            
                            });
                    }
                })
                .then((compared) => {
                    if(compared) {
                        console.log("dsd");
                        let refreshToken = jwt.sign({ userId: userFound._id }, cred().secret)
                        return refreshToken
                    } else {
                        reject({ code: 500, msg: "Username/password is incorrect", error: err })
                    }
                })
                .then((token) => {
                    console.log(token)
                    userFound.token = token
                    return userModel.update(userFound)
                })
                .then((updated) => {
                    let userReturn = {
                        'name': '',
                        'email': '',
                        'mobile':'',
                        'token': ''
                    }
                    if (updated) {
                        userReturn.name = userFound.name
                        userReturn.email = userFound.email
                        userReturn.mobile = userFound.mobile
                        userReturn.token = userFound.token
                    } 
                    resolve(userReturn)
                })
                .catch((error) => {
                    reject({ code: 500, msg: "Error while Logging in", error: error })
                })

        })
    }

    checkIfEmailExists(email_r) {

        return new Promise((resolve, reject) => {
            let exists = false
            userModel.findOne({email: email_r})
                .then((result) => {
                    if (result == null) {
                        resolve(exists)
                    } else {
                        exists = true;
                        resolve(exists)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })

    }

}


export default new UserController()