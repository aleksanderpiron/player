import React from 'react';
import CircleButton from '../Tools/CircleButton'
import ProgressBar from './ProgressBar';
import Volume from './Volume';

const BottomControlPanel = (props) =>{
    return(
        <div className="bottom-control-panel">
        <ProgressBar progressBarChange={props.progressBarChange} playerValue={props.playerValue} songLength={props.currentSong.length}/>
            <Volume volumeChange={props.volumeChange} volume={props.volume}/>
            <div className="center-box">
                <CircleButton click={()=>{props.changeSong('prev')}} icon='arrow' color='purple'/>
                <CircleButton click={props.pause} icon={props.playing?'pause':'play'} color='purple' size='big'/>
                <CircleButton click={()=>{props.changeSong('next')}} icon='arrow' color='purple'/>
            </div>
            <CircleButton click={()=>{props.toggleFav('current')}} color={props.currentSong.fav?'white red':'white'} icon='fav'/>
        </div>
    )
}

export default BottomControlPanel;