var gpio = require('rpi-gpio');
var request = require('request');
var CONFIG = require('./config.json');

gpio.setup(CONFIG.KEYBOX_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(CONFIG.ROOM_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.on('change', function (channel, value) {
    switch (channel) {
        case CONFIG.KEYBOX_PIN:
            request.post(CONFIG.SERVICE_ADDRESS + "keybox", { keybox: value }, function (error, res) {
                if (error) {
                    console.log(error);
                }
            });
            break;
        case CONFIG.ROOM_PIN:
            request.post(CONFIG.SERVICE_ADDRESS + "room", { room: value }, function (error, res) {
                if (error) {
                    console.log(error);
                }
            });
            break;
    }
});
