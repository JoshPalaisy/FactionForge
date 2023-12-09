import path from 'path'
import {
  app,
  ipcMain,
  nativeImage,
  Tray,
  Menu,
  nativeTheme,
  remote,
  autoUpdater,
  Notification
} from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
const { resolve } = require('path')

const isProd = process.env.NODE_ENV === 'production'
// const win = remote.getCurrentWindow();
// const remoteTray = remote.Tray

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

let tray


const BuildUpdaterWindow = async () => {
  const updaterWindow = createWindow('main', {
    width: 500,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30
    },
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  nativeTheme.themeSource = 'dark'

  if (isProd) {
    await updaterWindow.loadURL('app://./updater')
  } else {
    const port = process.argv[2]
    await updaterWindow.loadURL(`http://localhost:${port}/updater`)
    // loginWindow.webContents.openDevTools()
  }
}

const BuildLoginWindow = async () => {
  const loginWindow = createWindow('main', {
    width: 500,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30
    },
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  nativeTheme.themeSource = 'dark'
  if (isProd) {
    await loginWindow.loadURL('app://./')
    return
  } else {
    const port = process.argv[2]
    await loginWindow.loadURL(`http://localhost:${port}/`)
    // loginWindow.webContents.openDevTools()
    return
  }  
}

const BuildMainWindow = async () => {
  const mainWindow = createWindow('main', {
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hiddenInset',
    maximizable: false,
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30
    },
    autoHideMenuBar: true,
    resizable: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  if (isProd) {
    await mainWindow.loadURL('app://./launcher')
    return
  }
  else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/launcher`)
    nativeTheme.themeSource = 'dark'
    // mainWindow.webContents.openDevTools()
    return
  }
}

const BuildTray = () => {
  const iconPath = path.join(__dirname, './icon.png');
  tray = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    { icon: iconPath, label: 'Faction Forge', disabled: true },
    { label: 'Official Website', type: 'normal' },
    { label: '', type: 'separator' },
    {label: 'Restore', type: 'normal', click: async () => BuildMainWindow()},
    { label: 'Quit', type: 'normal', click: () => app.quit() }
  ])

  tray.setToolTip('Star Citizen Org Manager')
  tray.setContextMenu(contextMenu)
  return
}

function initAutoUpdater() {
  autoUpdater.autoDownload = false;
  const feedURL = '';
  autoUpdater.setFeedURL({url: feedURL});
  console.log('UPDATE FEED SET>>>>>', feedURL)

  // Check for updates (you might want to do this based on some user action)
  autoUpdater.checkForUpdates();
  console.log('CHECKING FOR UPDATES>>>>>')
  // Handle update events
  autoUpdater.on('update-available', () => {
    console.log('UPDATE AVAILABLE>>>>>')
    BuildUpdaterWindow()
  });

  autoUpdater.on('update-not-available', () => {
    BuildLoginWindow()
    .then(() => console.log('UPDATE NOT AVAILABLE>>>>>'))
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('UPDATE DOWNLOADED SUCCESS>>>>>')
    console.log('RESTARTING AND INSTALLING NOW>>>>>>>')
    autoUpdater.quitAndInstall()
  });

  autoUpdater.on('error', (error) => {
    // Handle error during update process
    console.error('AutoUpdater error:', error.message || error);
  });
}

(async () => {
  await app.whenReady()
  if(isProd) {
    initAutoUpdater()
  }
  else {
    BuildLoginWindow()
  }
  return { app }
})()

app.on('close', (e) => {
  e.preventDefault();
  console.log('BEFORE QUIT >>>>>>')
})

app.on('window-all-closed', () => {
  console.log('WINDOW ALL CLOSED >>>>>>')
  app.quit
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.on('login-success', async (event, arg) => {
  console.log('POST LOGIN TASKS STARTED >>>>>')
  BuildMainWindow()
  .then(() => BuildTray())

})

ipcMain.on('minimize', () => {
  win.minimize()
})
