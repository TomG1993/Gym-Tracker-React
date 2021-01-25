import React, { useState, useEffect } from 'react';
import Session from './Session'


const SessionHeader = (props) => {

const [openHeader, setOpenHeader] = useState(false);


const DisplaySession = () => {
    console.log("Opening header id: " + props.id);
    setOpenHeader(!openHeader);
}

    return (<div className="inputBase session">
        <div className="sessionTitle"  key={props.id} onClick={DisplaySession}>{props.sessionName}</div>
        {openHeader === true ? (
                                                  <Session headerId={props.id}/>
        
                        ) : null}

        </div>
    )
}

export default SessionHeader;