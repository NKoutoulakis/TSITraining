//Import all necessary modules.
const fs = require("fs");
const { format } = require("path");
const prompt = require('prompt-sync')();

//Hold special characters in a variable to be checked against potential file names.
const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

FileManager();

function FileManager()
{
try 
{
    let Choice = parseInt(prompt("Options: 1 -> Create File / 2 -> Write in a File "));

    if (Choice < 1 || Choice > 2 || isNaN(Choice))
    {
        throw "Invalid Input. Try again. "; //Customer error message if input is wrong.
    }

    switch(Choice)  //User can create or write a file based on their input.
    {
        case 1:
            CreateFile();
            break;

        case 2:
            WriteToFile();
            break;
    }
}
catch(err)
{
    console.log(err);  //Give the error message to the user based on parameters.
    FileManager();    //Recur the function so user may retry.
}
}

function WriteToFile()
{
    let FileName = prompt("Type the name of the file you want to access. ");
    let Input = prompt("Type what you want to add. ");

    fs.open(`${FileName}.txt`, `r+`, function(err)  //Open the file.
    {
        if (err)
        {
            return console.error(err);
        }
    });

    let fd = fs.openSync(`${FileName}.txt`);  //Retrieve the file descriptor for callback functions.

    fs.appendFile(`${FileName}.txt`, `\n${Input}`, 'utf8', function(err, fd)  //Add the input to the file.
    {
        if (err)
        {
            return console.error(err);
        }
    });

    fs.close(fd, function(err)  //Close the file.
    {
        if (err)
        {
            return console.error(err);
        }
    });  
}

function CreateFile()
{
    let FileName = prompt("Please give a name to your file. ");

    if (specialCharacters.test(FileName))
    {
        //Throw an error if the user includes special characters in the new file's name.
        console.log("Invalid file name. Try again. ")
        CreateFile();  //Recur the function so user may retry.
    }
    else
    {
        //If there are no issues, the file is created with the input name.
        fs.writeFile(`${FileName}.txt`, `This is a file.`, function(err, fd) 
        {
            if (err)
            {
                return console.error(err);
            }
            console.log(`${FileName} file created successfully. `);
        });
    }
}