'use strict';

var binarySearch = require('binary-search');

function Pending(src, dst) {
  this.status = 0;
  this.src = src;
  this.dst = dst;
}

Pending.sort = function sort(a, b) {
  return a.src - b.src;
};

Pending.needleSort = function needleSort(a, b) {
  return a.src - b;
};

Pending.prototype.inspect = function inspect() {
  return this.src + '?>' + this.dst;
};

function Move(src, dst) {
  this.kind = 'move';
  this.src = src;
  this.dst = dst;
}

Move.prototype.inspect = function inspect() {
  return this.src + '=>' + this.dst;
};

function Swap(src, dst) {
  this.kind = 'swap';
  this.src = src;
  this.dst = dst;
}

Swap.prototype.inspect = function inspect() {
  return this.src + '<=>' + this.dst;
};

function ParallelMove() {
  this.pending = [];
  this.resolved = [];
}
module.exports = ParallelMove;

ParallelMove.Move = Move;
ParallelMove.Swap = Swap;

ParallelMove.create = function create() {
  return new ParallelMove();
};

ParallelMove.prototype.add = function add(src, dst) {
  this.pending.push(new Pending(src * 2, dst * 2));
};

ParallelMove.prototype.resolve = function resolve() {
  this.pending.sort(Pending.sort);

  for (var i = 0; i < this.pending.length; i++)
    if (this.pending[i].status === 0)
      this.moveOne(this.pending[i]);

  return this.resolved;
};

ParallelMove.prototype.moveOne = function moveOne(item) {
  if (item.src === item.dst)
    return false;

  item.status = 1;

  var index = binarySearch(this.pending,
                           item.dst - 1,
                           Pending.needleSort);
  if (index < 0)
    index = -1 - index;

  var loop = false;
  for (; index < this.pending.length; index++) {
    var next = this.pending[index];
    if (next.src !== item.dst)
      break;

    if (next.status === 0) {
      if (this.moveOne(next))
        loop = true;
    } else if (next.status === 1) {
      next.status = 3;
      loop = true;
    }
  }

  // Loop start
  if (item.status === 3)
    return false;

  var src = item.src / 2;
  var dst = item.dst / 2;
  if (loop)
    this.resolved.push(new Swap(src, dst));
  else
    this.resolved.push(new Move(src, dst));
  item.status = 2;

  return loop;
};
