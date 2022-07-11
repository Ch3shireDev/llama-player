import {IAudioRunner} from "../../main/library/IAudioRunner";

export class MockAudioRunner extends IAudioRunner {

    playFile = null;
    isPlaying = false;

    play(filedata) {
        this.playFile = filedata;
        this.isPlaying = true;
    }

    stop() {
        this.playFile = null;
        this.isPlaying = false;
    }
}