#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var fs = require('fs')
    , questionsRaw = require('./color-code.json')
    , total = questionsRaw.length
    , questions = []
    , colors = ['red', 'blue', 'white', 'yellow']
    , current
    , responses = {
          totals: {
              red: 0
            , blue: 0
            , white: 0
            , yellow: 0
          }
        , answers: {
          }
      }
    ;

  function shuffle() {
    return Math.random() - 0.5;
  }

  questionsRaw.forEach(function (q, i) {
    questions.push({
        number: i
      , question: q[0]
      , red: q[1]
      , blue: q[2]
      , white: q[3]
      , yellow: q[4]
    });
  });

  function presentQuestion() {
    var curNum = '#' + ((total - questions.length) + 1) + 'of ' + total + '\n'
      ;

    current = questions.pop();
    if (current.question) {
      console.log(curNum, current.question);
    } else {
      console.log(curNum, "Which described you best as a child?");
    }
    colors.sort(shuffle);
    colors.forEach(function (color, i) {
      console.log((i+1) + ')', current[color]);
    });
    console.log('');

    if (questions.length) {
      return true;
    }
  }

  function saveResponses() {
    var filename = 'color-code-test-' + Date.now() + '.json'
      ;

    // TODO output as YAML
    fs.writeFile('color-code-test-' + Date.now() + '.json', JSON.stringify(responses, null, '  '), function (err) {
      console.log('You finished');
      console.log('red:', responses.totals.red);
      console.log('blue:', responses.totals.blue);
      console.log('white:', responses.totals.white);
      console.log('yellow:', responses.totals.yellow);
      console.log("Now go read the book to learn more!");
      if (err) {
        console.error("couldn't save results");
      } else {
        console.log(process.cwd() + '/' + filename);
      }
      process.stdin.pause();
    });
  }

  questions.sort(shuffle);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  presentQuestion();
  process.stdin.on('data', function (chunk) {
    chunk = chunk.replace(/\s/gm, '');
    var color =  colors[chunk - 1]
      ;

    if (color) {
      responses.answers[current.number] = color;
      responses.totals[color] += 1;
    } else {
      console.log("Sorry, I didn't understand you. Respond again with 1, 2, 3, or 4");
      return;
    }
    console.log('');

    if (presentQuestion()) {
      return;
    }

    saveResponses();
  });
  
}());
