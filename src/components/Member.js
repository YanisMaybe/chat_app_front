import React from "react";

const Member = ({picture,name}) => {
    return(
        <div className = "member">
            <img className = "image" alt="prof" src = {picture} />
            <p className ="ProfileName">{name}</p>
        </div>
    )
}

export default Member