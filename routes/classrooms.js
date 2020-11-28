const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const {
  ensureAuthenticated,
  ensureProfessor,
  ensureStudent,
  ensureTa,
} = require("../config/auth");
const path = require("path");

const MasteryCheck = require("../models/MasteryCheck");
const Classroom = require("../models/Classroom");
const User = require("../models/User");
const Topic = require("../models/Topic");
const TokenClassroom = require("../models/TokenClassroom");
const { response } = require("express");

module.exports = router;

// 
// This view is used to properly render /classrooms, not for direct interaction with the database.
// 

router.get("/", ensureAuthenticated, (req, res) => {
	if (req.user.role == 1 || req.user.role == 0) {
		Classroom.find({ lecturer: req.user })
		.populate("topics")
		.then((result) => {
				res.json({ classrooms: result, user: req.user });
		})
		.catch((err) => {
				console.log(err);
				res.json({});
		});
	} else if (req.user.role == 2) {
		User.findOne({ _id: req.user._id })
			.select({
				_id: 1,
				role: 1,
				classrooms: 1,
			})
			.then((user) => {
				if (user) {
					Classroom.find({ _id: { $in: user.classrooms } })
						.select({
							teaching_assistants: 1,
							lecturer: 1,
							name: 1,
							_id: 1,
							color: 1,
							description: 1
						})
						.populate({
							path: "teaching_assistants",
							select: ["email", "name", "surname"],
						})
						.populate({
							path: "lecturer",
							select: ["email", "name", "surname"],
						})
						.then((re) => {
							let Model = {
								user: user,
								classrooms: re
							}

							res.render('classroom', { model: Model });
						});
				}
		});
	}
})
