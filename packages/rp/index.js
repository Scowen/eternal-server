//////////////////////////////// My SQL ////////////////////////////////
var mysql = require('mysql2');
global.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "niggers",
    database: "rage"
});

connection.connect(function(err) {
    if (err) {
        console.log("[Error]", err);
        return;
    }
    
    console.log("[Info]", "MySql has connected.");

    Dealership.load();
    DealershipSpot.load();
});
////////////////////////////////////////////////////////////////////////

global.randomString = require("randomstring");

global.labels = {};
global.dealerships = {};
global.dealershipSpots = {};
global.vehicles = {};

// "Classes"
global.Account = require('./core/account.js');
global.Character = require('./core/character.js');
global.Messages = require('./core/messages.js');
global.Utilities = require('./core/utilities.js');

// Dealerships
global.Dealership = require('./dealership/dealership.js');
global.DealershipSpot = require('./dealership/dealership_spot.js');

// Core Components.
require('./core/events.js');
require('./core/auth.js');
require('./core/commands.js');
require('./core/commands_admin.js');

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