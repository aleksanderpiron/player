import React from 'react';

const TopControlPanel = (props) =>{
    return(
        <div className="progress-bar">
            <input onChange={props.progressBarChange} type="range" max={0} max={props.songLength} step={1} value={props.playerValue}/>
        </div>
    )
}

export default TopControlPanel;