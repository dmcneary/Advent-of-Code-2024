const { readFileSync } = require("node:fs") 

const fileToString = path => readFileSync(path).toString().trim();

exports.fileToString = fileToString;