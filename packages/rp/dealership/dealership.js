class Dealership {
    constructor(values) {
        if (!values || values == null)
            return;
        
        for (var key in values)
            this[key] = values[key];

        this.position = JSON.parse(this.position);
        this.purchase_position = JSON.parse(this.purchase_position);
        this.purchase_rotation = JSON.parse(this.purchase_rotation);
        this.stock = JSON.parse(this.stock);
        this.managers = JSON.parse(this.managers);
        this.logs = JSON.parse(this.logs);
    }

    save() {
        let values = this;

        values.position = JSON.stringify(this.position);
        values.purchase_position = JSON.stringify(this.purchase_position);
        values.purchase_rotation = JSON.stringify(this.purchase_rotation);
        values.stock = JSON.stringify(this.stock);
        values.managers = JSON.stringify(this.managers);
        values.logs = JSON.stringify(this.logs);

        connection.query("UPDATE characters SET ? WHERE id = ?", [values, this.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Dealership #" + this.id);
                console.log("[Error]", err);
            }
        });
    }

    static load() {
        connection.query("SELECT * FROM dealership", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealerships");
                return;
            }

            let loaded = 0;

            result.forEach((value, key) => {
                if (value == null) return;;

                let dealership = new Dealership(value);

                let rotation = new mp.Vector3(0, 0, 0);
                let position = dealership.position;

                // mp.markers.new(type, position, rotation, direction, radius, red, green, blue, alpha[, visible, dimension])
                dealership.marker = mp.markers.new(0, position, rotation, rotation, 1, 0, 176, 255, 255, true, 0);
                dealership.label = "dealership-"+dealership.id;

                dealerships[dealership.id] = dealership;

                labels[dealership.label] = {
                    text: `Vehicle Dealership\n${dealership.name}`,
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