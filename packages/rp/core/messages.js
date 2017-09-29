var red = "#ff5454";
var white = "#ffffff";
var green = "#49ba37";
var orange = "#dbb148";
var yellow = "#fff966";
var blue = "#3fafdb";
var silver = "#d2d6d8";
var grey = "#9fa2a3";
var black = "#000000";
var violet = "#e6ccff";
var purple = "#9702ff";

var adminTag = `!{red}[Admin]!{white}`;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Messages {
    static adminMessage(player, message) {
        player.outputChatBox(`${adminTag} ${message}`);
    }

    static adminSuccessMessage(player, message) {
        player.outputChatBox(`${adminTag} !{green}Success:!{white} ${message}`);
    }

    static adminErrorMessage(player, message) {
        player.outputChatBox(`${adminTag} !{red}Error:!{white} ${message}`);
    }

    static adminInfoMessage(player, message) {
        player.outputChatBox(`${adminTag} !{orange}Info:!{white} ${message}`);
    }

    static message(player, message) {
        player.outputChatBox(message);
    }

    static successMessage(player, message) {
        player.outputChatBox(`!{green}Success:!{white} ${message}`);
    }

    static errorMessage(player, message) {
        player.outputChatBox(`!{red}Error:!{white} ${message}`);
    }

    static infoMessage(player, message) {
        player.outputChatBox(`!{orange}Info:!{white} ${message}`);
    }

    static meMessage(player, message) {
        
        mp.players.broadcastInRange(player.position, 15, `!{violet}${player.character.name} ${message}`);
    }

    static doMessage(player, message) {
        
        mp.players.broadcastInRange(player.position, 15, `!{violet}${capitalizeFirstLetter(message)} (${player.character.name})`);
    }

    static subtitleMessage(player, message) {
        Utilities.showSubtitleBox(player, message);
    }
}

module.exports = Messages;