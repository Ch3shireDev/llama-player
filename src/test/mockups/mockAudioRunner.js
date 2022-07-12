import {IAudioRunner} from "../../main/library/IAudioRunner.js";

export class MockAudioRunner extends IAudioRunner {

    playFile = null;
    _isPlaying = false;

    isPlaying() {
        return this._isPlaying;
    }

    play(filedata) {
        this.playFile = filedata;
        this._isPlaying = true;
    }

    stop() {
        this.playFile = null;
        this._isPlaying = false;
        this.currentPosition = 0;
    }

    pause(){
        this._isPlaying = false;
    }

    setPosition(position){
        this.currentPosition = position;
    }

    getPosition(){
        return this.currentPosition;
    }
}