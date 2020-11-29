const { rejects } = require("assert");
const mongoose = require("mongoose");
const { resolve } = require("path");

async function mapTAs(classroom_id) {
  return new Promise((resolve, rejects) => {
    let mapped = {};
    let ta_ids;
    let current = 0;

    function increaseTa() {
      if (current == ta_ids.length - 1) {
        current = 0;
      } else {
        current++;
      }
    }
    const Classroom = require("../models/Classroom");
    Classroom.findById(classroom_id)
      .select({ teaching_assistants: 1, lecturer: 1, partecipants: 1 })
      .then((r) => {
        ta_ids = r.teaching_assistants;
        ta_ids.push(r.lecturer);
        let stud_ids = r.partecipants;
        stud_ids.forEach((s_id) => {
          mapped[s_id] = ta_ids[current];
          increaseTa();
        });

        r.ta_mapping = mapped;
        console.log("Re-mapped TAs to Students for classroom: " + classroom_id);
        r.save((err) => {
          if (err) {
            res.status(500).end();
          }
        });

        resolve(r);
      })
      .catch((err) => rejects(err));
  });
}

async function updateUser(user_id, classroom_id) {
  console.log("ciao");
  const User = require("../models/User");
  const ClassroomGrades = require("../models/ClassroomGrades");
  let classroom_grade = new ClassroomGrades({
    _userId: user_id,
    _classroomId: classroom_id,
  });
  classroom_grade.save().then(() => {
    User.findById(user_id)
      .then((u) => {
        console.log("user found");
        let m = u.classroom_grade;
        m[classroom_id] = classroom_grade._id;
        u.classroom_grade = m;
        u.save()
          .then(() => resolve(classroom_grade))
          .catch((err) => rejects(err));
      })
      .catch((err) => rejects(err));
  });
}

module.exports = {
  mapTAs,
  updateUser,
};
