mp.events.add('playerJoin', (player) => {
    console.log("[Info]", "Joined", player.name, player.ip);
    player.position = {x: -1324.206298828125, y: -1483.844970703125, z: 6.898984432220459};
    player.alpha = 0;

    let min = 1000;
    let max = 9999;
    let randomDimension = Math.floor(Math.random() * (max - min + 1)) + min;
    player.dimension = randomDimension;

    player.data = {};

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
        // player.character.save();
    }
});

mp.events.add('playerDeath', (player) => {
    console.log("Death", player);
});

mp.events.add('playerChat', (player, message) => {
    mp.players.broadcast(`${player.name}[${player.id}]: ${message}`);
});

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    player.call("setEngineOn", vehicle.id, false, true, false);

    if (dealershipSpots && dealershipSpots != null) {
        for (var key in dealershipSpots) {
            var spot = dealershipSpots[key];
            if (spot.vehicle == vehicle.id) {
                player.call("freezeVehicle", vehicle.id, true);
                player.data.currentlyInSpot = spot.id;
                if (spot.stock > 0) {
                    Utilities.showOptionsBox(player, "buy_dealership_vehicle", 
                        `Would you like to purchase this ${spot.name}?`, 
                        `Price: $${Utilities.number_format(spot.price)}`);
                }
            }
        }
    }
});

mp.events.add('clientData', function() {
    let player = arguments[0];
    let args = JSON.parse(arguments[1]);

    console.log(args);

    if (args[0] == "option") {
        if (player.data.optionsBox == "buy_dealership_vehicle") {
            var value = args[1];

            if (value == 0 || value == "0" || player.data.currentlyInSpot == null) {
                Utilities.hideOptionsBox(player);
                player.data.currentlyInSpot = null;
                if (player.vehicle)
                    player.removeFromVehicle();
                return;
            }

            var spot = dealershipSpots[player.data.currentlyInSpot];

            if (!spot || spot == null || spot == "undefined") {
                Utilities.hideOptionsBox(player);
                return;
            }

            if (player.character.bank_money < spot.price) {
                Utilities.errorOptionsBox(player, "You do not have enough funds in your bank account.");
                return;
            }


            Utilities.hideOptionsBox(player);
        }
        return;
    }
});