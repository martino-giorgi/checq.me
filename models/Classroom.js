/**
 * Classroom schema
 */

const mongoose = require("mongoose");
const User = require("./User");
const Topic = require("./Topic");
const MasteryCheck = require("./MasteryCheck");
const { re_mapTAs, updateUser } = require("../updates/db_updates");

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
  ta_mapping: {
    type: Map,
    required: true,
    default: {},
  },
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

module.exports = Classroom;

// Observer Pattern

//inserted element into array of partecipants in a class
var filter_stud_ar_insert = [
  {
    $match: {
      $and: [
        { "updateDescription.updatedFields.partecipants": { $exists: true } },
        // { "updateDescription.updatedFields.__v": { $exists: true } },
        // { operationType: "update" },
      ],
    },
  },
];

//deleted element into array of partecipants in a class
var filter_stud_ar_remove = [
  {
    $match: {
      $and: [
        { "updateDescription.updatedFields.partecipants": { $exists: true } },
        { operationType: "update" },
      ],
    },
  },
];

//added new TA or removed TA
var filter_ta_ar_update = [
  {
    $match: {
      $and: [
        { "updateDescription.updatedFields.teaching_assistants": { $exists: true } },
        { operationType: "update" },
      ],
    },
  },
];

// var options = { fullDocument: 'updateLookup' };

//updated partecipants field
//TODO: add update on ta list.
Classroom.watch(filter_stud_ar_insert).on("change", (data) => {
  let user_id = data.updateDescription.updatedFields.partecipants.pop();

  console.log(data);

  re_mapTAs(data.documentKey._id);
  updateUser(user_id, data.documentKey._id);
});

//just for safety, should never happen.
//if a TA or Professor kicks a user from the class the update should be made ON THE USER which would than trigger the update on the classroom
// Classroom.watch(filter_stud_ar_remove).on("change", (data) => {
  // mapTAs(data.documentKey._id);
// });

Classroom.watch(filter_ta_ar_update).on("change", (data) => {
  re_mapTAs(data.documentKey._id);
});

// TODO:
// mapTAs must be called on every update of the field participants

// updateUser must be called when a user is added to the participants field, not if deleted
// When a user is added to the participants field, the user should be updated by adding
// the classroom to their classrooms field
