// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
function oldScrabbleScorer(word) {
  word = word.toUpperCase();
	let letterPoints = "";  
  for (let i = 0; i < word.length; i++) { 
	  for (const pointValue in oldPointStructure) {
  	 if (oldPointStructure[pointValue].includes(word[i])) {
		letterPoints += `Points for '${word[i]}': ${pointValue}\n`
    }
    }
  }
  console.log(letterPoints);
	return letterPoints;
} 

function initialPrompt() {
   console.log("Let's play some scrabble!");
   
}; 

let simpleScore = function(word){
 let sum=0;
for(let i=0; i<word.length;i++){
  if(word[i].toLowerCase().split('')){
    sum=sum+1;
  }
  }
   return sum;
  };

let vowelBonusScore = function(word){
let sum=0;
for(let i=0; i<word.length;i++){
  if(word[i].toLowerCase().split('')){
    if((word[i].includes('a')) || (word[i].includes('i')) || (word[i].includes('e')) 
    || (word[i].includes('o')) || (word[i].includes('u'))){
      sum=sum+3;
    }else {     
      sum=sum+1;    
  }
 }
}
 return sum;
};

/*let scrabbleScore = function oldScrabbleScorer(word) {
  word = word.toUpperCase();
	let letterPoints = "";  
  for (let i = 0; i < word.length; i++) { 
	  for (const pointValue in oldPointStructure) { 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			//letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      letterPoints++;
    }
   }
  }
 	return letterPoints;
};*/

let scrabbleScore = function(word){
  word = word.toLowerCase();
  let newPoints = 0;
  for(let i= 0; i < word.length; i++){
     newPoints += newPointStructure[word[i]];
  }
   return newPoints;
}

let newPointStructure = transform(oldPointStructure);

function transform(oldPointStructure) {
  let newScrable = {};
  
  for (item in oldPointStructure){
    for (let i= 0;i< oldPointStructure[item].length; i++){
      let key = oldPointStructure[item][i];
      key = key.toLowerCase();
      newScrable[`${key}`] = Number(item); 
    }
  }
    return newScrable;
  
};
const scoringAlgorithms = [
{name:"Simple Score", description:"Each letter is worth 1 point", scoringFunction:simpleScore},
{name:"Bonus Vowel", description:"Vowel are 3 pts, consonants are 1pts.", scoringFunction:vowelBonusScore},
{name:"Scrabble", description:"The New scoring algorithm", scoringFunction:scrabbleScore}
]

function scorerPrompt() {
  let word = input.question("Enter a word: ");
  console.log("0 - Simple: One point per character.");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points.");
  console.log("2 - Scrabble: Uses scrabble point system");
  let question2 = input.question("Which scoring algorithm would you like to use?Please enter 0, 1 or 2 - ");

  if(Number(question2) === 0){
  console.log("Simple Score: ", scoringAlgorithms[0].name);
  console.log(scoringAlgorithms[0].description);
  console.log("Simple Score result: ", scoringAlgorithms[0].scoringFunction(word));
  }else if(Number(question2) === 1){
  console.log("Bonus Vowel: ", scoringAlgorithms[1].name);
  console.log(scoringAlgorithms[1].description);
  console.log("Bonus Vowel result: ", scoringAlgorithms[1].scoringFunction(word));
  }else if(Number(question2)=== 2){
  console.log("Scrabble: ", scoringAlgorithms[2].name);
  console.log(scoringAlgorithms[2].description);
  console.log("Scrabble score result: ", scoringAlgorithms[2].scoringFunction(word));
  } else{console.log("Please enter correct input.");}
} 

function runProgram() {
  initialPrompt();
  scorerPrompt(); 
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

