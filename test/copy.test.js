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

  it('should copy file/dir(no-exist)', function() {
    (function() {
      copy('not-exists');
    }).should.throw('aa');
  });

  it('should copy files/dirs(no-exist)', function() {
    (function() {
      copy('not-exists');
    }).should.throw('aa');
  });

  // it('should throw when copy files to file', function*() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should throw when copy files to dirsee', function*() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });
  //
  // it('should throw when copy files to file', function*() {
  //   copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  // });

  it('should file(exists) => file(exists)', function(done) {
    const destfile = path.join(fixtures, 'tmp/a.js');
    createFile(destfile, 'aaa');
    copy(path.join(fixtures, 'file/a.js'), destfile, function() {
      fs.readFileSync(destfile, 'utf8').should.eql('console.log(\'a\');\n');
      done();
    });
  });

  it('should file(exists) => file(no-exists)', function*() {
    const destfile = path.join(fixtures, 'tmp/a.js');
    yield copy(path.join(fixtures, 'file/a.js'), destfile);
    fs.readFileSync(destfile, 'console.log(\'a\');\n');
  });

  it('should file(exists) => dir(exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should file(exists) => dir(no-exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should dir(exists) => dir(exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should dir(exists) => dir(no-exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should file(exists) => dir(exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should file(exists) => dir(no-exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

  it('should files(exists) => dir(exists)', function*() {
    copy(path.join(fixtures, 'file/a.js'), path.join(fixtures, 'tmp/a.js'));
  });

});

function createFile(filepath, content) {
  mkdirp.sync(path.dirname(filepath));
  fs.writeFileSync(filepath, content);
}
