function isAdmin(player, level, duty) {
    return true;

    if (player.account.admin < level) {
        player.outputChatBox("Insufficient Permissions!");
        return false
    }

    if (duty && !player.character.data.adminDuty) {
        player.outputChatBox("You must be on duty to use this command!");
        return false
    }
}

mp.events.addCommand('pos', (player) => {
    if (!isAdmin(player, 0, true)) return;

    console.log(player.position, player.heading);
    player.outputChatBox(`${player.position.x}, ${player.position.y}, ${player.position.z} | ${player.heading}`);
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
        player.outputChatBox(`Dealership Created Successfully`);
        loadDealerships();
        mp.players.forEach((value, id) => {
            value.call("textLabels", JSON.stringify(labels));
        });
    });
});

mp.events.addCommand('invis', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.alpha = (player.alpha == 0) ? 255 : 0;
});

mp.events.addCommand('ipl', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.call('IPL', value);
});

mp.events.addCommand('dim', (player, _, value) => {
    if (!isAdmin(player, 0, true)) return;

    player.dimension = value;
});

mp.events.addCommand('veh', (player, _, vehName) => {
    if (!isAdmin(player, 0, true)) return;

    let vehicle = mp.vehicles.new(mp.joaat(vehName), player.position);
    // player.putIntoVehicle(vehicle, 0);
});

mp.events.addCommand('skin', (player, _, skinName) => {
    if (!isAdmin(player, 0, true)) return;

    if (skinName && skinName.trim().length > 0)
        player.model = mp.joaat(skinName);
    else
        player.outputChatBox(`<b>Command syntax:</b> /skin [skin_name]`);
});

mp.events.addCommand('fix', (player) => {
    if (!isAdmin(player, 0, true)) return;

    if (player.vehicle)
        player.vehicle.repair();
    else
        player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
});

mp.events.addCommand('flip', (player) => {
    if (!isAdmin(player, 0, true)) return;

    if (player.vehicle) {
        let rotation = player.vehicle.rotation;
        rotation.y = 0;
        player.vehicle.rotation = rotation;
    } else {
        player.outputChatBox(`<b>Error:</b> you are not in the vehicle!`);
    }
});

mp.events.addCommand('weapon', (player, _, weaponName) => {
    if (!isAdmin(player, 0, true)) return;

    if (weaponName.trim().length > 0)
        player.giveWeapon(mp.joaat(`weapon_${weaponName}`), 100);
    else
        player.outputChatBox(`<b>Command syntax:</b> /weapon [weapon_name]`);
});

mp.events.addCommand('kill', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.health = 0;
});

mp.events.addCommand('hp', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.health = 100;
});

mp.events.addCommand('armour', (player) => {
    if (!isAdmin(player, 0, true)) return;

    player.armour = 100;
});

mp.events.addCommand('warp', (player, _, playerID) => {
    if (!isAdmin(player, 0, true)) return;

    if (playerID && playerID.trim().length > 0) {
        let sourcePlayer = mp.players.at(parseInt(playerID));
        if (sourcePlayer) {
            let playerPos = sourcePlayer.position;
            playerPos.x += 1;
            player.position = playerPos;
        } else {
            player.outputChatBox(`<b>Warp:</b> player with such ID not found!`);
        }
    } else
        player.outputChatBox(`<b>Command syntax:</b> /warp [player_id]`);
});

mp.events.addCommand('tp', (player, _, x, y ,z) => {
    if (!isAdmin(player, 0, true)) return;

    if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z)))
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
    else
        player.outputChatBox(`<b>Command syntax:</b> /tp [x] [y] [z]`);
});
