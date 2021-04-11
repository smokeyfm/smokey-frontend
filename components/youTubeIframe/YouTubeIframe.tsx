import React, { Component } from 'react'
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube'
interface Props{
  isPlaying:any;
 // playCurrentSong:any;
}
interface S{
  player:string;
  playVideo:any
}
export class YouTubeIframe extends Component<Props, S> {
  constructor(props:Props){
    super(props);
    this.state= {
      player: null,
      playVideo:''
    }
  }
  
    _onReady(event) {
        // access to player in all event handlers via event.target
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
     const {isPlaying} = this.props
  
        const opts = {
          height: '250',
          width: '310',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            
            autoplay: 1,
            controls: 0,
            rel: 0,
            autohide:1,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            wmode:'opaque',
            loop: 1,
            //playlist: video,
            // 'volume': 0,
            //'origin': 'http://smokey.fm',
            
          },
        };
    
        return (
            <div style={{marginLeft:'37%', marginTop:10, position:'absolute', zIndex:1}}>
              
              <p style={{color:'#95644f',  fontSize:30, textAlign:'center'}}>(smokey.fm)</p>
         <ReactPlayer url='https://www.youtube.com/embed/SMvT5sAk4g8' 
         muted={true}
        controls
         playing={isPlaying}
         width={'310px'}
         height={'250px'}/>
            </div>
        )
      }
}

export default YouTubeIframe
