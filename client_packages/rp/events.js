exports = function(menu) {
    mp.events.add('cefData', function() {
        mp.events.callRemote('clientData', JSON.stringify(arguments));
    });

    mp.events.add("FaceCam", function() {
        dynCam = mp.cameras.new('default', new mp.Vector3(-776.551025390625, 341.9223291015625, 197.94626403808594), new mp.Vector3(-15,0,270), 10);
        dynCam.setActive(true);
        mp.game.cam.renderScriptCams(true, true, 1000, true, false);
    });

    mp.events.add("BodyCam", function() {
        dynCam = mp.cameras.new('default', new mp.Vector3(-776.3551025390625, 342.0123291015625, 197.38626403808594), new mp.Vector3(-15,0,270), 57);
        dynCam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    });
};