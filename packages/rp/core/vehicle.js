class Vehicle {
    constructor(values) {
        if (values && values != null)
            for (var key in values)
                this[key] = values[key];

        this.position = JSON.parse(this.position);
        this.rotation = JSON.parse(this.rotation);
        this.inventory = JSON.parse(this.inventory);
        this.mods = JSON.parse(this.mods);
        this.rgb1 = JSON.parse(this.rgb1);
        this.rgb2 = JSON.parse(this.rgb2);
        this.neon = JSON.parse(this.neon);

        this.data = {};
        this.data.entity = null;

        vehicles[this.id] = this;
    }

    static insert(values, loadAfterInsert) {
        values = Vehicle.stringify(values);

        var query = connection.query("INSERT INTO vehicle SET ? ", values, function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Inserting Vehicle");
                console.log("[Error]", err);
                return null;
            }

            console.log("[Success]", "Inserted Vehicle " + result.insertId);
            if (loadAfterInsert) Vehicle.loadId(result.insertId);
            return result.insertId;
        });
    }

    save() {
        this.last_updated = Utilities.unix();
        let values = {};
        for (var key in this)
            values[key] = this[key];
        values = Vehicle.stringify(values);

        if (values.hasOwnProperty("data")) delete values.data;

        connection.query("UPDATE vehicle SET ? WHERE id = ?", [values, values.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Vehicle #" + values.id);
                console.log("[Error]", err);
            }
            // console.log("[Success]", "Saved Vehicle #" + values.id);
        });
    }

    static stringify(values) {
        if (values.hasOwnProperty("position")) values.position = JSON.stringify(values.position);
        if (values.hasOwnProperty("rotation")) values.rotation = JSON.stringify(values.rotation);
        if (values.hasOwnProperty("inventory")) values.inventory = JSON.stringify(values.inventory);
        if (values.hasOwnProperty("mods")) values.mods = JSON.stringify(values.mods);
        if (values.hasOwnProperty("rgb1")) values.rgb1 = JSON.stringify(values.rgb1);
        if (values.hasOwnProperty("rgb2")) values.rgb2 = JSON.stringify(values.rgb2);
        if (values.hasOwnProperty("neon")) values.neon = JSON.stringify(values.neon);

        return values;
    }

    static loadCharacter(id) {
        Vehicle.load("SELECT * FROM vehicle WHERE owner = ? AND active = ? AND destroyed = ? AND for_sale = ?", [
            id, 1, 0, 0
        ]);
    }

    static loadId(id) {
        Vehicle.load("SELECT * FROM vehicle WHERE id = ?", [
            id
        ]);
    }

    static load(sql, where) {
        if (!sql) sql = "SELECT * FROM vehicle";
        connection.query(sql, where, function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Loading Vehicle " + JSON.stringify(where));
                console.log("[Error]", err);
                return;
            }

            result.forEach((value, key) => {
                if (value.destroyed == false && vehicles[value.id] != null && vehicles[value.id].entity != null && !vehicles[value.id].entity.dead)
                    return

                let v = new Vehicle(value);
                if (!v.destroyed && v.active && v.position != null && v.rotation != null) {
                    let entity = mp.vehicles.new(v.hash, v.position);
                    
                    entity.locked = v.locked == 1 ? true : false;
                    entity.numberPlate = v.plate;
                    entity.databaseId = v.id;
                    v.data.entity = entity;

                    if (v.colour1 != null && v.colour2 != null)
                        entity.setColour(v.colour1, v.colour2);
                    else if (v.rgb1 != null && v.rgb2 != null)
                        entity.setColourRGB(v.rgb1.r, v.rgb1.g, v.rgb1.b, v.rgb2.r, v.rgb2.g, v.rgb2.b);

                    setTimeout(function() {
                        entity.rotation = v.rotation;

                        if (v.mods != null) {
                            console.log(v.mods);
                        }
                    }, 500);
                }

                vehicles[v.id] = v;
            });
            console.log("[Info]", `${result.length} vehicles loaded`);
        });
    }
}

module.exports = Vehicle;