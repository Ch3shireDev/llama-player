// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendCounter: () => ipcRenderer.send('send-counter'),
    sendMusic: (filePath) => ipcRenderer.send('send-music', filePath),
    receiveCounter: (callback) => ipcRenderer.on('receive-counter', callback),
    playMusic: (callback) => ipcRenderer.on('play-music', callback),

});


//
// ipcRenderer.on('play-music', (event, binary) => {
//     // const audio = new Audio();
//     // console.log(binary);
//     // audio.src = URL.createObjectURL(new Blob([binary], { type: 'audio/mp3' }));
//     // audio.play();
//     alert('xxx')
//
// });