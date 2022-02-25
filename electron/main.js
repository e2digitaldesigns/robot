const { app: electronApp, BrowserWindow } = require("electron");
const robot = require("robotjs");

let mainWindow;
const width = 500;
const height = 500;
const isDev = false;
robot.keyTap("o");

electronApp.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: width,
    minWidth: width,
    height: height,
    minHeight: height,
    resizable: true,
    frame: true,
    backgroundColor: "#ffffff",
    movable: true,
    minimizable: true,
    maximizable: true,
    show: false,
    webPreferences: {
      contextIsolation: false,
      devTools: isDev,
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
      webSecurity: false
    }
  });

  mainWindow.setAspectRatio(width / height);
  // mainWindow.loadFile(`${__dirname}/build/index.html`);

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(`${__dirname}/build/index.html`);
  }

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("closed", () => {
    electronApp.quit();
    mainWindow = null;
  });
});
