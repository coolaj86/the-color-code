/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var stdin = process.stdin
    , red = 0
    , blue = 0
    , white = 0
    , yellow = 0
    ;

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  stdin.on('data', function (chunks) {
    chunks = chunks.replace(/[\s\n\r]/gm, '').split('');
    chunks.forEach(function (chunk) {
      if ('a' === chunk) {
        red += 1;
      }
      if ('b' === chunk) {
        blue += 1;
      }
      if ('c' === chunk) {
        white += 1;
      }
      if ('d' === chunk) {
        yellow += 1;
      }
      console.log(chunk);
      if ('e' === chunk) {
        console.log('red', red);
        console.log('blue', blue);
        console.log('white', white);
        console.log('yellow', yellow);
        process.exit();
      }
    });
  });

}());
