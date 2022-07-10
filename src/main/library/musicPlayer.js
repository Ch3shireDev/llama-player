export class MusicPlayer {
    _isPlaying = false;

    constructor() {
        console.log('hello')
    }

    isPlaying() {
        return this._isPlaying;
    }

    /**
     * @param {Filedata} filedata
     */
    addFile(filedata) {
        this._isPlaying = true;
    }
}
