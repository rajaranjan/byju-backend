import mongoose from '../db/mongodb'


class Vote {
    vote

    constructor() {
        let voteSchema = new mongoose.Schema({
            pollId: {
                type: String,
                required: true
            },
            option: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            }
        })

        this.vote = mongoose.model('vote', voteSchema)
    }
}

export default new Vote().vote