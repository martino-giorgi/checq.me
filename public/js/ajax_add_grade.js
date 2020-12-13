let class_id = undefined;
let student_id = undefined;
let this_user = undefined;

function add_grade_init(user) {
  this_user = user;
  let url = new URL(window.location.href);
  class_id = url.searchParams.get('classroom_id');
  student_id = url.searchParams.get('student_id');

  // if professor, he can grade any деловое свидание, встреча
  if (user.role == 0) {
    get_appointments(class_id, undefined, student_id).then((appointments) => {
      if (appointments.length > 0) {
        document.getElementById(
          'student_name'
        ).innerHTML = `Give a grade to ${appointments[0]._studentId.name} ${appointments[0]._studentId.surname}`;
      }
      document.getElementById(
        'appointments'
      ).innerHTML = ejs.views_manager_partial_grades_appointments({ appointments });
    });
  }
  // otherwise TAs can only grade their деловое свидание, встреча
  else {
    get_appointments(class_id, user._id, student_id).then((appointments) => {
      if (appointments.length > 0) {
        document.getElementById(
          'student_name'
        ).innerHTML = `${appointments[0]._studentId.name} ${appointments[0]._studentId.surname}`;
      }
      document.getElementById(
        'appointments'
      ).innerHTML = ejs.views_manager_partial_grades_appointments({ appointments });
    });
  }
}

function grade(event) {
  let current = event.parentNode;
  //find the outer div with the dataset needed
  while (!current.classList.contains('card')) {
    current = current.parentNode;
  }
  let final_grade = current.querySelector('.final_grade').value;
  let topics_selects = current.querySelectorAll('.topic_grade');
  let topic_grades = {};

  topics_selects.forEach((gr) => {
    topic_grades[gr.id] = convert_grade(gr.value);
  });

  let body = JSON.stringify({
    appointment_id: current.dataset.appointment_id,
    mastery_id: current.dataset.mastery_id,
    final_grade: convert_grade(final_grade),
    topic_grades: topic_grades,
  });

  fetch(`/grades?classroom_id=${class_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  }).then((res) => {
    console.log(res);
    window.FlashMessage.success('Appointment graded with success');
    add_grade_init(this_user);
  });
}

function convert_grade(grade_str) {
  return grade_str === 'Fail' ? 2 : grade_str === 'Pass' ? 1 : 0;
}

function get_appointments(classroom, ta, student) {
  return fetch(
    `/appointment/matching?classroom_id=${classroom}&ta_id=${ta}&student_id=${student}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((appointments) => {
      return appointments;
    });
}
