//EJS Compiled Views - This file was automatically generated on Mon Nov 16 2020 10:16:22 GMT+0100 (Central European Standard Time)
ejs.views_include = function (locals) {
  console.log("views_include_setup", locals);
  return function (path, d) {
    console.log("ejs.views_include", path, d);
    return ejs["views_" + path.replace(/\//g, "_")](
      { ...d, ...locals },
      null,
      ejs.views_include(locals)
    );
  };
};

ejs.views_scheduler_selection = function (
  locals,
  escapeFn,
  include = ejs.views_include(locals),
  rethrow
) {
  rethrow =
    rethrow ||
    function rethrow(err, str, flnm, lineno, esc) {
      var lines = str.split("\n");
      var start = Math.max(lineno - 3, 0);
      var end = Math.min(lines.length, lineno + 3);
      var filename = esc(flnm);
      // Error context
      var context = lines
        .slice(start, end)
        .map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        })
        .join("\n");

      // Alter exception message
      err.path = filename;
      err.message =
        (filename || "ejs") +
        ":" +
        lineno +
        "\n" +
        context +
        "\n\n" +
        err.message;

      throw err;
    };
  escapeFn =
    escapeFn ||
    function (markup) {
      return markup == undefined
        ? ""
        : String(markup).replace(_MATCH_HTML, encode_char);
    };
  var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;",
    },
    _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }
  var __line = 1,
    __lines =
      '<select id="classroom_selection" onchange="">\n<%classrooms.forEach(classroom => { %>\n    <option value="<%=classroom._id%>"><%=classroom.name%></option>\n<%});%>\n</select>',
    __filename = undefined;
  try {
    var __output = "";
    function __append(s) {
      if (s !== undefined && s !== null) __output += s;
    }
    with (locals || {}) {
      __append('<select id="classroom_selection" onchange="">\n');
      __line = 2;
      classrooms.forEach((classroom) => {
        __append('\n    <option value="');
        __line = 3;
        __append(escapeFn(classroom._id));
        __append('">');
        __append(escapeFn(classroom.name));
        __append("</option>\n");
        __line = 4;
      });
      __append("\n</select>");
      __line = 5;
    }
    return __output;
  } catch (e) {
    rethrow(e, __lines, __filename, __line, escapeFn);
  }
};

ejs.views_mastery_add = function (
  locals,
  escapeFn,
  include = ejs.views_include(locals),
  rethrow
) {
  rethrow =
    rethrow ||
    function rethrow(err, str, flnm, lineno, esc) {
      var lines = str.split("\n");
      var start = Math.max(lineno - 3, 0);
      var end = Math.min(lines.length, lineno + 3);
      var filename = esc(flnm);
      // Error context
      var context = lines
        .slice(start, end)
        .map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        })
        .join("\n");

      // Alter exception message
      err.path = filename;
      err.message =
        (filename || "ejs") +
        ":" +
        lineno +
        "\n" +
        context +
        "\n\n" +
        err.message;

      throw err;
    };
  escapeFn =
    escapeFn ||
    function (markup) {
      return markup == undefined
        ? ""
        : String(markup).replace(_MATCH_HTML, encode_char);
    };
  var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;",
    },
    _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }
  var __line = 1,
    __lines =
      '<body>\n    <div class="container">\n        <a href="/manager" class="badge badge-primary">Back to Manager</a>\n\n        <div class="container mt-5">\n            <h1>Mastery Check Manager</h1>\n            <form id="create_form" method="POST">\n                <div class="form-group">\n                    <label for="input_name">Mastery Check name</label>\n                    <input required type="text" name="input_name" class="form-control" id="input_name">\n                </div>\n                <div class="form-group">\n                    <label for="input_description">Mastery Check description</label>\n                    <input required type="text" name="input_description" class="form-control" id="input_description">\n                </div>\n                <div class="form-check">\n                    <input class="form-check-input" name="check_available" type="checkbox" id="check_available">\n                    <label class="form-check-label" for="check_available">\n                        Available\n                    </label>\n                </div>\n                <select required id="form_classroom" class="form-control form-control-sm">\n                    <%classroom_list.forEach(classroom => { %>\n                    <option value="<%=classroom._id%>"><%=classroom.name%></option>\n                    <%});%>\n                </select>\n                <button type="submit" class="btn btn-primary">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src="/js/ajax_mastery.js"></script>\n</body>',
    __filename = undefined;
  try {
    var __output = "";
    function __append(s) {
      if (s !== undefined && s !== null) __output += s;
    }
    with (locals || {}) {
      __append(
        '<body>\n    <div class="container">\n        <a href="/manager" class="badge badge-primary">Back to Manager</a>\n\n        <div class="container mt-5">\n            <h1>Mastery Check Manager</h1>\n            <form id="create_form" method="POST">\n                <div class="form-group">\n                    <label for="input_name">Mastery Check name</label>\n                    <input required type="text" name="input_name" class="form-control" id="input_name">\n                </div>\n                <div class="form-group">\n                    <label for="input_description">Mastery Check description</label>\n                    <input required type="text" name="input_description" class="form-control" id="input_description">\n                </div>\n                <div class="form-check">\n                    <input class="form-check-input" name="check_available" type="checkbox" id="check_available">\n                    <label class="form-check-label" for="check_available">\n                        Available\n                    </label>\n                </div>\n                <select required id="form_classroom" class="form-control form-control-sm">\n                    '
      );
      __line = 23;
      classroom_list.forEach((classroom) => {
        __append('\n                    <option value="');
        __line = 24;
        __append(escapeFn(classroom._id));
        __append('">');
        __append(escapeFn(classroom.name));
        __append("</option>\n                    ");
        __line = 25;
      });
      __append(
        '\n                </select>\n                <button type="submit" class="btn btn-primary">Create Mastery Check</button>\n            </form>\n        </div>\n        <script src="/js/ajax_mastery.js"></script>\n</body>'
      );
      __line = 31;
    }
    return __output;
  } catch (e) {
    rethrow(e, __lines, __filename, __line, escapeFn);
  }
};

ejs.views_mastery_list = function (
  locals,
  escapeFn,
  include = ejs.views_include(locals),
  rethrow
) {
  rethrow =
    rethrow ||
    function rethrow(err, str, flnm, lineno, esc) {
      var lines = str.split("\n");
      var start = Math.max(lineno - 3, 0);
      var end = Math.min(lines.length, lineno + 3);
      var filename = esc(flnm);
      // Error context
      var context = lines
        .slice(start, end)
        .map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        })
        .join("\n");

      // Alter exception message
      err.path = filename;
      err.message =
        (filename || "ejs") +
        ":" +
        lineno +
        "\n" +
        context +
        "\n\n" +
        err.message;

      throw err;
    };
  escapeFn =
    escapeFn ||
    function (markup) {
      return markup == undefined
        ? ""
        : String(markup).replace(_MATCH_HTML, encode_char);
    };
  var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;",
    },
    _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }
  var __line = 1,
    __lines =
      '<div class="container mt-3">\n    <h3>Mastery Check List</h3>\n    <% result.forEach(element => { %>\n    <div class="card mt-5">\n        <div style="display:flex;align-items: center;justify-content: space-between;" class="card-header">\n            <span>Mastery Check</span> <button style="float: right;" type="button"\n                class="btn btn-primary delete_btn">Delete</button>\n        </div>\n        <div class="card-body">\n            <h4>Classroom ID: <%= element.classroom%></h4>\n            <h5 class="card-title"><%= element.name %></h5>\n            <small id="id_container" data-id="<%= element._id%>">Mastery ID: <%= element._id%></small>\n            <p class="card-text"><%= element.description %></p>\n            <p class="card-text"><%= element.available  ? "Available" : "Not Available" %></p>\n        </div>\n    </div>\n    <% }); %>\n</div>',
    __filename = undefined;
  try {
    var __output = "";
    function __append(s) {
      if (s !== undefined && s !== null) __output += s;
    }
    with (locals || {}) {
      __append(
        '<div class="container mt-3">\n    <h3>Mastery Check List</h3>\n    '
      );
      __line = 3;
      result.forEach((element) => {
        __append(
          '\n    <div class="card mt-5">\n        <div style="display:flex;align-items: center;justify-content: space-between;" class="card-header">\n            <span>Mastery Check</span> <button style="float: right;" type="button"\n                class="btn btn-primary delete_btn">Delete</button>\n        </div>\n        <div class="card-body">\n            <h4>Classroom ID: '
        );
        __line = 10;
        __append(escapeFn(element.classroom));
        __append('</h4>\n            <h5 class="card-title">');
        __line = 11;
        __append(escapeFn(element.name));
        __append('</h5>\n            <small id="id_container" data-id="');
        __line = 12;
        __append(escapeFn(element._id));
        __append('">Mastery ID: ');
        __append(escapeFn(element._id));
        __append('</small>\n            <p class="card-text">');
        __line = 13;
        __append(escapeFn(element.description));
        __append('</p>\n            <p class="card-text">');
        __line = 14;
        __append(escapeFn(element.available ? "Available" : "Not Available"));
        __append("</p>\n        </div>\n    </div>\n    ");
        __line = 17;
      });
      __append("\n</div>");
      __line = 18;
    }
    return __output;
  } catch (e) {
    rethrow(e, __lines, __filename, __line, escapeFn);
  }
};
