
mp.events.addCommand("me", (player, message) => {
    Messages.meMessage(player, message);
});

mp.events.addCommand("do", (player, message) => {
    Messages.doMessage(player, message);
});