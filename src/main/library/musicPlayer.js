export class MusicPlayer {
    _isPlaying = false;
    songs = []
    currentSong = null;

    /**
     * @param {IAudioRunner} audioRunner
     * @param {ISongDisplay} songDisplay
     */
    constructor(audioRunner, songDisplay) {
        this.audioRunner = audioRunner;
        this.songDisplay = songDisplay;
        this.songDisplay.setMusicPlayer(this);
    }

    refresh(){
        this.songDisplay.render();
    }

    isPlaying() {
        return this._isPlaying;
    }

    /**
     * @param {Filedata} filedata
     */
    addFile(filedata) {
        this._isPlaying = true;
        this.songs.push(filedata);
        if (!this.audioRunner.isPlaying()) {
            this.audioRunner.play(filedata);
            this.currentSong = filedata;
        }
        this.refresh();
    }

    /**
     * @param {Filedata[]} files
     */
    addFiles(files) {
        files.forEach(f => this.addFile(f));
    }

    getIndex() {
        if (this.currentSong === null) return -1;
        return this.songs.indexOf(this.currentSong);
    }

    getSongsCount() {
        return this.songs.length;
    }

    playNext() {
        if (this.getIndex() === this.getSongsCount() - 1) return;
        this.audioRunner.stop();
        this.currentSong = this.songs[this.getIndex() + 1];
        this.audioRunner.play(this.currentSong);
        this.refresh();
    }

    playPrevious() {
        if (this.getIndex() === 0) return;
        this.audioRunner.stop();
        this.currentSong = this.songs[this.getIndex() - 1];
        this.audioRunner.play(this.currentSong);
        this.refresh();
    }

    pause() {
        if(!this.audioRunner.isPlaying()) return;
        this.audioRunner.pause();
        this._isPlaying = false;
        this.refresh();
    }

    play() {
        if(this.audioRunner.isPlaying()) return;
        this.audioRunner.play(this.currentSong);
        this._isPlaying = true;
        this.refresh();
    }

    playSong(song) {
        this.stop();
        this.currentSong = song;
        this.play();
    }

    stop() {
        if(!this.audioRunner.isPlaying()) return;
        this.audioRunner.stop();
        this._isPlaying = false;
        this.refresh();
    }
}
