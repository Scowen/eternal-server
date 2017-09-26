class DealershipSpot {
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

        dealershipSpots[key] = value;
        dealershipSpots[key].position = JSON.parse(value.position);
        let rot = JSON.parse(value.rotation);
        dealershipSpots[key].rotation = new mp.Vector3(rot.x, rot.y, rot.z);
        dealershipSpots[key].label = "dealership-spot-"+value.id;

        if (value.hash != null) {
            setTimeout(function() {
                let veh = mp.vehicles.new(value.hash, dealershipSpots[key].position);
                veh.numberPlate = "" + key;
                veh.engine = false;
                veh.setColour(value.color1, value.color2);

                dealershipSpots[key].vehicle = veh.id;

                setTimeout(function() {
                    veh.rotation = dealershipSpots[key].rotation;
                }, 500);
            }, 1000);

            labels[dealershipSpots[key].label] = {
                text: `${value.name}\n$${Utilities.number_format(value.price)}\nStock: ${value.stock}`,
                position: dealershipSpots[key].position,
                r: 224,
                g: 195,
                b: 51,
                a: 255,
                scale: 0.4,
                distance: 7,
            };
        } else {
            dealershipSpots[key].vehicle = null;
            labels[dealershipSpots[key].label] = {
                text: `#${value.id}`,
                position: dealershipSpots[key].position,
                r: 180,
                g: 180,
                b: 180,
                a: 200,
                scale: 0.4,
                distance: 5,
            };
        }
    }
}

module.exports = DealershipSpot;