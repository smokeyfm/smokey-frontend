import Image from 'next/image';
import React, { Component } from 'react'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import 'react-rangeslider/lib/index.css'
import ReactPlayer from 'react-player/youtube'
import styled from '@emotion/styled';
const Div = styled.div `
    margin-top:5px;
    position:absolute;
    width:100%;
    margin:auto;
    z-index:1;
    display:flex;
    justify-content:center
    `
const H4 = styled.h4`
    color:#DD9183;
    text-align:center;
`    
interface Props {
  isPlaying: any;
  mute: boolean;
  mutedPlayer: any;
  handleChangeReverse: any;
  reverse: any;
}
interface S {
  player: string;
  playVideo: any;
  value: any;
  reverseValue: any;
}
export class YouTubeIframe extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      player: null,
      playVideo: '',
      value: 100,
      reverseValue: 3
    }
  }

  _onReady(event) {
    event.target.pauseVideo();
  }
  _onPlayerReady(event) {
    var embedCode = event.target.getVideoEmbedCode();
    event.target.playVideo();
    if (document.getElementById('embed-code')) {
      document.getElementById('embed-code').innerHTML = embedCode;
    }
  }

  render() {
    const { isPlaying } = this.props

    const opts = {
      height: '250',
      width: '310',
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        autohide: 1,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        wmode: 'opaque',
        loop: 1,
        origin: 'http://localhost:3000'
      },
    };

    return (
      <Div>
        <div style={{ marginTop: 5 }}>
          <H4>(smokey.fm)</H4>
          <ReactPlayer url='https://www.youtube.com/embed/SMvT5sAk4g8'
            muted={true}
            playing={isPlaying}
            width={'220px'}
            height={'180px'} />
          {/* {
            this.props.mute ? (
              <div style={{ marginLeft: -50, marginTop: 10, cursor: 'pointer' }}>
                <Image
                  src="/img/mute.png"
                  alt="Picture of the author"
                  width={16}
                  height={16}
                  onClick={this.props.mutedPlayer}
                />
              </div>
            ) : (
                <div style={{ marginLeft: -50, marginTop: 10, cursor: 'pointer' }}>
                  <Image
                    src="/img/volume-off.png"
                    alt="Picture of the author"
                    width={16}
                    height={16}
                    onClick={this.props.mutedPlayer}
                  />
                </div>
              )
          } */}
          {/* <div className='slider-horizontal'
            style={{ marginTop: -20, marginLeft: 0, width: 200 }}>
            <InputRange
              maxValue={100}
              minValue={0}
              value={this.state.value}
              allowSameValues={false}
              onChange={value => this.setState({ value },
                () => this.props.handleChangeReverse(value))} />
          </div> */}
        </div>
        </Div>
    )
  }
}

export default YouTubeIframe
