"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var filePath = path.join(app.getPath('userData'), 'window-info.json');
var restoreBounds = function () {
    var windowInfo;
    try {
        windowInfo = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
        if (_.isEqual(windowInfo, inkdrop.window.getBounds())) {
            return;
        }
    }
    catch (e) {
        windowInfo = { x: 0, y: 0, width: 800, height: 1000 };
    }
    inkdrop.window.setBounds(windowInfo);
};
var init = function () {
    restoreBounds();
    // make window movable.
    inkdrop.window.removeListener('maximize', init);
};
inkdrop.window.on('maximize', init);
inkdrop.window.on('close', function () {
    fs.writeFileSync(filePath, JSON.stringify(inkdrop.window.getBounds()));
});
