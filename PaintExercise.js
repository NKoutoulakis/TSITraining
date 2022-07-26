//Gallon of Paint = 350 square feet
//Average door = 20 square feet
//Average window = 15 square feet

//Wall area = Height by Width
//Ceiling/Floor panel are basically 2 more walls

/*
================================================================
==Import Prompt Function Module and define necessary variables==
================================================================
*/

const prompt = require('prompt-sync')();
let TotalHeight = 0;
let TotalWidth = 0;
let TotalArea = 0;
let FinalArea = 0;
let PaintPriceVAT = 0;
let PaintPriceNOVAT = 0;
let PaintType = 0;
let PaintColour = 0;

/*
================================================================
=CalculateWall -> Function responsible for total area of all walls.
=CalculateWindows -> Function responsible for detracting total window area.
=CalculateDoors -> Function responsible for accounting doors in painted area.
=CalculateAdjustments -> Function responsible for final adjustments (e.g. sockets).
================================================================
*/

console.log("Welcome to the amazing Amazon* paint calculator!");
console.log("*Not really...")

CalculateWall();
CalculateWindows();
CalculateDoors();
CalculateAdjustments();

/*
======================================================================
==============Intro to the paint selection process====================
======================================================================
*/

console.log("Now it's time to choose your paint type!");

console.log("Latex-based paints are the more economic option (depending on colour).");
console.log("They can hold up for a long period of time and perform well in bedrooms, living rooms and hallways!");

console.log("Oil-based paints are more expensive and sometimes prone to chipping but ideal for kitchens and bathrooms.");
console.log("They hold excellently against water damage and moisture and can be a solid investment.")

SelectPaint();

console.log("Time to select your colour.");

SelectColour();
Pricing();


//==According to research, the final area is divided by 350 to calculate how many gallons of paint are required.==
console.log(`You did it. You will need in total ${Math.round(FinalArea / 350)} gallons of paint!`);


//1 gallon = 4.5 litres, and paint cans come in tins of 1, 2.5 and 5 litres
//For efficient pricing, we will use the cost of one 2.5 litre tin and two 1 litre tins
function Pricing()
{
    //Calculates prices per gallon based on paint type and colour.
    switch(PaintColour)
    {
        case 1:
            PaintPriceVAT = Math.round(34.15 + (2 * 17.88));
            PaintPriceNOVAT = Math.round(28.46 + (2 * 14.90));
            break;
        case 2:
        case 3:
            PaintPriceVAT = Math.round(58.25 + (2 * 29.12));
            PaintPriceNOVAT = Math.round(48.54 + (2 * 24.27));
            break;
    }
}

function SelectColour()
{
    if(PaintType = 1)
    {
        console.log("You have chosen Latex-based paints.");
        console.log("L-Type Paint Colours: White - W / Pepper Red - PR / Banana Split - BS");
        const ColourSelection = prompt("Please enter the acronym for the colour you want. ");

        if(ColourSelection != "W" && ColourSelection != "PR" && ColourSelection != "BS")
        {
            console.log("Please use one of the acronyms provided. ");
            SelectColour();
        }
        else if(ColourSelection == "W")
        {
            PaintColour = 1;
        }
        else if(ColourSelection == "PR")
        {
            PaintColour = 2;
        }
        else
        {
            PaintColour = 3;
        }

    }
}

function SelectPaint()
{
    const Paint = prompt("Time to choose: L -> Latex-based paint / O -> Olive-based paint ");
    
    if(Paint != "L" && Paint != "O")
    {
        console.log("Please use one of the prompts provided. ");
        SelectPaint();
    }
    else if(Paint == "L")
    {
        PaintType = 1;
    }
    else 
    {
        PaintType = 2;
    }
}

function CalculateWall()
{
    AddWallHeight();   //Calling recursive functions for each wall's
    AddWallWidth();    //height and width.

    //User input for adding more walls/floors/ceiling panels.
    const MoreInfo = prompt("Any Input -> Add more walls / Continue -> No more walls. ");

    if (MoreInfo == 'Continue')
    {
        TotalArea = TotalHeight * TotalWidth;
    }
    else
    {
        CalculateWall();   //Function recurs until total area is calculated.
    }
}

function AddWallHeight()
{
    const x = parseInt(prompt("Enter your wall's height (in feet): "));
    
    if (isNaN(x))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        AddWallHeight();
    }
    else
    {
    TotalHeight += x;
    }
}

function AddWallWidth()
{
    const y = parseInt(prompt("Enter your wall's width (in feet): "));

    if (isNaN(y))           //Error prevention in case of erroneous input.
    {                       //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        AddWallWidth();
    }
    else 
    {
    TotalWidth += y;
    }
}

function CalculateWindows()
{
const Windows = parseInt(prompt("How many windows are in the painted room? "));

if (isNaN(Windows))            //Error prevention in case of erroneous input.
{                              //If input is wrong, user has to retry.
    console.log("Please enter a number. ")
    CalculateWindows();
}
else
{
    //According to research, average window is 15 square feet.    
FinalArea = TotalArea - (Windows * 15);
}
}

function CalculateDoors()
{
    const Doors = parseInt(prompt("How many doors in the room will be painted? "));
    
    if (isNaN(Doors))          //Error prevention in case of erroneous input.
    {                          //If input is wrong, user has to retry.
        console.log("Please enter a number. ")
        CalculateDoors();
    }
    else 
    {
        //According to research, average door is 20 square feet.
    FinalArea -= (Doors * 20);
    }
}

function CalculateAdjustments()
{
    const Adjustment = parseInt(prompt("Please list the total area (in square feet) of sockets and other areas you won't paint. "));
    
    if(isNaN(Adjustment))     //Error prevention in case of erroneous input.
    {                         //If input is wrong, user has to retry.
        console.log("Please enter a number.")
        CalculateAdjustments();
    }
    else
    {
    FinalArea -= Adjustment;
    }
}
