class Utilities {
    static getPlayer(target) {
        var targetPlayer = null;
        var exactMatch = false;
        mp.players.forEach((player, id) => {
            if (player.character == "undefined" || player.character == null) return;
            if (exactMatch) return;
            if (player.character.identifier.includes(target)) targetPlayer = player;
            if (player.character.name.includes(target)) targetPlayer = player;
            if (player.character.identifier == target || player.character.name == target) {
                targetPlayer = player;
                exactMatch = true;
            }
        });

        return targetPlayer;
    }

    static number_format (number, decimals, decPoint, thousandsSep) {
        // http://locutus.io/php/strings/number_format/
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
        var n = !isFinite(+number) ? 0 : +number
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
        var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
        var s = ''
        var toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec)
            return '' + (Math.round(n * k) / k)
            .toFixed(prec)
        }
        // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
    }

    static refreshLabels() {
        mp.players.forEach((value, id) => {
            value.call("textLabels", JSON.stringify(labels));
        });
    }

    static refreshLabel(key, value) {
        mp.players.forEach((value, id) => {
            value.call("textLabel", key, JSON.stringify(value));
        });
    }

    static showOptionsBox(player, option, title, subtitle) {
        player.data.optionsBox = option;
        player.call("showOptionsBox", title, subtitle);
    }

    static hideOptionsBox(player, option) {
        player.data.optionsBox = null;
        player.call("hideOptionsBox");
    }

    static errorOptionsBox(player, message) {
        player.call("errorOptionsBox", message);
    }
}

module.exports = Utilities;