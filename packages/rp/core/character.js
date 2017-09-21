let method = Character.prototype;

function Character(results) {
    this.id = results.id;
    this.account = results.account;
    this.identifier = results.identifier;
    this.mask_identifier = results.mask_identifier;
    this.name = results.name;
    this.identifier = results.identifier;
    this.bank_money = results.bank_money;
    this.hand_money = results.hand_money;
    this.position = results.position;
    this.heading = results.heading;
    this.health = results.health;
    this.armour = results.armour;
    this.dimension = results.dimension;
    this.num_jails = results.num_jails;
    this.num_prisons = results.num_prisons;
    this.num_admin_jails = results.num_admin_jails;
    this.jail = results.jail;
    this.prison = results.prison;
    this.admin_jail = results.admin_jail;
    this.previous_name = results.previous_name;
    this.radio_frequency = results.radio_frequency;
    this.model = results.model;
    this.faction = results.faction;
    this.faction_points = results.faction_points;
    this.dead = results.dead;
    this.limbo = results.limbo;
    this.phone_no = results.phone_no;
    this.experience = results.experience;
    this.salary = results.salary;
    this.license_driving = results.license_driving;
    this.license_hgv = results.license_hgv;
    this.license_motorbike = results.license_motorbike;
    this.license_weapon = results.license_weapon;
    this.license_pilot = results.license_pilot;
    this.license_medical = results.license_medical;
    this.weapons = results.weapons;
    this.inventory = results.inventory;
    this.keys = results.keys;
}

method.getName = function() {
    return this.name;
};

module.exports = Character;