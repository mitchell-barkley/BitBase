const fs = require("fs");
const path = require("path");
const { configHelp } = require("./helpText");

const config = (userArgs) => {
  // Different functionality depending on the flags issued
  switch (userArgs[1]) {
    case undefined:
      console.log(
        "The 'config' command requires an option to be specified. Try 'config --help'"
      );
      break;

    case "--help":
      console.log(configHelp);
      break;

    case "--status":
      configStatus();
      break;

    case "--show":
      configShow();
      break;

    case "--reset":
      configReset();
      break;

    case "--set":
      // Checking to make sure <option> and <value> are specified.
      if (userArgs[2] == undefined || userArgs[3] == undefined)
        console.log(
          "An additional option must be specified. Use 'bitbase token --set <option> <value>'."
        );
      else {
        configUpdate(userArgs);
      }
      break;

    default:
      console.log(
        `'${userArgs.join()}' is not a valid command. Try 'config --help'`
      );
  }
};

// config --status
const configStatus = () => {
  let status = "";

  status += fs.existsSync(path.join(__dirname, "..", "config.json"))
    ? "Config file is initialized."
    : "Config file is NOT initialized.";

  console.log(status);
};

// config --show
configShow = () => {
  let configuration = {};
  try {
    const configFile = fs.readFileSync("config.json", "utf8");
    configuration = JSON.parse(configFile);
    console.log("Current configuration settings:\n", configuration);
  } catch (err) {
    console.error("Error loading configuration: ", err);
  }
};

// config --set <option> <value>
const configUpdate = (userArgs) => {
  const option = userArgs[2];
  const value = userArgs[3];

  // Reading existing JSON data from config.json.
  let configData = {};
  try {
    configData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "config.json"))
    );
  } catch (error) {
    console.error("Error reading config file: ", error);
  }

  // Updating the option specified with the new value, or adding a new option and value.
  configData[option] = value;

  // Writing updated data back to config.json.
  fs.writeFileSync(
    path.join(__dirname, "..", "config.json"),
    JSON.stringify(configData),
    "utf-8"
  );
  console.log(`Configuration updated: ${option} set to ${value}`);
};

// config --reset
const configReset = () => {
  // Rewriting config.json back to DEFAULT_CONFIG values.
  fs.writeFileSync(
    path.join(__dirname, "..", "config.json"),
    JSON.stringify(DEFAULT_CONFIG),
    "utf-8"
  );
  console.log("Configuration reset to default settings.");
};

module.exports = config;