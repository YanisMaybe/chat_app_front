import React, { useState, useEffect } from 'react';

import { addUserToChannel, getOneChannel } from '../Actions/channelsActions';
import { getOneUser } from '../Actions/usersActions';
import { addMessageToChannel } from '../Actions/channelsActions';
import menuBarIcon from '../import/menu.svg';
import Message from '../components/Message';
import send from '../import/send.svg';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

//connect

const Interaction = () => {
    const actuallyChannel = useSelector(state => state.actuallyChannelReducer)
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const dispatch = useDispatch()
    const [response, setResponse] = useState(actuallyChannel.messages);
    const socket = socketIOClient.connect("http://localhost:4000");

    

    socket.on("chat_message", data => {
        if (actuallyChannel.messages!==null&&actuallyChannel.messages!==undefined ) {
            actuallyChannel.messages.push(data)
            let preview = null
            for (let index = 0; index < actuallyChannel.messages.length; index++) {
                let post = actuallyChannel.messages[index]
                if(preview===null){
                    preview=post
                }else{
                    if(post.timestamps===preview.timestamps){
                        actuallyChannel.messages.splice(index,index)
                    }else{
                        preview = post
                    }
                }
            }
            setResponse([]);
        }
    });
    useEffect(()=>{
        if(document.querySelector(".messages")){
            document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight;
        }
    })
    return (
        <>
            <div className="head">
                <div className="menuBar btn" onClick={e => {
                    let channelsLeftPart = document.querySelector(".channelsLeftPart")
                    let closeLeftPartParent = document.querySelector(".closeLeftPartParent")
                    closeLeftPartParent.classList.remove("none")
                    if (channelsLeftPart.classList[2] === "channelsLeftPartToLeft") {
                        channelsLeftPart.classList.replace("channelsLeftPartToLeft", "channelsLeftPartToRight")
                    } else {
                        channelsLeftPart.classList.add("channelsLeftPartToRight")
                    }
                }} >
                    <img alt="menuBarIcon" src={menuBarIcon} />
                </div>
                <h3 className="retitle">{actuallyChannel.name}</h3>
            </div>
            <div className="messages">
                {actuallyChannel.messages ? actuallyChannel.messages.map((message, index) => {
                    return <Message key={index} name={message.posterName} picture={message.posterPicture} text={message.message} date={message.timestamps} />
                }) : null}
            </div>
            <div className="form messageSubForm">
                <form onSubmit={e => {
                    e.preventDefault();
                    let message = e.target[0].value;
                    if (message === "") {
                        let SubmitButtonFormUnique = document.querySelector(".SubmitButtonFormUnique")
                        e.target[0].classList.add("vibrationInput")
                        SubmitButtonFormUnique.classList.add("vibrationInput")
                        setTimeout(() => {
                            e.target[0].classList.remove("vibrationInput")
                            SubmitButtonFormUnique.classList.remove("vibrationInput")
                        }, 400);
                    } else {
                        const info = {
                            id: actuallyChannel._id,
                            pseudo: actuallyUser.pseudo,
                            picture: actuallyUser.picture,
                            message: message
                        }
                        console.log("tout est pret normalement")
                        dispatch(addMessageToChannel({...info,_id:actuallyChannel._id,user:actuallyUser}))
                        document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight;
                        /**
                        axios.post(`http://localhost:4000/api/addmessagetochannel/${actuallyChannel._id}`, info).then(res => {
                            if (res.data) {
                                if (res.data.error) {
                                    console.error(res.data.error)
                                } else {
                                    socket.emit("chat message", {
                                        posterId: info.id,
                                        posterName: info.pseudo,
                                        posterPicture: info.picture,
                                        message:info.message,
                                        timestamps: new Date().getTime()
                                    })
                                
                                    
                                }
                            }
                        }).catch(err => {
                            console.error(err)
                        }) 

                         */
                        e.target[0].value = ""
                    }
                }} >
                    <input className="input inpt" type="text" placeholder="Type a message here" />
                    <div className="SubmitButton SubmitButtonFormUnique">
                        <input className="submit" type="submit" value=''></input>
                        <img onClick={e => {
                            let messageSubForm = document.querySelector(".messageSubForm");
                            let data = messageSubForm.children[0].children[0]
                            if (data.value === "") {
                                let SubmitButtonFormUnique = document.querySelector(".SubmitButtonFormUnique")

                                messageSubForm.children[0].children[0].classList.add("vibrationInput")
                                SubmitButtonFormUnique.classList.add("vibrationInput")
                                setTimeout(() => {
                                    messageSubForm.children[0].children[0].classList.remove("vibrationInput")
                                    SubmitButtonFormUnique.classList.remove("vibrationInput")
                                }, 400);
                            } else {
                                let info = {
                                    id: actuallyChannel._id,
                                    pseudo: actuallyUser.pseudo,
                                    picture: actuallyUser.picture,
                                    message: data.value
                                }
                                dispatch(addMessageToChannel({...info,_id:actuallyChannel._id,actuallyUser}))
                                document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight;
                                /*
                                axios.post(`http://localhost:4000/api/addmessagetochannel/${actuallyChannel._id}`, info).then(res => {
                                    if (res.data) {
                                        if (res.data.error) {
                                            console.error(res.data.error)
                                        } else {
                                            socket.emit("chat message", {
                                                posterId: info.id,
                                                posterName: info.pseudo,
                                                posterPicture: info.picture,
                                                message:info.message,
                                                timestamps: new Date().getTime()
                                            })
                                        }
                                    }
                                }).catch(err => {
                                    console.error(err)
                                })
                                */
                                data.value = ""
                            }
                        }} alt="paper plane" src={send} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Interaction