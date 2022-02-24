import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToChannel, getOneChannel } from "../Actions/channelsActions";

const Channel = ({ name, id,setpounce}) => {
    const dispatch = useDispatch()
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const channelsReducer = useSelector(state => state.channelsReducer)
    const [maybe,setMaybe] = useState(false)

    let shorten;
    if (name) {
        let words = name.split(" ")
        if (words.length >= 2) {
            let first = words[0].split("")[0]
            let second = words[1].split("")[0]
            shorten = first + second
        } else {
            let first = name[0].split("")[0]
            shorten = first
        }
    }

    return (
        <div className="Onechannel btn" onClick = {async e=>{
            dispatch(getOneChannel(id))
            setpounce(true)
            
            let croi = document.querySelector(".closeLeftPartParent")
            if(croi){
                console.log("on le remove")
                croi.classList.remove("none")
            }

            dispatch(addUserToChannel({id: id,pseudo: actuallyUser.pseudo,picture:actuallyUser.picture, memberId: actuallyUser._id}))
        }}>
            <div className="bloc">
                <h3 className="shorten retitle">{shorten?shorten:null}</h3>
            </div>
            <h3 className="retitle">{name}</h3>
        </div>
    )
}

export default Channel