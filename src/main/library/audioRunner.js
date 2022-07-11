import {IAudioRunner} from "./IAudioRunner.js";

export class AudioRunner extends IAudioRunner{
    constructor() {
        super();
        console.log('xxx')
        this.audio = new Audio();
        // this.audio.autoplay = true;
        // this.audio.loop = true;
        // this.audio.volume = 0.5;
    }

    play(file) {
    console.log('play', file);
        this.audio.src = URL.createObjectURL(new Blob([file.filebytes], {
            type: 'audio/mp3'
        }));
        this.audio.play();
    }

    stop() {
        this.audio.pause();
    }
}