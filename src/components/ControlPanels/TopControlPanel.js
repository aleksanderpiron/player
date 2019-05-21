import React from 'react';
import CircleButton from '../Tools/CircleButton';

const TopControlPanel = (props) =>{
    return(
        <div className="top-control-panel">
            <div className="center-box">
                <CircleButton color={props.iconsStatus.refresh?'active':''} click={()=>{props.toggleOpposite('refresh')}} icon='refresh' size='small'/>
                <CircleButton color={props.iconsStatus.shuffle?'active':''} click={()=>{props.toggleOpposite('shuffle')}} icon='shuffle' size='small'/>
                <CircleButton color={props.iconsStatus.repeat?'active':''} click={()=>{props.toggleOpposite('repeat')}} icon='repeat' size='small'/>
            </div>
            <CircleButton click={()=>{props.toggleOpposite('playlist')}} id='menu' icon='menu'/>
        </div>
    )
}

export default TopControlPanel;