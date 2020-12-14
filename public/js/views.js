//EJS Compiled Views - This file was automatically generated on Mon Dec 14 2020 14:22:52 GMT+0100 (Central European Standard Time)
ejs.views_include = function(locals) {
    return function(path, d) {
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
ejs.views_manager_partial_class_info = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div>\n  <h1 class=\"main-header\"> <%= name %> </h1>\n  <h3>\n    TAs: <%=teaching_assistants.length %>\n    |\n    Participants: <%= partecipants.length%>\n  </h3>\n</div>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div>\n  <h1 class=\"main-header\"> ")
    ; __line = 2
    ; __append(escapeFn( name ))
    ; __append(" </h1>\n  <h3>\n    TAs: ")
    ; __line = 4
    ; __append(escapeFn(teaching_assistants.length ))
    ; __append("\n    |\n    Participants: ")
    ; __line = 6
    ; __append(escapeFn( partecipants.length))
    ; __append("\n  </h3>\n</div>\n")
    ; __line = 9
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_class_navbar = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<nav class=\"nav nav-pills nav-justified\">\n    <a class=\"nav-link active\" id=\"a_nav_mastery\" href=\"<%='/manager/classroom?id='+c_id%>\">Mastery Checks</a>\n    <a class=\"nav-link\" id=\"a_nav_students\" href=\"<%='/manager/classroom/students?id='+c_id%>\">Students</a>\n    <a class=\"nav-link\" id=\"a_nav_tas\" href=\"<%='/manager/classroom/tas?id='+c_id%>\">TAs</a>\n</nav>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<nav class=\"nav nav-pills nav-justified\">\n    <a class=\"nav-link active\" id=\"a_nav_mastery\" href=\"")
    ; __line = 2
    ; __append(escapeFn('/manager/classroom?id='+c_id))
    ; __append("\">Mastery Checks</a>\n    <a class=\"nav-link\" id=\"a_nav_students\" href=\"")
    ; __line = 3
    ; __append(escapeFn('/manager/classroom/students?id='+c_id))
    ; __append("\">Students</a>\n    <a class=\"nav-link\" id=\"a_nav_tas\" href=\"")
    ; __line = 4
    ; __append(escapeFn('/manager/classroom/tas?id='+c_id))
    ; __append("\">TAs</a>\n</nav>")
    ; __line = 5
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_class_student_list = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"container mt-3 mb-4\">\n  <div class=\"mt-4 mt-lg-0\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\n          <table class=\"table manage-candidates-top mb-0\">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th class=\"text-center\">Role</th>\n                <th class=\"action text-right\">Action</th>\n              </tr>\n            </thead>\n\n            <tbody>\n              <% partecipants.concat(teaching_assistants.concat(professors)).forEach(p=> { %>\n                <% let curr=p._id %>\n                  <tr class=\"candidates-list\">\n                    <td class=\"title\">\n                      <div class=\"thumb\">\n                        <% if (p.gravatar=='' || typeof p.gravatar==='undefined' ) { %>\n                          <img class=\"img-fluid\" src=\"/assets/icons/misc/pp_placeholder.svg\" alt=\"profile picture\">\n                          <% } else { %>\n                            <img class=\"img-fluid\" src=\"<%- p.gravatar %>\" alt=\"profile picture\">\n                            <% } %>\n                      </div>\n\n                      <div class=\"candidate-list-details\">\n                        <div class=\"candidate-list-info\">\n                          <div class=\"candidate-list-title\">\n                            <p class=\"mb-0\">\n                              <%= p.name%>\n                                <%- p.surname %>\n                            </p>\n                          </div>\n                        </div>\n                      </div>\n                    </td>\n                    <td class=\"candidate-list-favourite-time text-center\">\n                      <span class=\"candidate-list-time order-1\">\n                        <%- professors.map(e=> e._id).includes(p._id) ? \"Professor\" : (teaching_assistants.map(e =>\n                          e._id).includes(p._id)) ? \"TA\" : \"Student\"%>\n                      </span>\n                    </td>\n                    <td>\n                      <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\n                        <li><a onclick=\"setUser('<%- curr %>')\" href=\"#\" class=\"text-info\" data-toggle=\"modal\"\n                            data-target=\"#edit-user-modal\" title=\"\" data-original-title=\"Edit\"><i\n                              class=\"fas fa-pencil-alt\"></i></a></li>\n\n                      <% if (partecipants.includes(p)) { %>\n                        <li><a href=\"/grades/student?classroom_id=<%- _id %>&student_id=<%- p._id %>\" class=\"text-info\"><i class=\"fas fa-info-circle\"></i></a></li>\n                        <li><a href=\"/grades/add?classroom_id=<%- _id %>&student_id=<%- p._id %>\" class=\"text-info\"><i class=\"fas fa-plus\"></i></a></li>\n                      <%}%>\n                    </ul>\n                  </td>\n                </tr>\n              <% }) %>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\n      </div>\n      <div class=\"modal-body\">\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\n          data-target=\"#edit-user-modal\">\n          Remove from Classroom\n        </button>\n        <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n          Value\n        </button>\n        <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n          Toggle Prof\n        </button>\n      </div>\n    </div>\n  </div>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3 mb-4\">\n  <div class=\"mt-4 mt-lg-0\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\n          <table class=\"table manage-candidates-top mb-0\">\n            <thead>\n              <tr>\n                <th>Name</th>\n                <th class=\"text-center\">Role</th>\n                <th class=\"action text-right\">Action</th>\n              </tr>\n            </thead>\n\n            <tbody>\n              ")
    ; __line = 16
    ;  partecipants.concat(teaching_assistants.concat(professors)).forEach(p=> { 
    ; __append("\n                ")
    ; __line = 17
    ;  let curr=p._id 
    ; __append("\n                  <tr class=\"candidates-list\">\n                    <td class=\"title\">\n                      <div class=\"thumb\">\n                        ")
    ; __line = 21
    ;  if (p.gravatar=='' || typeof p.gravatar==='undefined' ) { 
    ; __append("\n                          <img class=\"img-fluid\" src=\"/assets/icons/misc/pp_placeholder.svg\" alt=\"profile picture\">\n                          ")
    ; __line = 23
    ;  } else { 
    ; __append("\n                            <img class=\"img-fluid\" src=\"")
    ; __line = 24
    ; __append( p.gravatar )
    ; __append("\" alt=\"profile picture\">\n                            ")
    ; __line = 25
    ;  } 
    ; __append("\n                      </div>\n\n                      <div class=\"candidate-list-details\">\n                        <div class=\"candidate-list-info\">\n                          <div class=\"candidate-list-title\">\n                            <p class=\"mb-0\">\n                              ")
    ; __line = 32
    ; __append(escapeFn( p.name))
    ; __append("\n                                ")
    ; __line = 33
    ; __append( p.surname )
    ; __append("\n                            </p>\n                          </div>\n                        </div>\n                      </div>\n                    </td>\n                    <td class=\"candidate-list-favourite-time text-center\">\n                      <span class=\"candidate-list-time order-1\">\n                        ")
    ; __line = 41
    ; __append( professors.map(e=> e._id).includes(p._id) ? "Professor" : (teaching_assistants.map(e =>
                          e._id).includes(p._id)) ? "TA" : "Student")
    ; __line = 42
    ; __append("\n                      </span>\n                    </td>\n                    <td>\n                      <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\n                        <li><a onclick=\"setUser('")
    ; __line = 47
    ; __append( curr )
    ; __append("')\" href=\"#\" class=\"text-info\" data-toggle=\"modal\"\n                            data-target=\"#edit-user-modal\" title=\"\" data-original-title=\"Edit\"><i\n                              class=\"fas fa-pencil-alt\"></i></a></li>\n\n                      ")
    ; __line = 51
    ;  if (partecipants.includes(p)) { 
    ; __append("\n                        <li><a href=\"/grades/student?classroom_id=")
    ; __line = 52
    ; __append( _id )
    ; __append("&student_id=")
    ; __append( p._id )
    ; __append("\" class=\"text-info\"><i class=\"fas fa-info-circle\"></i></a></li>\n                        <li><a href=\"/grades/add?classroom_id=")
    ; __line = 53
    ; __append( _id )
    ; __append("&student_id=")
    ; __append( p._id )
    ; __append("\" class=\"text-info\"><i class=\"fas fa-plus\"></i></a></li>\n                      ")
    ; __line = 54
    ; }
    ; __append("\n                    </ul>\n                  </td>\n                </tr>\n              ")
    ; __line = 58
    ;  }) 
    ; __append("\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\n      </div>\n      <div class=\"modal-body\">\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\n          data-target=\"#edit-user-modal\">\n          Remove from Classroom\n        </button>\n        <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n          Value\n        </button>\n        <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n          Toggle Prof\n        </button>\n      </div>\n    </div>\n  </div>\n</div>")
    ; __line = 90
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_grades_appointments = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<% console.log('diob',appointments)%>\n<% if ( appointments.length > 0 ) {%>\n    <% appointments.map(appointment => { %>\n\n        <div class=\"card\" data-mastery_id=<%= appointment._masteryId._id%> data-appointment_id=<%= appointment._id%>>\n            <div class=\"card-header\">\n            Appointment\n            </div>\n            <div class=\"card-body\">\n            <h5 class=\"card-title\">Date and Time: <%= moment(appointment.end_time).format('DD.MM.YYYY (HH:mm)')%></h5>\n            <p class=\"card-text\">\n                <strong>Mastery Check</strong>: <%= appointment._masteryId.name%>\n                \n                <% appointment._masteryId.topics.forEach( topics => {%>\n                \n                    <p><strong>Topic</strong>: <%= topics.name%> \n                    <select class='topic_grade' id=\"<%= topics._id%>\">\n                        <option>Fail</option>\n                        <option>Pass</option>\n                        <option>Exceed</option>\n                    </select>\n                </p>\n                <% })%>\n            </p>\n            <h4>Appointment Grade:                 \n                <select class='final_grade'>\n                    <option>Fail</option>\n                    <option>Pass</option>\n                    <option>Exceed</option>\n                </select></h4>\n            <a onclick=\"grade(this)\" class=\"btn btn-primary\">Grade</a>\n            </div>\n        </div>\n    <% }) %>\n<% } else { %>\n        <h1>Nothing to grade</h1>\n<%} %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  console.log('diob',appointments)
    ; __append("\n")
    ; __line = 2
    ;  if ( appointments.length > 0 ) {
    ; __append("\n    ")
    ; __line = 3
    ;  appointments.map(appointment => { 
    ; __append("\n\n        <div class=\"card\" data-mastery_id=")
    ; __line = 5
    ; __append(escapeFn( appointment._masteryId._id))
    ; __append(" data-appointment_id=")
    ; __append(escapeFn( appointment._id))
    ; __append(">\n            <div class=\"card-header\">\n            Appointment\n            </div>\n            <div class=\"card-body\">\n            <h5 class=\"card-title\">Date and Time: ")
    ; __line = 10
    ; __append(escapeFn( moment(appointment.end_time).format('DD.MM.YYYY (HH:mm)')))
    ; __append("</h5>\n            <p class=\"card-text\">\n                <strong>Mastery Check</strong>: ")
    ; __line = 12
    ; __append(escapeFn( appointment._masteryId.name))
    ; __append("\n                \n                ")
    ; __line = 14
    ;  appointment._masteryId.topics.forEach( topics => {
    ; __append("\n                \n                    <p><strong>Topic</strong>: ")
    ; __line = 16
    ; __append(escapeFn( topics.name))
    ; __append(" \n                    <select class='topic_grade' id=\"")
    ; __line = 17
    ; __append(escapeFn( topics._id))
    ; __append("\">\n                        <option>Fail</option>\n                        <option>Pass</option>\n                        <option>Exceed</option>\n                    </select>\n                </p>\n                ")
    ; __line = 23
    ;  })
    ; __append("\n            </p>\n            <h4>Appointment Grade:                 \n                <select class='final_grade'>\n                    <option>Fail</option>\n                    <option>Pass</option>\n                    <option>Exceed</option>\n                </select></h4>\n            <a onclick=\"grade(this)\" class=\"btn btn-primary\">Grade</a>\n            </div>\n        </div>\n    ")
    ; __line = 34
    ;  }) 
    ; __append("\n")
    ; __line = 35
    ;  } else { 
    ; __append("\n        <h1>Nothing to grade</h1>\n")
    ; __line = 37
    ; } 
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_mastery_day = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"row\" id=\"<%=\"m-day-\"+counter%>\">\n    <div class=\"col\">\n      <select required class=\"form-control\" id=\"dates\">\n        <option value=\"1\">Monday</option>\n        <option value=\"2\">Tuesday</option>\n        <option value=\"3\">Wednesday</option>\n        <option value=\"4\">Thursday</option>\n        <option value=\"5\">Friday</option>\n        <option value=\"6\">Saturday</option>\n        <option value=\"7\">Sunday</option>\n      </select>\n    </div>\n    \n    <div class=\"col\">\n      <input type=\"time\" required class=\"form-control\" id=\"<%= \"start_time_day_\"+counter %>\" placeholder=\"Starting Time\" name=\"start_time_day\">\n    </div>\n  \n    <button type=\"button\" class=\"btn btn-link\">to</button>\n  \n    <div class=\"col\">\n      <input type=\"time\" required class=\"form-control\" id=\"<%= \"end_time_day_\"+counter %>\" placeholder=\"Ending Time\" name=\"end_time_day\">\n    </div>\n  </div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"row\" id=\"")
    ; __append(escapeFn("m-day-"+counter))
    ; __append("\">\n    <div class=\"col\">\n      <select required class=\"form-control\" id=\"dates\">\n        <option value=\"1\">Monday</option>\n        <option value=\"2\">Tuesday</option>\n        <option value=\"3\">Wednesday</option>\n        <option value=\"4\">Thursday</option>\n        <option value=\"5\">Friday</option>\n        <option value=\"6\">Saturday</option>\n        <option value=\"7\">Sunday</option>\n      </select>\n    </div>\n    \n    <div class=\"col\">\n      <input type=\"time\" required class=\"form-control\" id=\"")
    ; __line = 15
    ; __append(escapeFn( "start_time_day_"+counter ))
    ; __append("\" placeholder=\"Starting Time\" name=\"start_time_day\">\n    </div>\n  \n    <button type=\"button\" class=\"btn btn-link\">to</button>\n  \n    <div class=\"col\">\n      <input type=\"time\" required class=\"form-control\" id=\"")
    ; __line = 21
    ; __append(escapeFn( "end_time_day_"+counter ))
    ; __append("\" placeholder=\"Ending Time\" name=\"end_time_day\">\n    </div>\n  </div>")
    ; __line = 23
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_mastery_add_grade = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"wrapper\">\n    <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\n    <main>\n        <h2 id=\"student_name\"></h2>\n        <div id=\"appointments\"></div>\n    </main>\n</div>\n\n\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_add_grade.js\"></script>\n<script>\n    var s = <%- JSON.stringify(user) %>\n    \n    window.onload = add_grade_init(s);\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"wrapper\">\n    ")
    ; __line = 2
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\n    <main>\n        <h2 id=\"student_name\"></h2>\n        <div id=\"appointments\"></div>\n    </main>\n</div>\n\n\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_add_grade.js\"></script>\n<script>\n    var s = ")
    ; __line = 14
    ; __append( JSON.stringify(user) )
    ; __append("\n    \n    window.onload = add_grade_init(s);\n</script>")
    ; __line = 17
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_mastery_mastery_add = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"container mt-5\">\n  <form id=\"create_form\">\n    <div class=\"form-group\">\n      <label for=\"input_name\">Mastery Check name</label>\n      <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\"\n      id=\"input_name\" value=\"<%- current.name ? current.name : \"\"%>\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"input_description\">Mastery Check description</label>\n      <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\"\n      class=\"form-control\" id=\"input_description\" \n      value=\"<%- current.description ? current.description : \"\"%>\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"input_duration\">Mastery Check duration</label>\n      <input type=\"number\" placeholder=\"Mastery Duration\" name=\"input_duration\" class=\"form-control\"\n      value=\"<%- current.appointment_duration ? current.appointment_duration : \"\"%>\"\n      id=\"input_duration\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"github_repo_name\">GitHub Repo</label>\n      <input type=\"text\" placeholder=\"organization_name/template_repo\" name=\"github_repo_name\" class=\"form-control\"\n      value=\"<%- current.github_repo_name ? current.github_repo_name : \"\"%>\"\n      id=\"github_repo\" required />\n    </div>\n\n    <% console.log(current) %>\n\n    <div class=\"form-check\">\n      <input\n        class=\"form-check-input\"\n        name=\"check_available\"\n        type=\"checkbox\"\n        id=\"check_available\"\n        <%= current.available == true ? 'checked' : '' %>\n      />\n      <label class=\"form-check-label\" for=\"check_available\"> Available </label>\n    </div>\n  </form>\n\n  <% if(current.name) { %>\n    <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">Edit Mastery Check</button>\n  <% } else { %>\n    <button onclick=\"create_mastery()\" class=\"btn btn-primary\">Create Mastery Check</button>\n  <% } %>\n</div>\n\n\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-5\">\n  <form id=\"create_form\">\n    <div class=\"form-group\">\n      <label for=\"input_name\">Mastery Check name</label>\n      <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\"\n      id=\"input_name\" value=\"")
    ; __line = 6
    ; __append( current.name ? current.name : "")
    ; __append("\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"input_description\">Mastery Check description</label>\n      <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\"\n      class=\"form-control\" id=\"input_description\" \n      value=\"")
    ; __line = 13
    ; __append( current.description ? current.description : "")
    ; __append("\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"input_duration\">Mastery Check duration</label>\n      <input type=\"number\" placeholder=\"Mastery Duration\" name=\"input_duration\" class=\"form-control\"\n      value=\"")
    ; __line = 19
    ; __append( current.appointment_duration ? current.appointment_duration : "")
    ; __append("\"\n      id=\"input_duration\" required />\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"github_repo_name\">GitHub Repo</label>\n      <input type=\"text\" placeholder=\"organization_name/template_repo\" name=\"github_repo_name\" class=\"form-control\"\n      value=\"")
    ; __line = 26
    ; __append( current.github_repo_name ? current.github_repo_name : "")
    ; __append("\"\n      id=\"github_repo\" required />\n    </div>\n\n    ")
    ; __line = 30
    ;  console.log(current) 
    ; __append("\n\n    <div class=\"form-check\">\n      <input\n        class=\"form-check-input\"\n        name=\"check_available\"\n        type=\"checkbox\"\n        id=\"check_available\"\n        ")
    ; __line = 38
    ; __append(escapeFn( current.available == true ? 'checked' : '' ))
    ; __append("\n      />\n      <label class=\"form-check-label\" for=\"check_available\"> Available </label>\n    </div>\n  </form>\n\n  ")
    ; __line = 44
    ;  if(current.name) { 
    ; __append("\n    <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">Edit Mastery Check</button>\n  ")
    ; __line = 46
    ;  } else { 
    ; __append("\n    <button onclick=\"create_mastery()\" class=\"btn btn-primary\">Create Mastery Check</button>\n  ")
    ; __line = 48
    ;  } 
    ; __append("\n</div>\n\n\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n")
    ; __line = 55
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_mastery_mastery_list = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"container mt-3\">\n  <% result.forEach((element) => { %>\n    <div class=\"card mt-3\">\n      <div style=\"display: flex;align-items: center;\" class=\"card-header\">\n        <span style=\"margin-right: auto;\">Mastery Check</span>\n\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">\n          Create a Topic\n        </button>\n\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary edit_btn\">\n          Edit Mastery Check\n        </button>\n\n        <button type=\"button\" class=\"btn btn-primary delete_btn\">\n          Delete\n        </button>\n      </div>\n\n      <div class=\"card-body\">\n        <h4 hidden>Classroom ID: <%= element.classroom%></h4>\n        <small id=\"id_container\" hidden data-id=\"<%= element._id %>\">Mastery ID: <%= element._id%></small>\n\n        <h2 class=\"card-title\"><%= element.name %></h2>\n        <p id=\"element_desc\" class=\"card-text\"><%= element.description %></p>\n        <p id=\"github_repo_card\" class=\"card-text\">GitHub Repo: <%= element.github_repo_name %></p>\n        <p id=\"element_durat\" class=\"card-text\">Duration: <%= element.appointment_duration %> | <%= element.available  ? \"Available\" : \"Not Available\" %></p>\n        <p class=\"topic_list\" id=\"topics_list\">\n          <span><%= element.topics.length == 0 ? \"No Topics\" : \"Topics:\"%></span>\n\n          <% element.topics.forEach(topic => { %>\n            <span>\n                <br>\n                <%=topic.name%> \n                <a id=\"a_add_question\" data-topic_id=\"<%= topic._id %>\" href=\"/question/new?topic_id=<%=topic._id %>&classroom_id=<%=element.classroom%>\">\n                    Add questions\n                </a>\n                |\n                <a style=\"cursor: pointer;\" data-mastery_id=\"<%= topic.mastery_id %>\" data-id=\"<%= topic._id%>\"\n                    data-name=\"<%= topic.name%>\" data-description=\"<%= topic.description%>\"\n                    class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \n                |\n                <a href=\"/topic/questions/answer?topic=<%= topic._id%>&classroom_id=<%= element.classroom%>\">\n                    View questions  (<%= topic.questions.length %>)\n                </a>\n            </span>\n          <% }); %>\n        </p>\n      </div>\n    </div>\n  <% }); %>\n</div>\n\n<script src=\"/js/ajax_question.js\"></script>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3\">\n  ")
    ; __line = 2
    ;  result.forEach((element) => { 
    ; __append("\n    <div class=\"card mt-3\">\n      <div style=\"display: flex;align-items: center;\" class=\"card-header\">\n        <span style=\"margin-right: auto;\">Mastery Check</span>\n\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">\n          Create a Topic\n        </button>\n\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary edit_btn\">\n          Edit Mastery Check\n        </button>\n\n        <button type=\"button\" class=\"btn btn-primary delete_btn\">\n          Delete\n        </button>\n      </div>\n\n      <div class=\"card-body\">\n        <h4 hidden>Classroom ID: ")
    ; __line = 21
    ; __append(escapeFn( element.classroom))
    ; __append("</h4>\n        <small id=\"id_container\" hidden data-id=\"")
    ; __line = 22
    ; __append(escapeFn( element._id ))
    ; __append("\">Mastery ID: ")
    ; __append(escapeFn( element._id))
    ; __append("</small>\n\n        <h2 class=\"card-title\">")
    ; __line = 24
    ; __append(escapeFn( element.name ))
    ; __append("</h2>\n        <p id=\"element_desc\" class=\"card-text\">")
    ; __line = 25
    ; __append(escapeFn( element.description ))
    ; __append("</p>\n        <p id=\"github_repo_card\" class=\"card-text\">GitHub Repo: ")
    ; __line = 26
    ; __append(escapeFn( element.github_repo_name ))
    ; __append("</p>\n        <p id=\"element_durat\" class=\"card-text\">Duration: ")
    ; __line = 27
    ; __append(escapeFn( element.appointment_duration ))
    ; __append(" | ")
    ; __append(escapeFn( element.available  ? "Available" : "Not Available" ))
    ; __append("</p>\n        <p class=\"topic_list\" id=\"topics_list\">\n          <span>")
    ; __line = 29
    ; __append(escapeFn( element.topics.length == 0 ? "No Topics" : "Topics:"))
    ; __append("</span>\n\n          ")
    ; __line = 31
    ;  element.topics.forEach(topic => { 
    ; __append("\n            <span>\n                <br>\n                ")
    ; __line = 34
    ; __append(escapeFn(topic.name))
    ; __append(" \n                <a id=\"a_add_question\" data-topic_id=\"")
    ; __line = 35
    ; __append(escapeFn( topic._id ))
    ; __append("\" href=\"/question/new?topic_id=")
    ; __append(escapeFn(topic._id ))
    ; __append("&classroom_id=")
    ; __append(escapeFn(element.classroom))
    ; __append("\">\n                    Add questions\n                </a>\n                |\n                <a style=\"cursor: pointer;\" data-mastery_id=\"")
    ; __line = 39
    ; __append(escapeFn( topic.mastery_id ))
    ; __append("\" data-id=\"")
    ; __append(escapeFn( topic._id))
    ; __append("\"\n                    data-name=\"")
    ; __line = 40
    ; __append(escapeFn( topic.name))
    ; __append("\" data-description=\"")
    ; __append(escapeFn( topic.description))
    ; __append("\"\n                    class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \n                |\n                <a href=\"/topic/questions/answer?topic=")
    ; __line = 43
    ; __append(escapeFn( topic._id))
    ; __append("&classroom_id=")
    ; __append(escapeFn( element.classroom))
    ; __append("\">\n                    View questions  (")
    ; __line = 44
    ; __append(escapeFn( topic.questions.length ))
    ; __append(")\n                </a>\n            </span>\n          ")
    ; __line = 47
    ;  }); 
    ; __append("\n        </p>\n      </div>\n    </div>\n  ")
    ; __line = 51
    ;  }); 
    ; __append("\n</div>\n\n<script src=\"/js/ajax_question.js\"></script>\n")
    ; __line = 55
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_classroom = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n<div class=\"wrapper\">\n  <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\n\n  <main style=\"margin: 26px\">\n    <div class=\"class-header\">\n      <section id=\"class_info\"></section>\n\n      <section id=\"class_options\">\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n          data-target=\"#user-modal\">\n          Show User List\n        </button>\n  \n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n          data-target=\"#add-mastery-modal\">\n          Add a Mastery Check\n        </button>\n      </section>\n    </div>\n\n    <!-- User list modal -->\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"user-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Add Mastery Check modal -->\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\n  </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n    render_mastery_modal();\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n<div class=\"wrapper\">\n  ")
    ; __line = 6
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\n\n  <main style=\"margin: 26px\">\n    <div class=\"class-header\">\n      <section id=\"class_info\"></section>\n\n      <section id=\"class_options\">\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n          data-target=\"#user-modal\">\n          Show User List\n        </button>\n  \n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n          data-target=\"#add-mastery-modal\">\n          Add a Mastery Check\n        </button>\n      </section>\n    </div>\n\n    <!-- User list modal -->\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"user-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Add Mastery Check modal -->\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\n  </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n    render_mastery_modal();\n</script>")
    ; __line = 86
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_new_question = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\"> -->\n<% let langs = {\"JavaScript\" : \"text/javascript\", \n                \"Python\" : \"text/x-python\",\n                \"C\" : \"text/x-csrc\",\n                \"C++\" : \"text/x-c++src\",\n                \"Java\" : \"text/x-java\",\n                \"HTML\" : \"application/xml\",\n                \"CSS\" : \"text/css\"\n            }\n%>\n\n<div class=\"wrapper\">\n    \n    <div>\n        <h2>Add question:</h2>\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\n        <form>\n            <span>Multiple choice question:</span>\n            <br>\n            <span id=\"fields_label\">Options: 1</span>\n\n            <div id=\"text_div\">\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\n            </div>\n\n            <div id=\"code_div\">\n                <select id=\"lang_select\">\n                    <% Object.keys(langs).forEach( lang => { %>\n                        <option value=\"<%= langs[lang]%>\" > <%= lang%> </option>\n                    <% }) %>\n                </select>\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\n            </div>\n\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\n        </form>\n        <div><button id=\"new_field\">Add field</button></div>\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\n        <button onclick=\"post_question()\">Post question</button>\n    </div>\n</div>\n<script src=\"/js/ajax_question.js\"></script>\n\n\n<script>\n    window.onload = init_question;\n</script>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\"> -->\n")
    ; __line = 8
    ;  let langs = {"JavaScript" : "text/javascript", 
                "Python" : "text/x-python",
                "C" : "text/x-csrc",
                "C++" : "text/x-c++src",
                "Java" : "text/x-java",
                "HTML" : "application/xml",
                "CSS" : "text/css"
            }

    ; __line = 16
    ; __append("\n\n<div class=\"wrapper\">\n    \n    <div>\n        <h2>Add question:</h2>\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\n        <form>\n            <span>Multiple choice question:</span>\n            <br>\n            <span id=\"fields_label\">Options: 1</span>\n\n            <div id=\"text_div\">\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\n            </div>\n\n            <div id=\"code_div\">\n                <select id=\"lang_select\">\n                    ")
    ; __line = 34
    ;  Object.keys(langs).forEach( lang => { 
    ; __append("\n                        <option value=\"")
    ; __line = 35
    ; __append(escapeFn( langs[lang]))
    ; __append("\" > ")
    ; __append(escapeFn( lang))
    ; __append(" </option>\n                    ")
    ; __line = 36
    ;  }) 
    ; __append("\n                </select>\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\n            </div>\n\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\n        </form>\n        <div><button id=\"new_field\">Add field</button></div>\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\n        <button onclick=\"post_question()\">Post question</button>\n    </div>\n</div>\n<script src=\"/js/ajax_question.js\"></script>\n\n\n<script>\n    window.onload = init_question;\n</script>\n")
    ; __line = 56
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_new_topic = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"topic_input_name\">Topic name</label>\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"topic_input_name\"\n                    value=\"<%= current.name ? current.name : \"\"%>\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"topic_input_description\">Topic description</label>\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"topic_input_description\" value=\"<%= current.description ? current.description : \"\"%>\" required />\n            </div>\n        </form>\n        <% if(current.name) {%>\n        <button onclick=\"edit_topic()\" class=\"btn btn-primary\">\n            Edit\n            Topic\n        </button>\n        <% } else {%>\n        <button onclick=\"create_topic()\" class=\"btn btn-primary\">\n            Create\n            Topic\n        </button>\n        <% }%>\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ajax_question.js\"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"topic_input_name\">Topic name</label>\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"topic_input_name\"\n                    value=\"")
    ; __line = 7
    ; __append(escapeFn( current.name ? current.name : ""))
    ; __append("\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"topic_input_description\">Topic description</label>\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"topic_input_description\" value=\"")
    ; __line = 12
    ; __append(escapeFn( current.description ? current.description : ""))
    ; __append("\" required />\n            </div>\n        </form>\n        ")
    ; __line = 15
    ;  if(current.name) {
    ; __append("\n        <button onclick=\"edit_topic()\" class=\"btn btn-primary\">\n            Edit\n            Topic\n        </button>\n        ")
    ; __line = 20
    ;  } else {
    ; __append("\n        <button onclick=\"create_topic()\" class=\"btn btn-primary\">\n            Create\n            Topic\n        </button>\n        ")
    ; __line = 25
    ;  }
    ; __append("\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ajax_question.js\"></script>")
    ; __line = 28
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_classroom = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
var __line = 1
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n<div class=\"wrapper\">\n  <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\n\n  <main style=\"margin: 26px\">\n    <div class=\"class-header\">\n      <section id=\"class_info\"></section>\n\n      <section id=\"class_options\">\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n          data-target=\"#user-modal\">\n          Show User List\n        </button>\n  \n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n          data-target=\"#add-mastery-modal\">\n          Add a Mastery Check\n        </button>\n      </section>\n    </div>\n\n    <!-- User list modal -->\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"user-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Add Mastery Check modal -->\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\n  </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n    render_mastery_modal();\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n<div class=\"wrapper\">\n  ")
    ; __line = 6
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\n\n  <main style=\"margin: 26px\">\n    <div class=\"class-header\">\n      <section id=\"class_info\"></section>\n\n      <section id=\"class_options\">\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n          data-target=\"#user-modal\">\n          Show User List\n        </button>\n  \n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n          data-target=\"#add-mastery-modal\">\n          Add a Mastery Check\n        </button>\n      </section>\n    </div>\n\n    <!-- User list modal -->\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"user-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Add Mastery Check modal -->\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\n  </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n    render_mastery_modal();\n</script>")
    ; __line = 86
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}