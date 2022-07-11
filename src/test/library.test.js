import {MusicPlayer} from "../main/library/musicPlayer";
import {MockAudioRunner} from "./mockups/mockAudioRunner";

const {Filedata} = require("../main/library/filedata");

test('adding file to empty playlist results in starting playing', () => {
    const audioRunner = new MockAudioRunner();
    let musicPlayer = new MusicPlayer(audioRunner);
    expect(musicPlayer.isPlaying()).toBe(false);
    expect(musicPlayer.songs.length).toBe(0);
    expect(audioRunner.isPlaying).toBe(false);
    expect(audioRunner.playFile).toBe(null);

    musicPlayer.addFile(new Filedata('test.mp3'));
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(musicPlayer.songs.length).toBe(1);
    expect(audioRunner.isPlaying).toBe(true);
    expect(audioRunner.playFile).not.toBe(null);
});