const fs = require("fs");
const { initBit } = require("./commands/initBit.js");
const configBit = require("./commands/configBit.js");
const { tokenBit } = require("./commands/tokenBit.js");
const { fullHelp } = require("./commands/helpText.js");
const myEmitter = require("./events.js");

// Global constants containing the default configuration
global.DEFAULT_CONFIG = {
  name: "BitBase",
  version: "1.0.0",
  description: "Command Line Interface for BitBase",
  main: "bitbase.js",
  superuser: "systemadmin",
  database: "example",
};
global.DEFAULT_USERS = [];
global.EXPIRY_TIME = { days: 3 };

const userArgs = process.argv.slice(2);
const port = 3000;

switch (userArgs[0]) {
  case "":
  case undefined:
    readMe()
    break;
  case "--help":
  case "h":
    console.log(fullHelp);
    break;
  case "init":
  case "i":
    initBit(userArgs);
    myEmitter.emit("route", "init");
    break;
  case "config":
  case "c":
    configBit(userArgs);
    myEmitter.emit("route", "config");
    break;
  case "token":
  case "t":
    tokenBit(userArgs);
    myEmitter.emit("route", "token");
    break;
  default:
    console.log("Unknown command. Please enter bitbase --help or h for help.");
    myEmitter.emit("route", "error");
    break;
}

function readMe() {
  fs.readFile("README.md", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading README.md: ", err);
      return;
    }
    console.log(data);
  });
}

module.exports = userArgs;