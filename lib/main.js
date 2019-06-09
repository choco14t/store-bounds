"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var electron_1 = require("electron");
var configPath = inkdrop.packages.config.configDirPath;
var filePath = path.join(configPath, 'window-info.json');
var restoreBounds = function () {
    var windowInfo;
    try {
        windowInfo = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
    }
    catch (e) {
        windowInfo = { x: 0, y: 0, width: 800, height: 1000 };
    }
    var primaryScreenBounds = electron_1.screen.getPrimaryDisplay().bounds;
    if (windowInfo.width > primaryScreenBounds.width) {
        windowInfo.width = primaryScreenBounds.width;
    }
    if (windowInfo.height > primaryScreenBounds.height) {
        windowInfo.height = primaryScreenBounds.height;
    }
    inkdrop.window.setBounds(windowInfo);
};
var init = function () {
    restoreBounds();
    // make window movable.
    inkdrop.window.removeListener('maximize', init);
};
electron_1.screen.on('display-added', restoreBounds);
inkdrop.window.on('maximize', init);
inkdrop.window.on('close', function () {
    fs.writeFileSync(filePath, JSON.stringify(inkdrop.window.getBounds()));
});
