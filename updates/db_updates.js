const mongoose = require('mongoose');
const { use } = require('passport');

/*===========================
     CLASSROOM FUNCTIONS
============================*/

async function re_mapTAs(classroom_id) {
  return new Promise((resolve, rejects) => {
    let mapped = {};
    let ta_ids = [];
    let current = 0;

    function increaseTa() {
      if (current == ta_ids.length - 1) {
        current = 0;
      } else {
        current++;
      }
    }
    const Classroom = require('../models/Classroom');
    Classroom.findById(classroom_id)
      .select({ teaching_assistants: 1, lecturer: 1, partecipants: 1 })
      .then((r) => {
        r.teaching_assistants.forEach((e) => {
          ta_ids.push(e);
        });
        ta_ids.push(r.lecturer);
        let stud_ids = r.partecipants;
        stud_ids.forEach((s_id) => {
          mapped[s_id] = ta_ids[current];
          increaseTa();
        });

        r.ta_mapping = mapped;
        console.log('Re-mapped TAs to Students for classroom: ' + classroom_id);
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

function updateUser(user_id, classroom_id) {
  const User = require('../models/User');
  const ClassroomGrades = require('../models/ClassroomGrades');
  let classroom_grade = new ClassroomGrades({
    _userId: user_id,
    _classroomId: classroom_id,
  });
  classroom_grade.save().then(() => {
    User.findById(user_id)
      .then((u) => {
        console.log('user found');
        u.classrooms_grades.set(classroom_id.toString(), classroom_grade._id);
        u.save()
          .then(() => {
            return classroom_grade;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
}

async function increaseTa(user_id, classroom_id) {
  const Classroom = require('../models/Classroom');

  return new Promise((resolve, rejects) => {
    Classroom.findById(classroom_id).then((classroom) => {
      let ta_ids = [];

      classroom.teaching_assistants.forEach((e) => {
        ta_ids.push(e);
      });
      ta_ids.push(classroom.lecturer);
      // console.log(ta_ids);
      let current_ta = classroom.ta_mapping.get(user_id.toString());
      // console.log(classroom.ta_mapping);
      let next_ta_index;
      for (let i = 0; i < ta_ids.length; i++) {
        if (ta_ids[i].toString() == current_ta.toString()) {
          if (i == ta_ids.length - 1) {
            next_ta_index = 0;
          } else {
            next_ta_index = i + 1;
          }
        }
      }

      classroom.ta_mapping.set(user_id.toString(), ta_ids[next_ta_index]);

      classroom
        .save()
        .then(() => resolve())
        .catch((err) => rejects(err));
    });
  });
}

/*===========================
        USER FUNCTIONS
============================*/

async function addAvailability(user_id) {
  const User = require('../models/User');
  const Availability = require('../models/Availability');
  User.findById(user_id).then((usr) => {
    if (!usr || usr.availability) {
      return;
    }
    new_avail = new Availability({
      _userId: user_id,
      busy: [],
    });
    new_avail.save();
    usr.availability = new_avail._id;
    usr.save();
  });
}

module.exports = {
  re_mapTAs,
  updateUser,
  increaseTa,
  addAvailability,
};
