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

        connection.query("SELECT * FROM character WHERE id = ? ", [charId], function(err, result) {
            if (result && result != null && result != "undefined" && result.length > 0) {
                player.character = result[0];
                if (player.character.account == player.account.id) {
                    if (player.character.active == 1) {
                        console.log("[Success]", `Char select from: ${player.account.name}`);
                        player.call('characterSelectedResult', true, "Success");
                    } else {
                        console.log("[Failed]", `Char select from: ${player.account.name} (Not active)`);
                        player.call('characterSelectedResult', false, "Character no longer active");
                    }
                } else {
                    console.log("[Failed]", `Char select from: ${player.account.name} (Account mismatch)`);
                    player.call('characterSelectedResult', false, "Character account mismatch");
                }
            } else {
                console.log("[Failed]", `Char select from: ${player.account.name} (Doesn't exist)`);
                player.call('characterSelectedResult', false, "Character doesn't exist");
            }

        });
    }
});

function charSelect(player) {
    // Send the player to the IPL location (apa_v_mp_h_05_b).
    player.position = { x: -774.2634887695312, y: 341.9762268066406, z: 196.68626403808594 };
    player.heading = 90;
    player.alpha = 255;

    var chars = JSON.stringify({
        1: {
            id: 1,
            identifier: "41513",
            name: "Luke Lost",
            money: 121345,
            last_played: 1505938456,
            play_time: 84584,
        }, 
        2: {
            id: 2,
            identifier: "05424",
            name: "John Doe",
            money: 63454,
            last_played: 1505928456,
            play_time: 54584,
        }
    });
    player.call('charSelect', chars);
}