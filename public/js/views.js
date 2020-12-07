//EJS Compiled Views - This file was automatically generated on Mon Dec 07 2020 16:51:59 GMT+0100 (Central European Standard Time)
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
  , __lines = "<div>\n    <h2> <%= name %></h2>\n    <h3> <%= description%></h3>\n    <h3> TAs: <%=teaching_assistants.length %></h3>\n    <h3> Partecipants: <%= partecipants.length%></h3>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div>\n    <h2> ")
    ; __line = 2
    ; __append(escapeFn( name ))
    ; __append("</h2>\n    <h3> ")
    ; __line = 3
    ; __append(escapeFn( description))
    ; __append("</h3>\n    <h3> TAs: ")
    ; __line = 4
    ; __append(escapeFn(teaching_assistants.length ))
    ; __append("</h3>\n    <h3> Partecipants: ")
    ; __line = 5
    ; __append(escapeFn( partecipants.length))
    ; __append("</h3>\n</div>")
    ; __line = 6
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
  , __lines = "<style>\n    .p-4 {\n        padding: 1.5rem !important;\n    }\n\n    .mb-0,\n    .my-0 {\n        margin-bottom: 0 !important;\n    }\n\n    .shadow-sm {\n        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;\n    }\n\n    /* user-dashboard-info-box */\n    .user-dashboard-info-box .candidates-list .thumb {\n        margin-right: 20px;\n    }\n\n    .user-dashboard-info-box .candidates-list .thumb img {\n        width: 80px;\n        height: 80px;\n        -o-object-fit: cover;\n        object-fit: cover;\n        overflow: hidden;\n        border-radius: 50%;\n    }\n\n    .user-dashboard-info-box .title {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n        padding: 30px 0;\n    }\n\n    .user-dashboard-info-box .candidates-list td {\n        vertical-align: middle;\n    }\n\n    .user-dashboard-info-box td li {\n        margin: 0 4px;\n    }\n\n    .user-dashboard-info-box .table thead th {\n        border-bottom: none;\n    }\n\n    .table.manage-candidates-top th {\n        border: 0;\n    }\n\n    .user-dashboard-info-box .candidate-list-favourite-time .candidate-list-favourite {\n        margin-bottom: 10px;\n    }\n\n    .table.manage-candidates-top {\n        min-width: 650px;\n    }\n\n    .user-dashboard-info-box .candidate-list-details ul {\n        color: #969696;\n    }\n\n    /* Candidate List */\n    .candidate-list {\n        background: #ffffff;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        border-bottom: 1px solid #eeeeee;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n        padding: 20px;\n        -webkit-transition: all 0.3s ease-in-out;\n        transition: all 0.3s ease-in-out;\n    }\n\n    .candidate-list:hover {\n        -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);\n        box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);\n        position: relative;\n        z-index: 99;\n    }\n\n    .candidate-list:hover a.candidate-list-favourite {\n        color: #e74c3c;\n        -webkit-box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);\n        box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);\n    }\n\n    .candidate-list .candidate-list-image {\n        margin-right: 25px;\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 80px;\n        flex: 0 0 80px;\n        border: none;\n    }\n\n    .candidate-list .candidate-list-image img {\n        width: 80px;\n        height: 80px;\n        -o-object-fit: cover;\n        object-fit: cover;\n    }\n\n    .candidate-list-title {\n        margin-bottom: 5px;\n    }\n\n    .candidate-list-details ul {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n        margin-bottom: 0px;\n    }\n\n    .candidate-list-details ul li {\n        margin: 5px 10px 5px 0px;\n        font-size: 13px;\n    }\n\n    .candidate-list .candidate-list-favourite-time {\n        margin-left: auto;\n        text-align: center;\n        font-size: 13px;\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 90px;\n        flex: 0 0 90px;\n    }\n\n    .candidate-list .candidate-list-favourite-time span {\n        display: block;\n        margin: 0 auto;\n    }\n\n    .candidate-list .candidate-list-favourite-time .candidate-list-favourite {\n        display: inline-block;\n        position: relative;\n        height: 40px;\n        width: 40px;\n        line-height: 40px;\n        border: 1px solid #eeeeee;\n        border-radius: 100%;\n        text-align: center;\n        -webkit-transition: all 0.3s ease-in-out;\n        transition: all 0.3s ease-in-out;\n        margin-bottom: 20px;\n        font-size: 16px;\n        color: #646f79;\n    }\n\n    .candidate-list .candidate-list-favourite-time .candidate-list-favourite:hover {\n        background: #ffffff;\n        color: #e74c3c;\n    }\n\n    .candidate-banner .candidate-list:hover {\n        position: inherit;\n        -webkit-box-shadow: inherit;\n        box-shadow: inherit;\n        z-index: inherit;\n    }\n\n    .bg-white {\n        background-color: #ffffff !important;\n    }\n\n    .p-4 {\n        padding: 1.5rem !important;\n    }\n\n    .mb-0,\n    .my-0 {\n        margin-bottom: 0 !important;\n    }\n\n    .shadow-sm {\n        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;\n    }\n\n    .user-dashboard-info-box .candidates-list .thumb {\n        margin-right: 20px;\n    }\n</style>\n\n<div class=\"container mt-3 mb-4\">\n    <div class=\"mt-4 mt-lg-0\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\n                    <table class=\"table manage-candidates-top mb-0\">\n                        <thead>\n                            <tr>\n                                <th>Name</th>\n                                <th class=\"text-center\">Role</th>\n                                <th class=\"action text-right\">Action</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <% partecipants.concat(teaching_assistants.concat(professors)).forEach(p => { %>\n                            <% let curr = p._id %>\n                            <tr class=\"candidates-list\">\n                                <td class=\"title\">\n                                    <div class=\"thumb\">\n\n                                        <!-- TODO: Change to actual profile picture -->\n                                        <img class=\"img-fluid\" src=\"https://bootdey.com/img/Content/avatar/avatar7.png\"\n                                            alt=\"\">\n                                    </div>\n                                    <div class=\"candidate-list-details\">\n                                        <div class=\"candidate-list-info\">\n                                            <div class=\"candidate-list-title\">\n                                                <h5 class=\"mb-0\"><a href=\"#\"><%= p.name%> <%= p.surname %></a></h5>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </td>\n                                <td class=\"candidate-list-favourite-time text-center\">\n                                    <span\n                                        class=\"candidate-list-time order-1\"><%= professors.map(e => e._id).includes(p._id) ?  \"Professor\" : (teaching_assistants.map(e => e._id).includes(p._id)) ? \"TA\" : \"Student\"%>\n                                    </span>\n                                </td>\n                                <td>\n                                    <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\n                                        <li><a onclick=\"setUser('<%= curr %>')\" href=\"#\" class=\"text-info\"\n                                                data-toggle=\"modal\" data-target=\"#edit-user-modal\" title=\"\"\n                                                data-original-title=\"Edit\"><i class=\"fas fa-pencil-alt\"></i></a></li>\n                                    </ul>\n                                </td>\n                            </tr>\n                            <% }) %>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\n            </div>\n            <div class=\"modal-body\">\n                <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\n                    data-target=\"#edit-user-modal\">\n                    Remove from Classroom\n                </button>\n                <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\n                    data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n                    Value\n                </button>\n                <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\n                    data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n                    Value\n                </button>\n            </div>\n        </div>\n    </div>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<style>\n    .p-4 {\n        padding: 1.5rem !important;\n    }\n\n    .mb-0,\n    .my-0 {\n        margin-bottom: 0 !important;\n    }\n\n    .shadow-sm {\n        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;\n    }\n\n    /* user-dashboard-info-box */\n    .user-dashboard-info-box .candidates-list .thumb {\n        margin-right: 20px;\n    }\n\n    .user-dashboard-info-box .candidates-list .thumb img {\n        width: 80px;\n        height: 80px;\n        -o-object-fit: cover;\n        object-fit: cover;\n        overflow: hidden;\n        border-radius: 50%;\n    }\n\n    .user-dashboard-info-box .title {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n        padding: 30px 0;\n    }\n\n    .user-dashboard-info-box .candidates-list td {\n        vertical-align: middle;\n    }\n\n    .user-dashboard-info-box td li {\n        margin: 0 4px;\n    }\n\n    .user-dashboard-info-box .table thead th {\n        border-bottom: none;\n    }\n\n    .table.manage-candidates-top th {\n        border: 0;\n    }\n\n    .user-dashboard-info-box .candidate-list-favourite-time .candidate-list-favourite {\n        margin-bottom: 10px;\n    }\n\n    .table.manage-candidates-top {\n        min-width: 650px;\n    }\n\n    .user-dashboard-info-box .candidate-list-details ul {\n        color: #969696;\n    }\n\n    /* Candidate List */\n    .candidate-list {\n        background: #ffffff;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        border-bottom: 1px solid #eeeeee;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n        padding: 20px;\n        -webkit-transition: all 0.3s ease-in-out;\n        transition: all 0.3s ease-in-out;\n    }\n\n    .candidate-list:hover {\n        -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);\n        box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);\n        position: relative;\n        z-index: 99;\n    }\n\n    .candidate-list:hover a.candidate-list-favourite {\n        color: #e74c3c;\n        -webkit-box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);\n        box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);\n    }\n\n    .candidate-list .candidate-list-image {\n        margin-right: 25px;\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 80px;\n        flex: 0 0 80px;\n        border: none;\n    }\n\n    .candidate-list .candidate-list-image img {\n        width: 80px;\n        height: 80px;\n        -o-object-fit: cover;\n        object-fit: cover;\n    }\n\n    .candidate-list-title {\n        margin-bottom: 5px;\n    }\n\n    .candidate-list-details ul {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n        margin-bottom: 0px;\n    }\n\n    .candidate-list-details ul li {\n        margin: 5px 10px 5px 0px;\n        font-size: 13px;\n    }\n\n    .candidate-list .candidate-list-favourite-time {\n        margin-left: auto;\n        text-align: center;\n        font-size: 13px;\n        -webkit-box-flex: 0;\n        -ms-flex: 0 0 90px;\n        flex: 0 0 90px;\n    }\n\n    .candidate-list .candidate-list-favourite-time span {\n        display: block;\n        margin: 0 auto;\n    }\n\n    .candidate-list .candidate-list-favourite-time .candidate-list-favourite {\n        display: inline-block;\n        position: relative;\n        height: 40px;\n        width: 40px;\n        line-height: 40px;\n        border: 1px solid #eeeeee;\n        border-radius: 100%;\n        text-align: center;\n        -webkit-transition: all 0.3s ease-in-out;\n        transition: all 0.3s ease-in-out;\n        margin-bottom: 20px;\n        font-size: 16px;\n        color: #646f79;\n    }\n\n    .candidate-list .candidate-list-favourite-time .candidate-list-favourite:hover {\n        background: #ffffff;\n        color: #e74c3c;\n    }\n\n    .candidate-banner .candidate-list:hover {\n        position: inherit;\n        -webkit-box-shadow: inherit;\n        box-shadow: inherit;\n        z-index: inherit;\n    }\n\n    .bg-white {\n        background-color: #ffffff !important;\n    }\n\n    .p-4 {\n        padding: 1.5rem !important;\n    }\n\n    .mb-0,\n    .my-0 {\n        margin-bottom: 0 !important;\n    }\n\n    .shadow-sm {\n        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;\n    }\n\n    .user-dashboard-info-box .candidates-list .thumb {\n        margin-right: 20px;\n    }\n</style>\n\n<div class=\"container mt-3 mb-4\">\n    <div class=\"mt-4 mt-lg-0\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm\">\n                    <table class=\"table manage-candidates-top mb-0\">\n                        <thead>\n                            <tr>\n                                <th>Name</th>\n                                <th class=\"text-center\">Role</th>\n                                <th class=\"action text-right\">Action</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            ")
    ; __line = 206
    ;  partecipants.concat(teaching_assistants.concat(professors)).forEach(p => { 
    ; __append("\n                            ")
    ; __line = 207
    ;  let curr = p._id 
    ; __append("\n                            <tr class=\"candidates-list\">\n                                <td class=\"title\">\n                                    <div class=\"thumb\">\n\n                                        <!-- TODO: Change to actual profile picture -->\n                                        <img class=\"img-fluid\" src=\"https://bootdey.com/img/Content/avatar/avatar7.png\"\n                                            alt=\"\">\n                                    </div>\n                                    <div class=\"candidate-list-details\">\n                                        <div class=\"candidate-list-info\">\n                                            <div class=\"candidate-list-title\">\n                                                <h5 class=\"mb-0\"><a href=\"#\">")
    ; __line = 219
    ; __append(escapeFn( p.name))
    ; __append(" ")
    ; __append(escapeFn( p.surname ))
    ; __append("</a></h5>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </td>\n                                <td class=\"candidate-list-favourite-time text-center\">\n                                    <span\n                                        class=\"candidate-list-time order-1\">")
    ; __line = 226
    ; __append(escapeFn( professors.map(e => e._id).includes(p._id) ?  "Professor" : (teaching_assistants.map(e => e._id).includes(p._id)) ? "TA" : "Student"))
    ; __append("\n                                    </span>\n                                </td>\n                                <td>\n                                    <ul class=\"list-unstyled mb-0 d-flex justify-content-end\">\n                                        <li><a onclick=\"setUser('")
    ; __line = 231
    ; __append(escapeFn( curr ))
    ; __append("')\" href=\"#\" class=\"text-info\"\n                                                data-toggle=\"modal\" data-target=\"#edit-user-modal\" title=\"\"\n                                                data-original-title=\"Edit\"><i class=\"fas fa-pencil-alt\"></i></a></li>\n                                    </ul>\n                                </td>\n                            </tr>\n                            ")
    ; __line = 237
    ;  }) 
    ; __append("\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"edit-user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit-user-modal-label\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"edit-user-modal-label\">Edit User</h5>\n            </div>\n            <div class=\"modal-body\">\n                <button type=\"button\" class=\"btn btn-primary\" onclick=\"removeFromClass(getUser())\" data-toggle=\"modal\"\n                    data-target=\"#edit-user-modal\">\n                    Remove from Classroom\n                </button>\n                <button type=\"button\" id=\"toggleTA_btn\" onclick=\"toggleTA(getUser())\" class=\"btn btn-primary\"\n                    data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n                    Value\n                </button>\n                <button type=\"button\" id=\"toggleProf_btn\" onclick=\"toggleProf(getUser())\" class=\"btn btn-primary\"\n                    data-toggle=\"modal\" data-target=\"#edit-user-modal\">\n                    Value\n                </button>\n            </div>\n        </div>\n    </div>\n</div>")
    ; __line = 269
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
  , __lines = "<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"input_name\">Mastery Check name</label>\n                <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\n                    value=\"<%= current.name ? current.name : \"\"%>\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"input_description\">Mastery Check description</label>\n                <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"input_description\" value=\"<%= current.description ? current.description : \"\"%>\" required />\n            </div>\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\"\n                    <% current.checked ? \"checked\" : \"\"%> />\n                <label class=\"form-check-label\" for=\"check_available\">\n                    Available\n                </label>\n            </div>\n        </form>\n        <% if(current.name) {%>\n        <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">\n            Edit\n            Mastery Check\n        </button>\n        <% } else {%>\n        <button onclick=\"create_mastery()\" class=\"btn btn-primary\">\n            Create\n            Mastery Check\n        </button>\n        <% }%>\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ajax_question.js\"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"input_name\">Mastery Check name</label>\n                <input type=\"text\" placeholder=\"Mastery Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\n                    value=\"")
    ; __line = 7
    ; __append(escapeFn( current.name ? current.name : ""))
    ; __append("\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"input_description\">Mastery Check description</label>\n                <input type=\"text\" placeholder=\"Mastery Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"input_description\" value=\"")
    ; __line = 12
    ; __append(escapeFn( current.description ? current.description : ""))
    ; __append("\" required />\n            </div>\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\"\n                    ")
    ; __line = 16
    ;  current.checked ? "checked" : ""
    ; __append(" />\n                <label class=\"form-check-label\" for=\"check_available\">\n                    Available\n                </label>\n            </div>\n        </form>\n        ")
    ; __line = 22
    ;  if(current.name) {
    ; __append("\n        <button onclick=\"edit_mastery()\" class=\"btn btn-primary\">\n            Edit\n            Mastery Check\n        </button>\n        ")
    ; __line = 27
    ;  } else {
    ; __append("\n        <button onclick=\"create_mastery()\" class=\"btn btn-primary\">\n            Create\n            Mastery Check\n        </button>\n        ")
    ; __line = 32
    ;  }
    ; __append("\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ajax_question.js\"></script>")
    ; __line = 35
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
  , __lines = "<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    <% result.forEach(element => { %>\n    <div class=\"card mt-5\">\n\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">Create a Topic\n            </button>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary edit_btn\">Edit Mastery Check\n            </button>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary delete_btn\">Delete\n            </button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: <%= element.classroom%></h4>\n            <h5 class=\"card-title\"><%= element.name %></h5>\n            <small id=\"id_container\" data-id=\"<%= element._id%>\">Mastery ID: <%= element._id%></small>\n            <p id=\"element_desc\" class=\"card-text\"><%= element.description %></p>\n            <p id=\"element_available\" class=\"card-text\"><%= element.available  ? \"Available\" : \"Not Available\" %></p>\n            <p class=\"topic_list\" id=\"topics_list\">\n                <span><%= element.topics.length == 0 ? \"No Topics\" : \"Topics:\"%></span>\n                <% element.topics.forEach(topic => { %>\n                <span>\n                    <br>\n                    <%=topic.name%> \n                    <a id=\"a_add_question\" data-topic_id=\"<%= topic._id %>\" href=\"/question/new?topic_id=<%=topic._id %>&classroom_id=<%=element.classroom%>\">\n                        Add questions\n                    </a>\n                    |\n                    <a style=\"cursor: pointer;\" data-mastery_id=\"<%= topic.mastery_id %>\" data-id=\"<%= topic._id%>\"\n                        data-name=\"<%= topic.name%>\" data-description=\"<%= topic.description%>\"\n                        class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \n                    |\n                    <a href=\"/topic/questions/answer?topic=<%= topic._id%>&classroom_id=<%= element.classroom%>\">\n                        View questions  (<%= topic.questions.length %>)\n                    </a>\n                </span>\n                \n                <% }); %>\n            </p>\n        </div>\n    </div>\n    <% }); %>\n</div>\n<script src=\"/js/ajax_question.js\"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    ")
    ; __line = 3
    ;  result.forEach(element => { 
    ; __append("\n    <div class=\"card mt-5\">\n\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary new_topic_btn\">Create a Topic\n            </button>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary edit_btn\">Edit Mastery Check\n            </button>\n            <button style=\"float: right;\" type=\"button\" class=\"btn btn-primary delete_btn\">Delete\n            </button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: ")
    ; __line = 16
    ; __append(escapeFn( element.classroom))
    ; __append("</h4>\n            <h5 class=\"card-title\">")
    ; __line = 17
    ; __append(escapeFn( element.name ))
    ; __append("</h5>\n            <small id=\"id_container\" data-id=\"")
    ; __line = 18
    ; __append(escapeFn( element._id))
    ; __append("\">Mastery ID: ")
    ; __append(escapeFn( element._id))
    ; __append("</small>\n            <p id=\"element_desc\" class=\"card-text\">")
    ; __line = 19
    ; __append(escapeFn( element.description ))
    ; __append("</p>\n            <p id=\"element_available\" class=\"card-text\">")
    ; __line = 20
    ; __append(escapeFn( element.available  ? "Available" : "Not Available" ))
    ; __append("</p>\n            <p class=\"topic_list\" id=\"topics_list\">\n                <span>")
    ; __line = 22
    ; __append(escapeFn( element.topics.length == 0 ? "No Topics" : "Topics:"))
    ; __append("</span>\n                ")
    ; __line = 23
    ;  element.topics.forEach(topic => { 
    ; __append("\n                <span>\n                    <br>\n                    ")
    ; __line = 26
    ; __append(escapeFn(topic.name))
    ; __append(" \n                    <a id=\"a_add_question\" data-topic_id=\"")
    ; __line = 27
    ; __append(escapeFn( topic._id ))
    ; __append("\" href=\"/question/new?topic_id=")
    ; __append(escapeFn(topic._id ))
    ; __append("&classroom_id=")
    ; __append(escapeFn(element.classroom))
    ; __append("\">\n                        Add questions\n                    </a>\n                    |\n                    <a style=\"cursor: pointer;\" data-mastery_id=\"")
    ; __line = 31
    ; __append(escapeFn( topic.mastery_id ))
    ; __append("\" data-id=\"")
    ; __append(escapeFn( topic._id))
    ; __append("\"\n                        data-name=\"")
    ; __line = 32
    ; __append(escapeFn( topic.name))
    ; __append("\" data-description=\"")
    ; __append(escapeFn( topic.description))
    ; __append("\"\n                        class=\"edit_topic_btn\">Edit <i class=\"fas fa-pencil-alt\"></i></a> \n                    |\n                    <a href=\"/topic/questions/answer?topic=")
    ; __line = 35
    ; __append(escapeFn( topic._id))
    ; __append("&classroom_id=")
    ; __append(escapeFn( element.classroom))
    ; __append("\">\n                        View questions  (")
    ; __line = 36
    ; __append(escapeFn( topic.questions.length ))
    ; __append(")\n                    </a>\n                </span>\n                \n                ")
    ; __line = 40
    ;  }); 
    ; __append("\n            </p>\n        </div>\n    </div>\n    ")
    ; __line = 44
    ;  }); 
    ; __append("\n</div>\n<script src=\"/js/ajax_question.js\"></script>")
    ; __line = 46
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n\n    <%- include(\"../../partials/navigation\", {active: 'manager'}) %>\n    <main>\n        <h1>Classroom Manager</h1>\n        <div id=\"sub_navbar\">\n        </div>\n        <section id=\"class_options\">\n            <button type=\"button\" onClick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n                data-target=\"#user-modal\">\n                Show User List\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#mastery-modal\">\n                Show Mastery Check List\n            </button>\n\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#add-mastery-modal\">\n                Add a Mastery Check\n            </button>\n\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n\n        <!-- User list modal -->\n        <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"user-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Mastery Check list modal -->\n        <div class=\"modal fade\" id=\"mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mastery-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"mastery-modal-label\">Mastery Check list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Add Mastery Check modal -->\n        <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\"\n            aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <section id=\"class_info\"></section>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n\n    ")
    ; __line = 8
    ; __append( include("../../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <main>\n        <h1>Classroom Manager</h1>\n        <div id=\"sub_navbar\">\n        </div>\n        <section id=\"class_options\">\n            <button type=\"button\" onClick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n                data-target=\"#user-modal\">\n                Show User List\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#mastery-modal\">\n                Show Mastery Check List\n            </button>\n\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#add-mastery-modal\">\n                Add a Mastery Check\n            </button>\n\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n\n        <!-- User list modal -->\n        <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"user-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Mastery Check list modal -->\n        <div class=\"modal fade\" id=\"mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mastery-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"mastery-modal-label\">Mastery Check list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Add Mastery Check modal -->\n        <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\"\n            aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <section id=\"class_info\"></section>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n</script>")
    ; __line = 113
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
  , __lines = "<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"input_name\">Topic name</label>\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\n                    value=\"<%= current.name ? current.name : \"\"%>\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"input_description\">Topic description</label>\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"input_description\" value=\"<%= current.description ? current.description : \"\"%>\" required />\n            </div>\n        </form>\n        <% if(current.name) {%>\n        <button onclick=\"edit_topic()\" class=\"btn btn-primary\">\n            Edit\n            Topic\n        </button>\n        <% } else {%>\n        <button onclick=\"create_topic()\" class=\"btn btn-primary\">\n            Create\n            Topic\n        </button>\n        <% }%>\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ajax_question.js\"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container\">\n    <div class=\" container mt-5\">\n        <form id=\"create_form\">\n            <div class=\"form-group\">\n                <label for=\"input_name\">Topic name</label>\n                <input type=\"text\" placeholder=\"Topic Name\" name=\"input_name\" class=\"form-control\" id=\"input_name\"\n                    value=\"")
    ; __line = 7
    ; __append(escapeFn( current.name ? current.name : ""))
    ; __append("\" required />\n            </div>\n            <div class=\"form-group\">\n                <label for=\"input_description\">Topic description</label>\n                <input type=\"text\" placeholder=\"Topic Description\" name=\"input_description\" class=\"form-control\"\n                    id=\"input_description\" value=\"")
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n\n    <%- include(\"../../partials/navigation\", {active: 'manager'}) %>\n    <main>\n        <h1>Classroom Manager</h1>\n        <div id=\"sub_navbar\">\n        </div>\n        <section id=\"class_options\">\n            <button type=\"button\" onClick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n                data-target=\"#user-modal\">\n                Show User List\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#mastery-modal\">\n                Show Mastery Check List\n            </button>\n\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#add-mastery-modal\">\n                Add a Mastery Check\n            </button>\n\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n\n        <!-- User list modal -->\n        <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"user-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Mastery Check list modal -->\n        <div class=\"modal fade\" id=\"mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mastery-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"mastery-modal-label\">Mastery Check list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Add Mastery Check modal -->\n        <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\"\n            aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <section id=\"class_info\"></section>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n\n    ")
    ; __line = 8
    ; __append( include("../../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <main>\n        <h1>Classroom Manager</h1>\n        <div id=\"sub_navbar\">\n        </div>\n        <section id=\"class_options\">\n            <button type=\"button\" onClick=\"render_user_modal()\" class=\"btn btn-primary\" data-toggle=\"modal\"\n                data-target=\"#user-modal\">\n                Show User List\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#mastery-modal\">\n                Show Mastery Check List\n            </button>\n\n            <button type=\"button\" class=\"btn btn-primary\" onclick=\"render_add_mastery_modal()\" data-toggle=\"modal\"\n                data-target=\"#add-mastery-modal\">\n                Add a Mastery Check\n            </button>\n\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n\n        <!-- User list modal -->\n        <div class=\"modal fade\" id=\"user-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"user-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">User list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"user-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Mastery Check list modal -->\n        <div class=\"modal fade\" id=\"mastery-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mastery-modal-label\"\n            aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"mastery-modal-label\">Mastery Check list</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Add Mastery Check modal -->\n        <div class=\"modal fade\" id=\"add-mastery-modal\" tabindex=\"-1\" role=\"dialog\"\n            aria-labelledby=\"add-mastery-modal-label\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"user-modal-label\">Add a Mastery Check</h5>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <div id=\"add-mastery-modal-body\" class=\"modal-body\">\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <section id=\"class_info\"></section>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script src=\"/js/ajax_question.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n<!-- CodeMirror CDNs -->\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n<script>\n    window.onload = init_manager;\n</script>")
    ; __line = 113
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}