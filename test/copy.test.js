'use strict';

require('should');
const path = require('path');
const fs = require('fs');
const mm = require('mm');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const copy = require('../index');

const fixtures = path.join(__dirname, 'fixtures');
const tmp = path.join(fixtures, 'tmp');

describe('test/copy.test.js', function() {

  afterEach(mm.restore);
  afterEach(done => rimraf(tmp, done));

  it('should throw when missing arguments', function(done) {
    copy('not-exists').catch(err => {
      err.message.should.eql('missing arguments');
      done();
    });
  });

  it('should throw when copy file/dir(no-exist)', function(done) {
    const dest = path.join(fixtures, 'tmp/no-exist.js');
    const src = path.join(fixtures, 'file/no-exist.js');
    copy(src, dest).catch(err => {
      err.message.should.eql('No such file or directory');
      done();
    });
  });

  it('should throw when copy files/dirs(no-exist)', function(done) {
    const dest = path.join(fixtures, 'tmp/no-exist.js');
    const src1 = path.join(fixtures, 'file/a.js');
    const src2 = path.join(fixtures, 'file/no-exist.js');
    copy(src1, src2, dest).catch(err => {
      err.message.should.eql('No such file or directory');
      done();
    });
  });

  it.skip('should throw when copy files to file', function(done) {
    const dest = path.join(fixtures, 'tmp/a.js');
    const src1 = path.join(fixtures, 'files/a.js');
    const src2 = path.join(fixtures, 'files/b.js');
    createFile(dest, 'aaa');
    copy(src1, src2, dest).catch(err => {
      err.message.should.eql('Can\'t copy files to file');
      done();
    });
  });

  // it('should throw when copy files to dir', function*() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });

  it('should file(exists) => file(exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a.js');
    const src = path.join(fixtures, 'file/a.js');
    createFile(dest, 'aaa');
    copy(src, dest, function() {
      fs.readFileSync(dest, 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it('should file(exists) => file(no-exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a.js');
    const src = path.join(fixtures, 'file/a.js');
    copy(src, dest, function() {
      fs.readFileSync(dest, 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it('should file(exists) => dir(exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a');
    const src = path.join(fixtures, 'file/a.js');
    mkdirp.sync(dest);
    copy(src, dest, function() {
      fs.readFileSync(path.join(dest, 'a.js'), 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it('should file(exists) => dir(no-exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a');
    const src = path.join(fixtures, 'file/a.js');
    copy(src, dest, function() {
      fs.readFileSync(dest, 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it.only('should dir(exists) => dir(exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a');
    const src = path.join(fixtures, 'dir/a');
    mkdirp.sync(dest);
    copy(src, dest, function() {
      fs.readFileSync(path.join(dest, 'a.js'), 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it('should dir(exists) => dir(no-exists)', function(done) {
    const dest = path.join(fixtures, 'tmp/a');
    const src = path.join(fixtures, 'dir/a');
    copy(src, dest, function() {
      fs.readFileSync(path.join(dest, 'a.js'), 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  //
  // it('should dir(exists) => dir(exists)', function() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should dir(exists) => dir(no-exists)', function() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should file(exists) => dir(exists)', function() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should file(exists) => dir(no-exists)', function() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should files(exists) => dir(exists)', function() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });

});

function createFile(filepath, content) {
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, content);
}
