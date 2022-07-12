import {ISongDisplay} from "../../main/library/ISongDisplay.js";

export class MockSongDisplay extends ISongDisplay {
    constructor() {
        super();
    }

    render(songs, currentSong) {
        this.songs = songs;
        this.currentSong = currentSong;
    }
}