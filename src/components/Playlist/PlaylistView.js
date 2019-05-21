import React from 'react';
import PlaylistItem from './PlaylistItem';
import CircleButton from '../Tools/CircleButton';

const PlaylistView=(props)=>{
    const list = Object.entries(props.songs).map(item=>{
        return(<PlaylistItem
            id={item[0]}
            artist={item[1].artist}
            songName={item[1].name}
            songLength={item[1].length}
            fav={item[1].fav}
            toggleFav={props.toggleFav}
            changeSong={props.changeSong}
            />
        )
    });
    return(
        <div className={props.active?'playlist active': 'playlist'}>
            <div className="header">
                <CircleButton click={()=>{props.toggleOpposite('playlist')}} icon='back' color='white'/>
                <h2>Playlist</h2>
            </div>
                <ul className="playlist-list">
                    {list}
                </ul>
        </div>
    )
}

export default PlaylistView;