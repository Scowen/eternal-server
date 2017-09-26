function isAdmin(player, level, duty) {
    return true;

    if (player.account.admin < level) {
        Messages.errorMessage(player, "Insufficient Permissions!");
        return false
    }

    if (duty && !player.character.data.adminDuty) {
        Messages.adminErrorMessage(player, "You must be on duty to use this command!");
        return false
    }
}

mp.events.addCommand('pos', (player) => {
    if (!isAdmin(player, 0, true)) return;

    console.log(player.position, player.heading);
    Messages.adminMessage(player, `${player.position.x}, ${player.position.y}, ${player.position.z}`);
});

mp.events.addCommand('rot', (player) => {
    if (!isAdmin(player, 0, true)) return;

    if (player.vehicle && player.vehicle != null) {
        console.log(JSON.stringify(player.vehicle.rotation));
        Messages.adminMessage(player, JSON.stringify(player.vehicle.rotation));
    } else { 
        console.log(player.heading);
        Messages.adminMessage(player, player.heading);
    }
});

mp.events.addCommand('labels', (player) => {
    if (!isAdmin(player, 0, true)) return;

    mp.players.forEach((value, id) => {
        value.call("textLabels", JSON.stringify(labels));
    });

    Messages.adminSuccessMessage(player, "Labels have been refreshed.");
});

mp.events.addCommand('createdealership', (player, _, name) => {
    if (!isAdmin(player, 0, true)) return;

    var unix = Math.round(+new Date()/1000);

    let insertOptions = {
        name: name,
        position: JSON.stringify(player.position),
        purchase_heading: 0,
        last_updated: unix,
        created: unix,
    }

    connection.query("INSERT INTO dealership SET ? ", [insertOptions], function(err, result) {
        if (err && err != null) {
            console.log("[Error]", "Failed to insert row into dealership: " + err);
            Messages.adminErrorMessage(player, "Error creating dealership.");
            return;
        }
        
        Dealership.load();

        Messages.adminSuccessMessage(player, `Dealership ${name} created successfully.`);
    });
});

mp.events.addCommand('refreshspots', (player) => {
    if (!isAdmin(player, 0, true)) return;

    DealershipSpot.load();
    Messages.adminSuccessMessage(player, `Dealership Spots refreshed successfully.`);
});


mp.events.addCommand('createdealershipspot', (player, _, dealershipName) => {
    if (!isAdmin(player, 0, true)) return;

    if (!player.vehicle || player.vehicle == null) {
        Messages.adminErrorMessage(player, "You must be in a vehicle to use this command.");
        return;
    }

    var unix = Math.round(+new Date()/1000);

    connection.query("SELECT * FROM dealership WHERE name = ?", [dealershipName], function(err, result) {
        if (err || !result || result == null || result.length <= 0) {
            Messages.adminErrorMessage(player, `Dealership ${dealershipName} does not exist.`);
            return;
        }

        let dealership = result[0];

        let insertOptions = {
            dealership: dealership.id,
            position: JSON.stringify(player.position),
            rotation: JSON.stringify(player.vehicle.rotation),
            last_updated: unix,
            created: unix,
        }
        connection.query("INSERT INTO dealership_spot SET ? ", [insertOptions], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Failed to insert row into dealership_spot: " + err);
                Messages.adminErrorMessage(player, "Error creating dealership_spot.");
                return;
            }

            DealershipSpot.load();

            Messages.adminSuccessMessage(player, `Dealership Spot created successfully.`);
        });
    });
});

mp.events.addCommand('invis', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.alpha = (player.alpha == 0) ? 255 : 0;

    Messages.adminSuccessMessage(player, `You toggled invisiblity.`);
});

mp.events.addCommand('ipl', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.call('IPL', value);

    Messages.adminSuccessMessage(player, `IPL ${value} loaded.`);
});

mp.events.addCommand('dim', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.dimension = value;

    Messages.adminSuccessMessage(player, `Dimension set to ${value}.`);
});

mp.events.addCommand('veh', (player, _, vehName) => {
    if (!isAdmin(player, 0, true)) return;

    let vehicle = mp.vehicles.new(mp.joaat(vehName), player.position);
    // player.putIntoVehicle(vehicle, 0);

    Messages.adminSuccessMessage(player, `You spawned a ${vehName}.`);
});

mp.events.addCommand('fix', (player) => {
    if (!isAdmin(player, 0, true)) return;

    if (!player.vehicle || player.vehicle == null) {
        Messages.adminErrorMessage(player, `You are not in a vehicle.`);
        return;
    }

    player.vehicle.repair();
    Messages.adminSuccessMessage(player, `Your vehicle has been repaired.`);
});

mp.events.addCommand('flip', (player) => {
    if (!isAdmin(player, 0, true)) return;

    if (!player.vehicle || player.vehicle == null) {
        Messages.adminErrorMessage(player, `You are not in a vehicle.`);
        return;
    }

    let rotation = player.vehicle.rotation;
    rotation.y = 0;
    player.vehicle.rotation = rotation;
    Messages.adminSuccessMessage(player, `Your vehicle has been flipped.`);
});

mp.events.addCommand('weapon', (player, _, weaponName) => {
    if (!isAdmin(player, 0, true)) return;

    if (weaponName.trim().length <= 0) {
        Messages.adminErrorMessage(player, `Please enter a valid weapon name.`);
        return;
    }

    player.giveWeapon(mp.joaat(`weapon_${weaponName}`), 100);
    Messages.adminSuccessMessage(player, `You spawned a ${weaponName}.`);
});

mp.events.addCommand('kill', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.health = 0;

    Messages.adminSuccessMessage(player, `You killed yourself.`);
});

mp.events.addCommand('healme', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.health = 100;

    Messages.adminSuccessMessage(player, `You healed yourself.`);
});

mp.events.addCommand('armourme', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.armour = 100;

    Messages.adminSuccessMessage(player, `You armoured yourself.`);
});

mp.events.addCommand('tp', (player, _, target) => {
    if (!isAdmin(player, 0, true)) return;

    var targetPlayer = Utilities.getPlayer(target);

    if (targetPlayer == null) {
        Messages.adminErrorMessage(player, `Target "${target}" does not exist.`);
        return;
    }

    player.position = targetPlayer.position;
    Messages.adminSuccessMessage(player, `You teleported to ${targetPlayer.character.name}.`);
});

mp.events.addCommand('get', (player, _, target) => {
    if (!isAdmin(player, 0, true)) return;

    var targetPlayer = Utilities.getPlayer(target);

    if (targetPlayer == null) {
        Messages.adminErrorMessage(player, `Target "${target}" does not exist.`);
        return;
    }

    targetPlayer.position = player.position;
    Messages.adminSuccessMessage(player, `You teleported ${targetPlayer.character.name} to you.`);
});

mp.events.addCommand('tppos', (player, _, x, y ,z) => {
    if (!isAdmin(player, 0, true)) return;

    if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z))) {
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
        Messages.adminSuccessMessage(player, `You teleported to ${x}, ${y}, ${z}.`);
    } else {
        player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
    }
});
