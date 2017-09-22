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

// "Classes"
global.Account = require('./core/account.js');
global.Character = require('./core/character.js');

// Core Components.
require('./core/events.js');
require('./core/commands.js');
require('./core/auth.js');

setInterval(function() {
    var count = 0;
    var countSaved = 0;
    mp.players.forEach((player, id) => {
        if (player.character != null) {
            try {
                player.character.save(player);
                countSaved++;
            } catch (err) {
                console.log(err);
            }
        }
        count++;
    });
    console.log("[Info]", `Saved Players: ${countSaved} / ${count}`);
}, 60000)