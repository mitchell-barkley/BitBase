const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("route", (userArgs) => {
  // console.log(`User Input: ${userArgs}`);
  const d = new Date();
  const yearFolder = path.join(__dirname, "logs", String(d.getFullYear()));
  const monthFolder = path.join(yearFolder, String(d.getMonth() + 1));
  const dayFolder = path.join(monthFolder, String(d.getDate()));

  try {
    if (!fs.existsSync(yearFolder)) {
      fs.mkdirSync(yearFolder, { recursive: true });
    }
    if (!fs.existsSync(monthFolder)) {
      fs.mkdirSync(monthFolder, { recursive: true });
    }
    if (!fs.existsSync(dayFolder)) {
      fs.mkdirSync(dayFolder, { recursive: true });
    }
    if (userArgs === "error") {
      fs.appendFile(
        path.join(dayFolder, "error_log.txt"),
        `Invalid Input: ${userArgs} at ${d}\n`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    } else {
      fs.appendFile(
        path.join(dayFolder, "log.txt"),
        `User Input: ${userArgs} at ${d}\n`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = myEmitter;