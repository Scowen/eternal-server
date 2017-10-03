class Character {
    constructor(values) {
        if (values && values != null)
            for (var key in values)
                this[key] = values[key];

        this.data = {};
        this.data.adminDuty = false;
    }

    insert(values) {
        if (!values || values == null)
            return;

        if (values.hasOwnProperty("position")) values.position = JSON.stringify(values.position);
        if (values.hasOwnProperty("clothes")) values.clothes = JSON.stringify(values.clothes);

        values.created = Utilities.unix();

        connection.query("INSERT INTO characters SET ? ", [values], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Inserting Character");
                console.log("[Error]", err);
            } else {
                this.id = result.insertId;
            }
        });
    }

    save(player) {
        let values = {};
        for (var key in this)
            values[key] = this[key];

        if (values.hasOwnProperty("data")) delete values.data;

        values.position = JSON.stringify(player.position);
        values.heading = player.heading;
        values.health = player.health;
        values.armour = player.armour;
        values.last_played = Utilities.unix();

        connection.query("UPDATE characters SET ? WHERE id = ?", [values, values.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Character #" + values.id);
                console.log("[Error]", err);
            }
            // console.log("[Success]", "Saved Character #" + values.id);
        });
    }
}

module.exports = Character;