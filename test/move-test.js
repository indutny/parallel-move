var assert = require('assert');
var util = require('util');
var parallelMove = require('../');

describe('Parallel Move', function() {
  var pm;
  beforeEach(function() {
    pm = parallelMove.create();
  });

  it('should work on tree', function() {
    pm.add(0, 1);
    pm.add(0, 2);
    pm.add(1, 3);
    pm.add(2, 4);
    pm.add(2, 5);

    var out = pm.resolve();
    assert.equal(util.inspect(out), '[ 1=>3, 0=>1, 2=>4, 2=>5, 0=>2 ]');
  });

  it('should work on two trees', function() {
    pm.add(0, 1);
    pm.add(0, 2);
    pm.add(1, 3);
    pm.add(4, 5);
    pm.add(5, 6);

    var out = pm.resolve();
    assert.equal(util.inspect(out), '[ 1=>3, 0=>1, 0=>2, 5=>6, 4=>5 ]');
  });

  it('should work on loop', function() {
    pm.add(0, 1);
    pm.add(1, 2);
    pm.add(2, 3);
    pm.add(3, 0);

    var out = pm.resolve();
    assert.equal(util.inspect(out), '[ 3<=>0, 2<=>3, 1<=>2 ]');
  });

  it('should work on loop with branches', function() {
    pm.add(0, 1);
    pm.add(1, 2);
    pm.add(2, 3);
    pm.add(3, 0);

    pm.add(0, 10);
    pm.add(1, 11);
    pm.add(2, 12);
    pm.add(3, 13);

    var out = pm.resolve();
    assert.equal(util.inspect(out),
                 '[ 0=>10, 3<=>0, 3=>13, 2<=>3, 2=>12, 1<=>2, 1=>11 ]');
  });
});
