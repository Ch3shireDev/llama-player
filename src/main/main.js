const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron')
const path = require('path')
const reload = require('electron-reload');
const fs = require('fs');


reload(__dirname, {
    electron: path.join(__dirname, '../../', 'node_modules', '.bin', 'electron')
});

let mainWindow = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            devTools: true,
            // allowRunningInsecureContent: true,
            // webSecurity: false
        }
    });

    mainWindow.webContents.openDevTools()
    setMenuItems(mainWindow);
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    ipcMain.on('send-music', (event, filePath) => {
        const file = sendMusicFile(filePath)
        mainWindow.webContents.send('play-music', file)
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function sendMusicFile(filepath) {

    const filename = path.basename(filepath);
    const filebytes = fs.readFileSync(filepath);
    const file = {filename, filebytes, filepath};

    mainWindow.webContents.send('play-music', file);
}

function setMenuItems(mainWindow) {
    const menuItems = [

        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile', 'singleFile']
                        }).then(result => {
                            const cancelled = result.canceled;
                            if (cancelled) return;
                            const filePaths = result.filePaths;
                            filePaths.forEach(filePath => {
                                sendMusicFile(filePath);
                            })
                        })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuItems)
    Menu.setApplicationMenu(menu);
}
