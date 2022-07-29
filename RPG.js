/*
For those of us finished with this week's project we  were asked to experiment on our own.
So this will be a draft for a text-based RPG like the old-school MMO games.
So far this is more of a dynamic character generator using JavaScript.
*/

//Importing the promp module so player can input data.
const prompt = require('prompt-sync')();

let GameStart = false;
let finalAbilityScores = []; //Array for finalising each character's ability scores.
const characterList = []; //Array of all character objects.
const enemyList = [`Human`, `Goblin`, `Skeleton`]; //Array of enemy appearances.

class PlayerCharacter 
{
    constructor(characterName, strength, dexterity, intelligence, level, weapon)
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
        this.HP = (10 + (level * this.strModifier)); //HP = Hit Points - The player's endurance.
        this.AC = (10 + (level * this.dexModifier)); //AC = Armor Class - The player's defense.
        this.Will = (10 + (level * this.intModifier)); //Will = WIllpower - The player's magic defense.

        switch(weapon)  //Presents the player's starting weapon.
        {
            case 1:
                this.weapon = "Longsword";
                this.weaponType = 1;
                break;
            case 2:
                this.weapon = "Bow";
                this.weaponType = 2;
                break;
            case 3:
                this.weapon = "Magic Missile Wand";
                this.weaponType = 3;
                break;
            default:
                this.weapon = "Legendary Glitch Staff of Power";
        }
        //Will need a level up function to update level and stats.
    }

    attackRoll(modifier)
    {
        //This function is used to make d20 attack rolls, using the prompted ability score modifier 
        let diceRoll = Math.floor(Math.random() * 20) + 1;
        let attackRoll = diceRoll + modifier;

        //The design is that each weapon (sword, bow, magic implement) will reference the modifier it uses.
        //console.log(diceRoll);
        //console.log(attackRoll);

        return attackRoll;
    }
}

Gameplay();

function Gameplay()
{
    if (!GameStart)
    {
    console.log("Welcome to the game! \n1 -> Create Character \n2 -> View Character \n3 -> Test Fight! \n4 -> Save Progress ");
    GameStart = true;
    }
    else
    {
        console.log("\nYou can choose another main menu prompt. ");
    }
    const playerChoice = parseInt(prompt(""));
    
    switch(playerChoice)
    {
        case 1:
            CreateCharacter();
            Gameplay();
            break;
        case 2:
            ViewCharacter();
            Gameplay();
            break;
        case 3:
            TestFight();
            Gameplay();
            break;
        case 4:
            console.log("Come back later for this. ");
            Gameplay();
            break;
        default:
            console.log("Please use one of the prompts provided. ");
            Gameplay();
    }

}

function TestFight()
{
    if(characterList.length != 0)
    {
    let FeintFlag = false; //Set flags to control the flow of the fight.
    let BattleFlag = true;

    //Retrieve variables from the current active player object.
    let PlayerHealth = UpdateCharacter().HP;

    //Generate enemy stats, can be randomised.
    let currentEnemy = enemyList[Math.floor(Math.random() * 3)];
    let currentEnemyType = Math.floor(Math.random() * 3);
    //let currentEnemyAC = UpdateCharacter().Level + 7;    //Enemies with different defenses are
    //let currentEnemyWill = UpdateCharacter().Level + 7; //beyond the scope of this draft.
    let currentEnemyHP = UpdateCharacter().Level * 15;

    console.log(`\nYou are fighting a ${currentEnemy} Marauder! `);

    do    //The fight loop repeats until the player or the enemy lose.
    {
        console.log(`\nEnemy HP: ${currentEnemyHP}`);
        console.log("\nWhat do you do? ");
        console.log("1-> Attack with weapon");
        console.log("2-> Feint (-5 to enemy's next attack and defense until you attack (doesn't stack))");
        console.log("3-> Run away");

        $currentRoll = 0;
        $currentDamage = 0;

        let fightChoice = parseInt(prompt(""));

        switch(fightChoice)
        {
            case 1:
                console.log(`You attack with your ${UpdateCharacter().weapon}! `);

                console.log(`\nAttack Roll: `);
                $currentRoll += UpdateCharacter().attackRoll(weaponTable());
                console.log($currentRoll);
                //Using pre-existing functions, we use the player's stats for attacks.
                //Feint functionality is applied to the defense comparisons.

                if ($currentRoll >= 8 || ($currentRoll >= 3 && FeintFlag))
                {
                    console.log(`\nIt's a hit! Damage roll: `)
                    $currentDamage += damageTable();
                    console.log($currentDamage);
                    currentEnemyHP -= $currentDamage;

                    FeintFlag = false;

                    if(currentEnemyHP <= 0)
                    {
                        console.log(`The ${currentEnemy} Marauder falls to the ground defeated. `);
                        BattleFlag = false;
                        //Battle is over when the enemy is defeated.
                    }
                }
                else
                {
                    console.log(`\nThe ${currentEnemy} Marauder dodges the attack...`)
                }
                break;
            case 2:
                console.log("You wait for your enemy to overextend...")
                FeintFlag = true;
                //Feint logic is activated.
                break;
            case 3:
                console.log("There is nowhere to run...");
                break;
            default:
                console.log("You are paralysed by fear! ");
        }

        $currentRoll = 0;
        $currentDamage = 0;

        $currentRoll = enemyAttackRoll();
        $currentDamage = enemyDamageRoll();

        //Values are reset and re-calculated for the enemy's turn.
        //If the enemy is alive, they take their turn.

        if (BattleFlag)
        {
        switch(currentEnemyType)
        {
            case 0:
                console.log(`The ${currentEnemy} Marauder lunges forward with a rusty cleaver! `);
                console.log(`\nAttack Roll: `);
                console.log($currentRoll);

                //Player defenses are compared with the enemy's rolls.
                if ($currentRoll <= UpdateCharacter().AC || (($currentRoll - 5) <= UpdateCharacter().AC && FeintFlag))
                {
                    console.log(`\nYou evade the attack! `);
                }
                else
                {
                    console.log(`\nYou are hit! Damage Roll: `);
                    console.log($currentDamage);

                    PlayerHealth -= $currentDamage;
                    //Player is hurt with the enemy's rolled damage if the enemy lands a hit.
                    
                    if(PlayerHealth <= 0)
                    {
                        console.log("You fall to the ground, defeated...");
                        BattleFlag = false;
                        //Battle is over when the player is defeated.
                    }
                    else
                    {
                    console.log(`\nYou have ${PlayerHealth} HP remaining.`)
                    }
                }
                break;
            case 1:
                console.log(`The ${currentEnemy} Marauder flings a throwing axe at you! `);
                console.log(`\nAttack Roll: `);
                console.log($currentRoll);

                //Player defenses are compared with the enemy's rolls.
                if ($currentRoll <= UpdateCharacter().AC || (($currentRoll - 5) <= UpdateCharacter().AC && FeintFlag))
                {
                    console.log(`\nYou duck underneath the axe! `);
                }
                else
                {
                    console.log(`\nYou are hit! Damage Roll: `);
                    console.log($currentDamage);

                    PlayerHealth -= $currentDamage;
                    //Player is hurt with the enemy's rolled damage if the enemy lands a hit.

                    if(PlayerHealth <= 0)
                    {
                        console.log("You fall to the ground, defeated...");
                        BattleFlag = false;
                        //Battle is over when the player is defeated.
                    }
                    else
                    {
                    console.log(`\nYou have ${PlayerHealth} HP remaining.`)
                    }
                }
                break;
            case 2:
                console.log(`The ${currentEnemy} Marauder conjures a ball of acid above you! `);
                console.log(`\nAttack Roll: `);
                console.log($currentRoll);

                //Player defenses are compared with the enemy's rolls.
                if ($currentRoll <= UpdateCharacter().Will || (($currentRoll - 5) <= UpdateCharacter().Will && FeintFlag))
                {
                    console.log(`\nThe spell fizzles under your superior Willpower! `);
                }
                else
                {
                    console.log(`\nYou are hit! Damage Roll: `);
                    console.log($currentDamage);

                    PlayerHealth -= $currentDamage;
                    //Player is hurt with the enemy's rolled damage if the enemy lands a hit.

                    if(PlayerHealth <= 0)
                    {
                        console.log("You fall to the ground, defeated...");
                        BattleFlag = false;
                        //Battle is over when the player is defeated.
                    }
                    else
                    {
                    console.log(`\nYou have ${PlayerHealth} HP remaining.`)
                    }
                }
                break;
            }
        }
    }
    while(BattleFlag)
    }
    else
    {
        console.log("You need to create a character first! ");
    }
}

function enemyAttackRoll()
{
    return Math.floor(Math.random() * 20) + UpdateCharacter().Level;
    //Enemy roll gives value equal to 1d20 + the player's level (scaling difficulty).
}

function enemyDamageRoll()
{
    return Math.floor(Math.random() * 6) + UpdateCharacter().Level;
    //Enemy roll gives value equal to 1d6 + the player's level (scaling difficulty).
}

function UpdateCharacter()
{
    //Function to retrieve the active character and their weapon.
    //Currently it retrieves the most recently created character.
    return characterList[characterList.length - 1];
}

function weaponTable()
{
    let modifier = 0;

    switch(UpdateCharacter().weaponType)
    {
        //Calculate modifier based on character's weapon.
        case 1:
            modifier += UpdateCharacter().strModifier;
            break;
        case 2:
            modifier += UpdateCharacter().dexModifier;
            break;
        case 3:
            modifier += UpdateCharacter().intModifier;
            break;
        default:
            modifier += Math.floor(Math.random() * 20) + 1;
    }

    return modifier;
}

function damageTable()
{
    let damage = 0;
    //Calculate damage based on character's weapon.
    switch(UpdateCharacter().weaponType)
    {
        case 1:
        case 2:
            damage += (Math.floor(Math.random() * 8) + 1) + weaponTable();
            break;
        case 3:
            damage += (Math.floor(Math.random() * 4) + 2) + weaponTable();
            break;
        default:
            damage += Math.floor(Math.random() * 20) + 1;
    }

    return damage;
}

function ViewCharacter()
{
    if(characterList.length != 0)
    {
        //Console logs for testing to make sure everything works properly.
        console.log(`\nName: ${UpdateCharacter().characterName}`);
        console.log(`Strength Score: ${UpdateCharacter().strength} (${UpdateCharacter().strModifier})`);
        console.log(`Dexterity Score: ${UpdateCharacter().dexterity} (${UpdateCharacter().dexModifier})`);
        console.log(`Intelligence Score: ${UpdateCharacter().intelligence} (${UpdateCharacter().intModifier})`);
        console.log(`\nLevel: ${UpdateCharacter().Level}`);
        console.log(`HP: ${UpdateCharacter().HP}`);
        console.log(`AC: ${UpdateCharacter().AC}`);
        console.log(`Willpower: ${UpdateCharacter().Will}`);

        console.log(`\nYour starting gear: ${UpdateCharacter().weapon} `);
        /*
        console.log(`\nTest Attack Roll: `);
        console.log(UpdateCharacter().attackRoll(weaponTable()));
        console.log(`\nTest Damage Roll: `);
        console.log(damageTable());
        */
    }
    else
    {
        console.log("You need to create a character first! ");
    }
}

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

    console.log(`\nFinal ability scores: `);

    console.log(`Strength Score: ${finalAbilityScores[0]}`);
    console.log(`Dexterity Score: ${finalAbilityScores[1]}`);
    console.log(`Intelligence Score: ${finalAbilityScores[2]}`);
    }

    console.log(`\nChoose your starting weapon: `);

    console.log(`1 -> Longsword: Strength-based / Damage: 1d8 `);
    console.log(`2 -> Bow: Dexterity-based / Damage: 1d8 `);
    console.log(`3 -> Magic Missile Wand: Intelligence-based / Damage: 1d4+1 `);

    let weaponChoice = parseInt(prompt(""));

    characterList.push(new PlayerCharacter(name,
        finalAbilityScores[0],
        finalAbilityScores[1],
        finalAbilityScores[2],
        1,
        weaponChoice));
        //The finalised character is dynamically logged as a new object.
        //A list would be better for functionality but this is vanilla JS.
        //Each newly created character arrives at the end of the array.
        /*
        When characters get saved, a query matching the character's name
        can generate the number that will indicate the character's position
        in the array, for the character to be loaded and used.
        */
    console.log(`\n${name} successfully created! `);
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