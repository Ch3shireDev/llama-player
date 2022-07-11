export class MusicPlayer {
    _isPlaying = false;
    songs = []

    /**
     * @param {IAudioRunner} audioRunner
     * @param audioRunner
     */
    constructor(audioRunner) {
        this.audioRunner = audioRunner;
    }

    isPlaying() {
        return this._isPlaying;
    }

    /**
     * @param {Filedata} filedata
     */
    addFile(filedata) {
        this._isPlaying = true;
        this.songs.push(filedata)
        this.audioRunner.play(filedata);
    }
}
