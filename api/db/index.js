
 var fs = require("fs");
 const createEmployeeModel = require('./employee')
var contents = fs.readFileSync("api/db/db.json");
var db = JSON.parse(contents);
module.exports = {
  db
}