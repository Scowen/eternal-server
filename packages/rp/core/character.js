let method = Character.prototype;

function Character(results) {
    this.id = results.id;
    this.account = results.account;
    this.identifier = results.identifier;
    this.mask_identifier = results.mask_identifier;
    this.name = results.name;
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
    this.clothes = results.clothes;
    this.faction = results.faction;
    this.faction_rank = results.faction_rank;
    this.faction_points = results.faction_points;
    this.dead = results.dead;
    this.limbo = results.limbo;
    this.active = results.active;
    this.phone_no = results.phone_no;
    this.phone_caller_id = results.phone_caller_id;
    this.experience = results.experience;
    this.salary = results.salary;
    this.license_driving = results.license_driving;
    this.license_driving_advanced = results.license_driving_advanced;
    this.license_hgv_1 = results.license_hgv_1;
    this.license_hgv_2 = results.license_hgv_2;
    this.license_hgv_3 = results.license_hgv_3;
    this.license_motorbike = results.license_motorbike;
    this.license_weapon = results.license_weapon;
    this.license_weapon_advanced = results.license_weapon_advanced;
    this.license_pilot = results.license_pilot;
    this.license_pilot_advanced = results.license_pilot_advanced;
    this.license_medical = results.license_medical;
    this.weapons = results.weapons;
    this.inventory = results.inventory;
    this.vehicle_keys = results.vehicle_keys;
    this.play_time = results.play_time;
    this.last_played = results.last_played;
    this.created = results.created;
}

method.getName = function() {
    return this.name;
};

module.exports = Character;