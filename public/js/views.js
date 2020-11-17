//EJS Compiled Views - This file was automatically generated on Tue Nov 17 2020 08:28:58 GMT+0100 (Central European Standard Time)
ejs.views_include = function(locals) {
    console.log("views_include_setup",locals);
    return function(path, d) {
        console.log("ejs.views_include",path,d);
        return ejs["views_"+path.replace(/\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
ejs.views_dashboard = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<head>\n  <title>checq.me - Dashboard</title>\n</head>\n\n<body>\n  <div class=\"wrapper\">\n\n    <%- include(\"./partials/navigation\", { active: \"dashboard\" }) %>\n\n    <main>\n      <div class=\"header\">\n        <h1 class=\"main-header\"> Welcome Back, <%= user.name %>! </h1>\n\n        <a class=\"button-text normal red\" href=\"/user/logout\">\n          <img class=\"icon-s\" src=\"assets/icons/buttons/logout.svg\" alt=\"logout icon\" />Logout\n        </a>\n      </div>\n    </main>\n  </div>\n</body>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<head>\n  <title>checq.me - Dashboard</title>\n</head>\n\n<body>\n  <div class=\"wrapper\">\n\n    ")
    ; __line = 8
    ; __append( include("./partials/navigation", { active: "dashboard" }) )
    ; __append("\n\n    <main>\n      <div class=\"header\">\n        <h1 class=\"main-header\"> Welcome Back, ")
    ; __line = 12
    ; __append(escapeFn( user.name ))
    ; __append("! </h1>\n\n        <a class=\"button-text normal red\" href=\"/user/logout\">\n          <img class=\"icon-s\" src=\"assets/icons/buttons/logout.svg\" alt=\"logout icon\" />Logout\n        </a>\n      </div>\n    </main>\n  </div>\n</body>")
    ; __line = 20
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

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
  , __lines = "<h1>Final Project Homepage</h1>\n\n<img src=\"assets/branding/logo_bg/bg_blue.svg\" />\n<div class=\"div\">\n    <a href=\"/user/login\" class=\"badge badge-primary\">Login</a>\n    <a href=\"/user/register\" class=\"badge badge-primary\">Register</a>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Final Project Homepage</h1>\n\n<img src=\"assets/branding/logo_bg/bg_blue.svg\" />\n<div class=\"div\">\n    <a href=\"/user/login\" class=\"badge badge-primary\">Login</a>\n    <a href=\"/user/register\" class=\"badge badge-primary\">Register</a>\n</div>")
    ; __line = 7
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_layout = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\" />\n\n    <!-- Favicon setup -->\n    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"assets/branding/favicon/apple-touch-icon.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"assets/branding/favicon/favicon-32x32.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"assets/branding/favicon/favicon-16x16.png\">\n    <link rel=\"manifest\" href=\"assets/branding/favicon/site.webmanifest\">\n    <link rel=\"mask-icon\" href=\"assets/branding/favicon/safari-pinned-tab.svg\" color=\"#374293\">\n    <meta name=\"msapplication-TileColor\" content=\"#374293\">\n    <meta name=\"theme-color\" content=\"#374293\">\n\n    <!-- External stylesheets -->\n    <link rel=\"stylesheet\" href=\"https://bootswatch.com/4/journal/bootstrap.min.css\" />\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\"\n      integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\" />\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\"\n      integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\">\n    <link rel=\"stylesheet\" href=\"https://bootswatch.com/4/journal/bootstrap.min.css\" />\n\n    <!-- Internal stylesheet -->\n    <link rel=\"stylesheet\" href=\"/stylesheets/css/style.css\">\n\n    <title>checq.me</title>\n  </head>\n\n  <body>\n    <%- body %>\n\n    <script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\"\n      integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js\"\n      integrity=\"sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js\"\n      integrity=\"sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k\"\n      crossorigin=\"anonymous\"></script>\n  </body>\n</html>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\" />\n\n    <!-- Favicon setup -->\n    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"assets/branding/favicon/apple-touch-icon.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"assets/branding/favicon/favicon-32x32.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"assets/branding/favicon/favicon-16x16.png\">\n    <link rel=\"manifest\" href=\"assets/branding/favicon/site.webmanifest\">\n    <link rel=\"mask-icon\" href=\"assets/branding/favicon/safari-pinned-tab.svg\" color=\"#374293\">\n    <meta name=\"msapplication-TileColor\" content=\"#374293\">\n    <meta name=\"theme-color\" content=\"#374293\">\n\n    <!-- External stylesheets -->\n    <link rel=\"stylesheet\" href=\"https://bootswatch.com/4/journal/bootstrap.min.css\" />\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\"\n      integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\" />\n    <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\"\n      integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\">\n    <link rel=\"stylesheet\" href=\"https://bootswatch.com/4/journal/bootstrap.min.css\" />\n\n    <!-- Internal stylesheet -->\n    <link rel=\"stylesheet\" href=\"/stylesheets/css/style.css\">\n\n    <title>checq.me</title>\n  </head>\n\n  <body>\n    ")
    ; __line = 31
    ; __append( body )
    ; __append("\n\n    <script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\"\n      integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js\"\n      integrity=\"sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js\"\n      integrity=\"sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k\"\n      crossorigin=\"anonymous\"></script>\n  </body>\n</html>")
    ; __line = 43
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
  , __lines = "<%let x; if(locals.email){ x = locals.email } else{x = \"\"} \n  \n%>\n\n<div class=\"row mt-5\">\n  <div class=\"col-md-6 m-auto\">\n    <div class=\"card card-body\">\n      <h1 class=\"text-center mb-3\"><i class=\"fas fa-sign-in-alt\"></i> Login</h1>\n      <%- include (\"./partials/messages\")%>\n      <form action=\"/user/login\" method=\"POST\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n\n          <input required type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Enter Email\"\n            value=\"<%=x%>\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" id=\"password\" name=\"password\" class=\"form-control\"\n            placeholder=\"Enter Password\" />\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-primary btn-block\">Login</button>\n      </form>\n      <!-- Button trigger modal -->\n      <button type=\"button\" class=\"btn btn-primary d-none\" id=\"modal_btn\" data-toggle=\"modal\"\n        data-target=\"#verification_modal\">\n        Send again your verification link\n      </button>\n\n      <!-- Modal -->\n      <div class=\"modal fade\" id=\"verification_modal\" tabindex=\"-1\" aria-labelledby=\"verification_modal\"\n        aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalLabel\">\n                Send verification link again\n              </h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">\n              <form id=\"modal_form\" enctype=\"multipart/form-data\">\n                <div class=\"form-group\">\n                  <label for=\"email\">Email address</label>\n                  <input type=\"email\" name=\"email\" class=\"form-control\" id=\"modal_email\" aria-describedby=\"emailHelp\"\n                    value=<%=x%> />\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Send</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"modal_close\" data-dismiss=\"modal\">\n                  Close\n                </button>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n      <p class=\"lead mt-4\">No Account? <a href=\"/user/signup\">Sign Up</a></p>\n    </div>\n  </div>\n</div>\n\n<script src=\"/js/ajax_login.js \"></script>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; let x; if(locals.email){ x = locals.email } else{x = ""} 
  

    ; __line = 3
    ; __append("\n\n<div class=\"row mt-5\">\n  <div class=\"col-md-6 m-auto\">\n    <div class=\"card card-body\">\n      <h1 class=\"text-center mb-3\"><i class=\"fas fa-sign-in-alt\"></i> Login</h1>\n      ")
    ; __line = 9
    ; __append( include ("./partials/messages"))
    ; __append("\n      <form action=\"/user/login\" method=\"POST\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n\n          <input required type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Enter Email\"\n            value=\"")
    ; __line = 15
    ; __append(escapeFn(x))
    ; __append("\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" id=\"password\" name=\"password\" class=\"form-control\"\n            placeholder=\"Enter Password\" />\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-primary btn-block\">Login</button>\n      </form>\n      <!-- Button trigger modal -->\n      <button type=\"button\" class=\"btn btn-primary d-none\" id=\"modal_btn\" data-toggle=\"modal\"\n        data-target=\"#verification_modal\">\n        Send again your verification link\n      </button>\n\n      <!-- Modal -->\n      <div class=\"modal fade\" id=\"verification_modal\" tabindex=\"-1\" aria-labelledby=\"verification_modal\"\n        aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalLabel\">\n                Send verification link again\n              </h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">\n              <form id=\"modal_form\" enctype=\"multipart/form-data\">\n                <div class=\"form-group\">\n                  <label for=\"email\">Email address</label>\n                  <input type=\"email\" name=\"email\" class=\"form-control\" id=\"modal_email\" aria-describedby=\"emailHelp\"\n                    value=")
    ; __line = 50
    ; __append(escapeFn(x))
    ; __append(" />\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">Send</button>\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"modal_close\" data-dismiss=\"modal\">\n                  Close\n                </button>\n              </form>\n            </div>\n          </div>\n        </div>\n      </div>\n      <p class=\"lead mt-4\">No Account? <a href=\"/user/signup\">Sign Up</a></p>\n    </div>\n  </div>\n</div>\n\n<script src=\"/js/ajax_login.js \"></script>")
    ; __line = 66
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_add_classroom = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<h1>Add a new Class</h1>\n<form id=\"new_class_form\" action=\"/manager/classroom/new\" , method=\"POST\">\n    <input id=\"input_name\" required type=\"text\" , name=\"name\" placeholder=\"Classroom name\">\n    <input id=\"input_desc\" required type=\"text\" , name=\"description\" placeholder=\"Classroom descrition\">\n    <input required type=\"submit\">\n</form>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Add a new Class</h1>\n<form id=\"new_class_form\" action=\"/manager/classroom/new\" , method=\"POST\">\n    <input id=\"input_name\" required type=\"text\" , name=\"name\" placeholder=\"Classroom name\">\n    <input id=\"input_desc\" required type=\"text\" , name=\"description\" placeholder=\"Classroom descrition\">\n    <input required type=\"submit\">\n</form>")
    ; __line = 6
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_classrooms = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<body onload=\"init()\">\n    <div id=\"classrooms_container\">\n        <h1>My Classrooms</h1> \n        <button id=\"new_class_button\">Create new classroom</button>\n\n        <section id=\"new_class_form_section\"></section>\n\n        <section id=\"new_topic_form_section\"></section>\n\n        <section id=\"classes\"></section>\n        \n        <hr>\n        \n        <script src=\"/js/ajax_classrooms.js\"></script>\n        <script src=\"/js/ajax_topic.js\"></script>\n        <script src=\"/js/ejs.min.js\"></script>\n        <script src=\"/js/views.js\"></script>\n    </div>\n</body>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<body onload=\"init()\">\n    <div id=\"classrooms_container\">\n        <h1>My Classrooms</h1> \n        <button id=\"new_class_button\">Create new classroom</button>\n\n        <section id=\"new_class_form_section\"></section>\n\n        <section id=\"new_topic_form_section\"></section>\n\n        <section id=\"classes\"></section>\n        \n        <hr>\n        \n        <script src=\"/js/ajax_classrooms.js\"></script>\n        <script src=\"/js/ajax_topic.js\"></script>\n        <script src=\"/js/ejs.min.js\"></script>\n        <script src=\"/js/views.js\"></script>\n    </div>\n</body>")
    ; __line = 19
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_classrooms_list = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<% collection.forEach((n)=>{ %>\n    <div id=\"<%= n._id%>\">\n        \n        <h3>Class: <%= n.name%></h3>\n        <h4>Description: <%= n.description %></h4>\n        <h4>Topics:</h4>\n\n        <% n.topics.forEach( (t) => { %>\n        <h5>- <%=t.name%>: <%= t.description%> <button class=\"view_topic_button\" value=\"<%=t._id%>\">view</button></h5>\n        <%}) %> \n\n        <button class=\"new_topic_button\" value=\"<%= n._id%>\">Add new topic</button>\n        <hr>\n    </div>\n<% }); %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  collection.forEach((n)=>{ 
    ; __append("\n    <div id=\"")
    ; __line = 2
    ; __append(escapeFn( n._id))
    ; __append("\">\n        \n        <h3>Class: ")
    ; __line = 4
    ; __append(escapeFn( n.name))
    ; __append("</h3>\n        <h4>Description: ")
    ; __line = 5
    ; __append(escapeFn( n.description ))
    ; __append("</h4>\n        <h4>Topics:</h4>\n\n        ")
    ; __line = 8
    ;  n.topics.forEach( (t) => { 
    ; __append("\n        <h5>- ")
    ; __line = 9
    ; __append(escapeFn(t.name))
    ; __append(": ")
    ; __append(escapeFn( t.description))
    ; __append(" <button class=\"view_topic_button\" value=\"")
    ; __append(escapeFn(t._id))
    ; __append("\">view</button></h5>\n        ")
    ; __line = 10
    ; }) 
    ; __append(" \n\n        <button class=\"new_topic_button\" value=\"")
    ; __line = 12
    ; __append(escapeFn( n._id))
    ; __append("\">Add new topic</button>\n        <hr>\n    </div>\n")
    ; __line = 15
    ;  }); 
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
  , __lines = "<h1>Add a new topic for class</h1>\n<form id=\"new_topic_form\" action=\"/topic\" method=\"POST\">\n    <input id=\"topic_name\" required type=\"text\" name=\"name\" placeholder=\"Topic name\">\n    <input id=\"topic_description\" required type=\"text\" name=\"description\" placeholder=\"Topic descrition\">\n    <input id=\"classroom_id\" type=\"hidden\" name=\"classroom\" value=\"<%=id%>\">\n    <input type=\"submit\">\n</form>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Add a new topic for class</h1>\n<form id=\"new_topic_form\" action=\"/topic\" method=\"POST\">\n    <input id=\"topic_name\" required type=\"text\" name=\"name\" placeholder=\"Topic name\">\n    <input id=\"topic_description\" required type=\"text\" name=\"description\" placeholder=\"Topic descrition\">\n    <input id=\"classroom_id\" type=\"hidden\" name=\"classroom\" value=\"")
    ; __line = 5
    ; __append(escapeFn(id))
    ; __append("\">\n    <input type=\"submit\">\n</form>")
    ; __line = 7
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_classrooms_topic = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<h1>Topic: <%=name%></h1>\n<h2><%=description%></h2>\n<button onclick=\"API.show_start_view()\">Back to my classes</button>\n\n<hr>\n<h2>Add questions for this topic:</h2>\n<button>Multiple choice question</button>\n<button>Open question</button>\n<form>\n    <span>Multiple choice question:</span>\n    <div><textarea name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea></div>\n    <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n    <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n</form>\n<div><button id=\"new_field\">Add field</button></div>\n\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ajax_classroom.js\"></script>\n<script src=\"/js/ajax_classrooms.js\"></script>\n"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>Topic: ")
    ; __append(escapeFn(name))
    ; __append("</h1>\n<h2>")
    ; __line = 2
    ; __append(escapeFn(description))
    ; __append("</h2>\n<button onclick=\"API.show_start_view()\">Back to my classes</button>\n\n<hr>\n<h2>Add questions for this topic:</h2>\n<button>Multiple choice question</button>\n<button>Open question</button>\n<form>\n    <span>Multiple choice question:</span>\n    <div><textarea name=\"text\" rows=\"4\" cols=\"50\" placeholder=\"Insert the question text here:\"></textarea></div>\n    <input id=\"0\" type=\"text\" name=\"0\" placeholder=\"Option 1\"><input type=\"checkbox\" checked><label for=\"0\"> Correct answer</label>\n    <input id=\"input_counter\" type=\"hidden\" name=\"fields_number\" value=\"1\">\n</form>\n<div><button id=\"new_field\">Add field</button></div>\n\n<script src=\"/js/ajax_topic.js\"></script>\n<script src=\"/js/ajax_classroom.js\"></script>\n<script src=\"/js/ajax_classrooms.js\"></script>\n")
    ; __line = 20
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_manager = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<div class=\"wrapper\">\n\n    <%- include(\"../partials/navigation\", {active: 'manager'}) %>\n    <div class=\"manager-container\">\n        <h1 class=\"main-header\">Manager</h1>\n        <a href=\"/manager/mastery\" class=\"badge badge-primary\">Mastery Check Manager</a>\n    </div>\n\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"wrapper\">\n\n    ")
    ; __line = 3
    ; __append( include("../partials/navigation", {active: 'manager'}) )
    ; __append("\n    <div class=\"manager-container\">\n        <h1 class=\"main-header\">Manager</h1>\n        <a href=\"/manager/mastery\" class=\"badge badge-primary\">Mastery Check Manager</a>\n    </div>\n\n</div>")
    ; __line = 9
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_manager_mastery_mastery = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<body onload=\"init()\">\n    <div class=\"wrapper\">\n        <%- include(\"../../partials/navigation\", { active: \"manager\" }) %>\n        <div>\n            <h1>Mastery Manager</h1>\n            <div id=\"list\" class=\"container\"></div>\n            <div id=\"add\" class=\"container\"></div>\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n        </div>\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ejs.min.js\"></script>\n    <script src=\"/js/views.js\"></script>\n</body>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<body onload=\"init()\">\n    <div class=\"wrapper\">\n        ")
    ; __line = 3
    ; __append( include("../../partials/navigation", { active: "manager" }) )
    ; __append("\n        <div>\n            <h1>Mastery Manager</h1>\n            <div id=\"list\" class=\"container\"></div>\n            <div id=\"add\" class=\"container\"></div>\n            <button onclick=\"add()\" id=\"add_btn\" type=\"button\" class=\"btn btn-primary\">Add Mastery Check</button>\n        </div>\n    </div>\n    <script src=\"/js/ajax_mastery.js\"></script>\n    <script src=\"/js/ejs.min.js\"></script>\n    <script src=\"/js/views.js\"></script>\n</body>")
    ; __line = 14
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
  , __lines = "<body>\n    <div class=\"container\">\n        <a href=\"/manager\" class=\"badge badge-primary\">Back to Manager</a>\n\n        <div class=\"container mt-5\">\n            <h1>Mastery Check Manager</h1>\n            <form id=\"create_form\" method=\"POST\">\n                <div class=\"form-group\">\n                    <label for=\"input_name\">Mastery Check name</label>\n                    <input required type=\"text\" name=\"input_name\" class=\"form-control\" id=\"input_name\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"input_description\">Mastery Check description</label>\n                    <input required type=\"text\" name=\"input_description\" class=\"form-control\" id=\"input_description\">\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\">\n                    <label class=\"form-check-label\" for=\"check_available\">\n                        Available\n                    </label>\n                </div>\n                <select required id=\"form_classroom\" class=\"form-control form-control-sm\">\n                    <%classroom_list.forEach(classroom => { %>\n                    <option value=\"<%=classroom._id%>\"><%=classroom.name%></option>\n                    <%});%>\n                </select>\n                <button type=\"submit\" class=\"btn btn-primary\">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src=\"/js/ajax_mastery.js\"></script>\n</body>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<body>\n    <div class=\"container\">\n        <a href=\"/manager\" class=\"badge badge-primary\">Back to Manager</a>\n\n        <div class=\"container mt-5\">\n            <h1>Mastery Check Manager</h1>\n            <form id=\"create_form\" method=\"POST\">\n                <div class=\"form-group\">\n                    <label for=\"input_name\">Mastery Check name</label>\n                    <input required type=\"text\" name=\"input_name\" class=\"form-control\" id=\"input_name\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"input_description\">Mastery Check description</label>\n                    <input required type=\"text\" name=\"input_description\" class=\"form-control\" id=\"input_description\">\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" name=\"check_available\" type=\"checkbox\" id=\"check_available\">\n                    <label class=\"form-check-label\" for=\"check_available\">\n                        Available\n                    </label>\n                </div>\n                <select required id=\"form_classroom\" class=\"form-control form-control-sm\">\n                    ")
    ; __line = 23
    ; classroom_list.forEach(classroom => { 
    ; __append("\n                    <option value=\"")
    ; __line = 24
    ; __append(escapeFn(classroom._id))
    ; __append("\">")
    ; __append(escapeFn(classroom.name))
    ; __append("</option>\n                    ")
    ; __line = 25
    ; });
    ; __append("\n                </select>\n                <button type=\"submit\" class=\"btn btn-primary\">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src=\"/js/ajax_mastery.js\"></script>\n</body>")
    ; __line = 31
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
  , __lines = "<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    <% result.forEach(element => { %>\n    <div class=\"card mt-5\">\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span> <button style=\"float: right;\" type=\"button\"\n                class=\"btn btn-primary delete_btn\">Delete</button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: <%= element.classroom%></h4>\n            <h5 class=\"card-title\"><%= element.name %></h5>\n            <small id=\"id_container\" data-id=\"<%= element._id%>\">Mastery ID: <%= element._id%></small>\n            <p class=\"card-text\"><%= element.description %></p>\n            <p class=\"card-text\"><%= element.available  ? \"Available\" : \"Not Available\" %></p>\n        </div>\n    </div>\n    <% }); %>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"container mt-3\">\n    <h3>Mastery Check List</h3>\n    ")
    ; __line = 3
    ;  result.forEach(element => { 
    ; __append("\n    <div class=\"card mt-5\">\n        <div style=\"display:flex;align-items: center;justify-content: space-between;\" class=\"card-header\">\n            <span>Mastery Check</span> <button style=\"float: right;\" type=\"button\"\n                class=\"btn btn-primary delete_btn\">Delete</button>\n        </div>\n        <div class=\"card-body\">\n            <h4>Classroom ID: ")
    ; __line = 10
    ; __append(escapeFn( element.classroom))
    ; __append("</h4>\n            <h5 class=\"card-title\">")
    ; __line = 11
    ; __append(escapeFn( element.name ))
    ; __append("</h5>\n            <small id=\"id_container\" data-id=\"")
    ; __line = 12
    ; __append(escapeFn( element._id))
    ; __append("\">Mastery ID: ")
    ; __append(escapeFn( element._id))
    ; __append("</small>\n            <p class=\"card-text\">")
    ; __line = 13
    ; __append(escapeFn( element.description ))
    ; __append("</p>\n            <p class=\"card-text\">")
    ; __line = 14
    ; __append(escapeFn( element.available  ? "Available" : "Not Available" ))
    ; __append("</p>\n        </div>\n    </div>\n    ")
    ; __line = 17
    ;  }); 
    ; __append("\n</div>")
    ; __line = 18
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_page404 = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<h1>\n    This page doesn't exist.\n</h1>\n\n<a href=\"/\">Go to Home</a>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<h1>\n    This page doesn't exist.\n</h1>\n\n<a href=\"/\">Go to Home</a>")
    ; __line = 5
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_partials_messages = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<% if (typeof errors != 'undefined'){\n   errors.forEach(function(error) { %>\n<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n  <%= error.msg %>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<% })} %>\n\n<% if (success_msg != ''){ %>\n<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n  <%= success_msg %>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<% } %>\n\n<% if (error_msg != ''){ %>\n<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n  <%= error_msg %>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<% } %>\n\n<% if (typeof info != 'undefined' && info.err_id == 1){ %>\n<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n  <%= info.message %>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<% } %>\n\n<% if (typeof info != 'undefined' && info.err_id == 2) { console.log(info) %>\n<div id=\"unconfirmed_alert\" class=\"alert alert-primary alert-dismissible fade show\" role=\"alert\">\n  <%= info.message %>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<% } %>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ;  if (typeof errors != 'undefined'){
   errors.forEach(function(error) { 
    ; __line = 2
    ; __append("\n<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n  ")
    ; __line = 4
    ; __append(escapeFn( error.msg ))
    ; __append("\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n")
    ; __line = 9
    ;  })} 
    ; __append("\n\n")
    ; __line = 11
    ;  if (success_msg != ''){ 
    ; __append("\n<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n  ")
    ; __line = 13
    ; __append(escapeFn( success_msg ))
    ; __append("\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n")
    ; __line = 18
    ;  } 
    ; __append("\n\n")
    ; __line = 20
    ;  if (error_msg != ''){ 
    ; __append("\n<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n  ")
    ; __line = 22
    ; __append(escapeFn( error_msg ))
    ; __append("\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n")
    ; __line = 27
    ;  } 
    ; __append("\n\n")
    ; __line = 29
    ;  if (typeof info != 'undefined' && info.err_id == 1){ 
    ; __append("\n<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n  ")
    ; __line = 31
    ; __append(escapeFn( info.message ))
    ; __append("\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n")
    ; __line = 36
    ;  } 
    ; __append("\n\n")
    ; __line = 38
    ;  if (typeof info != 'undefined' && info.err_id == 2) { console.log(info) 
    ; __append("\n<div id=\"unconfirmed_alert\" class=\"alert alert-primary alert-dismissible fade show\" role=\"alert\">\n  ")
    ; __line = 40
    ; __append(escapeFn( info.message ))
    ; __append("\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n")
    ; __line = 45
    ;  } 
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_partials_navigation = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<nav>\n  <img class=\"logo-s\" src=\"/assets/branding/logo/logo_white.svg\" alt=\"checq.me logo\" />\n\n  <span class=\"nav-button\">\n    <a class=\"<%= active === 'dashboard' ? \"active\" : \"not_active\" %>\" id=\"nav-1\" href=\"/dashboard\">\n      <img id=\"svg1\" src=\"/assets/icons/nav/dashboard.svg\" alt=\"dashboard icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"<%= active === 'classroom' ? \"active\" : \"not_active\" %>\" id=\"nav-2\">\n      <img id=\"svg2\" src=\"/assets/icons/nav/classroom.svg\" alt=\"classroom icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"<%= active === 'schedule' ? \"active\" : \"not_active\" %>\" id=\"nav-3\">\n      <img id=\"svg3\" src=\"/assets/icons/nav/schedule.svg\" alt=\"schedule icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"<%= active === 'profile' ? \"active\" : \"not_active\" %>\" id=\"nav-4\">\n      <img id=\"svg4\" src=\"/assets/icons/nav/profile.svg\" alt=\"profile icon\" />\n    </a>\n  </span>\n\n  <% if (user.role < 2) { %>\n  <span class=\"nav-button\">\n    <a class=\"<%= active === 'manager' ? \"active\" : \"not_active\" %>\" id=\"nav-5\" href=\"/manager\">\n      <img id=\"svg5\" src=\"/assets/icons/nav/manager.svg\" alt=\"manager icon\" />\n    </a>\n  </span>\n  <% } %>\n</nav>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<nav>\n  <img class=\"logo-s\" src=\"/assets/branding/logo/logo_white.svg\" alt=\"checq.me logo\" />\n\n  <span class=\"nav-button\">\n    <a class=\"")
    ; __line = 5
    ; __append(escapeFn( active === 'dashboard' ? "active" : "not_active" ))
    ; __append("\" id=\"nav-1\" href=\"/dashboard\">\n      <img id=\"svg1\" src=\"/assets/icons/nav/dashboard.svg\" alt=\"dashboard icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"")
    ; __line = 11
    ; __append(escapeFn( active === 'classroom' ? "active" : "not_active" ))
    ; __append("\" id=\"nav-2\">\n      <img id=\"svg2\" src=\"/assets/icons/nav/classroom.svg\" alt=\"classroom icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"")
    ; __line = 17
    ; __append(escapeFn( active === 'schedule' ? "active" : "not_active" ))
    ; __append("\" id=\"nav-3\">\n      <img id=\"svg3\" src=\"/assets/icons/nav/schedule.svg\" alt=\"schedule icon\" />\n    </a>\n  </span>\n\n  <span class=\"nav-button\">\n    <a class=\"")
    ; __line = 23
    ; __append(escapeFn( active === 'profile' ? "active" : "not_active" ))
    ; __append("\" id=\"nav-4\">\n      <img id=\"svg4\" src=\"/assets/icons/nav/profile.svg\" alt=\"profile icon\" />\n    </a>\n  </span>\n\n  ")
    ; __line = 28
    ;  if (user.role < 2) { 
    ; __append("\n  <span class=\"nav-button\">\n    <a class=\"")
    ; __line = 30
    ; __append(escapeFn( active === 'manager' ? "active" : "not_active" ))
    ; __append("\" id=\"nav-5\" href=\"/manager\">\n      <img id=\"svg5\" src=\"/assets/icons/nav/manager.svg\" alt=\"manager icon\" />\n    </a>\n  </span>\n  ")
    ; __line = 34
    ;  } 
    ; __append("\n</nav>")
    ; __line = 35
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

ejs.views_scheduler_scheduler = function(locals, escapeFn, include = ejs.views_include(locals), rethrow
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
  , __lines = "<head>\n    <title>checq.me - Mastery Scheduler</title>\n  </head>\n  \n  <body onload=\"init()\">\n    <div class=\"wrapper\">\n      <%- include(\"../partials/navigation\", {active: \"scheduler\"}) %>\n  \n      <main>\n        <div class=\"header\">\n          <h1 class=\"main-header\"><%= user.name %></h1>\n  \n          <a class=\"button-text normal red\" href=\"/user/logout\">\n            <img\n              class=\"icon-s\"\n              src=\"assets/icons/buttons/logout.svg\"\n              alt=\"logout icon\"\n            />Logout\n          </a>\n        </div>\n  \n        <div id=\"classroom_selection_wrapper\">\n          \n          </div>\n      </main>\n    </div>\n    <script src=\"/js/ajax_scheduler.js\"></script>\n    <script src=\"/js/ejs.min.js\"></script>\n    <script src=\"/js/views.js\"></script>\n  </body>\n  "
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<head>\n    <title>checq.me - Mastery Scheduler</title>\n  </head>\n  \n  <body onload=\"init()\">\n    <div class=\"wrapper\">\n      ")
    ; __line = 7
    ; __append( include("../partials/navigation", {active: "scheduler"}) )
    ; __append("\n  \n      <main>\n        <div class=\"header\">\n          <h1 class=\"main-header\">")
    ; __line = 11
    ; __append(escapeFn( user.name ))
    ; __append("</h1>\n  \n          <a class=\"button-text normal red\" href=\"/user/logout\">\n            <img\n              class=\"icon-s\"\n              src=\"assets/icons/buttons/logout.svg\"\n              alt=\"logout icon\"\n            />Logout\n          </a>\n        </div>\n  \n        <div id=\"classroom_selection_wrapper\">\n          \n          </div>\n      </main>\n    </div>\n    <script src=\"/js/ajax_scheduler.js\"></script>\n    <script src=\"/js/ejs.min.js\"></script>\n    <script src=\"/js/views.js\"></script>\n  </body>\n  ")
    ; __line = 31
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
  , __lines = "<div class=\"row mt-5\">\n  <div class=\"col-md-6 m-auto\">\n    <div class=\"card card-body\">\n      <h1 class=\"text-center mb-3\">\n        <i class=\"fas fa-user-plus\"></i> Signup\n      </h1>\n\n      <%- include(\"./partials/messages\") %>\n\n      <form action=\"/user/signup\" method=\"POST\">\n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input required type=\"text\" id=\"name\" name=\"name\" class=\"form-control\" placeholder=\"Enter Name\"\n            value=\"<%= typeof name != 'undefined' ? name : '' %>\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"surname\">Surname</label>\n          <input required type=\"text\" id=\"surname\" name=\"surname\" class=\"form-control\" placeholder=\"Enter Surname\"\n            value=\"<%= typeof surname != 'undefined' ? surname : '' %>\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n          <input required type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Enter Email\"\n            value=\"<%= typeof email != 'undefined' ? email : '' %>\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" id=\"password\" name=\"password\" class=\"form-control\"\n            placeholder=\"Create Password\" value=\"<%= typeof password != 'undefined' ? password : '' %>\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"conf_password\">Confirm Password</label>\n          <input required type=\"password\" id=\"conf_password\" name=\"conf_password\" class=\"form-control\"\n            placeholder=\"Confirm Password\" value=\"<%= typeof conf_password != 'undefined' ? conf_password : '' %>\" />\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-primary btn-block\">\n          Sign Up\n        </button>\n      </form>\n\n      <p class=\"lead mt-4\">Have An Account? <a href=\"/user/login\">Login</a></p>\n    </div>\n  </div>\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
  with (locals || {}) {
    ; __append("<div class=\"row mt-5\">\n  <div class=\"col-md-6 m-auto\">\n    <div class=\"card card-body\">\n      <h1 class=\"text-center mb-3\">\n        <i class=\"fas fa-user-plus\"></i> Signup\n      </h1>\n\n      ")
    ; __line = 8
    ; __append( include("./partials/messages") )
    ; __append("\n\n      <form action=\"/user/signup\" method=\"POST\">\n        <div class=\"form-group\">\n          <label for=\"name\">Name</label>\n          <input required type=\"text\" id=\"name\" name=\"name\" class=\"form-control\" placeholder=\"Enter Name\"\n            value=\"")
    ; __line = 14
    ; __append(escapeFn( typeof name != 'undefined' ? name : '' ))
    ; __append("\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"surname\">Surname</label>\n          <input required type=\"text\" id=\"surname\" name=\"surname\" class=\"form-control\" placeholder=\"Enter Surname\"\n            value=\"")
    ; __line = 20
    ; __append(escapeFn( typeof surname != 'undefined' ? surname : '' ))
    ; __append("\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"email\">Email</label>\n          <input required type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Enter Email\"\n            value=\"")
    ; __line = 26
    ; __append(escapeFn( typeof email != 'undefined' ? email : '' ))
    ; __append("\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Password</label>\n          <input required type=\"password\" id=\"password\" name=\"password\" class=\"form-control\"\n            placeholder=\"Create Password\" value=\"")
    ; __line = 32
    ; __append(escapeFn( typeof password != 'undefined' ? password : '' ))
    ; __append("\" />\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"conf_password\">Confirm Password</label>\n          <input required type=\"password\" id=\"conf_password\" name=\"conf_password\" class=\"form-control\"\n            placeholder=\"Confirm Password\" value=\"")
    ; __line = 38
    ; __append(escapeFn( typeof conf_password != 'undefined' ? conf_password : '' ))
    ; __append("\" />\n        </div>\n\n        <button type=\"submit\" class=\"btn btn-primary btn-block\">\n          Sign Up\n        </button>\n      </form>\n\n      <p class=\"lead mt-4\">Have An Account? <a href=\"/user/login\">Login</a></p>\n    </div>\n  </div>\n</div>")
    ; __line = 49
  }
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}