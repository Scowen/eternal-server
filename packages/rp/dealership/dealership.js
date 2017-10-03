class Dealership {
    constructor(values) {
        if (!values || values == null)
            return;
        
        for (var key in values)
            this[key] = values[key];

        if (this.hasOwnProperty("position")) this.position = JSON.parse(this.position);
        if (this.hasOwnProperty("purchase_position")) this.purchase_position = JSON.parse(this.purchase_position);
        if (this.hasOwnProperty("purchase_rotation")) this.purchase_rotation = JSON.parse(this.purchase_rotation);
        if (this.hasOwnProperty("stock")) this.stock = JSON.parse(this.stock);
        if (this.hasOwnProperty("managers")) this.managers = JSON.parse(this.managers);
        if (this.hasOwnProperty("logs")) this.logs = JSON.parse(this.logs);

        this.data = {};
        this.data.label = "dealership-"+this.id;
    }

    save() {
        this.last_updated = Utilities.unix();
        let values = {};
        for (var key in this)
            values[key] = this[key];
        values = Dealership.stringify(values);

        if (values.hasOwnProperty("data")) delete values.data;

        connection.query("UPDATE dealership SET ? WHERE id = ?", [values, values.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Dealership #" + values.id);
                console.log("[Error]", err);
            }
            console.log("[Success]", "Saved Dealership #" + values.id);
        });
    }

    static stringify(values) {
        if (values.hasOwnProperty("position")) values.position = JSON.stringify(values.position);
        if (values.hasOwnProperty("purchase_position")) values.purchase_position = JSON.stringify(values.purchase_position);
        if (values.hasOwnProperty("purchase_rotation")) values.purchase_rotation = JSON.stringify(values.purchase_rotation);
        if (values.hasOwnProperty("stock")) values.stock = JSON.stringify(values.stock);
        if (values.hasOwnProperty("managers")) values.managers = JSON.stringify(values.managers);
        if (values.hasOwnProperty("logs")) values.logs = JSON.stringify(values.logs);

        return values;
    }

    static load() {
        connection.query("SELECT * FROM dealership", [], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Info] Error loading dealerships");
                return;
            }

            result.forEach((value, key) => {
                let dealership = new Dealership(value);

                let rotation = new mp.Vector3(0, 0, 0);

                // mp.markers.new(type, position, rotation, direction, radius, red, green, blue, alpha[, visible, dimension])
                dealership.data.marker = mp.markers.new(0, dealership.position, rotation, rotation, 1, 0, 176, 255, 255, true, 0);
                dealership.data.colshape = mp.colshapes.newSphere(dealership.position.x, dealership.position.y, dealership.position.z, 5);
                dealerships[dealership.id] = dealership;

                labels[dealership.data.label] = {
                    text: `Vehicle Dealership\n${dealership.name}`,
                    position: dealership.position,
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 255,
                    scale: 0.6,
                    distance: 35,
                };
            });

            Utilities.refreshLabels();

            console.log(`[Info] ${result.length} dealerships loaded`);
        });
    }

    getSpots() {
        connection.query("SELECT * FROM dealership_spot WHERE dealership = ?", [this.id], function(err, result) {
            if (err || !result || result == null || result.length <= 0) {
                console.log("[Error] Error loading dealership spots for dealership " + this.id);
                return null;
            }

            return result;
        });
    }
}

mp.events.add('clientData', function() {
    let player = arguments[0];
    let args = JSON.parse(arguments[1]);

    if (args[0] == "action") {
        for (let id in dealerships) {
            let dealership = dealerships[id];

            if (dealership == null || dealership == "undefined") return;
            if (!dealership.data.colshape.isPointWithin(player.position)) return;
            console.log(dealership.owner, player.character.id, player.account.admin, player.character.data.adminDuty);
            if (dealership.owner != player.character.id && !(player.account.admin >= 7 && player.character.data.adminDuty)) return;

            let objectToSend = {
                name: dealership.name,
                balance: dealership.balance,
                for_sale: dealership.for_sale,
                for_sale_price: dealership.for_sale_price,
                spots: dealership.getSpots(),
                orders: {},
                stock: dealership.stock,
                logs: dealership.logs,
            }

            let jsonToSend = JSON.stringify(objectToSend);

            player.call("showUiWindow", "dealership");
            player.call("loadDealership", jsonToSend);
        }
    }
});

module.exports = Dealership;