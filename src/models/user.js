import mongoose from '../db/mongodb'


class User {
    user

    constructor() {

        let userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: false
            },
            mobile: {
                type: String,
                required: false,
                default: ''
            },
            token: {
                type: String,
                required: false,
                default: ''
            }
        })

        this.user = mongoose.model('user', userSchema)
    }
}

export default new User().user
