import React, { useState } from 'react'
import leftArrow from '../import/left-arrow.svg';
import Member from '../components/Member';
import Profile from '../components/Profile';
import plusIcon from '../import/plus.svg';
import loupeIcon from '../import/loupe.svg';
import Channel from './Channel';
import closeIcon from '../import/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToChannel } from '../Actions/channelsActions';


const InChannel = () => {
    const [pounce, setPounce] = useState(true)
    const actuallyChannel = useSelector(state => state.actuallyChannelReducer)
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const allChannels = useSelector(state => state.channelsReducer)
    const dispatch = useDispatch()
    const [dataSearch,setDataSearch] = useState("")

    if(pounce){
        window.onload = ()=>{
            dispatch(addUserToChannel({id: actuallyChannel._id,pseudo: actuallyUser.pseudo,picture:actuallyUser.picture, memberId: actuallyUser._id}))
        }
    }
    return (
        <>
            {pounce ? <>
            <div className="profile">
                <Profile picture={actuallyUser.picture} name={actuallyUser.pseudo} userId={actuallyUser._id} channelId = {actuallyChannel._id} />
            </div>
                <div className="channel">
                    <div className="none closeLeftPartParent">
                        <div style={{ zIndex: "52" }} className="closeLeftPart btn" onClick={() => {
                            let channelsLeftPart = document.querySelector(".channelsLeftPart")
                            let closeLeftPartParent = document.querySelector(".closeLeftPartParent")
                            closeLeftPartParent.classList.add("none")
                            channelsLeftPart.classList.replace("channelsLeftPartToRight", "channelsLeftPartToLeft")
                        }} ><img onClick={() => {
                            let channelsLeftPart = document.querySelector(".channelsLeftPart")
                            let closeLeftPartParent = document.querySelector(".closeLeftPartParent")
                            closeLeftPartParent.classList.add("none")
                            channelsLeftPart.classList.replace("channelsLeftPartToRight", "channelsLeftPartToLeft")
                        }} alt="closeIcon" className="closeIcon" src={closeIcon} /></div>
                    </div>
                    <div className="head">
                        <img alt="left arrow" src={leftArrow} onClick={e => {
                            setPounce(false)
                        }} />
                        <p className="bold title">All channels</p>
                    </div>

                    <div className="content">
                        <div className="HeadPart">
                            <h3 className="bold retitle">{actuallyChannel.name}</h3>
                            <p className="description simpleP">{actuallyChannel.description}</p>
                        </div>
                        <div className="members">
                            <h3 className="retitle">Members</h3>
                            {actuallyChannel.members ? actuallyChannel.members.map((member, index) => {
                                return <Member key={index} name={member.memberPseudo} picture={member.memberPicture} />
                            }) : null}
                        </div>
                    </div>
                </div></> :
                <>
                    <div className="profile">
                        <Profile picture={actuallyUser.picture} name={actuallyUser.pseudo} />
                    </div>
                    <div className="channels">
                        <div className="closeLeftPartParent">
                            <div className="closeLeftPart btn" onClick={() => {
                                let channelsLeftPart = document.querySelector(".channelsLeftPart")
                                let closeLeftPartParent = document.querySelector(".closeLeftPartParent")
                                closeLeftPartParent.classList.add("none")
                                channelsLeftPart.classList.replace("channelsLeftPartToRight", "channelsLeftPartToLeft")
                            }} >
                                <img onClick={() => {
                                    let channelsLeftPart = document.querySelector(".channelsLeftPart")
                                    let closeLeftPartParent = document.querySelector(".closeLeftPartParent")
                                    closeLeftPartParent.classList.add("none")
                                    channelsLeftPart.classList.replace("channelsLeftPartToRight", "channelsLeftPartToLeft")
                                }} alt="closeIcon" className="closeIcon" src={closeIcon} />
                            </div>
                        </div>
                        <div className="head">
                            <h3 className="title">Channels</h3>
                            <div className="more" onClick={e => {
                                let createChannelZone = document.querySelector(".createChannelZone")
                                createChannelZone.classList.remove("none")
                            }}>
                                <img alt="more" src={plusIcon} />
                            </div>
                        </div>
                        <div className="content">
                            <div className="search">
                                <img alt="loupe" src={loupeIcon} />
                                <input onChange = {e=>{
                                    setDataSearch(e.target.value)
                                }} type="text" placeholder="Search" className="SearchInput inpt" />
                            </div>
                            <div className="TheChannels">
                                {allChannels ? dataSearch===""||dataSearch===null ? allChannels.sort((a,b)=>b.date-a.date).map((channel, index) => {
                                    return <Channel key={index} name={channel.name} id = {channel._id} setpounce = {setPounce} />
                                }) : allChannels.filter(el=>el.name.split("").includes(dataSearch)||el.name.split(" ").includes(dataSearch)||el.name.startsWith(dataSearch)).sort((a,b)=>b.date-a.date).map((channel, index) => {
                                    return <Channel key={index} name={channel.name} id = {channel._id} setpounce = {setPounce} />
                                }) : null}
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default InChannel;