'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function(file, cb) {
  mkdirp.sync(path.dirname(file.dest));
  fs.createReadStream(file.src)
  .pipe(fs.createWriteStream(file.dest))
  .once('error', cb)
  .once('finish', cb);
};
