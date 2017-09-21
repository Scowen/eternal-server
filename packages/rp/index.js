//////////////////////////////// My SQL ////////////////////////////////
var mysql = require('mysql2');
global.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cjdann42",
    database: "rage"
});

connection.connect(function(err) {
    if (err)
        console.log("[Error]", err);
    else
        console.log("[Info]", "MySql has connected.");
});
////////////////////////////////////////////////////////////////////////

global.moment = require('moment');

// Core Components.
require('./core/events.js');
require('./core/commands.js');
global.Account = require('./core/account.js');
require('./core/auth.js');
