const functionOne = require('./function_one');
const functionTwo = require('./function_two');
const functionThree = require('./function_three');

// Tests helpers
const yellow = '\x1b[33m';
const green = '\x1b[32m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

const validateArray = (result, expectedResult) => {
  if (
    result.length === expectedResult.length &&
    result.every((player, index) => player === expectedResult[index])
  ) {
    console.log(green, 'Passed');
  } else {
    console.log(red, `Failed, expected ${expectedResult}, got ${result}`);
  };
};

const validateInt = (result, expectedResult) => {
  if (result === expectedResult) {
    console.log(green, 'Passed');
  } else {
    console.log(red, `Failed, expected ${expectedResult}, got ${result}`);    
  }
}

// Tests
console.log(
  yellow,
  `Running tests on functionOne: players who haven't played any games since a given date.`
);

console.log(reset, `Test1: If 'from' parameter is now, should return all players`);

let from = new Date().getTime();
let result = functionOne(from);
let expectedResult = [
  '5fe3b5912e71622b178f2cf0', 
  '5fe3b5912e71622b178f2cf1', 
  '5fe3b5912e71622b178f2cf2', 
  '5fe3b5912e71622b178f2cf3'
];

validateArray(result, expectedResult);

console.log(reset,
  `Test 2: If 'from' parameter is before the first slot, should only return players who haven't played any games`
);

from = new Date('2000-01-01').getTime();
result = functionOne(from);
expectedResult = ['5fe3b5912e71622b178f2cf3'];

validateArray(result, expectedResult);

console.log(reset,
  `Test 3: If 'from' parameter is after the first slot, should return players who haven't played any games and
  players who only played in the first slot`  
);

// Slightly greater than the first slot
from = 1603490400005;
result = functionOne(from);
expectedResult = ['5fe3b5912e71622b178f2cf1', '5fe3b5912e71622b178f2cf3'];

validateArray(result, expectedResult);

console.log(
  yellow,
  `Running tests on functionTwo: players who have given an average game review rating of below x/5 stars
  for the previous n games played.`
);

console.log(reset,
  'Test 1: If average is 5 and n is 5 should return all players who have rated at least one game'
);

let average = 5;
let nGames = 5;
result = functionTwo(average, nGames);
expectedResult = ['5fe3b5912e71622b178f2cf0', '5fe3b5912e71622b178f2cf1', '5fe3b5912e71622b178f2cf2']

validateArray(result, expectedResult);

console.log(reset, 'Test 2: If average is 1 and n is 5 should return an empty array');
average = 1;
nGames = 5;
result = functionTwo(average, nGames);
expectedResult = [];

validateArray(result, expectedResult);

console.log(reset, 'Test 3: If average is 2.5 and n is 2 should return only the player who rated 2 to his only game');
average = 2.5;
nGames = 2;
result = functionTwo(average, nGames);
expectedResult = ['5fe3b5912e71622b178f2cf1'];

validateArray(result, expectedResult);

console.log(
  yellow,
  `Running tests on functionThree: Number of un-utilized field availability slots 
  for a given field for a given date range`
);

console.log(reset, 'Test 1: If field is Sherman Oaks and date range is from way in the past to now, should return 1');
let fieldId = '5fe39702c508305f7d96e970';
let startDate = new Date('2000-01-01').getTime();
let endDate = new Date().getTime();
result = functionThree(fieldId, startDate, endDate);
expectedResult = 1;

validateInt(result, expectedResult);

console.log(reset, 'Test 2: If field is North Hollywood and date range is from way in the past to now, should return 2');
fieldId = '5fe39702c508305f7d96e971';
result = functionThree(fieldId, startDate, endDate);
expectedResult = 2;

validateInt(result, expectedResult);

console.log(reset, 'Test 3: If field is North Hollywood and startDate is just after its first slot, should return 1');
// Slightly greater than the first slot for North Hollywood
startDate = 1608757200005;
result = functionThree(fieldId, startDate, endDate);
expectedResult = 1;

validateInt(result, expectedResult);
