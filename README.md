# Parallel Move
[![Build Status](https://secure.travis-ci.org/indutny/paralle-move.png)](http://travis-ci.org/indutny/paralle-move)
[![NPM version](https://badge.fury.io/js/paralle-move.svg)](http://badge.fury.io/js/paralle-move)

[Parallel Move][0] implementation.

## Usage

```js
var pm = require('parallel-move').create();

pm.add(0, 1);
pm.add(1, 2);
pm.add(2, 3);
pm.add(3, 0);

pm.add(0, 10);
pm.add(1, 11);
pm.add(2, 12);
pm.add(3, 13);

var list = pm.resolve();
console.log(list);
// [ 0=>10, 3<=>0, 3=>13, 2<=>3, 2=>12, 1<=>2, 1=>11 ]

for (var i = 0; i < list.length; i++) {
  var item = list[i];
  if (item.kind === 'move')
    move(item.src, item.dst);
  else
    swap(item.src, item.dst);
}
```

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2015.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: http://pauillac.inria.fr/~xleroy/publi/parallel-move.pdf
