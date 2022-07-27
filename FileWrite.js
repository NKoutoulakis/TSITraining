const fs = require("fs");
const { format } = require("path");
const prompt = require('prompt-sync')();

const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

FileManager();

function FileManager()
{
try 
{
    let Choice = parseInt(prompt("Options: 1 -> Create File / 2 -> Write in a File "));

    if (Choice < 1 || Choice > 2 || isNaN(Choice))
    {
        throw "Invalid Input. Try again. ";
    }

    switch(Choice)
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
    console.log(err);
    FileManager();
}
}

function WriteToFile()
{
    let FileName = prompt("Type the name of the file you want to access. ");
    let Input = prompt("Type what you want to add. ");

    fs.open(`${FileName}.txt`, `r+`, function(err)
    {
        if (err)
        {
            return console.error(err);
        }
    });

    let fd = fs.openSync(`${FileName}.txt`);

    fs.appendFile(`${FileName}.txt`, `\n${Input}`, 'utf8', function(err, fd)
    {
        if (err)
        {
            return console.error(err);
        }
    });

    fs.close(fd, function(err)
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
        console.log("Invalid file name. Try again. ")
        CreateFile();
    }
    else
    {
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