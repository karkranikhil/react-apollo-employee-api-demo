
 var fs = require("fs");
var contents = fs.readFileSync("api/db/db.json");
var db = JSON.parse(contents);
module.exports = {
  db
}