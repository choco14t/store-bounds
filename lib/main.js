'use babel';

import path from 'path';
import fs from 'fs';

export const filePath = path.join(app.getPath('userData'), 'window-info.json');

const restoreBounds = () => {
  let windowInfo;

  try {
    windowInfo = JSON.parse(fs.readFileSync(filePath), 'utf8');
  } catch (e) {
    windowInfo = {x: 0, y: 0, width: 800, height: 1000};
  }

  inkdrop.window.setBounds(windowInfo);
};

const init = () => {
  restoreBounds();
  // make window movable.
  inkdrop.window.removeListener('moved', init);
};

// trigger moved event.
inkdrop.window.center();
inkdrop.window.on('moved', init);

inkdrop.window.on('close', () => {
  fs.writeFileSync(filePath, JSON.stringify(inkdrop.window.getBounds()));
});
