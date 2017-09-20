exports = function(menu) {
    mp.events.add('cefData', function() {
        mp.events.callRemote('clientData', JSON.stringify(arguments));
    });
};