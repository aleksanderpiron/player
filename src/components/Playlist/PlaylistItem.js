import React from 'react';
import CircleButton from '../Tools/CircleButton';

const PlaylistItem=(props)=>{
    return(
        <li key={props.id} className="playlist-item">
            <div onClick={()=>{props.changeSong('specific', props.id)}} className="name">
                <p className='details'>{props.songLength} | {props.artist}</p>
                <p className='title'>{props.songName}</p>
            </div>
            <div className="buttons">
                <CircleButton click={()=>{props.toggleFav(props.id)}} icon='fav' color={props.fav?'red':''}/>
            </div>
        </li>
    )
}

export default PlaylistItem;