import {MusicPlayer} from "../library/musicPlayer.js";
import {AudioRunner} from "../library/audioRunner.js";
import {SongDisplay} from "../library/songDisplay.js";

const songDisplay = new SongDisplay(document);
const audioRunner = new AudioRunner();
const musicPlayer = new MusicPlayer(audioRunner, songDisplay);

songDisplay.render();

const buttonElement = document.getElementById('button')
const progressBar = document.getElementById('progress-bar');

progressBar.onchange = () => {
    musicPlayer.setPosition(progressBar.value);
};

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

pause.onclick = () => {
    musicPlayer.pause();
}

play.onclick = () => {
    musicPlayer.play();
}

previous.onclick = () => {
    musicPlayer.playPrevious();
}

next.onclick = () => {
    musicPlayer.playNext();
}

buttonElement.onclick = () => {
    // open file dialog then take selected file paths and send to electron
    dialog.click();
}

window.electronAPI.playMusic((event, file) => {
    musicPlayer.addFile(file);
});

