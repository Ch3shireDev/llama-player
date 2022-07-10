import {MusicPlayer} from "../main/library/musicPlayer";

const {Filedata} = require("../main/library/filedata");


test('adding file to empty playlist results in starting playing', () => {
    let musicPlayer = new MusicPlayer();
    expect(musicPlayer.isPlaying()).toBe(false);
    musicPlayer.addFile(new Filedata('test.mp3'));
    expect(musicPlayer.isPlaying()).toBe(true);
});