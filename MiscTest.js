//A code snippet I tested to help a colleague with
//returning a variable directly into a result.
const prompt = require('prompt-sync')();

//GetHeight();
console.log(GetHeight());

function GetHeight()
{
    $result = 0;

    try
    {
    const userInput = parseInt(prompt("Enter height: "));

    if (userInput < 0 || isNaN(userInput) )
    {
        throw "Incorrect input. Please try again. ";
    }
    else
    {
        $result += userInput;
    }
    }
    catch(err)
    {
        console.log(err);
        GetHeight();
    }
    finally
    {
        return $result;
    }
}