const express = require("express");
const path = require("path");
const { addNewUser, getUserByName } = require("./commands/tokenBit");
const { initStatus } = require("./commands/initBit");

const server = express();
const PORT = 3000;

if (!initStatus().match(/Files are initialized\./)) {
  console.log("Files must be initialized first. Use bitbase init --all");
} else {
  // Use EJS as the view engine
  server.set("view engine", "ejs");

  // Make use of the body-parser middleware
  server.use(express.urlencoded({ extended: true }));

  // Handle main view
  server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

  // Handle style.css
  server.get("/resources/style.css", (req, res) => {
    res
      .header({ "Content-Type": "text/css" })
      .sendFile(path.join(__dirname, "views", "resources", "style.css"));
  });

  // Handle POSTs to /new
  // /new is used to create new user tokens
  server.post("/new", (req, res) => {
    // Attempt to add a new user based on the submitted request
    let token = addNewUser(req.body.username);

    // Render new.ejs based on the response from addNewUser
    res.render("new.ejs", { token: token });
  });

  // Handle GETs to /fetch
  // /fetch is used to retrieve existing user tokens
  server.get("/fetch", (req, res) => {
    let username = req.query.username;
    //   if (!username) username = undefined;
    let user = getUserByName(req.query.username);

    res.render("fetch.ejs", { token: user, username: username });
  });

  // Any other request is unknown; the broadest case is a 404
  server.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  });

  // Listen for HTTP traffic
  server.listen(PORT, () =>
    console.log(
      "Server has started, and is accessible at http://localhost:" + PORT
    )
  );
}