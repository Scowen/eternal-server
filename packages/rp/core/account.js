class Account {
    constructor(values) {
        if (values && values != null)
            for (var key in values)
                this[key] = values[key];
    }

    save() {
        connection.query("UPDATE account SET ? WHERE id = ?", [this, this.id], function(err, result) {
            if (err && err != null) {
                console.log("[Error]", "Saving Account #" + this.id);
                console.log("[Error]", err);
            }
        });
    }
}

module.exports = Account;