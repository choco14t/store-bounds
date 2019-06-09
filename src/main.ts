import * as path from 'path';
import * as fs from 'fs';
import {screen} from 'electron';

declare const inkdrop: any;

const configPath = inkdrop.packages.config.configDirPath;
const filePath = path.join(configPath, 'window-info.json');

const restoreBounds = () => {
  let windowInfo;

  try {
    windowInfo = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}));
  } catch (e) {
    windowInfo = {x: 0, y: 0, width: 800, height: 1000};
  }

  const primaryScreenBounds = screen.getPrimaryDisplay().bounds;
  if (windowInfo.width > primaryScreenBounds.width) {
    windowInfo.width = primaryScreenBounds.width;
  }

  if (windowInfo.height > primaryScreenBounds.height) {
    windowInfo.height = primaryScreenBounds.height;
  }

  inkdrop.window.setBounds(windowInfo);
};

const init = () => {
  restoreBounds();
  // make window movable.
  inkdrop.window.removeListener('maximize', init);
};

screen.on('display-added', restoreBounds);

inkdrop.window.on('maximize', init);

inkdrop.window.on('close', () => {
  fs.writeFileSync(filePath, JSON.stringify(inkdrop.window.getBounds()));
});
