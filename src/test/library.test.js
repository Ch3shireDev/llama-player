import {MusicPlayer} from "../main/library/musicPlayer";
import {MockAudioRunner} from "./mockups/mockAudioRunner";
import {MockSongDisplay} from "./mockups/mockSongDisplay";

const {Filedata} = require("../main/library/filedata");

let audioRunner = {};
let musicPlayer = {};
let songDisplay = {};

beforeEach(() => {
    audioRunner = new MockAudioRunner();
    songDisplay = new MockSongDisplay();
    musicPlayer = new MusicPlayer(audioRunner, songDisplay);
})

test('adding file to empty playlist results in starting playing', () => {
    expect(musicPlayer.isPlaying()).toBe(false);
    expect(musicPlayer.songs.length).toBe(0);
    expect(audioRunner.isPlaying()).toBe(false);
    expect(audioRunner.playFile).toBe(null);

    musicPlayer.addFile(new Filedata('test.mp3'));
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(musicPlayer.songs.length).toBe(1);
    expect(audioRunner.isPlaying()).toBe(true);
    expect(audioRunner.playFile.filename).toBe('test.mp3');
});

test('adding another file to non-empty playlist does not start playing new file', () => {
    expect(musicPlayer.isPlaying()).toBe(false);
    musicPlayer.addFile(new Filedata('test-1.mp3'));
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(audioRunner.playFile.filename).toBe('test-1.mp3');

    musicPlayer.addFile(new Filedata('test-2.mp3'));
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(audioRunner.playFile.filename).toBe('test-1.mp3');
});

test('user can add multiple files to playlist', () => {
    const data = [new Filedata('test-1.mp3'), new Filedata('test-2.mp3'), new Filedata('test-3.mp3')];
    musicPlayer.addFiles(data);
    expect(musicPlayer.songs.length).toBe(3);
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(audioRunner.playFile.filename).toBe('test-1.mp3');

    musicPlayer.playNext();
    expect(audioRunner.playFile.filename).toBe('test-2.mp3');

    musicPlayer.playPrevious();
    expect(audioRunner.playFile.filename).toBe('test-1.mp3');

    musicPlayer.playNext();
    musicPlayer.playNext();
    expect(audioRunner.playFile.filename).toBe('test-3.mp3');
    musicPlayer.playNext();
    expect(audioRunner.playFile.filename).toBe('test-3.mp3');
});

test('user can pause playing', ()=>{
    musicPlayer.addFile(new Filedata('test.mp3'));
    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);

    musicPlayer.pause();
    expect(audioRunner.isPlaying()).toBe(false);
    expect(musicPlayer.isPlaying()).toBe(false);
});

test('user can stop playing', ()=>{
    musicPlayer.addFile(new Filedata('test.mp3'));
    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);

    musicPlayer.stop();
    expect(audioRunner.isPlaying()).toBe(false);
    expect(musicPlayer.isPlaying()).toBe(false);
});

test('user can pause and resume playing', ()=>{
    musicPlayer.addFile(new Filedata('test.mp3'));
    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);
    musicPlayer.setPosition(0.5);

    musicPlayer.pause();
    expect(audioRunner.isPlaying()).toBe(false);
    expect(musicPlayer.isPlaying()).toBe(false);
    expect(musicPlayer.getPosition()).toBe(0.5);

    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(musicPlayer.getPosition()).toBe(0.5);
});

test('user can stop playing and start playing from beginning', ()=>{
    musicPlayer.addFile(new Filedata('test.mp3'));
    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);
    musicPlayer.setPosition(0.5);

    musicPlayer.stop();
    expect(audioRunner.isPlaying()).toBe(false);
    expect(musicPlayer.isPlaying()).toBe(false);
    expect(musicPlayer.getPosition()).toBe(0);

    musicPlayer.play();
    expect(audioRunner.isPlaying()).toBe(true);
    expect(musicPlayer.isPlaying()).toBe(true);
    expect(musicPlayer.getPosition()).toBe(0);
});