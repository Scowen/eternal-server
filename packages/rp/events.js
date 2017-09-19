let skins       = require('./configs/skins.json').Skins;
let spawnPoints = require('./configs/spawn_points.json').SpawnPoints;

/* !!! REMOVE AFTER FIX (TRIGGERED FROM SERVER) !!! */
mp.events.add('playerEnteredVehicle', (player) => {
    if (player.vehicle && player.seat === 0 || player.seat === 255)
        player.call('playerEnteredVehicle');
});
/* */

mp.events.add('playerExitVehicle', (player) => {
    player.call('playerExitVehicle');
});

mp.events.add('playerJoin', (player) => {

});

mp.events.add('playerQuit', (player) => {
    
});

mp.events.add('playerDeath', (player) => {
    
});

mp.events.add('playerChat', (player, message) => {
    mp.players.broadcast(`<b>${player.name}[${player.id}]:</b> ${message}`);
});

// Getting data from client.
mp.events.add('clientData', function() {

});
