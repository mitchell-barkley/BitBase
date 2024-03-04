const fs = require("fs");
const path = require("path");
const { initHelp, fullHelp } = require("./helpText");

const initBit = (userArgs) => {
  // Different functionality depending on the flags issued
  switch (userArgs[1]) {
    case undefined:
      console.log(
        "The 'init' command requires an option to be specified. Try 'init --help'"
      );
      break;

    case "--help":
      console.log(initHelp);
      break;

    case "--status":
      initStatus();
      break;

    case "--all":
      createDirectories();
      createFiles();
      console.log("Directories and files initialized.");
      break;

    case "--mk":
      createDirectories();
      console.log("Directories initialized.");
      break;

    case "--cat":
      createFiles();
      console.log("Files initialized.");
      break;

    default:
      console.log(
        `'${userArgs.join()}' is not a valid command. Try 'init --help'`
      );
  }
};

// init --status
const initStatus = () => {
  let status = "";

  status += fs.existsSync(path.join(__dirname, "..", "logs"))
    ? "Directories are initialized. "
    : "Directories are NOT initialized. ";

  status +=
    fs.existsSync(path.join(__dirname, "..", "config.json")) &&
    fs.existsSync(path.join(__dirname, "..", "users.json")) &&
    fs.existsSync(path.join(__dirname, "..", "help.txt"))
      ? "Files are initialized."
      : "Files are NOT initialized.";

  console.log(status);
  return status;
};

// Function which creates required directories
const createDirectories = () => {
  if (!fs.existsSync(path.join(__dirname, "..", "logs")))
    fs.mkdirSync(path.join(__dirname, "..", "logs"));
};

// Function which creates required files
const createFiles = () => {
  if (!fs.existsSync(path.join(__dirname, "..", "config.json")))
    fs.appendFileSync(
      path.join(__dirname, "..", "config.json"),
      JSON.stringify(DEFAULT_CONFIG),
      "utf-8"
    );

  if (!fs.existsSync(path.join(__dirname, "..", "users.json")))
    fs.appendFileSync(
      path.join(__dirname, "..", "users.json"),
      JSON.stringify(DEFAULT_USERS),
      "utf-8"
    );

  if (!fs.existsSync(path.join(__dirname, "..", "help.txt")))
    fs.appendFileSync(
      path.join(__dirname, "..", "help.txt"),
      fullHelp,
      "utf-8"
    );
};

module.exports = { initBit, initStatus };