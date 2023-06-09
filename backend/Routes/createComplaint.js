const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')

router.post("/createcomplaint",
    async (req, res) => {
        try {
            await Complaint.create({
                reportedby: req.body.reportedby,
                email: req.body.email,
                contactno: req.body.contactno,
                idType: req.body.idType,
                idno: req.body.idno,
                type: req.body.type,
                location: req.body.location,
                time: req.body.time,
                accused: req.body.accused,
                victim: req.body.victim,
                description: req.body.description,
                nearestStation: req.body.nearestStation
            })
            const latestDocument = await Complaint.findOne({}, { cid: 1 , _id:0 }).sort({ cid: -1 }).limit(1);
            res.json({ success: true ,msg:"Fetched cid successfully",cid:latestDocument});
        } catch (error) {
            console.error(error)
            res.json({ success: false });
        }
    })

router.get("/obtaincomplaint",async(req,res) => {
    try {
        const complaintdata = await Complaint.find({})
        res.json({success:true , complaintdata:complaintdata})
    }
    catch (error) {
        console.error(error);
    }
})

router.get("/searchcomplaint",async(req,res) => {
    try{
        const cid = req.query.cid
        const cdata = await Complaint.find({cid : cid})
        res.json({success:true,cdata:cdata})
    }
    catch(err){
        console.error(err);
        res.json({success:false})
    }
})

module.exports = router;