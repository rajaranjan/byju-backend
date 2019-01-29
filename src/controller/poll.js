import pollModel from '../models/poll'
import voteModel from '../models/vote'
import cred from '../config/const'

class pollController {

    constructor() { }

    //get pollist 
    getPolls(data) {
        let userId = data.userId
        return new Promise((resolve, reject) => {
            pollModel.find({})
                .then((polls) => {
                    resolve(polls)
                })
                .catch((err) => {
                    reject({ code: 500, msg: "Error while getting polls", error: err })
                })
        })
    }

    // add poll 
    addPoll(data){
        let userId = data.userId
        console.log(userId)
        data = data.body
        data.userId = userId
        return new Promise((resolve, reject) => {
            pollModel.findOne({
                "title": data.title
            })
            .then((poll) => {
                if(poll){
                    reject({ code: 500, msg: "Poll already exist", error: poll })
                } else {
                    let polModel = new pollModel(data)
                    return polModel.save()
                }
            })
            .then((isSaved) => {
                if(isSaved){
                    console.log("isSaved",isSaved)
                    return pollModel.find({})
                }
            })
            .then((polls) => {
		if(polls) {
		    resolve(polls)
		}
            })
            .catch((err) => {
                reject({ code: 500, msg: "Error while Saving poll", error: err })
            })
        })
    }

    getSinglePoll(data) {
        let userId = data.userId
        let pollId = data.id
        let pollFound = {}
        return new Promise((resolve, reject) => {
            pollModel.findOne({
                "_id": data.params.id
            })
            .then((poll) => {
                if(poll){
                    pollFound = poll
                    return voteModel.find({'pollId': poll._id})
                } else {
                    reject({ code: 500, msg: "No poll found", error: poll })
                }
            })
            .then((votes) => {
                let vote
                let voteList = []
                for(var i=0; i<votes.length; i++) {
                    vote = {}
                    if(voteList.length == 0){
                        vote.option = votes[i].option
                        vote.number = 1
                        voteList.push(vote)
                    } else {
                        let found = false
                        let foundId
                        for(var j=0; j<voteList.length; j++){
                            if(voteList[j].option == votes[i].option) {
                                found = true  
                                foundId = j
                            }
                        }
                        if(found == true) {
                            voteList[foundId].number = voteList[foundId].number + 1
                        } else {
                            vote.option = votes[i].option
                            vote.number = 1
                            voteList.push(vote)
                        }
                    }
                }
                return voteList
            })
            .then((votes) => {
                var pollD = Object.assign({}, pollFound._doc)
                pollD.votes = votes
                resolve(pollD)
            })
            .catch((err) => {
                reject({ code: 500, msg: "Error while Finding poll", error: err })
            })
        })
    }

    //delete a poll 
    deletePoll(data) {
        console.log(data.params.id);
        return new Promise((resolve, reject) => {
            pollModel.findOne({
                "_id": data.params.id 
            })
            .then((poll) => {
                console.log(poll);
                if(poll){
                    return pollModel.find({ "_id": data.params.id }).remove().exec()
                } else {
                    reject({ code: 500, msg: "Poll already exist", error: poll })
                }
            })
            .then((isRemoved) => {
                if(isRemoved){
                    console.log("isRemoved",isRemoved)
                    return pollModel.find({})
                }
            })
            .then((polls) => {
                if(polls) {
                    resolve(polls)
                }
            })
            .catch((err) => {
                reject({ code: 500, msg: "Error while deleteing a poll", error: err })
            })
        })
    }

    //add Vote
    addVote(data) {
        let userId = data.userId
        data = data.body
        data.userId = userId
        return new Promise((resolve, reject) => {
            pollModel.findOne({
                "_id": data.pollId
            })
            .then((poll) => {
                if(poll){
                    let save = {}
                    save.pollId = poll._id
                    save.option = data.option
                    save.userId = data.userId
                    let votModel = new voteModel(save)
                    return votModel.save()
                } else {
                    reject({ code: 500, msg: "Poll doesn't exist", error: poll })
                }
            })
            .then((isSaved) => {
                if(isSaved){
                    resolve(isSaved)
                }
            })
            .catch((err) => {
                reject({ code: 500, msg: "Error while Saving poll", error: err })
            })
        })
    }
}


export default new pollController()
