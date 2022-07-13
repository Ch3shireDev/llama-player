import {ISongDisplay} from "./ISongDisplay.js";

export class SongDisplay extends ISongDisplay {
    constructor(document) {
        super();
        this.displayElement = document.getElementById('song-display');
        this.musicTabElement = document.getElementById('music-tab');
        this.playButton = document.getElementById('play');
        this.pauseButton = document.getElementById('pause');
        this.progressBar = document.getElementById('progress-bar');
    }

    setMusicPlayer(musicPlayer) {
        this.musicPlayer = musicPlayer;
    }

    render() {
        this.displayElement.innerHTML = '';
        this.musicPlayer.songs.forEach(song => {
            let li = document.createElement('li');
            li.innerText = song.filename;
            li.classList.add('song-element');
            li.onclick = () => {
                this.musicPlayer.playSong(song);
            }
            if (song === this.musicPlayer.currentSong) {
                li.classList.add('current-song');
            }
            this.displayElement.appendChild(li);
        });
        if (this.musicPlayer.isPlaying()) {
            this.musicTabElement.innerText = 'Jest muzyka 😊';
        } else {
            this.musicTabElement.innerText = 'Nie ma muzyki 🥺';
        }

        if (this.musicPlayer.isPlaying()) {
            this.playButton.style.display = 'none';
            this.pauseButton.style.display = 'block';
        } else {
            this.playButton.style.display = 'block';
            this.pauseButton.style.display = 'none';
        }

        this.progressBar.setAttribute("max", this.musicPlayer.getSongLength());
        this.progressBar.setAttribute("value", this.musicPlayer.getPosition());
    }
}