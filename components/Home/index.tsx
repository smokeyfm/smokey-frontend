import React, { Component, createRef } from 'react'
import Popup from '../Modal/Popup'
import YouTubeIframe from '../youTubeIframe/YouTubeIframe';
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
  trackIndex: any;
  songs: any;
  index: any;
  isPlaying: boolean;
  // audioInput:any;
  url:any;
  // audioInput: any;
}
export default class HomeComponent extends Component<Props, S> {
  rap: any;
  constructor(props) {
    super(props);
    // this.rap = React.createRef();
    this.state = {
      // audioInput: '',
      trackIndex: 0,
      songs: [],
      index: 0,
      isPlaying: false,
      url:''
    }
  }
  componentDidMount() {
    this.ApiCall()
    // console.log(this.rap);
    // this.setState({ audioInput: this.rap });
    // document.addEventListener("keypress", (e) => {
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
    fetch("https://api.soundcloud.com/tracks?client_id=" + `${client_id}` + `&limit=20`)
      // fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", {
      //   "method": "GET",
      //   "headers": {
      //     "x-rapidapi-key": "daafecbc68mshe3b1a0f8d5e9a70p1dd539jsnf81267d84e57",
      //     "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      //   }
      // })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({songs: result}, ()=>this.GetUrl());
        },
        (error) => {
          console.log(error)
        }
      )
  }
GetUrl=()=>{
  const url = this.state.songs.map((sons => {
    return sons.stream_url + "?client_id=" + `${client_id}`
  }))
  this.setState({url:url})
}
  componentWillReceiveProps(nextProps) {
    console.debug("Will received props", nextProps)
    /* Update state songs while data is passed from parent component while ready and formated */
    this.setState({
      songs: nextProps.songs,
    })
  }

  // componentDidUpdate() {
  //   if (this.rap !== this.state.audioInput) {
  //     this.setState({ audioInput: this.rap })
  //   }
  // }
  _playCurrentSong = () => {
    /* this.rap is set bye reactAudioPlayer, direct acces to the html5 audio instance */
   // this.rap.audioEl
    this.setState({ isPlaying: true })
  }

  _pauseAudio = () => {
    /* this.rap is set bye reactAudioPlayer, direct acces to the html5 audio instance */
   // this.rap.audioEl
    this.setState({ isPlaying: false })
  }
  _playNextSong = () => {

    /* inc index or set to 0 if the last song was playing */
    if (this.state.index + 1 < this.state.songs.length) {
      this.setState({ index: this.state.index + 1 })
    } else {
      this.setState({ index: 0 })
    }
  }

  _ErrorNextSong = (e) => {
    const { songs, index } = this.state;
    console.log(`${songs[index] && songs[index].title} can't be loaded \nAutomatically loading next song...`)
    this._playNextSong();
  }

  _playPreviousSong = () => {

    /* dec index or set to max if the last first was playing */
    if (this.state.index - 1 >= 0) {
      this.setState({ index: this.state.index + -1 })
    } else {
      this.setState({ index: this.state.songs.length - 1 })
    }
  }
  render() {
    return (
      <div>
          <Popup />
            <YouTubeIframe isPlaying={this.state.isPlaying}/>
              <p style={{
                color: '#fff', width: '100%', bottom: '8%',
                textAlign: 'center',
                position: 'absolute', fontFamily: 'james', fontSize: 40, margin: 'auto', zIndex: 99999
                }}>
                  {this.state.songs[this.state.index]
                && this.state.songs[this.state.index].title}
              

              </p>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '35%',
                zIndex: 99999
                // margin: -25px 0 0 -25px; 
              }}>

              <div style={{ position: 'absolute', bottom: 0 }}>
                <ReactAudioPlayer
                  src={this.state.url[this.state.index]}
                  // ref={(element) => { this.rap = element; }}
                  autoPlay={true}
                  onEnded={this._playNextSong}
                  onError={this._ErrorNextSong}
                  onPlay={this._playCurrentSong}
                  onPause={this._pauseAudio}
                  controls
                  style={styles}
                />
              <div style={{
                cursor: 'pointer',
                position: 'absolute', top: 12, right: -40
              }}>
              <Image
                src="/img/forward-button.png"
                alt="Picture of the author"
                width={16}
                height={16}
                onClick={this._playNextSong}
              />
            </div>
            <div style={{
              cursor: 'pointer',
              position: 'absolute', top: 12, left: -30
            }}>
              <Image
                src="/img/rewind-button.png"
                alt="Picture of the author"
                width={16}
                height={16}
                onClick={this._playPreviousSong}
              />
            </div>
              </div>
            </div>
            <div id="skyline"></div>
            <div id="glowContainer">
              <div id="glow"></div>
            </div>
            <div id="starsContainer">
              <div id="stars"></div>
            </div>
        <style jsx>
          {
            `
                    html{
                        overflow: hidden;
                    }
                    #starsContainer {
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: black;
                    }
                    #stars {
                        content: "";
                        position: absolute;
                        width: 200%;
                        height: 200%;
                        top: -50%;
                        left: -50%;
                        background: url(img/stars.png) 0 0 repeat;
                        background-size: cover;
                        animation: spin 180s linear infinite;
                    }
                    @keyframes spin {
                        from {
                            transform: rotate(0deg)
                        }
                        to {
                            transform: rotate(360deg)
                        }
                    }
                    #skyline {
                        z-index: 1;
                        position: fixed;
                        width: 100%;
                        left: 0;
                        bottom: 0px;
                        height: 490px;
                        display: block;
                        background: url(img/skyline.png) repeat-x;
                        background-size: 1775px 600px;
                        background-position: center -30px;
                        pointer-events: none;
                        }
            
                    #glowContainer {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        z-index: 999;
                        overflow: hidden;
                        pointer-events: none;
                    }
            
                    #glow {
                    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#2e04e8+0,660058+100&0+0,1+100 */
                        background: -moz-radial-gradient(center, ellipse cover, rgba(46, 4, 232, 0) 0%, rgba(102, 0, 88, 1) 100%);
                        /* FF3.6-15 */
                        background: -webkit-radial-gradient(center, ellipse cover, rgba(46, 4, 232, 0) 0%, rgba(102, 0, 88, 1) 100%);
                        /* Chrome10-25,Safari5.1-6 */
                        background: radial-gradient(ellipse at center, rgba(46, 4, 232, 0) 0%, rgba(102, 0, 88, 1) 100%);
                        /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                        /* // filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#002e04e8', endColorstr='#660058', GradientType=1 );
                        IE6-9 fallback on horizontal gradient */
                        display: block;
                        height: 100%;
                        width: 100%;
                        top: 100px;
                        left: 0;
                        opacity: 0.66;
                        transform: scale(2.2);
                     }
                        `
          }
        </style>
      </div>
    )
  }
}
