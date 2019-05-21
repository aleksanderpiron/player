import React, {Component} from 'react';
import BottomControlPanel from '../components/ControlPanels/BottomControlPanel';
import TopControlPanel from '../components/ControlPanels/TopControlPanel';
import MainBanner from '../components/MainBanner';
import PlaylistView from '../components/Playlist/PlaylistView';

import marioPic from '../assets/songsPic/mario.jpg';
import zeldaPic from '../assets/songsPic/zelda.png';
import contraPic from '../assets/songsPic/contra.jpg';
import tetrisPic from '../assets/songsPic/tetris.png';
import sonicPic from '../assets/songsPic/sonic.jpg';

import marioMp3 from '../assets/songs/mario.mp3';
import zeldaMp3 from '../assets/songs/zelda.mp3';
import contraMp3 from '../assets/songs/contra.mp3';
import tetrisMp3 from '../assets/songs/tetris.mp3';
import sonicMp3 from '../assets/songs/sonic.mp3';

class App extends Component{
  state = {
    currentSongId:'song1',
    playerValue:0,
    playlist:false,
    playing:false,
    repeat:false,
    refresh:false,
    shuffle:false,
    volume:0.5,
    songs:{
      song1:{
        name:'Mario Bros',
        artist:'Nintendo',
        imgUrl:marioPic,
        songUrl:marioMp3,
        fav:false,
        length:''
      },
      song2:{
        name:'Legend of Zelda',
        artist:'Nintendo',
        imgUrl:zeldaPic,
        songUrl:zeldaMp3,
        fav:true,
        length:''
      },
      song3:{
        name:'Contra',
        artist:'Nintendo',
        imgUrl:contraPic,
        songUrl:contraMp3,
        fav:false,
        length:''
      },
      song4:{
        name:'Tetris',
        artist:'The Tetris Company LLC',
        imgUrl:tetrisPic,
        songUrl:tetrisMp3,
        fav:false,
        length:''
      },
      song5:{
        name:'Sonic The Hedgehog',
        artist:'SEGA',
        imgUrl:sonicPic,
        songUrl:sonicMp3,
        fav:false,
        length:''
      },
    }
  }
  toggleOppositeHandler=(target)=>{
    const newState = {...this.state};
    newState[target] = !newState[target];
    this.setState(newState)
  };
  changeSongHandler=(method, target)=>{
    let newCurrentSong = null;
    const keys = Object.keys(this.state.songs);
    this.audio.pause();
    if(method === 'next'){
      const indexOfCurrent = keys.indexOf(this.state.currentSongId) + 1;
      newCurrentSong = keys[indexOfCurrent];
      if(this.state.shuffle){
        newCurrentSong = keys[Math.floor(Math.random() * Object.keys(this.state.songs).length)];
      }
    }
    if(method === 'prev'){
      const indexOfCurrent = keys.indexOf(this.state.currentSongId) - 1;
      newCurrentSong = keys[indexOfCurrent];
    }
    if(method === 'specific'){
      const indexOfCurrent = keys.indexOf(target);
      newCurrentSong = keys[indexOfCurrent];
      this.setState({
        currentSongId: newCurrentSong,
        playlist:false,
        playerValue:0,
      })
    }
    let songs = this.state.songs;
    if(typeof(newCurrentSong) !== 'undefined'){
      this.audio = new Audio(this.state.songs[newCurrentSong].songUrl);
      this.audio.addEventListener('loadedmetadata', ()=> {
        songs[this.state.currentSongId].length = Math.floor(this.audio.duration);
        if(this.state.playing){
          this.audio.play();
        }
      });
    }
    else if(typeof(newCurrentSong) === 'undefined' && this.state.refresh){
      this.changeSongHandler('specific','song1');
    }
    else{
      this.stopPlayingHandler();
    }
    if(typeof(newCurrentSong) !== 'undefined'){
      this.setState({
        currentSongId: newCurrentSong,
        playerValue:0,
        songs:songs
      })
    }
  }
  toggleFavHandler=(target)=>{
    if(target === 'current'){
      target = this.state.currentSongId
    };
    let songs = this.state.songs;
    songs[target].fav = !songs[target].fav;
    this.setState({
      songs: songs
    })
  }
  playingHandler=()=>{
    const length = this.state.songs[this.state.currentSongId].length;
    if(length === this.state.playerValue && !this.state.repeat){
      this.changeSongHandler('next');
    }
    if(length === this.state.playerValue && this.state.repeat){
      this.audio.currentTime = 0;
      this.audio.play();
      this.setState({
        playerValue:0
      })
    }
    this.setState(prevState=>{
      return{playerValue:prevState.playerValue+1}
    })
  }
  startPlayingHandler=()=>{
    this.audio.currentTime = this.state.playerValue;
    this.audio.play();
    this.timer = setInterval(this.playingHandler, 1000);
  }
  stopPlayingHandler=()=>{
    clearInterval(this.timer);
    this.audio.pause();
  }
  pauseBtnHandler=()=>{
    this.toggleOppositeHandler('playing');
    if(this.state.playing){
      this.stopPlayingHandler();
    }else{
      this.startPlayingHandler();
    }
  }
  progressBarChangeHandler=(event)=>{
    this.audio.currentTime = parseInt(event.target.value);
    this.setState({
      playerValue:parseInt(event.target.value)
    })
  }
  volumeChangeHandler=(value)=>{
    this.audio.volume = value;
    this.setState({
      volume:value
    })
  }
  componentWillMount=()=>{
    this.audio = new Audio(this.state.songs[this.state.currentSongId].songUrl);
    this.audio.addEventListener('loadedmetadata', ()=> {
      let songs = this.state.songs;
      songs[this.state.currentSongId].length = Math.floor(this.audio.duration);
      this.setState({
        songs:songs
      })
    });
  }
  render(){
    return (
      <div className="App">
        <div className="player">
          <div className="main">
            <TopControlPanel iconsStatus={this.state} toggleOpposite={this.toggleOppositeHandler}/>
            <MainBanner currentSong={this.state.songs[this.state.currentSongId]}/>
            <BottomControlPanel
            volumeChange={this.volumeChangeHandler}
            volume={this.state.volume}
            progressBarChange={this.progressBarChangeHandler}
            pause={this.pauseBtnHandler}
            playerValue={this.state.playerValue}
            playing={this.state.playing}
            toggleFav={this.toggleFavHandler}
            currentSong={this.state.songs[this.state.currentSongId]} toggleOpposite={this.toggleOppositeHandler}
            changeSong={this.changeSongHandler}
            />
          </div>
          <PlaylistView
          changeSong={this.changeSongHandler}
          active={this.state.playlist}
          songs={this.state.songs}
          toggleFav={this.toggleFavHandler}
          toggleOpposite={this.toggleOppositeHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
