//Error prevention with try-catch.

//Importing the prompt module.
const prompt = require('prompt-sync')();

CarPrice();

function CarPrice()
{
    try
    {
        const price = parseInt(prompt(`What is the car's price? `));

        if (price < 0 || isNaN(price) ) //Make a custom error message if input is invalid.
        {
            throw "Incorrect input. Please try again. ";
        }
    }
    catch(err)
    {
        console.log(err);  //Give the error message to the user based on parameters.
        CarPrice();       //Recur the function so user may retry.
    }
}