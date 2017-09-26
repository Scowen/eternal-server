mp.events.add('playerJoin', (player) => {
    console.log("[Info]", "Joined", player.name, player.ip);
    player.position = {x: -1324.206298828125, y: -1483.844970703125, z: 6.898984432220459};
    player.alpha = 0;

    let min = 1000;
    let max = 9999;
    let randomDimension = Math.floor(Math.random() * (max - min + 1)) + min;
    player.dimension = randomDimension;

    player.call("IPL", "apa_v_mp_h_05_b");

    player.call("textLabels", JSON.stringify(labels));
});

mp.events.add('playerQuit', (player) => {
    console.log("[Info]", "Quit", player.name, player.ip);

    if (player.character != null) {
        player.character.dimension = player.dimension;
        player.character.position = player.position;
        player.character.heading = player.heading;
        player.character.health = player.health;
        player.character.armour = player.armour;
        var unix = Math.round(+new Date()/1000);
        player.character.last_played = unix;
        // player.character.weapons = player.weapons;
        player.character.save();
    }
});

mp.events.add('playerDeath', (player) => {
    console.log("Death", player);
});

mp.events.add('playerChat', (player, message) => {
    mp.players.broadcast(`${player.name}[${player.id}]: ${message}`);
});

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    if (dealershipSpots && dealershipSpots != null) {
        for (var key in dealershipSpots) {
            var spot = dealershipSpots[key];
            if (spot.vehicle == vehicle.id)
                player.call("freezeVehicle", vehicle.id, true);
        }
    }
});

mp.events.add('clientData', function() {
    let player = arguments[0];
    let args = JSON.parse(arguments[1]);

    // console.log(args);
});