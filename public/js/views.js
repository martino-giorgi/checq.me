//EJS Compiled Views - This file was automatically generated on Wed Nov 18 2020 21:59:05 GMT+0100 (Central European Standard Time)
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
  , __lines = "<% classrooms.forEach(c => { %>\n    <div id=\"<%=c._id%>\">\n        <h2>Class: <%= c.name %></h2>\n        <button id=\"class_edit_button\" value=\"<%=c._id%>\">Manage</button>\n        <button id=\"generate_invite\" value=\"<%=c._id%>\" onclick=\"generate_invite_link('<%=c._id%>')\">Generate invite link</button>\n    </div>\n<% }); %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  classrooms.forEach(c => { 
    ; __append("\n    <div id=\"")
    ; __line = 2
    ; __append(escapeFn(c._id))
    ; __append("\">\n        <h2>Class: ")
    ; __line = 3
    ; __append(escapeFn( c.name ))
    ; __append("</h2>\n        <button id=\"class_edit_button\" value=\"")
    ; __line = 4
    ; __append(escapeFn(c._id))
    ; __append("\">Manage</button>\n        <button id=\"generate_invite\" value=\"")
    ; __line = 5
    ; __append(escapeFn(c._id))
    ; __append("\" onclick=\"generate_invite_link('")
    ; __append(escapeFn(c._id))
    ; __append("')\">Generate invite link</button>\n    </div>\n")
    ; __line = 7
    ;  }); 
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