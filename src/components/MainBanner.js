import React from 'react';

const MainBanner=(props)=>{
    const bgStyle = {
        backgroundImage: 'url('+props.currentSong.imgUrl+')'
    }
    return(
        <div style={bgStyle} className="main-banner">
            <div className="song-labels">
                <p className="artist">{props.currentSong.artist}</p>
                <p className="song-name">{props.currentSong.name}</p>
            </div>
        </div>
    )
}

export default MainBanner;