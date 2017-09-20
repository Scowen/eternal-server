mp.events.add('clientData', function(player, argumentsJson) {
    let args = JSON.parse(argumentsJson);

    if (args[0] != "login")
        return;

    console.log("[Info]", `Login request from: ${args[1]}`);

    connection.query("SELECT * FROM account WHERE name = ? AND password = ? ", [args[1], args[2]], function(err, result) {
        if (result && result != null && result != "undefined" && result.length > 0) {
            console.log("[Info]", `Successful login request from: ${args[1]}`);

            player.account = new Account(result[0]);
            player.call('loginResult', true, "Success!");

            charSelect(player);
        } else {
            console.log("[Info]", `Failed login request from: ${args[1]}`);
            player.account = null;
            player.call('loginResult', false, "Incorrect Username / Password");
        }
    });
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