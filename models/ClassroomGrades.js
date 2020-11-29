/*
 * ClassroomGrades schema
 */
const mongoose = require("mongoose");

const ClassroomGradesSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  _classroomId:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'Classroom'
  },
  mastery_grades:{
    type:Map,
    required:true,
    default: {}
  },
  mastery_topics:{
    type:Map,
    required:true,
    default: {}
  }
});

const ClassroomGrades = mongoose.model(
  "ClassroomGrades",
  ClassroomGradesSchema
);

module.exports = ClassroomGrades;