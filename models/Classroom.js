/**
 * Classroom schema
 */

const mongoose = require("mongoose");
const User = require("./User");
const Topic = require("./Topic");
const MasteryCheck = require("./MasteryCheck");
const mapTAs = require("../updates/db_updates")

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
  end_date: {
    type: Date,
    required: true,
  },
  ta_mapping:{
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
    "updateDescription.updatedFields.partecipants": { $exists: true },
  }
}];

// var options = { fullDocument: 'updateLookup' };

Classroom.watch(filter_ar_update_partecipants).on('change',  data => {
  // console.log(data.documentKey._id);
   mapTAs(data.documentKey._id);
})

