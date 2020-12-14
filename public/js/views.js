//EJS Compiled Views - This file was automatically generated on Sun Dec 13 2020 14:05:42 GMT+0100 (Central European Standard Time)
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
  , __lines = "<div>\r\n  <h1 class=\"main-header\"> <%= name %> </h1>\r\n  <h3>\r\n    TAs: <%=teaching_assistants.length %>\r\n    |\r\n    Participants: <%= partecipants.length%>\r\n  </h3>\r\n</div>\r\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div>\r\n  <h1 class=\"main-header\"> ")
    ; __line = 2
    ; __append(escapeFn( name ))
    ; __append(" </h1>\r\n  <h3>\r\n    TAs: ")
    ; __line = 4
    ; __append(escapeFn(teaching_assistants.length ))
    ; __append("\r\n    |\r\n    Participants: ")
    ; __line = 6
    ; __append(escapeFn( partecipants.length))
    ; __append("\r\n  </h3>\r\n</div>\r\n")
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
  , __lines = "<nav class=\"nav nav-pills nav-justified\">\r\n    <a class=\"nav-link active\" id=\"a_nav_mastery\" href=\"<%='/manager/classroom?id='+c_id%>\">Mastery Checks</a>\r\n    <a class=\"nav-link\" id=\"a_nav_students\" href=\"<%='/manager/classroom/students?id='+c_id%>\">Students</a>\r\n    <a class=\"nav-link\" id=\"a_nav_tas\" href=\"<%='/manager/classroom/tas?id='+c_id%>\">TAs</a>\r\n</nav>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<nav class=\"nav nav-pills nav-justified\">\r\n    <a class=\"nav-link active\" id=\"a_nav_mastery\" href=\"")
    ; __line = 2
    ; __append(escapeFn('/manager/classroom?id='+c_id))
    ; __append("\">Mastery Checks</a>\r\n    <a class=\"nav-link\" id=\"a_nav_students\" href=\"")
    ; __line = 3
    ; __append(escapeFn('/manager/classroom/students?id='+c_id))
    ; __append("\">Students</a>\r\n    <a class=\"nav-link\" id=\"a_nav_tas\" href=\"")
    ; __line = 4
    ; __append(escapeFn('/manager/classroom/tas?id='+c_id))
    ; __append("\">TAs</a>\r\n</nav>")
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
  , __lines = "<div class=\"container mt-3 mb-4\">\r\n  <div class=\"mt-4 mt-lg-0\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\r\n          <table class=\"table manage-candidates-top mb-0\">\r\n            <thead>\r\n              <tr>\r\n                <th>Name</th>\r\n                <th class=\"text-center\">Role</th>\r\n                <th class=\"action text-right\">Action</th>\r\n              </tr>\r\n            </thead>\r\n\r\n            <tbody>\r\n              <% partecipants.concat(teaching_assistants.concat(professors)).forEach(p=> { %>\r\n                <% let curr=p._id %>\r\n                  <tr class=\"candidates-list\">\r\n                    <td class=\"title\">\r\n                      <div class=\"thumb\">\r\n                        <% if (p.gravatar=='' || typeof p.gravatar==='undefined' ) { %>\r\n                          <img class=\"img-fluid\" src=\"/assets/icons/misc/pp_placeholder.svg\" alt=\"profile picture\">\r\n                          <% } else { %>\r\n                            <img class=\"img-fluid\" src=\"<%- p.gravatar %>\" alt=\"profile picture\">\r\n                            <% } %>\r\n                      </div>\r\n\r\n                      <div class=\"candidate-list-details\">\r\n                        <div class=\"candidate-list-info\">\r\n                          <div class=\"candidate-list-title\">\r\n                            <p class=\"mb-0\">\r\n                              <%= p.name%>\r\n                                <%- p.surname %>\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                    <td class=\"candidate-list-favourite-time text-center\">\r\n                      <span class=\"candidate-list-time order-1\">\r\n                        <%- professors.map(e=> e._id).includes(p._id) ? \"Professor\" : (teaching_assistants.map(e =>\r\n                          e._id).includes(p._id)) ? \"TA\" : \"Student\"%>\r\n                      </span>\r\n                    </td>\r\n                    <td>\r\n                      <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\r\n                        <li><a onclick=\"setUser('<%- curr %>')\" href=\"#\" class=\"text-info\" data-toggle=\"modal\"\r\n                            data-target=\"#edit-user-modal\" title=\"\" data-original-title=\"Edit\"><i\r\n                              class=\"fas fa-pencil-alt\"></i></a></li>\r\n\r\n                        <% if (partecipants.includes(p)) { %>\r\n                          <li><a href=\"/grades/student?classroom_id=<%- _id %>&student_id=<%- p._id %>\"\r\n                              class=\"text-info\"><i class=\"fas fa-info-circle\"></i></a></li>\r\n                          <li><a href=\"/grades/add?classroom_id=<%- _id %>&student_id=<%- p._id %>\" class=\"text-info\"><i\r\n                                class=\"fas fa-plus\"></i></a></li>\r\n                          <%}%>\r\n                      </ul>\r\n                    </td>\r\n                  </tr>\r\n                  <% }) %>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\r\n  aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\r\n          data-target=\"#edit-user-modal\">\r\n          Remove from Classroom\r\n        </button>\r\n        <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\r\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\r\n          Value\r\n        </button>\r\n        <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\r\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\r\n          Toggle Prof\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3 mb-4\">\r\n  <div class=\"mt-4 mt-lg-0\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\r\n          <table class=\"table manage-candidates-top mb-0\">\r\n            <thead>\r\n              <tr>\r\n                <th>Name</th>\r\n                <th class=\"text-center\">Role</th>\r\n                <th class=\"action text-right\">Action</th>\r\n              </tr>\r\n            </thead>\r\n\r\n            <tbody>\r\n              ")
    ; __line = 16
    ;  partecipants.concat(teaching_assistants.concat(professors)).forEach(p=> { 
    ; __append("\r\n                ")
    ; __line = 17
    ;  let curr=p._id 
    ; __append("\r\n                  <tr class=\"candidates-list\">\r\n                    <td class=\"title\">\r\n                      <div class=\"thumb\">\r\n                        ")
    ; __line = 21
    ;  if (p.gravatar=='' || typeof p.gravatar==='undefined' ) { 
    ; __append("\r\n                          <img class=\"img-fluid\" src=\"/assets/icons/misc/pp_placeholder.svg\" alt=\"profile picture\">\r\n                          ")
    ; __line = 23
    ;  } else { 
    ; __append("\r\n                            <img class=\"img-fluid\" src=\"")
    ; __line = 24
    ; __append( p.gravatar )
    ; __append("\" alt=\"profile picture\">\r\n                            ")
    ; __line = 25
    ;  } 
    ; __append("\r\n                      </div>\r\n\r\n                      <div class=\"candidate-list-details\">\r\n                        <div class=\"candidate-list-info\">\r\n                          <div class=\"candidate-list-title\">\r\n                            <p class=\"mb-0\">\r\n                              ")
    ; __line = 32
    ; __append(escapeFn( p.name))
    ; __append("\r\n                                ")
    ; __line = 33
    ; __append( p.surname )
    ; __append("\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                    <td class=\"candidate-list-favourite-time text-center\">\r\n                      <span class=\"candidate-list-time order-1\">\r\n                        ")
    ; __line = 41
    ; __append( professors.map(e=> e._id).includes(p._id) ? "Professor" : (teaching_assistants.map(e =>
                          e._id).includes(p._id)) ? "TA" : "Student")
    ; __line = 42
    ; __append("\r\n                      </span>\r\n                    </td>\r\n                    <td>\r\n                      <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\r\n                        <li><a onclick=\"setUser('")
    ; __line = 47
    ; __append( curr )
    ; __append("')\" href=\"#\" class=\"text-info\" data-toggle=\"modal\"\r\n                            data-target=\"#edit-user-modal\" title=\"\" data-original-title=\"Edit\"><i\r\n                              class=\"fas fa-pencil-alt\"></i></a></li>\r\n\r\n                        ")
    ; __line = 51
    ;  if (partecipants.includes(p)) { 
    ; __append("\r\n                          <li><a href=\"/grades/student?classroom_id=")
    ; __line = 52
    ; __append( _id )
    ; __append("&student_id=")
    ; __append( p._id )
    ; __append("\"\r\n                              class=\"text-info\"><i class=\"fas fa-info-circle\"></i></a></li>\r\n                          <li><a href=\"/grades/add?classroom_id=")
    ; __line = 54
    ; __append( _id )
    ; __append("&student_id=")
    ; __append( p._id )
    ; __append("\" class=\"text-info\"><i\r\n                                class=\"fas fa-plus\"></i></a></li>\r\n                          ")
    ; __line = 56
    ; }
    ; __append("\r\n                      </ul>\r\n                    </td>\r\n                  </tr>\r\n                  ")
    ; __line = 60
    ;  }) 
    ; __append("\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\r\n  aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\r\n          data-target=\"#edit-user-modal\">\r\n          Remove from Classroom\r\n        </button>\r\n        <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\r\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\r\n          Value\r\n        </button>\r\n        <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\r\n          data-toggle=\"modal\" data-target=\"#edit-user-modal\">\r\n          Toggle Prof\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>")
    ; __line = 92
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
  , __lines = "<% console.log('diob',appointments)%>\r\n<% if ( appointments.length > 0 ) {%>\r\n    <% appointments.map(appointment => { %>\r\n\r\n        <div class=\"card\" data-mastery_id=<%= appointment._masteryId._id%> data-appointment_id=<%= appointment._id%>>\r\n            <div class=\"card-header\">\r\n            Appointment\r\n            </div>\r\n            <div class=\"card-body\">\r\n            <h5 class=\"card-title\">Date and Time: <%= moment(appointment.end_time).format('DD.MM.YYYY (HH:mm)')%></h5>\r\n            <p class=\"card-text\">\r\n                <strong>Mastery Check</strong>: <%= appointment._masteryId.name%>\r\n                \r\n                <% appointment._masteryId.topics.forEach( topics => {%>\r\n                \r\n                    <p><strong>Topic</strong>: <%= topics.name%> \r\n                    <select class='topic_grade' id=\"<%= topics._id%>\">\r\n                        <option>Fail</option>\r\n                        <option>Pass</option>\r\n                        <option>Exceed</option>\r\n                    </select>\r\n                </p>\r\n                <% })%>\r\n            </p>\r\n            <h4>Appointment Grade:                 \r\n                <select class='final_grade'>\r\n                    <option>Fail</option>\r\n                    <option>Pass</option>\r\n                    <option>Exceed</option>\r\n                </select></h4>\r\n            <a onclick=\"grade(this)\" class=\"btn btn-primary\">Grade</a>\r\n            </div>\r\n        </div>\r\n    <% }) %>\r\n<% } else { %>\r\n        <h1>Nothing to grade</h1>\r\n<%} %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  console.log('diob',appointments)
    ; __append("\r\n")
    ; __line = 2
    ;  if ( appointments.length > 0 ) {
    ; __append("\r\n    ")
    ; __line = 3
    ;  appointments.map(appointment => { 
    ; __append("\r\n\r\n        <div class=\"card\" data-mastery_id=")
    ; __line = 5
    ; __append(escapeFn( appointment._masteryId._id))
    ; __append(" data-appointment_id=")
    ; __append(escapeFn( appointment._id))
    ; __append(">\r\n            <div class=\"card-header\">\r\n            Appointment\r\n            </div>\r\n            <div class=\"card-body\">\r\n            <h5 class=\"card-title\">Date and Time: ")
    ; __line = 10
    ; __append(escapeFn( moment(appointment.end_time).format('DD.MM.YYYY (HH:mm)')))
    ; __append("</h5>\r\n            <p class=\"card-text\">\r\n                <strong>Mastery Check</strong>: ")
    ; __line = 12
    ; __append(escapeFn( appointment._masteryId.name))
    ; __append("\r\n                \r\n                ")
    ; __line = 14
    ;  appointment._masteryId.topics.forEach( topics => {
    ; __append("\r\n                \r\n                    <p><strong>Topic</strong>: ")
    ; __line = 16
    ; __append(escapeFn( topics.name))
    ; __append(" \r\n                    <select class='topic_grade' id=\"")
    ; __line = 17
    ; __append(escapeFn( topics._id))
    ; __append("\">\r\n                        <option>Fail</option>\r\n                        <option>Pass</option>\r\n                        <option>Exceed</option>\r\n                    </select>\r\n                </p>\r\n                ")
    ; __line = 23
    ;  })
    ; __append("\r\n            </p>\r\n            <h4>Appointment Grade:                 \r\n                <select class='final_grade'>\r\n                    <option>Fail</option>\r\n                    <option>Pass</option>\r\n                    <option>Exceed</option>\r\n                </select></h4>\r\n            <a onclick=\"grade(this)\" class=\"btn btn-primary\">Grade</a>\r\n            </div>\r\n        </div>\r\n    ")
    ; __line = 34
    ;  }) 
    ; __append("\r\n")
    ; __line = 35
    ;  } else { 
    ; __append("\r\n        <h1>Nothing to grade</h1>\r\n")
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
  , __lines = "<div class=\"row\" id=\"<%=\"m-day-\"+counter%>\">\r\n    <div class=\"col\">\r\n      <select required class=\"form-control\" id=\"dates\">\r\n        <option value=\"1\">Monday</option>\r\n        <option value=\"2\">Tuesday</option>\r\n        <option value=\"3\">Wednesday</option>\r\n        <option value=\"4\">Thursday</option>\r\n        <option value=\"5\">Friday</option>\r\n        <option value=\"6\">Saturday</option>\r\n        <option value=\"7\">Sunday</option>\r\n      </select>\r\n    </div>\r\n    \r\n    <div class=\"col\">\r\n      <input type=\"time\" required class=\"form-control\" id=\"<%= \"start_time_day_\"+counter %>\" placeholder=\"Starting Time\" name=\"start_time_day\">\r\n    </div>\r\n  \r\n    <button type=\"button\" class=\"btn btn-link\">to</button>\r\n  \r\n    <div class=\"col\">\r\n      <input type=\"time\" required class=\"form-control\" id=\"<%= \"end_time_day_\"+counter %>\" placeholder=\"Ending Time\" name=\"end_time_day\">\r\n    </div>\r\n  </div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"row\" id=\"")
    ; __append(escapeFn("m-day-"+counter))
    ; __append("\">\r\n    <div class=\"col\">\r\n      <select required class=\"form-control\" id=\"dates\">\r\n        <option value=\"1\">Monday</option>\r\n        <option value=\"2\">Tuesday</option>\r\n        <option value=\"3\">Wednesday</option>\r\n        <option value=\"4\">Thursday</option>\r\n        <option value=\"5\">Friday</option>\r\n        <option value=\"6\">Saturday</option>\r\n        <option value=\"7\">Sunday</option>\r\n      </select>\r\n    </div>\r\n    \r\n    <div class=\"col\">\r\n      <input type=\"time\" required class=\"form-control\" id=\"")
    ; __line = 15
    ; __append(escapeFn( "start_time_day_"+counter ))
    ; __append("\" placeholder=\"Starting Time\" name=\"start_time_day\">\r\n    </div>\r\n  \r\n    <button type=\"button\" class=\"btn btn-link\">to</button>\r\n  \r\n    <div class=\"col\">\r\n      <input type=\"time\" required class=\"form-control\" id=\"")
    ; __line = 21
    ; __append(escapeFn( "end_time_day_"+counter ))
    ; __append("\" placeholder=\"Ending Time\" name=\"end_time_day\">\r\n    </div>\r\n  </div>")
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
  , __lines = "<div class=\"wrapper\">\r\n    <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\r\n    <main>\r\n        <h2 id=\"student_name\"></h2>\r\n        <div id=\"appointments\"></div>\r\n    </main>\r\n</div>\r\n\r\n\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_add_grade.js\"></script>\r\n<script>\r\n    var s = <%- JSON.stringify(user) %>\r\n    \r\n    window.onload = add_grade_init(s);\r\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"wrapper\">\r\n    ")
    ; __line = 2
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\r\n    <main>\r\n        <h2 id=\"student_name\"></h2>\r\n        <div id=\"appointments\"></div>\r\n    </main>\r\n</div>\r\n\r\n\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_add_grade.js\"></script>\r\n<script>\r\n    var s = ")
    ; __line = 14
    ; __append( JSON.stringify(user) )
    ; __append("\r\n    \r\n    window.onload = add_grade_init(s);\r\n</script>")
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
  , __lines = "<div class=\"container mt-5\">\r\n  <form id=\"create_form\">\r\n    <div class=\"form-group\">\r\n      <label for=\"input_name\">Mastery Check name</label>\r\n      <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\"\r\n      id=\"input_name\" value=\"<%- current.name ? current.name : \"\"%>\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"input_description\">Mastery Check description</label>\r\n      <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\"\r\n      class=\"form-control\" id=\"input_description\" \r\n      value=\"<%- current.description ? current.description : \"\"%>\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"input_duration\">Mastery Check duration</label>\r\n      <input type=\"number\" placeholder=\"Mastery Duration\" name=\"input_duration\" class=\"form-control\"\r\n      value=\"<%- current.appointment_duration ? current.appointment_duration : \"\"%>\"\r\n      id=\"input_duration\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"github_repo_name\">GitHub Repo</label>\r\n      <input type=\"text\" placeholder=\"organization_name/template_repo\" name=\"github_repo_name\" class=\"form-control\"\r\n      value=\"<%- current.github_repo_name ? current.github_repo_name : \"\"%>\"\r\n      id=\"github_repo\" required />\r\n    </div>\r\n\r\n    <% console.log(current) %>\r\n\r\n    <div class=\"form-check\">\r\n      <input\r\n        class=\"form-check-input\"\r\n        name=\"check_available\"\r\n        type=\"checkbox\"\r\n        id=\"check_available\"\r\n        <%= current.available == true ? 'checked' : '' %>\r\n      />\r\n      <label class=\"form-check-label\" for=\"check_available\"> Available </label>\r\n    </div>\r\n  </form>\r\n\r\n  <% if(current.name) { %>\r\n    <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">Edit Mastery Check</button>\r\n  <% } else { %>\r\n    <button onclick=\"create_mastery()\" class=\"btn btn-primary\">Create Mastery Check</button>\r\n  <% } %>\r\n</div>\r\n\r\n\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-5\">\r\n  <form id=\"create_form\">\r\n    <div class=\"form-group\">\r\n      <label for=\"input_name\">Mastery Check name</label>\r\n      <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\"\r\n      id=\"input_name\" value=\"")
    ; __line = 6
    ; __append( current.name ? current.name : "")
    ; __append("\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"input_description\">Mastery Check description</label>\r\n      <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\"\r\n      class=\"form-control\" id=\"input_description\" \r\n      value=\"")
    ; __line = 13
    ; __append( current.description ? current.description : "")
    ; __append("\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"input_duration\">Mastery Check duration</label>\r\n      <input type=\"number\" placeholder=\"Mastery Duration\" name=\"input_duration\" class=\"form-control\"\r\n      value=\"")
    ; __line = 19
    ; __append( current.appointment_duration ? current.appointment_duration : "")
    ; __append("\"\r\n      id=\"input_duration\" required />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"github_repo_name\">GitHub Repo</label>\r\n      <input type=\"text\" placeholder=\"organization_name/template_repo\" name=\"github_repo_name\" class=\"form-control\"\r\n      value=\"")
    ; __line = 26
    ; __append( current.github_repo_name ? current.github_repo_name : "")
    ; __append("\"\r\n      id=\"github_repo\" required />\r\n    </div>\r\n\r\n    ")
    ; __line = 30
    ;  console.log(current) 
    ; __append("\r\n\r\n    <div class=\"form-check\">\r\n      <input\r\n        class=\"form-check-input\"\r\n        name=\"check_available\"\r\n        type=\"checkbox\"\r\n        id=\"check_available\"\r\n        ")
    ; __line = 38
    ; __append(escapeFn( current.available == true ? 'checked' : '' ))
    ; __append("\r\n      />\r\n      <label class=\"form-check-label\" for=\"check_available\"> Available </label>\r\n    </div>\r\n  </form>\r\n\r\n  ")
    ; __line = 44
    ;  if(current.name) { 
    ; __append("\r\n    <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">Edit Mastery Check</button>\r\n  ")
    ; __line = 46
    ;  } else { 
    ; __append("\r\n    <button onclick=\"create_mastery()\" class=\"btn btn-primary\">Create Mastery Check</button>\r\n  ")
    ; __line = 48
    ;  } 
    ; __append("\r\n</div>\r\n\r\n\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n")
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
  , __lines = "<div class=\"container mt-3\">\r\n  <% result.forEach((element) => { %>\r\n    <div class=\"card mt-3\">\r\n      <div style=\"display: flex;align-items: center;\" class=\"card-header\">\r\n        <span style=\"margin-right: auto;\">Mastery Check</span>\r\n\r\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">\r\n          Create a Topic\r\n        </button>\r\n\r\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary edit_btn\">\r\n          Edit Mastery Check\r\n        </button>\r\n\r\n        <button type=\"button\" class=\"btn btn-primary delete_btn\">\r\n          Delete\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"card-body\">\r\n        <h4 hidden>Classroom ID: <%= element.classroom%></h4>\r\n        <small id=\"id_container\" hidden data-id=\"<%= element._id %>\">Mastery ID: <%= element._id%></small>\r\n\r\n        <h2 class=\"card-title\"><%= element.name %></h2>\r\n        <p id=\"element_desc\" class=\"card-text\"><%= element.description %></p>\r\n        <p id=\"github_repo_card\" class=\"card-text\">GitHub Repo: <%= element.github_repo_name %></p>\r\n        <p id=\"element_durat\" class=\"card-text\">Duration: <%= element.appointment_duration %> | <%= element.available  ? \"Available\" : \"Not Available\" %></p>\r\n        <p class=\"topic_list\" id=\"topics_list\">\r\n          <span><%= element.topics.length == 0 ? \"No Topics\" : \"Topics:\"%></span>\r\n\r\n          <% element.topics.forEach(topic => { %>\r\n            <span>\r\n                <br>\r\n                <%=topic.name%> \r\n                <a id=\"a_add_question\" data-topic_id=\"<%= topic._id %>\" href=\"/question/new?topic_id=<%=topic._id %>&classroom_id=<%=element.classroom%>\">\r\n                    Add questions\r\n                </a>\r\n                |\r\n                <a style=\"cursor: pointer;\" data-mastery_id=\"<%= topic.mastery_id %>\" data-id=\"<%= topic._id%>\"\r\n                    data-name=\"<%= topic.name%>\" data-description=\"<%= topic.description%>\"\r\n                    class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \r\n                |\r\n                <a href=\"/topic/questions/answer?topic=<%= topic._id%>&classroom_id=<%= element.classroom%>\">\r\n                    View questions  (<%= topic.questions.length %>)\r\n                </a>\r\n            </span>\r\n          <% }); %>\r\n        </p>\r\n      </div>\r\n    </div>\r\n  <% }); %>\r\n</div>\r\n\r\n<script src=\"/js/ajax_question.js\"></script>\r\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3\">\r\n  ")
    ; __line = 2
    ;  result.forEach((element) => { 
    ; __append("\r\n    <div class=\"card mt-3\">\r\n      <div style=\"display: flex;align-items: center;\" class=\"card-header\">\r\n        <span style=\"margin-right: auto;\">Mastery Check</span>\r\n\r\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">\r\n          Create a Topic\r\n        </button>\r\n\r\n        <button style=\"margin-right: 10px;\" type=\"button\" class=\"btn btn-primary edit_btn\">\r\n          Edit Mastery Check\r\n        </button>\r\n\r\n        <button type=\"button\" class=\"btn btn-primary delete_btn\">\r\n          Delete\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"card-body\">\r\n        <h4 hidden>Classroom ID: ")
    ; __line = 21
    ; __append(escapeFn( element.classroom))
    ; __append("</h4>\r\n        <small id=\"id_container\" hidden data-id=\"")
    ; __line = 22
    ; __append(escapeFn( element._id ))
    ; __append("\">Mastery ID: ")
    ; __append(escapeFn( element._id))
    ; __append("</small>\r\n\r\n        <h2 class=\"card-title\">")
    ; __line = 24
    ; __append(escapeFn( element.name ))
    ; __append("</h2>\r\n        <p id=\"element_desc\" class=\"card-text\">")
    ; __line = 25
    ; __append(escapeFn( element.description ))
    ; __append("</p>\r\n        <p id=\"github_repo_card\" class=\"card-text\">GitHub Repo: ")
    ; __line = 26
    ; __append(escapeFn( element.github_repo_name ))
    ; __append("</p>\r\n        <p id=\"element_durat\" class=\"card-text\">Duration: ")
    ; __line = 27
    ; __append(escapeFn( element.appointment_duration ))
    ; __append(" | ")
    ; __append(escapeFn( element.available  ? "Available" : "Not Available" ))
    ; __append("</p>\r\n        <p class=\"topic_list\" id=\"topics_list\">\r\n          <span>")
    ; __line = 29
    ; __append(escapeFn( element.topics.length == 0 ? "No Topics" : "Topics:"))
    ; __append("</span>\r\n\r\n          ")
    ; __line = 31
    ;  element.topics.forEach(topic => { 
    ; __append("\r\n            <span>\r\n                <br>\r\n                ")
    ; __line = 34
    ; __append(escapeFn(topic.name))
    ; __append(" \r\n                <a id=\"a_add_question\" data-topic_id=\"")
    ; __line = 35
    ; __append(escapeFn( topic._id ))
    ; __append("\" href=\"/question/new?topic_id=")
    ; __append(escapeFn(topic._id ))
    ; __append("&classroom_id=")
    ; __append(escapeFn(element.classroom))
    ; __append("\">\r\n                    Add questions\r\n                </a>\r\n                |\r\n                <a style=\"cursor: pointer;\" data-mastery_id=\"")
    ; __line = 39
    ; __append(escapeFn( topic.mastery_id ))
    ; __append("\" data-id=\"")
    ; __append(escapeFn( topic._id))
    ; __append("\"\r\n                    data-name=\"")
    ; __line = 40
    ; __append(escapeFn( topic.name))
    ; __append("\" data-description=\"")
    ; __append(escapeFn( topic.description))
    ; __append("\"\r\n                    class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \r\n                |\r\n                <a href=\"/topic/questions/answer?topic=")
    ; __line = 43
    ; __append(escapeFn( topic._id))
    ; __append("&classroom_id=")
    ; __append(escapeFn( element.classroom))
    ; __append("\">\r\n                    View questions  (")
    ; __line = 44
    ; __append(escapeFn( topic.questions.length ))
    ; __append(")\r\n                </a>\r\n            </span>\r\n          ")
    ; __line = 47
    ;  }); 
    ; __append("\r\n        </p>\r\n      </div>\r\n    </div>\r\n  ")
    ; __line = 51
    ;  }); 
    ; __append("\r\n</div>\r\n\r\n<script src=\"/js/ajax_question.js\"></script>\r\n")
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\r\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\r\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\r\n\r\n<div class=\"wrapper\">\r\n  <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\r\n\r\n  <main style=\"margin: 26px\">\r\n    <div class=\"class-header\">\r\n      <section id=\"class_info\"></section>\r\n\r\n      <section id=\"class_options\">\r\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\r\n          data-target=\"#user-modal\">\r\n          Show User List\r\n        </button>\r\n  \r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\r\n          data-target=\"#add-mastery-modal\">\r\n          Add a Mastery Check\r\n        </button>\r\n      </section>\r\n    </div>\r\n\r\n    <!-- User list modal -->\r\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"user-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Add Mastery Check modal -->\r\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\r\n  </main>\r\n</div>\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/flash.min.js\"></script>\r\n<script src=\"/js/ajax_classroom_manager.js\"></script>\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\r\n\r\n<!-- CodeMirror CDNs -->\r\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\r\n<script>\r\n    window.onload = init_manager;\r\n    render_mastery_modal();\r\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\r\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\r\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\r\n\r\n<div class=\"wrapper\">\r\n  ")
    ; __line = 6
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\r\n\r\n  <main style=\"margin: 26px\">\r\n    <div class=\"class-header\">\r\n      <section id=\"class_info\"></section>\r\n\r\n      <section id=\"class_options\">\r\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\r\n          data-target=\"#user-modal\">\r\n          Show User List\r\n        </button>\r\n  \r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\r\n          data-target=\"#add-mastery-modal\">\r\n          Add a Mastery Check\r\n        </button>\r\n      </section>\r\n    </div>\r\n\r\n    <!-- User list modal -->\r\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"user-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Add Mastery Check modal -->\r\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\r\n  </main>\r\n</div>\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/flash.min.js\"></script>\r\n<script src=\"/js/ajax_classroom_manager.js\"></script>\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\r\n\r\n<!-- CodeMirror CDNs -->\r\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\r\n<script>\r\n    window.onload = init_manager;\r\n    render_mastery_modal();\r\n</script>")
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
  , __lines = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\"> -->\r\n<% let langs = {\"JavaScript\" : \"text/javascript\", \r\n                \"Python\" : \"text/x-python\",\r\n                \"C\" : \"text/x-csrc\",\r\n                \"C++\" : \"text/x-c++src\",\r\n                \"Java\" : \"text/x-java\",\r\n                \"HTML\" : \"application/xml\",\r\n                \"CSS\" : \"text/css\"\r\n            }\r\n%>\r\n\r\n<div class=\"wrapper\">\r\n    \r\n    <div>\r\n        <h2>Add question:</h2>\r\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\r\n        <form>\r\n            <span>Multiple choice question:</span>\r\n            <br>\r\n            <span id=\"fields_label\">Options: 1</span>\r\n\r\n            <div id=\"text_div\">\r\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\r\n            </div>\r\n\r\n            <div id=\"code_div\">\r\n                <select id=\"lang_select\">\r\n                    <% Object.keys(langs).forEach( lang => { %>\r\n                        <option value=\"<%= langs[lang]%>\" > <%= lang%> </option>\r\n                    <% }) %>\r\n                </select>\r\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\r\n            </div>\r\n\r\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\r\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\r\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\r\n        </form>\r\n        <div><button id=\"new_field\">Add field</button></div>\r\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\r\n        <button onclick=\"post_question()\">Post question</button>\r\n    </div>\r\n</div>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n\r\n\r\n<script>\r\n    window.onload = init_question;\r\n</script>\r\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\"> -->\r\n")
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
    ; __append("\r\n\r\n<div class=\"wrapper\">\r\n    \r\n    <div>\r\n        <h2>Add question:</h2>\r\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\r\n        <form>\r\n            <span>Multiple choice question:</span>\r\n            <br>\r\n            <span id=\"fields_label\">Options: 1</span>\r\n\r\n            <div id=\"text_div\">\r\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\r\n            </div>\r\n\r\n            <div id=\"code_div\">\r\n                <select id=\"lang_select\">\r\n                    ")
    ; __line = 34
    ;  Object.keys(langs).forEach( lang => { 
    ; __append("\r\n                        <option value=\"")
    ; __line = 35
    ; __append(escapeFn( langs[lang]))
    ; __append("\" > ")
    ; __append(escapeFn( lang))
    ; __append(" </option>\r\n                    ")
    ; __line = 36
    ;  }) 
    ; __append("\r\n                </select>\r\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\r\n            </div>\r\n\r\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\r\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\r\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\r\n        </form>\r\n        <div><button id=\"new_field\">Add field</button></div>\r\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\r\n        <button onclick=\"post_question()\">Post question</button>\r\n    </div>\r\n</div>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n\r\n\r\n<script>\r\n    window.onload = init_question;\r\n</script>\r\n")
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
  , __lines = "<div class=\"container\">\r\n    <div class=\" container mt-5\">\r\n        <form id=\"create_form\">\r\n            <div class=\"form-group\">\r\n                <label for=\"input_name\">Topic name</label>\r\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\r\n                    value=\"<%= current.name ? current.name : \"\"%>\" required />\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"input_description\">Topic description</label>\r\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\r\n                    id=\"input_description\" value=\"<%= current.description ? current.description : \"\"%>\" required />\r\n            </div>\r\n        </form>\r\n        <% if(current.name) {%>\r\n        <button onclick=\"edit_topic()\" class=\"btn btn-primary\">\r\n            Edit\r\n            Topic\r\n        </button>\r\n        <% } else {%>\r\n        <button onclick=\"create_topic()\" class=\"btn btn-primary\">\r\n            Create\r\n            Topic\r\n        </button>\r\n        <% }%>\r\n    </div>\r\n    <script src=\"/js/ajax_mastery.js\"></script>\r\n    <script src=\"/js/ajax_question.js\"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container\">\r\n    <div class=\" container mt-5\">\r\n        <form id=\"create_form\">\r\n            <div class=\"form-group\">\r\n                <label for=\"input_name\">Topic name</label>\r\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\r\n                    value=\"")
    ; __line = 7
    ; __append(escapeFn( current.name ? current.name : ""))
    ; __append("\" required />\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"input_description\">Topic description</label>\r\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\r\n                    id=\"input_description\" value=\"")
    ; __line = 12
    ; __append(escapeFn( current.description ? current.description : ""))
    ; __append("\" required />\r\n            </div>\r\n        </form>\r\n        ")
    ; __line = 15
    ;  if(current.name) {
    ; __append("\r\n        <button onclick=\"edit_topic()\" class=\"btn btn-primary\">\r\n            Edit\r\n            Topic\r\n        </button>\r\n        ")
    ; __line = 20
    ;  } else {
    ; __append("\r\n        <button onclick=\"create_topic()\" class=\"btn btn-primary\">\r\n            Create\r\n            Topic\r\n        </button>\r\n        ")
    ; __line = 25
    ;  }
    ; __append("\r\n    </div>\r\n    <script src=\"/js/ajax_mastery.js\"></script>\r\n    <script src=\"/js/ajax_question.js\"></script>")
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\r\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\r\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\r\n\r\n<div class=\"wrapper\">\r\n  <%- include(\"../../partials/navigation\", { active: 'manager' }) %>\r\n\r\n  <main style=\"margin: 26px\">\r\n    <div class=\"class-header\">\r\n      <section id=\"class_info\"></section>\r\n\r\n      <section id=\"class_options\">\r\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\r\n          data-target=\"#user-modal\">\r\n          Show User List\r\n        </button>\r\n  \r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\r\n          data-target=\"#add-mastery-modal\">\r\n          Add a Mastery Check\r\n        </button>\r\n      </section>\r\n    </div>\r\n\r\n    <!-- User list modal -->\r\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"user-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Add Mastery Check modal -->\r\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\r\n  </main>\r\n</div>\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/flash.min.js\"></script>\r\n<script src=\"/js/ajax_classroom_manager.js\"></script>\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\r\n\r\n<!-- CodeMirror CDNs -->\r\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\r\n<script>\r\n    window.onload = init_manager;\r\n    render_mastery_modal();\r\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\r\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\r\n  integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\r\n\r\n<div class=\"wrapper\">\r\n  ")
    ; __line = 6
    ; __append( include("../../partials/navigation", { active: 'manager' }) )
    ; __append("\r\n\r\n  <main style=\"margin: 26px\">\r\n    <div class=\"class-header\">\r\n      <section id=\"class_info\"></section>\r\n\r\n      <section id=\"class_options\">\r\n        <button type=\"button\" onclick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\r\n          data-target=\"#user-modal\">\r\n          Show User List\r\n        </button>\r\n  \r\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\r\n          data-target=\"#add-mastery-modal\">\r\n          Add a Mastery Check\r\n        </button>\r\n      </section>\r\n    </div>\r\n\r\n    <!-- User list modal -->\r\n    <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"user-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Add Mastery Check modal -->\r\n    <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div id=\"add-mastery-modal-body\" class=\"modal-body\">\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"mastery-modal-body\" class=\"modal-body\"></div>\r\n  </main>\r\n</div>\r\n\r\n<script src=\"/js/ajax_mastery.js\"></script>\r\n<script src=\"/js/flash.min.js\"></script>\r\n<script src=\"/js/ajax_classroom_manager.js\"></script>\r\n<script src=\"/js/ejs.min.js\"></script>\r\n<script src=\"/js/views.js\"></script>\r\n<script src=\"/js/ajax_question.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\r\n\r\n<!-- CodeMirror CDNs -->\r\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\r\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\r\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\r\n<script>\r\n    window.onload = init_manager;\r\n    render_mastery_modal();\r\n</script>")
    ; __line = 86
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}