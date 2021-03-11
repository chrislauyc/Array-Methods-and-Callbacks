import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
let final = fifaData.filter(match => {
    return match['Year'] === 2014 && match['Stage'] === "Final";
})[0];
console.log(final['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log(final['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log(final['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log(final['Away Team Goals']);
//(e) Winner of 2014 world cup final */
let winner;
if(final['Home Team Goals'] > final['Away Team Goals']){
    winner = final['Home Team Name'];
}
else{
    winner = final['Away Team Name'];
}
console.log(winner);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   return data.filter(match => {
       return match.Stage === 'Final';
   });
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data,getFinals) {
    let finals = getFinals(data);
    return finals.map(match => match['Year']);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 


function getWinners(data,getFinals) {
    let finals = getFinals(data);
    let ret = [];
    finals.forEach(function (match){
        if(match['Home Team Goals'] > match['Away Team Goals']){
            this.push(match['Home Team Name']);
        }
        else{
            this.push(match['Away Team Name']);
        }
    },ret);
    return ret;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYears, getWinners) {
    let years = getYears(data);
    let winners = getWinners(data);
    let ret = [];
    years.forEach(function(year,i){
        this.ret.push(`In ${year}, ${this.winners[i]} won the world cup!`);
    },{ret,winners});
    return ret;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
    let home = data.reduce((total,match) => total + match['Home Team Goals'],0);
    let away = data.reduce((total,match) => total + match['Away Team Goals'],0);
    return ((home+away)/data.length).toFixed(2);
}




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data,initials) {
    return data.reduce((total,match) => {
        if(match.Stage === 'Final'){
            if(match['Home Team Initials'] === initials){
                return total + match['Home Team Goals'];
            }
            else if(match['Away Team Initials'] === initials){
                return total + match['Away Team Goals'];
            }
        }
        return total;
    },0);
}

// console.log(getCountryWins(fifaData,'URU'));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    function updateTeam(teams,name,goals){
        let team;
        if(teams.has(name)){
            team = teams.get(name);
            team = {
                goals:team.goals+goals,
                appearances:team.appearances+1,
            };
        }
        else{
            team = {
                goals:goals,
                appearances:1,
            };
        }
        teams.set(name,team);
        return teams;
    }
    let teams = new Map();
    data.filter(match => match['Stage'] === 'Final').forEach(function(match){
        updateTeam(this,match['Home Team Name'],match['Home Team Goals']);
        updateTeam(this,match['Away Team Name'],match['Away Team Goals'])
    },teams)
    let best = {best:null};
    teams.forEach(function(team,name){
        if(this.best !== null){
            if(team.goals/team.appearances > this.best.goals/this.best.appearances){
                this.best = team;
                this.best.name = name;
            }
        }
        else{
            this.best = team;
            this.best.name = name;
        }
    },best);
    return best.best.name;
}
// console.log('@@@@@@@@@@@@@@@@@@@@');
// console.log(getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
