import React, { Component, createRef } from 'react'
import Popup from '../Modal/index'
import YouTubeIframe from '../video';
import ReactAudioPlayer from 'react-audio-player';
import Image from 'next/image'
const client_id = '465bfa9fa3bf3c824164deb07cb2761b'

const styles = {
	backgroundColor: '#1f1f1f',
	paddingLeft: '17px',
	paddingRight: '15px'

}

interface Props {
}

export interface S {
	songs: any;
	index: any;
	isPlaying: boolean;
	url: any;
	currentTime: any;
	duration: any;
	muted: boolean;
	volume: number;
	reverse: any;
	seeking: boolean;
	seekable: any;
	audioInput: any;
	seekbarvalue: any;

}
export default class HomeComponent extends Component<Props, S> {
  rap: any;
  //seekbarFunction: (e: Event) => void;
  constructor(props) {
    super(props);
    this.rap = React.createRef();
    this.state = {
      songs: [],
      index: 0,
      isPlaying: false,
      url: "",
      currentTime: "",
      duration: "",
      muted: false,
      volume: 1,
      reverse: 100,
      seeking: false,
      seekable: "",
      audioInput: "",
      seekbarvalue: "",
    };
  }
  componentDidMount() {
    this.ApiCall();
    const audio = document.getElementsByClassName("react-audio-player")[0];
    // console.log( this.rap.audioEl.current);
    //audio.addEventListener('timeupdate', this.UpdateTheTime, false);
    // audio.addEventListener('durationchange', this.SetSeekBar, false);
    // const seekbar = document.getElementById('seekbar');
    // this.setState({ seekbarvalue: seekbar })
    this.setState({ audioInput: audio });
    this.rap.audioEl.current.onvolumechange = (e) => {
      // console.log(`Events**********`, e)
    };
    //this.setState({ audioInput: this.rap });
    // document.addEventListener("keypress", (e) => {
    //   console.log("KEYPRESSED*************", e)
    //   if (e.key === " ") {
    //     if (this.state.isPlaying) {
    //       this._pauseAudio();
    //     } else {
    //       this._playCurrentSong();
    //     }
    //   }
    // });
  }
  ApiCall() {
    fetch(
      "https://api.soundcloud.com/users/6319082/playlists?client_id=" +
        `${client_id}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ songs: result[0].tracks }, () => this.GetUrl());
        },
        (error) => {}
      );
  }
  GetCurrentTimeAndDuration = () => {
    this.setState({ currentTime: this.rap.audioEl.current.currentTime });
    this.setState({ duration: this.rap.audioEl.current.duration });
    this.setState({ duration: this.rap.audioEl.current.seeking });
    this.setState({ duration: this.rap.audioEl.current.seekable });
  };

  randomArrayShuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  GetUrl = () => {
    this.randomArrayShuffle(this.state.songs);

    const url = this.state.songs.map((song) => {
      return song.stream_url + "?client_id=" + `${client_id}`;
    });
    this.setState({ url: url });
    //this.GetCurrentTimeAndDuration()
  };
  componentWillReceiveProps(nextProps) {
    console.debug("Will received props", nextProps);
    /* Update state songs while data is passed from parent component while ready and formated */
    this.setState({
      songs: nextProps.songs,
    });
  }
  
  // UpdateTheTime = () => {
  // 	var sec = this.state.audioInput.currentTime;
  // 	var h = Math.floor(sec / 3600);
  // 	sec = sec % 3600;
  // 	var min = Math.floor(sec / 60);
  // 	sec = Math.floor(sec % 60);
  // 	if (sec.toString().length < 2) sec = "0" + sec;
  // 	if (min.toString().length < 2) min = 0 + min;
  // 	document.getElementById('lblTime').innerHTML = h + ":" + min + ":" + sec;
  // 	this.state.seekbarvalue.min = this.state.audioInput.startTime;
  // 	this.state.seekbarvalue.max = this.state.audioInput.duration;
  // 	this.state.seekbarvalue.value = this.state.audioInput.currentTime;
  // }

  // SetSeekBar = () => {
  // 	this.state.seekbarvalue.min = 0;
  // 	this.state.seekbarvalue.max = this.state.audioInput.duration;
  // }

  handleChangeReverse = (value) => {
    const finalvalue = (value * 1) / 100;
    if (finalvalue) {
      this.setState({
        volume: finalvalue,
      });
    }
  };

  mutedPlayer = () => {
    if (this.state.muted == true) {
      this.setState({ muted: false });
    } else {
      this.setState({ muted: true });
    }
  };
  _playCurrentSong = () => {
    this.rap.audioEl.current.play();
    this.setState({ isPlaying: true });
  };

  _pauseAudio = () => {
    this.rap.audioEl.current.pause();
    this.setState({ isPlaying: false });
  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * this.state.songs.length);
  };

  _playNextSong = () => {
    if (this.state.songs && this.state.songs.length != undefined && this.state.songs.length != 0) {
      let randomIndex = this.getRandomIndex();

      if (randomIndex != this.state.index) {
        this.setState({ index: randomIndex });
      } else {
        this._playNextSong();
      }
    }
  };

  _ErrorNextSong = (e) => {
    const { songs, index } = this.state;
    console.log(
      `${
        songs[index] && songs[index].title
      } can't be loaded \nAutomatically loading next song...`
    );
    this._playNextSong();
  };

  ChangeTheTime = () => {
    this.state.audioInput.currentTime = this.state.seekbarvalue.value;
  };

//   _playPreviousSong = () => {
//     if (this.state.index - 1 >= 0) {
//       this.setState({ index: this.state.index + -1 }, () => {
//         console.log(
//           this.state.songs.length + " IF... Previous song index is ",
//           this.state.index
//         );
//       });
//     } else {
//       this.setState({ index: this.state.songs.length - 1 }, () => {
//         console.log(
//           this.state.songs.length + " ELSE... Previous song index is ",
//           this.state.index
//         );
//       });
//     }
//   };

  render() {
    return (
      <div>
        <Popup />
        <YouTubeIframe
          isPlaying={this.state.isPlaying}
          mute={this.state.muted}
          mutedPlayer={this.mutedPlayer}
          handleChangeReverse={this.handleChangeReverse}
          reverse={this.state.reverse}
        />
        {/* <div style={{
					color: '#fff', width: '100%', bottom: '12%',
					textAlign: 'center',
					position: 'absolute',
					margin: 'auto', zIndex: 999
				}}>
					<input type="range" step="any" id="seekbar"
						onChange={this.ChangeTheTime} />
					<label id="lblTime">-:--:--</label>
				</div> */}
        <a
          href={
            this.state.songs[this.state.index] &&
            this.state.songs[this.state.index].permalink_url
              ? this.state.songs[this.state.index] &&
                this.state.songs[this.state.index].permalink_url
              : ""
          }
          target="blank"
        >
          <p
            style={{
              color: "#fff",
              width: "100%",
              bottom: "8%",
              textAlign: "center",
              position: "absolute",
              fontFamily: "james",
              fontSize: 40,
              margin: "auto",
              zIndex: 99999,
            }}
          >
            {this.state.songs[this.state.index] &&
              this.state.songs[this.state.index].title}
          </p>
        </a>
        <div
          style={{
            position: "absolute",
            width: "100%",
            margin: "auto",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            color: "red",
            bottom: 5,
          }}
        >
          <div style={{ marginTop: 10, cursor: "pointer", marginRight: 5 }}>
            <Image
              src="/img/previous.png"
              alt="Picture of the author"
              width={24}
              height={24}
              onClick={this._playNextSong}
            />
          </div>
          {this.state.isPlaying ? (
            <div style={{ cursor: "pointer", marginTop: 10 }}>
              <Image
                src="/img/pause.png"
                alt="Picture of the author"
                width={24}
                height={24}
                onClick={this._pauseAudio}
              />
            </div>
          ) : (
            <div style={{ cursor: "pointer", marginTop: 10 }}>
              <Image
                src="/img/play-arrow.png"
                alt="Picture of the author"
                width={24}
                height={24}
                onClick={this._playCurrentSong}
              />
            </div>
          )}
          <ReactAudioPlayer
            src={this.state.url[this.state.index]}
            ref={(element) => {
              this.rap = element;
            }}
            autoPlay={this.state.isPlaying}
            onEnded={this._playNextSong}
            onError={this._ErrorNextSong}
            onPlay={(e) => this._playCurrentSong}
            onPause={(e) => this._pauseAudio}
            volume={this.state.volume}
            onVolumeChanged={this.handleChangeReverse}
            //	onSeeked={this.seekbarFunction}
            muted={this.state.muted}
            style={styles}
          />
          <div style={{ marginTop: 10, cursor: "pointer", marginLeft: 5 }}>
            <Image
              src="/img/right-arrow.png"
              alt="Picture of the author"
              width={24}
              height={24}
              onClick={this._playNextSong}
            />
          </div>
        </div>
        <div id="skyline"></div>
        <div id="glowContainer">
          <div id="glow"></div>
        </div>
        <div id="starsContainer">
          <div id="stars"></div>
        </div>
      </div>
    );
  }
}
