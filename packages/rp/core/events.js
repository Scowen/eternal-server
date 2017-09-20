mp.events.add('playerJoin', (player) => {
    console.log("[Info]", "Joined", player.name, player.ip);
    player.position = {x: -1324.206298828125, y: -1483.844970703125, z: 6.898984432220459};
    player.alpha = 0;
    player.dimension = 1337;
});

mp.events.add('playerQuit', (player) => {
    console.log("[Info]", "Quit", player.name, player.ip);
});

mp.events.add('playerDeath', (player) => {
    console.log("Death", player);
});

mp.events.add('playerChat', (player, message) => {
    mp.players.broadcast(`${player.name}[${player.id}]: ${message}`);
});

mp.events.add('clientData', function() {
    let player = arguments[0];
    let args = JSON.parse(arguments[1]);
});
