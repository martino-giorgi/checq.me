/**
 * Classroom schema
 */

const mongoose = require("mongoose");
const User = require("./User");
const Topic = require("./Topic");
const MasteryCheck = require("./MasteryCheck");
const { mapTAs, updateUser } = require('../updates/db_updates');

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  lecturer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  teaching_assistants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  partecipants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  is_ordered_mastery: {
    type: Boolean,
    required: true,
  },
  mastery_checks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "MasteryCheck",
    },
  ],
  mastery_days: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "ClassroomMasteryDays",
    },
  ],
  color: {
    type: String,
    required: true,
  },
  //domain of the university (ex @usi.ch)
  university_domain: {
    type: String,
    required: true,
  },
  //start and end date of the classroom
  start_date: {
    type: Date,
    required: true,
  },
  end_date: { // last day that the user can book the mastery check
    type: Date,
    required: true,
  },
  ta_mapping: {
    type: Map,
    required: true,
    default: {}
  }
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

module.exports = Classroom;

// Observer Pattern

var filter_ar_update_partecipants = [{
  $match: {
    $or: [
      { 'updateDescription.updatedFields.teaching_assistants': { $exists: true } },
      {
        $and: [
          { 'updateDescription.updatedFields.partecipants': { $exists: true } },
          { operationType: 'insert' }
        ]
      },
    ],
  }
}];

// var options = { fullDocument: 'updateLookup' };

//updated partecipants field
//TODO add update on ta list.
// Classroom.watch(filter_ar_update_partecipants).on('change', data => {
//   let user_id = data.updateDescription.updatedFields.partecipants.pop();

//   mapTAs(data.documentKey._id);
//   updateUser(user_id, data.documentKey._id)
// })

// TODO:
// mapTAs must be called on every update of the field participants

// updateUser must be called when a user is added to the participants field, not if deleted
// When a user is added to the participants field, the user should be updated by adding
// the classroom to their classrooms field
