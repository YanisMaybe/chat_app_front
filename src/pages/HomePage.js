import Signin from '../components/Signin';
import jwt from 'jwt-decode';

import InChannel from '../components/InChannel';
import exit from '../import/exit.svg';
import mountains from '../import/mountains.svg';
import user from '../import/user.svg';

import { useDispatch, useSelector } from 'react-redux';

import { createChannel } from '../Actions/channelsActions';

import React, { memo } from 'react';

import axios from 'axios';
import Interaction from '../components/Interaction';


const HomePage = () => {
    let cook = document.cookie.split(';')

    const dispatch = useDispatch()

    let userId;
    let something = (function () {
        let executed = false;
        return function () {
            if (!executed) {
                executed = true;
                cook.forEach(el => {
                    try {
                        let a = jwt(el)
                        if (a) {
                            userId = a.id
                        }
                    } catch (error) {
                        console.error("this token are not valid")
                    }
                })
            }
        };
    })();
    const logout = ()=>{
        axios.get("https://chatappback.onrender.com/auth/logout").then(res=>{
            if(res){
                document.cookie = '__user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                window.location.reload()
            }else{  
                console.error("la reponse est introuvable")
            }
        }).catch(err=>{
            console.error(err)
        })
    }


   
    something()
    return (
        <>
            {!userId ? <Signin /> :
                <div className="HomePage" >
                    <div className="createChannelZone none">
                        <div className="background" onClick={() => {
                            let createChannelZone = document.querySelector(".createChannelZone");
                            createChannelZone.classList.add("none")
                        }}></div>
                        <div className="createChannelBloc">
                            <div className="inputs">
                                <h3>New Channel</h3>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    const data = {
                                        date: Date.now(),
                                        name: e.target[0].value,
                                        description: e.target[1].value
                                    }
                                    dispatch(createChannel(data))
                                    let createChannelZone = document.querySelector(".createChannelZone")
                                    createChannelZone.classList.add("none")
                                    e.target[0].value = ""
                                    e.target[1].value = ""
                                }} >
                                    <input required className="channelNameInput inpt" placeholder="Channel name" minLength="5" maxLength="21" type="text" />
                                    <textarea required placeholder="Channel description" minLength="30" maxLength="200" className="inpt channelDescriptionArea"></textarea>
                                    <div className="submit">
                                        <input type="submit" className="btn submaytButton" value="Save" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="popup" className="popup none">
                        <div className="MyProfile bloc popupBloc" onClick={e => {
                            let allBlocs = document.getElementsByClassName("popupBloc")
                            Array.prototype.forEach.call(allBlocs, element => {
                                element.classList.remove("selected")
                            });
                            let MyProfile = document.querySelector(".MyProfile")
                            MyProfile.classList.add("selected")
                        }}>
                            <img alt="user" src={user} />
                            <p>My Profile</p>
                        </div>
                        <div className="tweeter bloc popupBloc" onClick={e => {
                            let allBlocs = document.getElementsByClassName("popupBloc")
                            Array.prototype.forEach.call(allBlocs, element => {
                                element.classList.remove("selected")
                            });
                            let tweeter = document.querySelector(".tweeter")
                            tweeter.classList.add("selected")

                        }}>
                            <img alt="tweeter" src={mountains} />
                            <p>Tweeter</p>
                        </div>
                        <div className="transition"></div>
                        <div className="logout bloc btn" onClick = {logout}>
                            <img src={exit} alt="exit" onClick = {logout} />
                            <p className="red" onClick = {logout} >logout</p>
                        </div>
                    </div>
                    <div className="left channelsLeftPart">
                        <InChannel />
                    </div>
                    <div className="interactions">
                        <Interaction />
                    </div>
                </div>
            }

        </>
    )
}

export default memo(HomePage);