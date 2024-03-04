Semester 3 - Sprint 1
Group 10: Mitchell Barkley, Natalina Chiarot, Steven Squires, Lauren Wilson

This repository consists of a command line program which can generate user tokens. The user tokens are stored in users.json. Additionally, there is a server for a web portal which can be used to generate and look up the tokens. Finally, there is a directory containing our SQL queries and postgres database backup for the Database portion of the assignment.
Usage
The main CLI commands can be executed using node ./bitbase.js. Before the other commands or web server are used, node ./bitbase.js init --all should be run. To make use of the web portal, use node ./server.js, and then visit http://localhost:3000 in your web browser.