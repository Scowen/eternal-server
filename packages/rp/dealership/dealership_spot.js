class DealershipSpot {
    constructor(values) {
        if (!values || values == null)
            return;
        
        for (var key in values)
            this[key] = values[key];

        this.position = JSON.parse(this.position);
        let rot = JSON.parse(this.rotation);
        this.rotation = new mp.Vector3(rot.x, rot.y, rot.z);
        this.label = "dealership-spot-"+this.id;
    }

    save() {
        this.position = JSON.parse(this.position);
        this.rotation = JSON.parse(this.rotation);

        connection.query("UPDATE dealership_spot SET ? WHERE id = ?", [this, this.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Dealership Spot #" + this.id);
                console.log("[Error]", err);
            }
        });
    }

    static load() {
        connection.query("SELECT * FROM dealership_spot", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealership spots");
                return;
            }

            let loaded = 0;

            result.forEach((value, key) => {
                if (value == null) return;

                DealershipSpot.addToDealershipSpots(value.id, value);

                loaded++;
            });

            Utilities.refreshLabels();

            console.log(`[Info] ${loaded} dealership spots`);
        });
    }

    static loadOne(id) {
        connection.query("SELECT * FROM dealership_spot WHERE id = ?", [id], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log(`[Error] Spot ${id} does not exist`);
                return;
            }

            DealershipSpot.addToDealershipSpots(result[0].id, result[0]);

            Utilities.refreshLabels();
        });
    }

    static addToDealershipSpots(key, value) {
        if (dealershipSpots[key] != null && dealershipSpots[key].vehicle != null) {
            var vehAt = mp.vehicles.at(dealershipSpots[key].vehicle);
            vehAt.destroy();
        }

        var spot = new DealershipSpot(value);

        if (spot.hash != null) {
            setTimeout(function() {
                let veh = mp.vehicles.new(spot.hash, spot.position);
                veh.numberPlate = "" + key;
                veh.setColour(spot.color1, spot.color2);

                spot.vehicle = veh.id;

                setTimeout(function() {
                    veh.rotation = spot.rotation;
                }, 500);
            }, 1000);

            labels[spot.label] = {
                text: `${spot.name}\n$${Utilities.number_format(spot.price)}\nStock: ${spot.stock}`,
                position: spot.position,
                r: 224,
                g: 195,
                b: 51,
                a: 255,
                scale: 0.4,
                distance: 7,
            };
        } else {
            spot.vehicle = null;
            labels[spot.label] = {
                text: `#${spot.id}`,
                position: spot.position,
                r: 180,
                g: 180,
                b: 180,
                a: 200,
                scale: 0.4,
                distance: 5,
            };
        }
        dealershipSpots[spot.id] = spot;
    }
}

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
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

    if (args[0] == "option") {
        if (player.data.optionsBox == "buy_dealership_vehicle") {
            var value = args[1];

            if (value == 0 || value == "0" || player.data.currentlyInSpot == null) {
                Utilities.hideOptionsBox(player);
                player.data.currentlyInSpot = null;
                if (player.vehicle) player.removeFromVehicle();
                return;
            }

            var spot = dealershipSpots[player.data.currentlyInSpot];

            if (!spot || spot == null || spot == "undefined") {
                Utilities.hideOptionsBox(player);
                console.log("[Error]", "Spot doesn't exist.");
                return;
            }

            var dealership = dealerships[spot.dealership];

            if (!dealership || dealership == null || dealership == "undefined") {
                Utilities.hideOptionsBox(player);
                console.log("[Error]", "Dealership doesn't exist.");
                return;
            }

            if (player.character.bank_money < spot.price) {
                Utilities.errorOptionsBox(player, "You do not have enough funds in your bank account.");
                return;
            }


            let veh = mp.vehicles.new(spot.hash, dealership.purchase_position);
            let plate = randomString.generate(8);
            /*
            let plateResult = connection.execute('SELECT plate FROM vehicles WHERE plate = ?', [plate]);
            while (plateResult != null && plateResult != "undefined" && plateResult._rows.length >= 1) {
                plate = randomString.generate(8);
                plateResult = connection.execute('SELECT plate FROM vehicles WHERE plate = ?', [plate]);
            }
            */

            veh.numberPlate = "" + plate;
            veh.setColour(spot.color1, spot.color2);

            if (player.vehicle) player.removeFromVehicle();

            setTimeout(function() {
                veh.rotation = dealership.purchase_rotation;
                player.putIntoVehicle(veh, 0);
            }, 500);

            Utilities.hideOptionsBox(player);

            dealershipSpots[spot.id].stock -= 1;
            dealerships[dealership.id].balance += spot.price;
            player.character.bank_money -= spot.price;

            dealerships[dealership.id].save();
            player.character.save();
            dealershipSpots[spot.id].save();

            labels[spot.label].text = `${dealershipSpots[spot.id].name}\n$${Utilities.number_format(dealershipSpots[spot.id].price)}\nStock: ${dealershipSpots[spot.id].stock}`;
            Utilities.refreshLabels();
        }
        return;
    }
});

module.exports = DealershipSpot;