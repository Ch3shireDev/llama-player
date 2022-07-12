import {ISongDisplay} from "./ISongDisplay.js";

export class SongDisplay extends ISongDisplay {
    constructor(displayElement, musicTabElement) {
        super();
        this.displayElement = displayElement;
        this.musicTabElement = musicTabElement;
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
    }
}