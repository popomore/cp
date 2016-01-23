'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(args) {
  const dest = path.resolve(args.pop());
  const files = new Map();

  for (let src of args) {
    const file = {};
    src = path.resolve(src);
    if (files.has(src)) {
      continue;
    }
    if (!fs.existsSync(src)) {
      throw new Error('No such file or directory');
    }
    const stat = fs.statSync(src);
    if (stat.isFile()) {
      file.src = src;
      if (!fs.existsSync(dest)) {
        file.dest = dest;
      } else {
        file.dest = dest;
      }
    }
    files.set(src, file);
  }
  return files;
};
