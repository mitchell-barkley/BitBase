const initHelp =
  "  bitbase init --help\t\t\t\tdisplays help for the init command\n\
  bitbase init --status\t\t\t\tchecks if the system has been initialised\n\
  bitbase init --all\t\t\t\tcreates the folder structure and the config and help files\n\
  bitbase init --mk\t\t\t\tcreates the folder structure\n\
  bitbase init --cat\t\t\t\tcreates the config file with default settings and the help files";

const configHelp =
  "  bitbase config --help\t\t\t\tdisplays help for the config command\n\
  bitbase config --show\t\t\t\tdisplays a list of the current config settings\n\
  bitbase config --reset\t\t\tresets the config file with default settings\n\
  bitbase config --set <option> <value>\t\tsets a specific config setting";

const tokenHelp =
  "  bitbase token --help\t\t\t\tdisplays help for the token command\n\
  bitbase token --count\t\t\t\tdisplays a count of the tokens created\n\
  bitbase token --new <username>\t\tgenerates a token for a given username, saves tokens to the json file\n\
  bitbase token --upd p <username> <phone>\tupdates the json entry with a new phone number\n\
  bitbase token --upd e <username> <email>\tupdates the json entry with a new email\n\
  bitbase token --search u <username>\t\tfetches a token for a given username\n\
  bitbase token --search p <username>\t\tfetches a token for a given phone number\n\
  bitbase token --search e <username>\t\tfetches a token for a given email address";

const fullHelp = [
  "bitbase <command> <option>\n\nUsage:\n\n  bitbase --help\t\t\t\tdisplays all help",
  initHelp,
  configHelp,
  tokenHelp,
].join("\n\n");

module.exports = { initHelp, configHelp, tokenHelp, fullHelp };