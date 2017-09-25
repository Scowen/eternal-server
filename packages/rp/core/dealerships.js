global.loadDealerships = function() {
    connection.query("SELECT * FROM dealership", [], function(err, result) {
        if (!result || result == null || result.length <= 0) {
            console.log("[Info] No dealerships loaded");
            return;
        }

        let loaded = 0;

        result.forEach((value, key) => {
            if (value == null) return;;

            dealerships[key] = value;
            dealerships[key].position = JSON.parse(value.position);
            dealerships[key].purchase_position = JSON.parse(value.purchase_position);
            dealerships[key].stock = JSON.parse(value.stock);
            dealerships[key].managers = JSON.parse(value.managers);
            dealerships[key].logs = JSON.parse(value.logs);

            let rotation = new mp.Vector3(0, 0, 0);
            let position = dealerships[key].position;

            // mp.markers.new(type, position, rotation, direction, radius, red, green, blue, alpha[, visible, dimension])
            dealerships[key].marker = mp.markers.new(0, position, rotation, rotation, 1, 0, 176, 255, 255, true, 0);
            dealerships[key].label = value.name;

            labels.push({
                text: `Vehicle Dealership\n${dealerships[key].name}`,
                position: position,
                r: 255,
                g: 255,
                b: 255,
                a: 255,
                distance: 35,
            })

            loaded++;
        });

        console.log(`[Info] ${loaded} dealerships loaded`);
    });
}

loadDealerships();