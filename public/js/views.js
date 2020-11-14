//EJS Compiled Views - This file was automatically generated on Fri Nov 13 2020 23:40:15 GMT+0100 (Central European Standard Time)
ejs.views_include = function(locals) {
    console.log("views_include_setup",locals);
    return function(path, d) {
        console.log("ejs.views_include",path,d);
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
ejs.views_home = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<h1>Final Project Homepage</h1>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Final Project Homepage</h1>")
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_login = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<head>\n  <title>checq.me - Login</title>\n</head>\n\n<body>\n  <form id=\"login_form\" action=\"/login\" method=\"post\">\n    <div style=\"display: flex; flex-direction: column\">\n\n      <div>\n        <label for=\"username\">Email: </label>\n        <input type=\"text\" name=\"email\" />\n      </div>\n\n      <div>\n        <label for=\"password\">Password: </label>\n        <input type=\"password\" name=\"password\" />\n      </div>\n      \n      <input type=\"submit\" value=\"Login\" />\n    </div>\n  </form>\n</body>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<head>\n  <title>checq.me - Login</title>\n</head>\n\n<body>\n  <form id=\"login_form\" action=\"/login\" method=\"post\">\n    <div style=\"display: flex; flex-direction: column\">\n\n      <div>\n        <label for=\"username\">Email: </label>\n        <input type=\"text\" name=\"email\" />\n      </div>\n\n      <div>\n        <label for=\"password\">Password: </label>\n        <input type=\"password\" name=\"password\" />\n      </div>\n      \n      <input type=\"submit\" value=\"Login\" />\n    </div>\n  </form>\n</body>\n")
    ; __line = 23
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_signup = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<head>\n    <title>checq.me - Signup</title>\n  </head>\n  \n  <body>\n    <form id=\"login_form\" action=\"/user/signup\" method=\"POST\">\n      <div style=\"display: flex; flex-direction: column\">\n        <div>\n          <label for=\"name\">Name</label>\n          <input required type=\"text\" name=\"name\" />\n        </div>\n        <div>\n          <label for=\"surname\">Surname</label>\n          <input required type=\"surname\" name=\"surname\" />\n        </div>\n        <div>\n          <label for=\"email\">Email</label>\n          <input required type=\"mail\" name=\"email\" />\n        </div>\n        <div>\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" name=\"password\" />\n        </div>\n        <div>\n          <label for=\"conf_password\">Confirm Password</label>\n          <input required type=\"password\" name=\"conf_password\" />\n        </div>\n        <input type=\"submit\" value=\"Signup\" />\n      </div>\n    </form>\n  </body>\n  "
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<head>\n    <title>checq.me - Signup</title>\n  </head>\n  \n  <body>\n    <form id=\"login_form\" action=\"/user/signup\" method=\"POST\">\n      <div style=\"display: flex; flex-direction: column\">\n        <div>\n          <label for=\"name\">Name</label>\n          <input required type=\"text\" name=\"name\" />\n        </div>\n        <div>\n          <label for=\"surname\">Surname</label>\n          <input required type=\"surname\" name=\"surname\" />\n        </div>\n        <div>\n          <label for=\"email\">Email</label>\n          <input required type=\"mail\" name=\"email\" />\n        </div>\n        <div>\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" name=\"password\" />\n        </div>\n        <div>\n          <label for=\"conf_password\">Confirm Password</label>\n          <input required type=\"password\" name=\"conf_password\" />\n        </div>\n        <input type=\"submit\" value=\"Signup\" />\n      </div>\n    </form>\n  </body>\n  ")
    ; __line = 32
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}