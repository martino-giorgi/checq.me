/**
 * Classroom schema
 */

const mongoose = require("mongoose");
const User = require("./User");
const Topic = require("./Topic");
const MasteryCheck = require("./MasteryCheck");
const { re_mapTAs, updateUser } = require('../updates/db_updates');

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
  },
  professors: [{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }]
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
        { "updateDescription.updatedFields.__v": { $exists: true } },
        { operationType: "update" },
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

Classroom.watch(filter_stud_ar_insert).on("change", (data) => {
  let user_id = data.updateDescription.updatedFields.partecipants.pop();

  re_mapTAs(data.documentKey._id);
  updateUser(user_id, data.documentKey._id);
});

Classroom.watch(filter_ta_ar_update).on("change", (data) => {
  re_mapTAs(data.documentKey._id);
});
