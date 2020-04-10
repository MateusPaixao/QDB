import React from 'react';
import YouTube from 'react-youtube';

export default function Hero() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      autohide: 1,
      wmode: 'transparent'
    }
  };
  //   function YTOnReady(event) {
  //     // access to player in all event handlers via event.target
  //     event.target.pauseVideo();
  //   }
  return (
    <div className="heroContainer">
      <div className="heroContainer__video">
        <YouTube containerClassName="fit" videoId="q6bC4ZNUzzg" opts={opts} />
      </div>
    </div>
  );
}
