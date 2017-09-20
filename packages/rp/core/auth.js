mp.events.add('clientData', function(player, argumentsJson) {
    let args = JSON.parse(argumentsJson);

    player.outputChatBox("Success")

    if (args[0] != "login")
        return;
    console.log("[Info]", `Login request from: ${args[1]}`);

    connection.query("SELECT * FROM account WHERE name = ? AND password = ? ", [args[1], args[2]], function(err, result) {
        if (result && result != null && result != "undefined" && result.length > 0) {
            console.log("[Info]", `Successful login request from: ${args[1]}`);
            player.account = new Account(result[0]);
            player.call('loginResult', true, "Success!");
        } else {
            console.log("[Info]", `Failed login request from: ${args[1]}`);
            player.account = null;
            player.call('loginResult', false, "Invalid Username/Password Combination");
        }
    });
});