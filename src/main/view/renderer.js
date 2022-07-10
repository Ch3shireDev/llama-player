import {MusicPlayer} from "../library/musicPlayer.js";

const musicPlayer = new MusicPlayer();

const audio = new Audio();

const buttonElement = document.getElementById('button')
const dialog = document.createElement("input");
dialog.type = "file";
dialog.setAttribute("multiple", 'true');
dialog.setAttribute("accept", "audio/*");

dialog.onchange = () => {
    const filePaths = dialog.files;
    for (let i = 0; i < filePaths.length; i++) {
        const filePath = filePaths[i].path;
        window.electronAPI.sendMusic(filePath);
    }
}

const previous = document.getElementById('previous')
const next = document.getElementById('next')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const stop = document.getElementById('stop')

pause.onclick = () => {
    audio.pause();
}

play.onclick = () => {
    audio.play();
}

stop.onclick = () => {
    audio.fastSeek(0);
    audio.pause();
}

const songs = []

function showSongs() {
    const songsList = document.getElementById('songs-list')
    songsList.innerHTML = '';
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const li = document.createElement('li');
        li.innerText = song.filename;
        li.classList.add('song-element')
        songsList.appendChild(li);
    }
}

buttonElement.addEventListener('click', () => {
    // open file dialog then take selected file paths and send to electron
    dialog.click();
})

function playMusic(file) {
    audio.src = URL.createObjectURL(new Blob([file.filebytes], {
        type: 'audio/mp3'
    }));
    audio.play();
}

window.electronAPI.playMusic((event, file) => {
    playMusic(file);
    document.getElementById('music-tab').innerText = `Aktualnie odtwarzane: ${file.filename}`;
    songs.push(file);
    showSongs();
});

