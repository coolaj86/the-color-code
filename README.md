# The Color Code Test

## Now Available for the Mighty Commandline!

This is a simple commandline questionaire that asks the questions from The Color Code in random order and the answers also randomized.

The is particularly useful for people like myself who have pre-conceived notions about their personality and want to take the test in a less-biased fashion
(meaning not knowing which answer directly relates to which color).

    npm install -g color-code
    color-code

Upon completion of the test, the results are shown and saved in a JSON file (the path to which is printed to the screen).

# Generic Questionnaire

The name of the test is somewhat of a misnomer. Although originally designed for taking The Color Code test with friends,
it can be used for any type of test. Simply specify the name of the questionaire you would like to take.

    color-code any-test.json

## Test Format

The format of `questionnaire.json` is rather straight-forward.

For example, let's say you wanted your own version of the Hogwarts Sorting Hat House Quiz, you would create a file like this:

    {
        "title": "Hogwarts Sorting Hat House Quiz"
      , "defaultQuestion": "Which is more true of you?"
      , "categories": [
            "Gryffindor"
          , "Hufflepuff"
          , "Ravenclaw"
          , "Slytherin"
        ]
      , "questions": [
            [
                  null
                , "values bravery, daring, nerve, and chivalry"
                , "values hard work, patience, loyalty, and fair play rather than a particular aptitude"
                , "values intelligence, knowledge, and wit"
                , "values ambition, cunning and resourcefulness"
            ]
          , [
                  "Which house do you feel in your heart you belong to?"
                , "Gryffindor"
                , "Hufflepuff"
                , "Ravenclaw"
                , "Slytherin"
            ]
        ]
    }

http://www.thealmightyguru.com/Reviews/HarryPotter/Docs/Quiz-House.html
