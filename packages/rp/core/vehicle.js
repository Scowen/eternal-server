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

        vehicles[this.id] = this;
    }

    static insert(values) {
        if (!values || values == null)
            return;

        values = Vehicle.stringify(values);

        values.last_updated = Utilities.unix();
        values.created = Utilities.unix();

        connection.query("INSERT INTO vehicle SET ? ", [values], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Inserting Vehicle");
                console.log("[Error]", err);
                return null;
            } else {
                return result.insertId;
            }
        });
    }

    save() {
        let values = this;
        values = Vehicle.stringify(values);
        values.last_updated = Utilities.unix();

        connection.query("UPDATE vehicle SET ? WHERE id = ?", [values, this.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Vehicle #" + this.id);
                console.log("[Error]", err);
            }
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

    static load(sql, where) {
        if (!sql) sql = "SELECT * FROM vehicle";
        connection.query(sql, where, function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Loading Vehicle " + JSON.stringify(where));
                console.log("[Error]", err);
                return;
            }

            result.forEach((value, key) => {
                let v = new Vehicle(value);
                if (!v.destroyed && v.active) {
                    let veh = mp.vehicles.new(v.hash, v.position);
                    if (v.color1 != null && v.color2 != null)
                        veh.setColour(v.color1, v.color2);
                    else if (v.rgb1 != null && v.rgb2 != null)
                        veh.setColourRGB(v.rgb1.r, v.rgb1.g, v.rgb1.b, v.rgb2.r, v.rgb2.g, v.rgb2.b);
                    
                    veh.numberPlate = v.plate;
                    veh.databaseId = v.id;
                    v.entity = veh;

                    setTimeout(function() {
                        veh.rotation = v.rotation;

                        if (mods != null) {
                        
                        }
                    }, 500);
                }

                vehicles[v.hash] = v;
            });
        });
    }
}

module.exports = Vehicle;