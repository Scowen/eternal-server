let method = Account.prototype;

function Account(results) {
    this.id = results.id;
    this.name = results.name;
    this.email = results.email;
    this.password = results.password;
    this.credits = results.credits;
    this.social = results.social;
    this.char_slots = results.char_slots;
    this.donator = results.donator;
    this.vip = results.vip;
    this.current_ip = results.current_ip;
    this.active = results.active;
    this.admin = results.admin;
    this.quiz_passed = results.quiz_passed;
    this.quiz_cooldown = results.quiz_cooldown;
    this.last_updated = results.last_updated;
    this.created = results.created;
}

method.getName = function() {
    return this.name;
};

module.exports = Account;