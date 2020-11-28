const express = require("express");
const moment = require("moment");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");

const User = require("../models/User");
const MasteryCheck = require("../models/MasteryCheck");
const ClassroomMasteryDay = require("../models/ClassroomMasteryDay");
const Availability = require("../models/Availability");

module.exports = router;


router.post("/", ensureAuthenticated, (req, res) => {
    MasteryCheck.findById(req.body.mastery_id).populate('classroom').select({topics: 0, __v:0, author: 0}).then(r => {
        if(r.available && r.classroom.partecipants.includes(req.user._id)){
            res.json(r);
        } else {
            res.status(400).end();
        }
        
    })
});
