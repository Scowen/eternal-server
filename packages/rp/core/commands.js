findPlayerByIdOrNickname = playerName => {
  let foundPlayer = null;

  // If playerName is numberic
  if (playerName == parseInt(playerName)) {
    // search player by ID
    foundPlayer = mp.players.at(playerName);
  }

  // or search player by nickname
  if (!foundPlayer) {
    mp.players.forEach((_player) => {
      if (_player.name === playerName) {
        foundPlayer = _player;
      }
    });
  }

  return foundPlayer;
};

module.exports = {

  // Add command `/pm`
  "pm": (player, args) => {
    // Check args
    if (args.length < 3 || !args[1].length || !args[2].length) {
      player.outputChatBox('Valid syntax: <b>/pm [recipient_id_or_nickname] [text_message]</b>');

      return false;
    }

    // Search recipient by second argument
    const recipient = findPlayerByIdOrNickname(args[1]);

    // If recipient not found show special message
    if (!recipient) {
      player.outputChatBox('<b>User not found</b>');

      return false;
    }

    // Source message
    const message = args.slice(2).join(' ');
    // Generate chat string in the following format:
    // [PM] Sender_Nickname[Sender_Id] -> Recipient_Nickname[Recipient_Id]: Text message
    const str = `<b>[PM] ${player.name}[${player.id}] -> ${recipient.name}[${recipient.id}]</b>: ${message}`;

    // Send message to recipient
    recipient.outputChatBox(str);
    // Send message to sender
    player.outputChatBox(str);
  }

};