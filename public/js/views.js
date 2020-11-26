//EJS Compiled Views - This file was automatically generated on Thu Nov 26 2020 20:55:02 GMT+0100 (Central European Standard Time)
ejs.views_include = function(locals) {
    return function(path, d) {
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
ejs.views_manager_partial_class_add_form = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<h1>Add a new Class</h1>\n<% let domain = '@' + (user.email.split('@')[1]) %>\n<form id=\"new_class_form\">\n    <input id=\"input_name\" required type=\"text\" name=\"name\" placeholder=\"Classroom name\">\n    <textarea id=\"input_desc\" required name=\"description\" placeholder=\"Classroom description\"></textarea>\n    <label > <%= domain%></label>\n    <input id=\"input_is_ordered\" type=\"checkbox\" name=\"is_ordered\" checked/>\n    <label for=\"is_ordered\">Sequential completion of masterychecks</label>\n    <input type=\"submit\"/>\n</form>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Add a new Class</h1>\n")
    ; __line = 2
    ;  let domain = '@' + (user.email.split('@')[1]) 
    ; __append("\n<form id=\"new_class_form\">\n    <input id=\"input_name\" required type=\"text\" name=\"name\" placeholder=\"Classroom name\">\n    <textarea id=\"input_desc\" required name=\"description\" placeholder=\"Classroom description\"></textarea>\n    <label > ")
    ; __line = 6
    ; __append(escapeFn( domain))
    ; __append("</label>\n    <input id=\"input_is_ordered\" type=\"checkbox\" name=\"is_ordered\" checked/>\n    <label for=\"is_ordered\">Sequential completion of masterychecks</label>\n    <input type=\"submit\"/>\n</form>")
    ; __line = 10
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_class_add_prof = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<div>\n    <h3>Select the Professor</h3>\n    <select name=\"partecipants\" id=\"partecipants_list\">\n        <% partecipants.forEach(p => { %>\n        <option value=\"<%=p._id%>\"><%= p.name%> <%= p.surname%></option>\n        <% }); %>\n    </select>\n    <label id=\"selected_user\">Select a user:</label>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div>\n    <h3>Select the Professor</h3>\n    <select name=\"partecipants\" id=\"partecipants_list\">\n        ")
    ; __line = 4
    ;  partecipants.forEach(p => { 
    ; __append("\n        <option value=\"")
    ; __line = 5
    ; __append(escapeFn(p._id))
    ; __append("\">")
    ; __append(escapeFn( p.name))
    ; __append(" ")
    ; __append(escapeFn( p.surname))
    ; __append("</option>\n        ")
    ; __line = 6
    ;  }); 
    ; __append("\n    </select>\n    <label id=\"selected_user\">Select a user:</label>\n</div>")
    ; __line = 9
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_partial_class_add_ta = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<div>\n    <h3>Select your new TA:</h3>\n    <select name=\"partecipants\" id=\"partecipants_list\">\n        <% partecipants.forEach(p => { %>\n            <option value=\"<%=p._id%>\"><%= p.name%> <%= p.surname%></option>\n        <% }); %>        \n    </select>\n    <label id=\"selected_user\">Select a user:</label>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div>\n    <h3>Select your new TA:</h3>\n    <select name=\"partecipants\" id=\"partecipants_list\">\n        ")
    ; __line = 4
    ;  partecipants.forEach(p => { 
    ; __append("\n            <option value=\"")
    ; __line = 5
    ; __append(escapeFn(p._id))
    ; __append("\">")
    ; __append(escapeFn( p.name))
    ; __append(" ")
    ; __append(escapeFn( p.surname))
    ; __append("</option>\n        ")
    ; __line = 6
    ;  }); 
    ; __append("        \n    </select>\n    <label id=\"selected_user\">Select a user:</label>\n</div>")
    ; __line = 9
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

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

ejs.views_manager_partial_class_list = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<% classrooms.forEach(c => { %>\n<div id=\"<%=c._id%>\">\n    <h2>Class: <%= c.name %></h2>\n    <button class=\"class_edit_button\" value=\"<%=c._id%>\"><a href=\"/manager/classroom?id=<%=c._id%>\">Manage</a></button>\n    <button id=\"generate_invite\" value=\"<%=c._id%>\" onclick=\"generate_invite_link('<%=c._id%>')\">Generate invite\n        link</button>\n</div>\n<% }); %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  classrooms.forEach(c => { 
    ; __append("\n<div id=\"")
    ; __line = 2
    ; __append(escapeFn(c._id))
    ; __append("\">\n    <h2>Class: ")
    ; __line = 3
    ; __append(escapeFn( c.name ))
    ; __append("</h2>\n    <button class=\"class_edit_button\" value=\"")
    ; __line = 4
    ; __append(escapeFn(c._id))
    ; __append("\"><a href=\"/manager/classroom?id=")
    ; __append(escapeFn(c._id))
    ; __append("\">Manage</a></button>\n    <button id=\"generate_invite\" value=\"")
    ; __line = 5
    ; __append(escapeFn(c._id))
    ; __append("\" onclick=\"generate_invite_link('")
    ; __append(escapeFn(c._id))
    ; __append("')\">Generate invite\n        link</button>\n</div>\n")
    ; __line = 8
    ;  }); 
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
  , __lines = "<body>\n    <div class=\"container\">\n\n        <div class=\"container mt-5\">\n\n            <form id=\"create_form\" method=\"POST\">\n                <div class=\"form-group\">\n                    <label for=\"input_name\">Mastery Check name</label>\n                    <input required type=\"text\" name=\"input_name\" class=\"form-control\" id=\"input_name\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"input_description\">Mastery Check description</label>\n                    <input required type=\"text\" name=\"input_description\" class=\"form-control\" id=\"input_description\">\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\">\n                    <label class=\"form-check-label\" for=\"check_available\">\n                        Available\n                    </label>\n                </div>\n                \n                <button type=\"submit\" class=\"btn btn-primary\">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src=\"/js/ajax_mastery.js\"></script>\n</body>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<body>\n    <div class=\"container\">\n\n        <div class=\"container mt-5\">\n\n            <form id=\"create_form\" method=\"POST\">\n                <div class=\"form-group\">\n                    <label for=\"input_name\">Mastery Check name</label>\n                    <input required type=\"text\" name=\"input_name\" class=\"form-control\" id=\"input_name\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"input_description\">Mastery Check description</label>\n                    <input required type=\"text\" name=\"input_description\" class=\"form-control\" id=\"input_description\">\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\">\n                    <label class=\"form-check-label\" for=\"check_available\">\n                        Available\n                    </label>\n                </div>\n                \n                <button type=\"submit\" class=\"btn btn-primary\">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src=\"/js/ajax_mastery.js\"></script>\n</body>")
    ; __line = 26
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
  , __lines = "<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    <% result.forEach(element => { %>\n    <div class=\"card mt-5\">\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span> \n            <button style=\"float: right;\" type=\"button\"\n                class=\"btn btn-primary delete_btn\">Delete</button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: <%= element.classroom%></h4>\n            <h5 class=\"card-title\"><%= element.name %></h5>\n            <small id=\"id_container\" data-id=\"<%= element._id%>\">Mastery ID: <%= element._id%></small>\n            <p class=\"card-text\"><%= element.description %></p>\n            <p class=\"card-text\"><%= element.available  ? \"Available\" : \"Not Available\" %></p>\n            <p> \n                <span><%= element.topics.length == 0 ? \"No Topics\" : \"Topics:\"%></span>\n                <% element.topics.forEach(topic => { %>\n                    <span>\n                        <a href=\"/question/new?topic=<%=topic._id %>\">\n                            <%=topic.name%>\n                        </a> |\n                    </span>\n                <% }); %>\n            </p>\n        </div>\n    </div>\n    <% }); %>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    ")
    ; __line = 3
    ;  result.forEach(element => { 
    ; __append("\n    <div class=\"card mt-5\">\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span> \n            <button style=\"float: right;\" type=\"button\"\n                class=\"btn btn-primary delete_btn\">Delete</button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: ")
    ; __line = 11
    ; __append(escapeFn( element.classroom))
    ; __append("</h4>\n            <h5 class=\"card-title\">")
    ; __line = 12
    ; __append(escapeFn( element.name ))
    ; __append("</h5>\n            <small id=\"id_container\" data-id=\"")
    ; __line = 13
    ; __append(escapeFn( element._id))
    ; __append("\">Mastery ID: ")
    ; __append(escapeFn( element._id))
    ; __append("</small>\n            <p class=\"card-text\">")
    ; __line = 14
    ; __append(escapeFn( element.description ))
    ; __append("</p>\n            <p class=\"card-text\">")
    ; __line = 15
    ; __append(escapeFn( element.available  ? "Available" : "Not Available" ))
    ; __append("</p>\n            <p> \n                <span>")
    ; __line = 17
    ; __append(escapeFn( element.topics.length == 0 ? "No Topics" : "Topics:"))
    ; __append("</span>\n                ")
    ; __line = 18
    ;  element.topics.forEach(topic => { 
    ; __append("\n                    <span>\n                        <a href=\"/question/new?topic=")
    ; __line = 20
    ; __append(escapeFn(topic._id ))
    ; __append("\">\n                            ")
    ; __line = 21
    ; __append(escapeFn(topic.name))
    ; __append("\n                        </a> |\n                    </span>\n                ")
    ; __line = 24
    ;  }); 
    ; __append("\n            </p>\n        </div>\n    </div>\n    ")
    ; __line = 28
    ;  }); 
    ; __append("\n</div>")
    ; __line = 29
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n    <%- include(\"../../partials/navigation\", {active: 'manager'}) %>\n    <main>\n        <h1>Classroom Manager</h1>\n        <section id=\"class_options\">\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n            <button onclick=\"toggle_show_ta_form()\">Assign a TA</button>\n            <button onclick=\"toggle_show_prof_form()\">Add a professor</button>\n            <button onclick=\"toggle_show_topic_form()\">Add Topic</button>\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n        <section id=\"ta_form\"></section>\n        <section id=\"prof_form\"></section>\n        <section id=\"topic_form\"></section>\n        <section id=\"class_info\"></section>\n        <div id=\"list\" class=\"container\"></div>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script>\n    window.onload = init;\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n    ")
    ; __line = 7
    ; __append( include("../../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <main>\n        <h1>Classroom Manager</h1>\n        <section id=\"class_options\">\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n            <button onclick=\"toggle_show_ta_form()\">Assign a TA</button>\n            <button onclick=\"toggle_show_prof_form()\">Add a professor</button>\n            <button onclick=\"toggle_show_topic_form()\">Add Topic</button>\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n        <section id=\"ta_form\"></section>\n        <section id=\"prof_form\"></section>\n        <section id=\"topic_form\"></section>\n        <section id=\"class_info\"></section>\n        <div id=\"list\" class=\"container\"></div>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script>\n    window.onload = init;\n</script>")
    ; __line = 34
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
  , __lines = "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n\n\n\n<% let langs = {\"JavaScript\" : \"text/javascript\", \n                \"Python\" : \"text/x-python\",\n                \"C\" : \"text/x-csrc\",\n                \"C++\" : \"text/x-c++src\",\n                \"Java\" : \"text/x-java\",\n                \"HTML\" : \"application/xml\",\n                \"CSS\" : \"text/css\"\n            }\n%>\n\n<div class=\"wrapper\">\n    <%- include(\"../../partials/navigation\", {active: 'manager'}) %>\n    <div>\n        <h2>Add question:</h2>\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\n        <form>\n            <span>Multiple choice question:</span>\n            <br>\n            <span id=\"fields_label\">Options: 1</span>\n\n            <div id=\"text_div\">\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\n            </div>\n\n            <div id=\"code_div\">\n                <select id=\"lang_select\">\n                    <% Object.keys(langs).forEach( lang => { %>\n                        <option value=\"<%= langs[lang]%>\" > <%= lang%> </option>\n                    <% }) %>\n                </select>\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\n            </div>\n\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\n        </form>\n        <div><button id=\"new_field\">Add field</button></div>\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\n        <button onclick=\"post_question()\">Post question</button>\n    </div>\n</div>\n<script src=\"/js/ajax_question.js\"></script>\n\n\n<script>\n    window.onload = init_question;\n</script>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js\"></script>\n\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css\">\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/clike/clike.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/xml/xml.min.js\"></script>\n<link href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/theme/dracula.min.css\" rel=\"stylesheet\">\n\n\n\n")
    ; __line = 13
    ;  let langs = {"JavaScript" : "text/javascript", 
                "Python" : "text/x-python",
                "C" : "text/x-csrc",
                "C++" : "text/x-c++src",
                "Java" : "text/x-java",
                "HTML" : "application/xml",
                "CSS" : "text/css"
            }

    ; __line = 21
    ; __append("\n\n<div class=\"wrapper\">\n    ")
    ; __line = 24
    ; __append( include("../../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <div>\n        <h2>Add question:</h2>\n        <button id=\"question_type\" onclick=\"toggle_code_to_text()\">Code question</button>\n        <form>\n            <span>Multiple choice question:</span>\n            <br>\n            <span id=\"fields_label\">Options: 1</span>\n\n            <div id=\"text_div\">\n                <textarea id=\"text_area\" name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea>\n            </div>\n\n            <div id=\"code_div\">\n                <select id=\"lang_select\">\n                    ")
    ; __line = 39
    ;  Object.keys(langs).forEach( lang => { 
    ; __append("\n                        <option value=\"")
    ; __line = 40
    ; __append(escapeFn( langs[lang]))
    ; __append("\" > ")
    ; __append(escapeFn( lang))
    ; __append(" </option>\n                    ")
    ; __line = 41
    ;  }) 
    ; __append("\n                </select>\n                <textarea id=\"code_area\" name=\"code\" rows=\"4\" cols=\"50\"></textarea>\n            </div>\n\n            <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input id=\"check_0\" type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n            <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n            <input type=\"hidden\" id=\"code_or_text\" name=\"code_or_text\" value=\"text\">\n        </form>\n        <div><button id=\"new_field\">Add field</button></div>\n        <div><button style=\"visibility: hidden\" id=\"delete_field\">Remove field</button></div>\n        <button onclick=\"post_question()\">Post question</button>\n    </div>\n</div>\n<script src=\"/js/ajax_question.js\"></script>\n\n\n<script>\n    window.onload = init_question;\n</script>\n")
    ; __line = 61
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
  , __lines = "<h1>Add a new topic for class</h1>\n<form id=\"new_topic_form\" action=\"/topic\" method=\"POST\">\n    <select id=\"classroom_selection\" name=\"mastery\">\n        <%masterychecks.forEach(mastery => { %>\n            <option value=\"<%=mastery._id%>\"><%=mastery.name%></option>\n        <%});%>\n        </select>\n    <input id=\"topic_name\" required type=\"text\" name=\"name\" placeholder=\"Topic name\">\n    <input id=\"topic_description\" required type=\"text\" name=\"description\" placeholder=\"Topic descrition\">\n    <input id=\"classroom_id\" type=\"hidden\" name=\"classroom\" value=\"<%=id%>\">\n    <input type=\"submit\">\n</form>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Add a new topic for class</h1>\n<form id=\"new_topic_form\" action=\"/topic\" method=\"POST\">\n    <select id=\"classroom_selection\" name=\"mastery\">\n        ")
    ; __line = 4
    ; masterychecks.forEach(mastery => { 
    ; __append("\n            <option value=\"")
    ; __line = 5
    ; __append(escapeFn(mastery._id))
    ; __append("\">")
    ; __append(escapeFn(mastery.name))
    ; __append("</option>\n        ")
    ; __line = 6
    ; });
    ; __append("\n        </select>\n    <input id=\"topic_name\" required type=\"text\" name=\"name\" placeholder=\"Topic name\">\n    <input id=\"topic_description\" required type=\"text\" name=\"description\" placeholder=\"Topic descrition\">\n    <input id=\"classroom_id\" type=\"hidden\" name=\"classroom\" value=\"")
    ; __line = 10
    ; __append(escapeFn(id))
    ; __append("\">\n    <input type=\"submit\">\n</form>")
    ; __line = 12
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_scheduler_selection = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<select id=\"classroom_selection\" onchange=\"\">\n<%classrooms.forEach(classroom => { %>\n    <option value=\"<%=classroom._id%>\"><%=classroom.name%></option>\n<%});%>\n</select>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<select id=\"classroom_selection\" onchange=\"\">\n")
    ; __line = 2
    ; classrooms.forEach(classroom => { 
    ; __append("\n    <option value=\"")
    ; __line = 3
    ; __append(escapeFn(classroom._id))
    ; __append("\">")
    ; __append(escapeFn(classroom.name))
    ; __append("</option>\n")
    ; __line = 4
    ; });
    ; __append("\n</select>")
    ; __line = 5
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
  , __lines = "<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n    <%- include(\"../../partials/navigation\", {active: 'manager'}) %>\n    <main>\n        <h1>Classroom Manager</h1>\n        <section id=\"class_options\">\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n            <button onclick=\"toggle_show_ta_form()\">Assign a TA</button>\n            <button onclick=\"toggle_show_prof_form()\">Add a professor</button>\n            <button onclick=\"toggle_show_topic_form()\">Add Topic</button>\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n        <section id=\"ta_form\"></section>\n        <section id=\"prof_form\"></section>\n        <section id=\"topic_form\"></section>\n        <section id=\"class_info\"></section>\n        <div id=\"list\" class=\"container\"></div>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script>\n    window.onload = init;\n</script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<link rel=\"stylesheet\" href=\"/stylesheets/css/flash.min.css\">\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n\n<div class=\"wrapper\">\n    ")
    ; __line = 7
    ; __append( include("../../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <main>\n        <h1>Classroom Manager</h1>\n        <section id=\"class_options\">\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n            <button onclick=\"toggle_show_ta_form()\">Assign a TA</button>\n            <button onclick=\"toggle_show_prof_form()\">Add a professor</button>\n            <button onclick=\"toggle_show_topic_form()\">Add Topic</button>\n        </section>\n        <div id=\"add\" class=\"container\"></div>\n        <section id=\"ta_form\"></section>\n        <section id=\"prof_form\"></section>\n        <section id=\"topic_form\"></section>\n        <section id=\"class_info\"></section>\n        <div id=\"list\" class=\"container\"></div>\n\n    </main>\n</div>\n\n<script src=\"/js/ajax_mastery.js\"></script>\n<script src=\"/js/flash.min.js\"></script>\n<script src=\"/js/ajax_classroom_manager.js\"></script>\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ejs.min.js\"></script>\n<script src=\"/js/views.js\"></script>\n<script>\n    window.onload = init;\n</script>")
    ; __line = 34
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_profile_update_form = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<form id=\"update_details\">\n    <div class=\"form-group\">\n        <label for=\"input_name\">Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"input_name\" placeholder=\"Name\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"input_surname\">Surname</label>\n        <input type=\"text\" class=\"form-control\" id=\"input_surname\" placeholder=\"Surname\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Update Information</button>\n</form>\n\n<form id=\"update_password_form\">\n    <div class=\"form-group\">\n        <label for=\"input_password\">New Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"input_newpassword\" placeholder=\"New Password\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"input_confpassword\">Confirm New Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"input_confnewpassword\" placeholder=\"Confirm New Password\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Update Password</button>\n</form>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<form id=\"update_details\">\n    <div class=\"form-group\">\n        <label for=\"input_name\">Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"input_name\" placeholder=\"Name\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"input_surname\">Surname</label>\n        <input type=\"text\" class=\"form-control\" id=\"input_surname\" placeholder=\"Surname\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Update Information</button>\n</form>\n\n<form id=\"update_password_form\">\n    <div class=\"form-group\">\n        <label for=\"input_password\">New Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"input_newpassword\" placeholder=\"New Password\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"input_confpassword\">Confirm New Password</label>\n        <input type=\"password\" class=\"form-control\" id=\"input_confnewpassword\" placeholder=\"Confirm New Password\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Update Password</button>\n</form>")
    ; __line = 23
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}