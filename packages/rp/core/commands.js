mp.events.addCommand("me", (player, message) => {
    let pos = player.position;

    mp.players.broadcastInRange(pos, 15, `${player.name} ${message}`);

});