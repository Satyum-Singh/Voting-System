const Candidate = require('../models/Candidate');
const { differenceInYears } = require("date-fns");
const { StatusCodes } = require('http-status-codes');


const addCandidate = async (req, res) => {
    const { name, DOB, partyName, partyLogo } = req.body;

    if (differenceInYears(Date.now(), DOB) <= 35) {
        return res.status(StatusCodes.BAD_REQUEST).send('candidate age is less than 35');
    }

    const candidate = await Candidate.create({ name, DOB, partyName, partyLogo });
    console.log(candidate);
    res.status(StatusCodes.CREATED).send('candidate added');
}
const getAllCandidates = async (req, res) => {

    const candidates = await Candidate.find({});
    console.log(candidates);
    res.status(StatusCodes.OK).send(candidates);

}
const updateCandidate = async (req, res) => {

}
const deleteCandidate = async (req, res) => {
    const { id } = req.params;
    await Candidate.findOneAndDelete({ _id: id });
    res.status(StatusCodes.ACCEPTED).send('Deleted');
}
const addVote = async (req, res) => {
    const { candId } = req.body;
    // const candidate =  await Candidate.find({_id:candId});
    // const NvoteCount = candidate.voteCount+1;
    await Candidate.findByIdAndUpdate({ _id: candId }, { $inc: { voteCount: 1 } });
    res.status(StatusCodes.OK).send('voted');
}
const result = async (req, res) => {
    const candidate = await Candidate.find({});

    const dataset = { partyName: [], voteCount: [] };
    candidate.forEach(cand=>{
        dataset.partyName.push(cand.partyName);
        dataset.voteCount.push(cand.voteCount);
    })

    res.status(StatusCodes.OK).send(dataset);
}

module.exports = { addCandidate, getAllCandidates, updateCandidate, deleteCandidate, addVote, result };