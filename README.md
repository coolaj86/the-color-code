The Color Code Test
===

Now Available for the Mighty Commandline!
---

This is a simple commandline questionaire that asks the questions from The Color Code in random order and the answers also randomized.

The is particularly useful for people like myself who have pre-conceived notions about their personality and want to take the test in a less-biased fashion
(meaning not knowing which answer directly relates to which color).

    npm install -g color-code
    color-code

Upon completion of the test, the results are shown and saved in a JSON file (the path to which is printed to the screen).

Generic Questionnaire
===

The name of the test is somewhat of a misnomer. Although originally designed for taking The Color Code test with friends,
it can be used for any type of test. Simply specify the name of the questionaire you would like to take.

    color-code any-test.json

Test Format
---

`questionaire.json` must follow the example file:

    {
        "categories": ["a", "b", "c", "d"]
      , "questions": [
            [
                  "Which is LEAST true of you?"
                , "I'm pretty"
                , "I'm smart"
                , "I'm eat leaves"
                , "I'm like pudding"
            ]
        ]
      , "defaultQuestion": "Which is more true of you?"
      , "title": "The XYZ Test"
    }
