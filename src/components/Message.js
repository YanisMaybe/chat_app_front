import React, { useState } from "react";

const Message = ({picture,name,text,date}) => {

    let days1 = Date.now()/1000/60/60/24;
    let days2 = date/1000/60/60/24;
    let theTime = ""

    let time = days1-days2;
    let theDate = new Date(date)
    if(time>=1&&time<2){
        theTime = "yesterday at "
    }
    else if(time<1){
        let hourC = theDate.toLocaleString().split(",")[1].split(" ")[1].split(":")
        let hourR = hourC[0] + ":" + hourC[1]
        
        theTime="today at "+hourR
    }else if(time>=2){
        let toDateString = theDate.toDateString().split(" ")
        let day = ""
        if(toDateString[0]==="Mon"){
            day = "Monday"
        }else if(toDateString[0]==="Tue"){
            day = "Tuesday"
        }else if(toDateString[0]==="Thu"){
            day = "Thursday"
        }else if(toDateString[0]==="Sat"){
            day = "Saturday"
        }else if(toDateString[0]==="Fri"){
            day = "Friday"
        }else if(toDateString[0]==="Sun"){
            day = "Sunday"
        }else if(toDateString[0]==="Wed"){
            day = "Wednesday"
        }
        let hourC = theDate.toLocaleString().split(",")[1].split(" ")[1].split(":")
        let hourR = hourC[0] + ":" + hourC[1]

        theTime = day + " " + toDateString[2] + " " + toDateString[1]+" at "+hourR
    }

    
    return(
        <div className = "message">
            <div className = "image">
                <img alt = "prof" src = {picture} />
            </div>
            <div className = "text">
                <div className = "details">
                    <p className= "ProfileName RealProfileName">{name}</p>
                    <p className = "ProfileName FakeProfileName">{theTime}</p>
                </div>
                <div className = "content">
                    <p className = "simpleP">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Message