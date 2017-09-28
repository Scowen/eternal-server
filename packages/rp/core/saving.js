function savePlayers() {
    let count = 0;
    let countSaved = 0;
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
}

function saveVehicles() {
    let count = 0;
    let countSaved = 0;
    mp.vehicles.forEach((vehicle, id) => {
        if (vehicle.databaseId != null && vehicles.hasOwnProperty(vehicle.databaseId)) {
            try {
                vehicles[vehicle.databaseId].position = vehicle.position;
                vehicles[vehicle.databaseId].rotation = vehicle.rotation;
                vehicles[vehicle.databaseId].health = vehicle.engineHealth;
                vehicles[vehicle.databaseId].save();
                countSaved++;
            } catch (err) {
                console.log(err);
            }
        }
        count++;
    });
    console.log("[Info]", `Saved Vehicles: ${countSaved} / ${count}`);
}

setInterval(savePlayers, 60 * 1000);
setInterval(saveVehicles, 60 * 1000);