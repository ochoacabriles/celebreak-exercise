This repo contents the solution to Celebreak Backend Tech Exercise.

PART 1: no_sql_schema.json contains the data schema proposed, prioritizing efficiency for the 
requested queries.

PART 2: The files function_one.js, function_two.js and function_three.js contain the solution for 
each requirement. For the sake of simplicity, the solution has been developed in Vanilla 
Javascript, wihtout the need of any external packages.

When it was possible, the solution tried to simulate the behavior of MongoDB (including its 
Aggregation Framework), as it looks like a suitable engine to get required results.

A self-explanatory, Vanilla Javascript based tests file was included and could be executed with 
`node tests.js`.

PART 3: relational_schema.json contains the redundant schema with relations which are considered
to be most important to improve efficiency of queries which would be required by an app like this
(players by game, reviews by user, etc.).
