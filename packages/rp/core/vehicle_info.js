class VehicleInfo {
    constructor(values) {
        if (values && values != null)
            for (var key in values)
                this[key] = values[key];

        if (this.hasOwnProperty("max_modifications")) this.max_modifications = JSON.parse(this.max_modifications);

        vehicleInfos[this.hash] = this;
    }

    insert(values) {
        if (!values || values == null)
            return;

        values = VehicleInfo.stringify(values);

        values.last_updated = Utilities.unix();
        values.created = Utilities.unix();

        connection.query("INSERT INTO vehicle_info SET ? ", [values], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Inserting Vehicle");
                console.log("[Error]", err);
            } else {
                this.id = result.insertId;
                vehicleInfos[this.hash] = this;
            }
        });
    }

    save() {
        let values = this;

        values = VehicleInfo.stringify(values);

        values.last_updated = Utilities.unix();

        connection.query("UPDATE vehicle_info SET ? WHERE id = ?", [values, this.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Vehicle #" + this.id);
                console.log("[Error]", err);
            }
        });
    }

    static stringify(values) {
        if (values.hasOwnProperty("max_modifications")) values.max_modifications = JSON.stringify(values.max_modifications);

        return values;
    }

    static load(where) {
        let sql = "SELECT * FROM vehicle_info";
        if (where != null) {
            sql = "SELECT * FROM vehicle_info WHERE ?";
            where = [where];
        }
        connection.query(sql, where, function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Loading Vehicle " + JSON.stringify(where));
                console.log("[Error]", err);
                return;
            }

            result.forEach((value, key) => {
                let v = new VehicleInfo(value);
            });

            console.log("[Info]", `${result.length} vehicle informations loaded`);
        });
    }
}

module.exports = VehicleInfo;