/**
 * EJS Compiler
 *
 * Compile all views/*.ejs files into a single /public/js/views.js file
 */

const fs = require("fs-extra");
const ejs = require("ejs");
const glob = require("glob-fs")({ gitignore: true });
const json_file = require("./settings.json");

// console.log(json_file.dirs);

let x = [];

json_file.dirs.forEach((dir) => {
  x = x.concat(
    fs.readdirSync(dir).map((e) => {
      return dir + e;
    })
  );
});
x = x.concat(json_file.files);

function compile(view) {
  let v = view.replace(/\//g, "_").replace(/\.ejs$/, "");

  console.log(v);

  let template = new String(fs.readFileSync(view));
  let f = ejs.compile(template, { client: true });

  let f_str = f.toString();

  f_str = f_str
    .replace("function anonymous(", "ejs." + v + " = function(")
    .replace(
      "function(locals, escapeFn, include, rethrow",
      "function(locals, escapeFn, include = ejs.views_include(locals), rethrow"
    );

  return f_str;
}

let compiled = x.map(compile).join("\n\n");

let output = `//EJS Compiled Views - This file was automatically generated on ${new Date()}
ejs.views_include = function(locals) {
    return function(path, d) {
        return ejs["views_"+path.replace(/\\\//g,"_")]({...d,...locals}, null, ejs.views_include(locals));
    }
};
${compiled}`;

fs.writeFile(json_file.output_dir+"views.js", output);
