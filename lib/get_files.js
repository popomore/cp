'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(args, files) {
  if (args.length < 2) {
    throw new Error('missing arguments');
  }
  const dest = path.resolve(args.pop());
  files = files || new Map();

  for (let src of args) {
    const file = {};
    src = path.resolve(src);
    if (files.has(src)) {
      continue;
    }
    console.log(src);
    if (!fs.existsSync(src)) {
      throw new Error('No such file or directory');
    }
    const sstat = fs.statSync(src);
    if (sstat.isFile()) {
      file.src = src;
      file.dest = getDest(src, path.basename(src));
    } else if (sstat.isDirectory()) {
      const subArgs = fs.readdirSync(src).map(basename => path.join(src, basename));
      subArgs.push(path.join())


    }
    files.set(src, file);
  }
  return files;
};

function getDest(dest, filename) {
  if (!fs.existsSync(dest)) {
    return dest;
  }

  const stat = fs.statSync(dest);
  if (stat.isDirectory()) {
    return path.join(dest, filename);
  } else if (stat.isFile()) {
    return dest;
  }
}
