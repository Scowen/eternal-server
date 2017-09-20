// CEF browser.
let menu;

global.dynCam;

// On init, execute basic functions to prepare for login.
loginScenario();

// Creating browser.
mp.events.add('guiReady', () => {
    if (!menu) {
        // Creating CEF browser.
        menu = mp.browsers.new('package://rp/browser/index.html');
        // Init menus and events, when browser ready.
        mp.events.add('browserDomReady', (browser) => {
            if (browser == menu) {
                menu.execute('$("#loginform").fadeIn(400);');
                // Init events.
                require('rp/events.js')(menu);
                

                // mp.gui.execute(`insertMessageToChat('<div style="background-color: rgba(0, 0, 0, 0.75); font-size: 1.0vw; padding: 6px; color: #ff0000; font-weight: 600;"></div>', 'true');`);
            }
        });
    }
});

mp.events.add("loginResult", (result, reason) => {
    if (!menu) return;
    menu.execute(`loginResult(${result}, "${reason}")`);
});

mp.events.add("charSelect", (chars) => {
    hideUI();
    dynCam = mp.cameras.new('default', new mp.Vector3(-776.3551025390625, 342.0123291015625, 197.38626403808594), new mp.Vector3(-15,0,270), 57);
    dynCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);

    if (!menu) return;
    menu.execute(`loadCharacters(${chars})`);
});

mp.events.add("IPL", (value) => {
    mp.game.streaming.requestIpl(value);
});

function resetCamera() {
    mp.game.cam.renderScriptCams(false, true, 0, false, false);
    dynCam = null;
}

function hideUI() {
    mp.game.ui.displayRadar(false);
    mp.gui.cursor.visible = true;
    mp.gui.chat.show(false);
}

function showUI() {
    mp.game.ui.displayRadar(true);
    mp.gui.cursor.visible = false;
    mp.gui.chat.show(true);
}

function loginScenario() {
    hideUI();

    dynCam = mp.cameras.new('default', new mp.Vector3(-1430.06591796875, -1389.8353271484375, 15.744191646575928), new mp.Vector3(0,0,270), 50);
    dynCam.pointAtCoord({x: -1324.206298828125, y: -1483.844970703125, z: 6.898984432220459});
    dynCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
}
