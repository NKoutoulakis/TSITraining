/*
For those of us finished with this week's project we  were asked to experiment on our own.
So this will be a draft for a text-based RPG like the old-school MMO games.
So far this is more of a dynamic character generator using JavaScript.
*/

//Importing the promp module so player can input data.
const prompt = require('prompt-sync')();

let finalAbilityScores = []; //Array for finalising each character's ability scores.
const characterList = []; //Array of all character objects.

class PlayerCharacter 
{
    constructor(characterName, strength, dexterity, intelligence, level)
    {
        //The constructor for the player character assigns their name, stats and level.
        this.characterName = characterName;

        this.strength = strength;
        this.strModifier = Math.floor((strength - 10) / 2);

        this.dexterity = dexterity;
        this.dexModifier = Math.floor((dexterity - 10) / 2);

        this.intelligence = intelligence;
        this.intModifier = Math.floor((intelligence - 10) / 2);

        this.Level = level;
        this.HP = (10 + (level * this.strModifier));
        //Will need a level up function to update level and stats.
    }

    attackRoll(modifier)
    {
        //This function is used to make d20 attack rolls, using the prompted ability score modifier 
        let diceRoll = Math.floor(Math.random() * 20) + 1;
        let attackRoll = diceRoll + modifier;

        //The dice roll and attack rolls are separated for testing purposes.
        //The design is that each weapon (sword, bow, magic staff) will reference the modifier it uses.
        console.log(`${diceRoll}`);
        console.log(`${attackRoll}`);
    }
}

CreateCharacter(); //Create character function will be moved to a menu prompt.

//Console logs for testing to make sure everything works properly.
console.log(`\nName: ${characterList[characterList.length - 1].characterName}`);
console.log(`Strength Score: ${characterList[characterList.length - 1].strength} (${characterList[characterList.length - 1].strModifier})`);
console.log(`Dexterity Score: ${characterList[characterList.length - 1].dexterity} (${characterList[characterList.length - 1].dexModifier})`);
console.log(`Intelligence Score: ${characterList[characterList.length - 1].intelligence} (${characterList[characterList.length - 1].intModifier})`);
console.log(`\nLevel: ${characterList[characterList.length - 1].Level}`);
console.log(`HP: ${characterList[characterList.length - 1].HP}`);

/*
console.log(`\nYou attack with a sword! `);
characterList[characterList.length - 1].attackRoll(characterList[characterList.length - 1].strModifier);

console.log(`\nYou shoot with your bow! `);
characterList[characterList.length - 1].attackRoll(characterList[characterList.length - 1].dexModifier);

console.log(`\nYou conjure a fire bolt! `);
characterList[characterList.length - 1].attackRoll(characterList[characterList.length - 1].intModifier);
*/

function CreateCharacter()
{
    let name = prompt("Please type your character's name: ");
    //Gets input for character's name (can be anything).

    rollAbilityScores();
    //Generates three ability scores for them.

    console.log(`\nYour rolled ability scores are: `);

    console.log(`Strength Score: ${finalAbilityScores[0]}`);
    console.log(`Dexterity Score: ${finalAbilityScores[1]}`);
    console.log(`Intelligence Score: ${finalAbilityScores[2]}`);

    console.log(`You have one reroll.`);

    let rerollChoice = prompt(`Any Input -> Continue / R -> Reroll `);
    //Ability scores are presented in case player wants to use their reroll.

    if(rerollChoice == "R")
    {
        rollAbilityScores();
        //If they reroll, a new set of ability scores are generated.
    }

    characterList.push(new PlayerCharacter(name,
        finalAbilityScores[0],
        finalAbilityScores[1],
        finalAbilityScores[2],
        1));
        //The finalised character is dynamically logged as a new object.
        //A list would be better for functionality but this is vanilla JS.
        //Each newly created character arrives at the end of the array.
        /*
        When characters get saved, a query matching the character's name
        can generate the number that will indicate the character's position
        in the array, for the character to be loaded and used.
        */
}

function rollAbilityScores()
{
    finalAbilityScores.length = 0;
    //The array for the finished ability scores is emptied in case of rerolls.

    for(let i = 0; i < 3; i++)
    {
        finalAbilityScores.push(GenerateAbilityScore());
        //The array is populated with 3 new ability scores.
    }
}

function GenerateAbilityScore()
{
    let tempAbilityScores = []; //A temporary array to hold values rolled.

    for(let i = 0; i < 4; i++)
    {
        tempAbilityScores.push((Math.floor(Math.random() * 6)) + 1);
        //The logic for generating ability scores is 4d6k3
        //As in: roll 3 six-sided dice and keep the 3 highest
    }

    tempAbilityScores.sort(function(a, b){return b - a});
    //The temporary array is sorted for the sum of the 3 highest values to be returned.
    
    return tempAbilityScores[0] + tempAbilityScores[1] + tempAbilityScores[2];
}