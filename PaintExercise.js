//Gallon of Paint = 350 square feet
/*
================================================================
==Import Prompt Function Module and define necessary variables==
================================================================
*/

const prompt = require('prompt-sync')();

//Below variables can be refactored to 5 arrays (Walls/Windows/Doors/Misc/Paint)
let TotalHeight = 0;
let TotalWidth = 0;
let TotalArea = 0;
let WindowHeight = 0;
let WindowWidth = 0;
let WindowArea = 0;
let DoorHeight = 0;
let DoorWidth = 0;
let DoorArea = 0;
let AdjustmentHeight = 0;
let AdjustmentWidth = 0;
let AdjustmentArea = 0;
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

//The above factions can be refactored with statements into one function
//and to account for negative input.

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

SelectPaint();    //Allows the user to select their paint type.

console.log("Time to select your colour.");

SelectColour();        //Allows the user to select from available colours.
Pricing();          //Calculates prices depending on paint type and colour.


//==According to research, the final area is divided by 350 to calculate how many gallons of paint are required.==
console.log(`You did it. You will need in total ${Math.round(FinalArea / 350)} gallons of paint!`);
console.log(`That will cost you ${Math.round((FinalArea/350) * PaintPriceVAT)} GBP.`);
//Not including price without VAT anymore as no reliable data on it could be found.
//console.log(`Cost without VAT would be ${Math.round((FinalArea/350) * PaintPriceNOVAT)} GBP.`);
console.log(`The above price amounts to ${Math.round((FinalArea / 350) / 3)} 2.5L Tins and ${Math.round((FinalArea / 350) / 2)} 1L Tins.`);


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
        case 4:
        case 5:
            PaintPriceVAT = 65 + (2 * 31);
            break;
    }
}

function SelectColour()
{
    if(PaintType == 1)
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
        else if(ColourSelection == "BS")
        {
            PaintColour = 3;
        }

    }

    if(PaintType == 2)
    {
        console.log("You have chosen Oil-based paints.");
        console.log("O-Type Paint Colours: White Marble - WM / Dark Olive Garden - DO");
        const ColourSelection = prompt("Please enter the acronym for the colour you want. ");

        if(ColourSelection != "WM" && ColourSelection != "DO")
        {
            console.log("Please use one of the acronyms provided. ");
            SelectColour();
        }
        else if(ColourSelection == "WM")
        {
            PaintColour = 4;
        }
        else if(ColourSelection == "DO")
        {
            PaintColour = 5;
        }
    }
}

function SelectPaint()
{
    const Paint = prompt("Time to choose: L -> Latex-based paint / O -> Oil-based paint ");
    
    if(Paint != "L" && Paint != "O")
    {
        console.log("Please use one of the prompts provided. ");
        SelectPaint();
    }
    else if(Paint == "L")
    {
        PaintType = 1;
    }
    else if(Paint == "O")
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

if (Windows > 0)       //If there are windows, proceed to calculate their area.
    {
    GetWindowHeight();
    GetWindowWidth();

    WindowArea = WindowHeight * WindowWidth;
    }

if (isNaN(Windows))            //Error prevention in case of erroneous input.
{                              //If input is wrong, user has to retry.
    console.log("Please enter a number. ");
    CalculateWindows();
}
else
{  
FinalArea = TotalArea - (Windows * WindowArea); //Update FinalArea based on windows.
}
}

function GetWindowHeight()
{
    const a = parseInt(prompt("Enter your window's height (in feet): "));
    
    if (isNaN(a))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetWindowHeight();
    }
    else
    {
    WindowHeight += a;
    }
}

function GetWindowWidth()
{
    const b = parseInt(prompt("Enter your window's width (in feet): "));
    
    if (isNaN(b))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetWindowWidth();
    }
    else
    {
    WindowWidth += b;
    }
}

function CalculateDoors()
{
    const Doors = parseInt(prompt("How many doors in the room will be painted? "));

    if (Doors > 0)            //If there are doors, proceed to calculate their area.
    {
        GetDoorHeight();
        GetDoorWidth();
    
        DoorArea = DoorHeight * DoorWidth;
    }
    
    if (isNaN(Doors))          //Error prevention in case of erroneous input.
    {                          //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        CalculateDoors();
    }
    else 
    {
    FinalArea -= (Doors * DoorArea); //Update FinalArea based on doors.
    }
}

function GetDoorHeight()
{
    const a = parseInt(prompt("Enter your door's height (in feet): "));
    
    if (isNaN(a))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetDoorHeight();
    }
    else
    {
    DoorHeight += a;
    }
}

function GetDoorWidth()
{
    const b = parseInt(prompt("Enter your door's width (in feet): "));
    
    if (isNaN(b))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetDoorWidth();
    }
    else
    {
    DoorWidth += b;
    }
}

function CalculateAdjustments()
{
    const Adjustment = parseInt(prompt("How many areas like plug sockets won't need paint? "));
   
    if (Adjustment > 0)      //If there are areas like plug sockets, proceed to calculate their area.
    {
    GetAdjustmentHeight();
    GetAdjustmentWidth();

    AdjustmentArea = AdjustmentHeight * AdjustmentWidth;
    }

    if(isNaN(Adjustment))     //Error prevention in case of erroneous input.
    {                         //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        CalculateAdjustments();
    }
    else
    {
    FinalArea -= (Adjustment * AdjustmentArea); //Update FinalArea based on adjustments.
    }
}

function GetAdjustmentHeight()
{
    const a = parseInt(prompt("Enter your small area's height (in feet): "));
    
    if (isNaN(a))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetAdjustmentHeight();
    }
    else
    {
    AdjustmentHeight += a;
    }
}

function GetAdjustmentWidth()
{
    const b = parseInt(prompt("Enter your small area's width (in feet): "));
    
    if (isNaN(b))    //Error prevention in case of erroneous input.
    {                //If input is wrong, user has to retry.
        console.log("Please enter a number. ");
        GetAdjustmentWidth();
    }
    else
    {
    AdjustmentWidth += b;
    }
}
