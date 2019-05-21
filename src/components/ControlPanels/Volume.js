import React from 'react';

const Volume=(props)=>{
    const volumes = [0.1,0.25,0.5,0.75,1];
    const content = volumes.map(item=>{
        return <div onClick={()=>{props.volumeChange(item)}} className={item<=props.volume?'active':''} key={item}></div>
    });
    return(
        <div className="volume">
            {content}
        </div>
    )
}

export default Volume;