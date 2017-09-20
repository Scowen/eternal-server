// CEF browser.
let menu;

// On init, execute basic functions to prepare for login.
mp.game.ui.displayRadar(false);
mp.gui.cursor.visible = true;
mp.gui.chat.visible = false;
mp.gui.chat.activate = false;

let cam = mp.cameras.new('default', new mp.Vector3(-1430.06591796875, -1389.8353271484375, 15.744191646575928), new mp.Vector3(0,0,270), 50);
cam.pointAtCoord({x: -1324.206298828125, y: -1483.844970703125, z: 6.898984432220459});
cam.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

// Creating browser.
mp.events.add('guiReady', () => {
    if (!menu) {
        // Creating CEF browser.
        menu = mp.browsers.new('package://rp/browser/index.html');
        // Init menus and events, when browser ready.
        mp.events.add('browserDomReady', (browser) => {
            if (browser == menu) {
                menu.execute('$("#loginform").fadeIn(350);');
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