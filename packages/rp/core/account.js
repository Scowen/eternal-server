let method = Account.prototype;

function Account(results) {
    this.id = results.id;
    this.name = results.name;
    this.email = results.email;
    this.password = results.password;
    this.credits = results.credits;
    this.social = results.social;
    this.charSlots = results.charSlots;
    this.donator = results.donator;
    this.vip = results.vip;
    this.currentIp = results.currentIp;
    this.active = results.active;
    this.banned = results.banned;
    this.admin = results.admin;
    this.lastUpdated = results.lastUpdated;
    this.created = results.created;
}

method.getName = function() {
    return this.name;
};

module.exports = Account;