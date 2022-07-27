const prompt = require('prompt-sync')();

CarPrice();

function CarPrice()
{
    try
    {
        const price = parseInt(prompt(`What is the car's price? `));

        if (price < 0 || isNaN(price) )
        {
            throw "Incorrect input. Please try again. ";
        }
    }
    catch(err)
    {
        console.log(err);
        CarPrice();
    }
}