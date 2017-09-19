/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
'use strict';

var http = require('http');
var path = require('path');
var fs = require('fs');
var url = 'http://pastebin.com/raw/zDN3VPQZ';

http.get(url, function (res) {
  var text = ''
    ;

  res.on('data', function (buf) {
    text += buf.toString('utf8');
  });
  res.on('end', function () {
    fs.writeFileSync(path.join(__dirname, 'questionnaire.json'), text, 'utf8');
  });
});

}());
