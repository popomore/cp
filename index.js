'use strict';

const pedding = require('pedding');
const getFiles = require('./lib/get_files');
const copyFile = require('./lib/copy_file');

module.exports = function() {
  let cb;
  const args = Array.prototype.slice.call(arguments);
  if (typeof args[args.length - 1] === 'function') {
    cb = args.pop();
  }

  const files = getFiles(args);
  const done = pedding(files.size, function() {
    console.log(21);
    cb();
  });

  for (const file of files.values()) {
    console.log(123, file);
    copyFile(file, done);
  }

  //
  // for (const filepath of args) {
  //   const src = path.resolve(filepath);
  //   const exists = yield fs.exists(src);
  //   if (!exists) {
  //     throw new Error(`${src} No such file or directory`);
  //   }
  //   const stat = yield fs.stat(src);
  //   let dest;
  //   if (stat.isDirectory()) {
  //     dest = yield fs.exists(destArg) ? destArg : path.join(destArg, path.basename(src));
  //     if (yield fs.exists(dest) && (yield fs.stat(dest)).isFile()) {
  //       throw new Error(`${dest} Not a directory`);
  //     }
  //     yield copyDir(src, dest);
  //   } else if (stat.isFile()) {
  //     if (yield fs.exists(destArg) && (yield fs.stat(destArg)).isDirectory()) {
  //       dest = path.join(destArg, path.basename(src));
  //     }
  //     yield copyFile(src, dest)
  //   }
  // }
};
