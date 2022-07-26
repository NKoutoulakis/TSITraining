const prompt = require('prompt-sync')();

// console.log('Hello TSI');

//To do: Improve Error Message logic.
//First Input
const x = prompt('Enter a number. ');
const xAnswer = parseInt(x);

//Second Input
const y = prompt('Enter another number. ');
const yAnswer = parseInt(y);

const Result = xAnswer + yAnswer;

//Add the Inupts if no NaN values are given, otherwise pass
if (isNaN(xAnswer) || isNaN(yAnswer))
{
    console.log('Error. Non-number detected. ')
}
else
{
console.log(`Your result is ${Result}.`);
}
//Third Input
const Answer = prompt('What is your favorite animal? ');

//Answer changes depending on the input.
//To do: Rework for case sensitivity(localCompare) & Error Message
if(Answer == 'Dog')
{
    console.log('You are a dog person! ');
}

else if (Answer == 'Cat')
{
    console.log('You are a cat person! ');
}
else
{
    console.log('Do you even like animals? ');
}

//Fourth Input
const Answer1 = prompt('Choose a number between 1-3.');
const pAnswer = parseInt(Answer1);

//Switch table of answers based on parsed input.
//To do: Rework for decimal ranges
switch(pAnswer)
{
    case 1:
        console.log("You have chosen '1' ");
        break;

    case 2:
        console.log("You have chosen '2' ");
        break;

    case 3:
        console.log("You have chosen '3' ")
        break;

    default:
        console.log('You selected a number outside the range! ');
}

//To do: Rework each of the exercises as functions for recursion.