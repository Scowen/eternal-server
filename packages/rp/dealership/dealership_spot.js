class DealershipSpot {
    constructor(values) {
        if (!values || values == null)
            return;
        
        for (var key in values)
            this[key] = values[key];

        if (this.hasOwnProperty("position")) this.position = JSON.parse(this.position);
        if (this.hasOwnProperty("rotation")) this.rotation = JSON.parse(this.rotation);
        this.data = {};
        this.data.label = "dealership-spot-"+this.id;
    }

    save() {
        this.last_updated = Utilities.unix();
        let values = {};
        for (var key in this)
            values[key] = this[key];
        values = Vehicle.stringify(values);

        if (values.hasOwnProperty("data")) delete values.data;

        connection.query("UPDATE dealership_spot SET ? WHERE id = ?", [values, values.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Dealership Spot #" + values.id);
                console.log("[Error]", err);
            }
            console.log("[Success]", "Saved Dealership Spot #" + values.id);
        });
    }

    static stringify(values) {
        if (values.hasOwnProperty("position")) values.position = JSON.stringify(values.position);
        if (values.hasOwnProperty("rotation")) values.rotation = JSON.stringify(values.rotation);

        return values;
    }

    static load() {
        connection.query("SELECT * FROM dealership_spot", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealership spots");
                return;
            }

            result.forEach((value, key) => {
                DealershipSpot.addToDealershipSpots(value.id, value);
            });

            Utilities.refreshLabels();

            console.log(`[Info] ${result.length} dealership spots`);
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
        if (dealershipSpots[key] != null && dealershipSpots[key].data.vehicle != null) {
            var vehAt = mp.vehicles.at(dealershipSpots[key].data.vehicle);
            vehAt.destroy();
        }

        var spot = new DealershipSpot(value);

        if (spot.hash != null) {
            setTimeout(function() {
                let veh = mp.vehicles.new(spot.hash, spot.position);
                veh.numberPlate = "" + key;
                veh.setColour(spot.color1, spot.color2);

                spot.data.vehicle = veh.id;

                setTimeout(function() {
                    veh.rotation = spot.rotation;
                }, 500);
            }, 1000);

            labels[spot.data.label] = {
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
            spot.data.vehicle = null;
            labels[spot.data.label] = {
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
            if (spot.data.vehicle == vehicle.id) {
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

            let plate = randomString.generate(8).toUpperCase();
            /*
            let plateResult = connection.execute('SELECT plate FROM vehicles WHERE plate = ?', [plate]);
            while (plateResult != null && plateResult != "undefined" && plateResult._rows.length >= 1) {
                plate = randomString.generate(8).toUpperCase();
                plateResult = connection.execute('SELECT plate FROM vehicles WHERE plate = ?', [plate]);
            }
            */

            Vehicle.insert({
                hash: spot.hash,
                plate: plate,
                owner: player.character.id,
                active: 1,
                health: 1000,
                colour1: spot.color1,
                colour2: spot.color2,
                position: dealership.purchase_position,
                rotation: dealership.purchase_rotation,
                last_updated: Utilities.unix(),
                created: Utilities.unix(),
            }, true);

            Utilities.hideOptionsBox(player);
            Messages.sendSubtitle(player, `You have purchased a ${spot.name}`);

            dealershipSpots[spot.id].stock -= 1;
            dealerships[dealership.id].balance += spot.price;
            player.character.bank_money -= spot.price;
            player.removeFromVehicle();
            
            setTimeout(function() {
                let pos = dealership.purchase_position;
                pos.x += 2;
                pos.z += 1;
                player.position = pos;
            }, 1000)

            dealershipSpots[spot.id].save();
            dealerships[dealership.id].save();
            player.character.save(player);

            labels[spot.data.label].text = `${dealershipSpots[spot.id].name}\n$${Utilities.number_format(dealershipSpots[spot.id].price)}\nStock: ${dealershipSpots[spot.id].stock}`;
            Utilities.refreshLabels();
        }
        return;
    }
});

module.exports = DealershipSpot;