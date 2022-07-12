import {IAudioRunner} from "./IAudioRunner.js";

export class AudioRunner extends IAudioRunner {
    constructor() {
        super();
        this.audio = new Audio();
        // this.audio.autoplay = true;
        // this.audio.loop = true;
        // this.audio.volume = 0.5;
        this._isPlaying = false;
        this.currentTime = 0;
    }


    isPlaying() {
        return this._isPlaying;
    }

    play(file) {
        this.audio.src = URL.createObjectURL(new Blob([file.filebytes], {
            type: 'audio/mp3'
        }));

        this.audio.currentTime = this.currentTime;
        this.audio.play();
        this._isPlaying = true;
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this._isPlaying = false;
        this.currentTime = 0;
    }

    pause() {
        this.audio.pause();
        this._isPlaying = false;
        this.currentTime = this.audio.currentTime;
    }

    setPosition(position) {
        this.audio.fastSeek(position);
    }
}