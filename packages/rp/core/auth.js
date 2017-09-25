var maleTops = [0, 0, 2, 14, 14, 5, 14, 14, 8, 0, 14, 15, 12, 11, 12, 15, 0, 5, 0, 14, 14, 15, 0, 14, 14, 15, 11, 14, 14, 14, 14, 14, 14, 0, 0, 14, 5, 14, 8, 0, 15, 12, 11, 11, 0, 15, 14, 0, 1, 1, 1, 1, 2, 0, 1, 0, 0, 0, 14, 14, 15, 0, 14, 5, 14, 14, 15, 1, 14, 14, 0, 14, 0, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 1, 1, 1, 1, 14, 14, 14, 15, 6, 0, 0, 11, 11, 0, 0, 14, 14, 14, 14, 14, 14, 11, 14, 14, 14, 5, 1, 4, 14, 6, 14, 14, 14, 6, 14, 14, 15, 14, 14, 11, 14, 14, 1, 14, 0, 0, 14, 0, 0, 0, 0, 0, 14, 15, 14, 12, 14, 6, 14, 14, 6, 14, 0, 4, 4, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 14, 15, 14, 0, 0, 14, 14, 14, 14, 15, 1, 14, 15, 14, 15, 15, 15, 1, 15, 15, 15, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, 6, 5, 5, 5, 0, 0, 0, 0, 14, 15, 14, 14, 15, 14, 14, 15, 14, 14, 11, 5, 1, 8, 0, 4, 4, 14, 14, 4, 14, 14, 11, 0, 0, 5, 2, 2, 4];
var femaleTops = [0, 5, 2, 3, 4, 4, 5, 5, 5, 0, 5, 4, 12, 15, 14, 15, 15, 0, 15, 15, 5, 4, 4, 4, 5, 5, 12, 0, 15, 9, 2, 5, 4, 4, 6, 5, 4, 4, 2, 1, 2, 5, 5, 3, 3, 3, 3, 3, 14, 14, 14, 6, 6, 5, 5, 5, 14, 5, 5, 5, 0, 0, 5, 5, 5, 5, 6, 2, 0, 0, 0, 0, 0, 14, 15, 9, 9, 9, 9, 9, 9, 9, 15, 9, 14, 14, 9, 9, 0, 0, 6, 6, 5, 5, 5, 5, 4, 5, 5, 5, 0, 15, 3, 3, 5, 4, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 4, 11, 11, 11, 6, 6, 2, 2, 0, 14, 14, 14, 14, 14, 0, 3, 2, 5, 0, 3, 3, 5, 6, 5, 5, 14, 9, 5, 3, 3, 7, 1, 5, 5, 0, 0, 7, 5, 15, 15, 15, 15, 15, 15, 15, 11, 0, 5, 5, 5, 5, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 11, 3, 15, 15, 15, 14, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1, 8, 4, 0, 1, 4, 11, 11, 11, 11, 0, 1, 1, 1, 5, 4, 0, 5, 15, 15, 15, 15, 14, 15, 11, 3, 3, 4, 0, 0, 0, 11, 6, 1, 14, 3, 3, 3, 5, 3, 6, 6, 9, 14, 14, 4, 5];

mp.events.add('clientData', function(player, argumentsJson) {
    let args = JSON.parse(argumentsJson);

    if (args[0] == "login") {
        console.log("[Info]", `Login request from: ${args[1]}`);

        connection.query("SELECT * FROM account WHERE name = ? AND password = ? ", [args[1], args[2]], function(err, result) {
            if (result && result != null && result != "undefined" && result.length > 0) {
                player.account = new Account(result[0]);
                if (parseInt(player.account.active) == 1) {
                    console.log("[Success]", `Login request from: ${args[1]}`);
                    player.call('loginResult', true, "Success!");
                    charSelect(player);
                } else {
                    console.log("[Failed]", `Login request from: ${args[1]} (Not Active)`);
                    player.account = null;
                    player.call('loginResult', false, "Your account is not active");
                }
            } else {
                console.log("[Failed]", `Login request from: ${args[1]} (Invalid username/password`);
                player.account = null;
                player.call('loginResult', false, "Incorrect Username / Password");
            }
        });
    }

    if (args[0] == "character") {
        let charId = args[1];

        if (isNaN(charId))
            return;
        
        console.log("[Info]", `Char select from: ${player.account.name}`);

        loadCharacter(player, charId);
    }

    if (args[0] == "createCharacter") {
        let options = JSON.parse(args[1]);

        if (typeof options != "object")
            return;

        let name = options.firstname + "_" + options.lastname;
        connection.query("SELECT * FROM characters WHERE name = ? ", name, function(err, result) {
            if (result && result != null && result.length >= 1) {
                console.log("[Failed]", `Char create from: ${player.account.name} (Name exists)`);
                player.call('characterCreatedResult', false, "Character already exists");
                return;
            }

            let min = 100000;
            let max = 999999;
            let identifier = Math.floor(Math.random() * (max - min + 1)) + min;

            let identifierResult = connection.execute('SELECT identifier FROM characters WHERE identifier = ?', [identifier]);
            while (identifierResult != null && identifierResult != "undefined" && identifierResult._rows.length >= 1) {
                identifier = Math.floor(Math.random() * (max - min + 1)) + min;
                identifierResult = connection.execute('SELECT identifier FROM characters WHERE identifier = ?', [identifier]);
            }

            console.log(identifier, identifierResult);

            var unix = Math.round(+new Date()/1000);
            let position = { x: -1035.0762939453125, y: -2732.98095703125, z: 13.75663948059082 };

            let clothes = {
                shapeFirstID: options.shapeFirstID,
                shapeSecondID: options.shapeSecondID,
                skinFirstID: options.skinFirstID,
                hair: options.hair,
                hairColour: options.hairColour,
                beard: options.beard,
                beardColour: options.beardColour,
                torso: options.torso,
                legs: options.legs,
                foot: options.foot,
                jacket: options.jacket,
                jacketTexture: options.jacketTexture,
                undershirt: options.undershirt,
            };

            let insertOptions = {
                name: name,
                account: parseInt(player.account.id),
                position: JSON.stringify(position),
                heading: 328,
                dimension: 0,
                clothes: JSON.stringify(clothes),
                model: options.gender == 1 ? -1667301416 : 1885233650,
                identifier: identifier,
                identifier_int: parseInt(identifier),
                created: unix,
            }
            connection.query("INSERT INTO characters SET ? ", [insertOptions], function(err, result) {
                loadCharacter(player, identifier);

                console.log("[Success]", `Char create from: ${player.account.name} (${name})`);
                player.call('characterCreatedResult', true, "Success");
            });
        });
    }
});

function loadCharacter(player, identifier) {
    connection.query("SELECT * FROM characters WHERE identifier = ? ", [identifier], function(err, result) {
        if (result && result != null && result != "undefined" && result.length > 0) {
            player.character = new Character(result[0]);
            if (player.character.account != player.account.id) {
                console.log("[Failed]", `Char select from: ${player.account.name} (Account mismatch)`);
                player.call('characterSelectedResult', false, "Character account mismatch");
            }

            if (player.character.active == 0) {
                console.log("[Failed]", `Char select from: ${player.account.name} (Not active)`);
                player.call('characterSelectedResult', false, "Character no longer active");
            }

            player.position = JSON.parse(player.character.position);
            player.heading = player.character.heading;
            player.health = player.character.health;
            player.armour = player.character.armour;
            player.model = player.character.model;
            player.dimension = player.character.dimension;
            player.alpha = 255;

            let clothes = JSON.parse(player.character.clothes);
            // console.log(clothes);
            player.setHeadBlend(clothes.shapeFirstID, clothes.shapeSecondID, 0, clothes.skinFirstID, 0, 0, 0, 0, 0);
            // Beard and colour.
            // mp.trigger("setHeadOverlay", 1, options.beard, 255);
            // mp.trigger("setHeadOverlayColor", 1, options.beardColour, options.beardColour, options.beardColour);
            // player.setHeadOverlayColor(1, clothes.beardColour, clothes.beardColour, clothes.beardColour);
            
            // Hair and colour.
            // player.setClothes(1, clothes.beard, 0, 0);
            player.setClothes(2, clothes.hair, 0, 0);
            player.setHairColour(parseInt(clothes.hairColour), parseInt(clothes.hairColour));

            // Clothes.
            let top = (clothes.gender == 1) ? femaleTops[clothes.jacket] : maleTops[clothes.jacket];
            player.setClothes(3, top, 0, 0);
            player.setClothes(4, clothes.legs, 0, 0);
            player.setClothes(6, clothes.foot, 0, 0);
            player.setClothes(11, clothes.jacket, clothes.jacketTexture, 0);
            player.setClothes(8, clothes.undershirt, 0, 0);
/*
*/
            console.log("[Success]", `Char select from: ${player.account.name}`);
            player.call('characterSelectedResult', true, "Success");
        } else {
            console.log("[Failed]", `Char select from: ${player.account.name} (Doesn't exist)`);
            player.call('characterSelectedResult', false, "Character doesn't exist");
        }
    });
}

function charSelect(player) {
    // Send the player to the IPL location (apa_v_mp_h_05_b).
    player.position = { x: -774.2634887695312, y: 341.9762268066406, z: 196.68626403808594 };
    player.heading = 90;
    player.alpha = 255;

    connection.query("SELECT identifier, name, bank_money + hand_money as money, clothes, model FROM characters WHERE account = ? ", [player.account.id], function(err, result) {
        let chars = null;
        if (result && result != null && result != "undefined" && result.length > 0) {
            result.forEach((value, key) => {
                result[key].clothes = JSON.parse(value.clothes);
            });

            chars = JSON.stringify(result);
            // console.log(chars);
        }
        player.call('charSelect', chars);
    });
}