class Dealership {
    static load() {
        connection.query("SELECT * FROM dealership", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealerships");
                return;
            }

            let loaded = 0;

            result.forEach((value, key) => {
                if (value == null) return;;

                dealerships[value.id] = value;
                dealerships[value.id].position = JSON.parse(value.position);
                dealerships[value.id].purchase_position = JSON.parse(value.purchase_position);
                dealerships[value.id].purchase_rotation = JSON.parse(value.purchase_rotation);
                dealerships[value.id].stock = JSON.parse(value.stock);
                dealerships[value.id].managers = JSON.parse(value.managers);
                dealerships[value.id].logs = JSON.parse(value.logs);

                let rotation = new mp.Vector3(0, 0, 0);
                let position = dealerships[value.id].position;

                // mp.markers.new(type, position, rotation, direction, radius, red, green, blue, alpha[, visible, dimension])
                dealerships[value.id].marker = mp.markers.new(0, position, rotation, rotation, 1, 0, 176, 255, 255, true, 0);
                dealerships[value.id].label = "dealership-"+value.id;

                labels[dealerships[value.id].label] = {
                    text: `Vehicle Dealership\n${dealerships[value.id].name}`,
                    position: position,
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 255,
                    scale: 0.6,
                    distance: 35,
                };

                loaded++;
            });

            Utilities.refreshLabels();

            console.log(`[Info] ${loaded} dealerships loaded`);
        });
    }
}

module.exports = Dealership;