/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var https = require("https");
  var path = require("path");
  var fs = require("fs");
  var url = "https://pastebin.com/raw/zDN3VPQZ";

  https.get(url, function (res) {
    var text = "";
    if (res.statusCode < 200 || res.statusCode >= 300) {
      console.error("failed to https.get example questionnaire");
    }
    res.on("data", function (buf) {
      text += buf.toString("utf8");
    });
    res.on("end", function () {
      fs.writeFileSync(
        path.join(__dirname, "questionnaire.json"),
        text,
        "utf8"
      );
    });
  });
})();
