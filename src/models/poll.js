import mongoose from '../db/mongodb'


class Poll {
    poll

    constructor() {
        let pollSchema = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            userId: {
                type: String,
                required: true
            }
        })

        this.poll = mongoose.model('poll', pollSchema)
    }
}

export default new Poll().poll