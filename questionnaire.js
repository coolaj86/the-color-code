#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var fs = require('fs')
    , questionnaire = require(process.argv[2] || './questionnaire.json')
    , questionsRaw = questionnaire.questions || questionnaire
    , title = questionnaire.title || 'The Color Code'
    , defaultQuestion = questionnaire.defaultQuestion || "Which described you best as a child?"
    , categories = questionnaire.categories || ['red', 'blue', 'white', 'yellow']
    , finishedMsg = "Now go read the book to learn more!"
    , total = questionsRaw.length
    , questions = []
    , doneQuestions = []
    , current
    , responses = {
          totals: {
          }
        , answers: {
          }
      }
    , categoriesDeck = categories.join(',').split(',')
    ;

  categories.forEach(function (cat) {
    responses.totals[cat] = 0;
  });

  function shuffle() {
    return Math.random() - 0.5;
  }

  questionsRaw.forEach(function (q, i) {
    var newQ = {}
      ;

    newQ.number = i + 1;
    newQ.question = q[0];
    categories.forEach(function (cat, i) {
      newQ[cat] = q[1 + i];
    });

    questions.push(newQ);
  });

  function presentQuestion() {
    if (true !== (questions.length >= 1)) {
      return false;
    }
    current = questions.pop();

    var curNum = String(total - questions.length) + ' of ' + total + ' (#' + current.number + ')\n'
      ;

    doneQuestions.push(current);
    if (current.question) {
      console.log(curNum, current.question);
    } else {
      console.log(curNum, defaultQuestion);
    }
    categoriesDeck.sort(shuffle);
    categoriesDeck.forEach(function (color, i) {
      console.log((i+1) + ')', current[color]);
    });
    console.log('');

    return true;
  }

  function goBack() {
    // Push the current question back on the stack
    if (true === (doneQuestions.length > 0)) {
      questions.push(doneQuestions.pop());
    }
    if (true !== (doneQuestions.length > 0)) {
      console.log("There are no questions before this one, can't go back!");
    } else {
      // Push the previous question back on the stack
      questions.push(doneQuestions.pop());
    }
    presentQuestion();
  }

  function saveResponses() {
    var filename = 'questionnaire-' + Date.now() + '.json'
      ;

    // TODO output as YAML
    fs.writeFile(filename, JSON.stringify(responses, null, '  '), function (err) {
      console.log('You finished');
      categories.forEach(function (cat) {
        console.log(cat + ':', responses.totals[cat]);
      });
      console.log(finishedMsg);
      if (err) {
        console.error("couldn't save results");
      } else {
        console.log(process.cwd() + '/' + filename);
      }
      process.stdin.pause();
    });
  }

  function interpretAnswer(chunk) {
    chunk = chunk.replace(/\s/gm, '');
    var color =  categoriesDeck[chunk - 1]
      ;

    if (color) {
      responses.answers[current.number] = color;
      responses.totals[color] += 1;
    } else if ('b' === chunk) {
      goBack();
      return;
    } else {
      console.log("Sorry, I didn't understand you. Respond again with a number such as 1, 2, 3, or 4");
      return;
    }
    console.log('');

    if (presentQuestion()) {
      return;
    }

    saveResponses();
  }

  questions.sort(shuffle);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  console.log('');
  console.log('Welcome to ' + title + ': Commandline Edition.');
  console.log('');
  console.log('Type \'b\' to go back to the previous question if you make a boo-boo.');
  console.log('');
  presentQuestion();
  process.stdin.on('data', interpretAnswer);
  
}());
