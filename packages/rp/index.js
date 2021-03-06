//////////////////////////////// My SQL ////////////////////////////////
var fs = require('fs');
var databaseOptions = JSON.parse(fs.readFileSync('./packages/rp/database.json', 'utf8'));
var mysql = require('mysql2');
global.connection = mysql.createConnection(databaseOptions);

connection.connect(function(err) {
    if (err) {
        console.log("[Error]", err);
        return;
    }
    
    console.log("[Info]", "MySql has connected.");

    Dealership.load();
    DealershipSpot.load();
    VehicleInfo.load(null);
});
////////////////////////////////////////////////////////////////////////

global.randomString = require("randomstring");

global.labels = {};
global.dealerships = {};
global.dealershipSpots = {};
global.vehicles = {};
global.vehicleInfos = {};

// "Classes"
global.Account = require('./core/account.js');
global.Character = require('./core/character.js');
global.Messages = require('./core/messages.js');
global.Utilities = require('./core/utilities.js');
global.Vehicle = require('./core/vehicle.js');
global.VehicleInfo = require('./core/vehicle_info.js');

// Dealerships
global.Dealership = require('./dealership/dealership.js');
global.DealershipSpot = require('./dealership/dealership_spot.js');

// Core Components.
require('./core/events.js');
require('./core/auth.js');
require('./core/commands.js');
require('./core/commands_admin.js');
require('./core/saving.js');