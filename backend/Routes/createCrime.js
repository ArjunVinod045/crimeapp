const express = require('express')
const router = express.Router()
const Crime = require('../models/Crime')
const Complaint = require('../models/Complaint')
const Officer = require('../models/Officer')

router.post("/createcrime",
    async (req, res) => {
        try {
            const cidX = req.body.cid
            const penX = req.body.investigatedby
            const off = await Officer.findOne({pen: penX})
            const complaint = await Complaint.findOne({cid: cidX})
            if(!complaint){
                throw new Error(`No such complaint found: ${complaint}`)
            }
            if(!off){
                throw new Error(`Officer mentioned not valid: ${off}`)
            }
            const locationX = complaint.location
            const timeX = complaint.time
            const typeX = complaint.type
            const reportedbyX = complaint.reportedby
            const investigatedbyX = off.fname + " " + off.lname

            await Crime.create({
                cid: cidX,
                location: locationX,
                time: timeX,
                type: typeX,
                reportedby: reportedbyX,
                investigatedby: investigatedbyX,
                status: req.body.status,
                criminal: req.body.criminal,
                victim: req.body.victim
            })
            res.json({ success: true });
        } catch (error) {
            console.error(error)
            res.json({ success: false });
        }
    })

module.exports = router;