import {IAudioRunner} from "./IAudioRunner.js";

export class AudioRunner extends IAudioRunner {
    constructor() {
        super();
        this.audio = new Audio();
        this._isPlaying = false;
        this.currentPosition = 0;
        this.duration = 0;
        this.songFinish = new Event("songFinish");
    }

    isPlaying() {
        return this._isPlaying;
    }

    play(file) {
        this.audio.src = URL.createObjectURL(new Blob([file.filebytes], {
            type: 'audio/mp3'
        }));

        this.audio.currentTime = this.currentPosition;
        this._isPlaying = true;

        let self = this;

        this.audio.addEventListener("timeupdate", function () {
            self.duration = self.audio.duration;
            self.currentPosition = self.audio.currentTime;
            if (self.currentPosition >= self.duration - 0.1) {
                document.dispatchEvent(self.songFinish);
            }
        });

        this.audio.play();

    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this._isPlaying = false;
        this.currentPosition = 0;
    }

    pause() {
        this.audio.pause();
        this._isPlaying = false;
        this.currentPosition = this.audio.currentTime;
    }

    setPosition(position) {
        this.audio.currentTime = position;
    }

    getPosition() {
        return this.currentPosition;
    }

    getSongLength() {
        if (isFinite(this.duration))
            return this.duration;
        else return 1;
    }
}