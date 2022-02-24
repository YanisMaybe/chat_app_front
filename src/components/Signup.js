import React from 'react';
import devchallengeicon from '../import/devchallenges.png'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const createAccount = e => {
        e.preventDefault();
        console.log(e.target[0].value)
        let data = {
            email: e.target[0].value,
            pseudo: e.target[1].value,
            password: e.target[2].value
        }
        e.target[3].disabled = true
        e.target[3].classList.add("disabled")

        axios.post('https://chatappback.onrender.com/auth/signup', data).then(res => {
            console.log(res)
            e.target[3].disabled = false
            e.target[3].classList.remove("disabled")
            let errorP = document.querySelector(".errorMessage");
            errorP.classList.add("none")
            if (res.data === "email already exist" || res.data === "pseudo already exist") {
                errorP.classList.remove("none")
                errorP.textContent = res.data
            } else {
                errorP.classList.add("none")
                window.location.replace('/');
            }
        }).catch(err => {
            console.log(data)
            console.log(err)
            e.target[3].disabled = false
            e.target[3].classList.remove("disabled")
        })
    }
    return (
        <div className="signup">
            <div className="signinBloc">
                <div className="header">
                    <div className="logo"><img alt="devchallenges" src={devchallengeicon} /><h2>devchallenges</h2></div>
                    <p>Sign up</p>
                </div>
                <form onSubmit={createAccount} className="formulaire">
                    <div className="secondEditionForFirstInputs firstInputs">
                        <input required className="email inpt" placeholder="your email" type="email" />
                        <input required minLength="3" maxLength="10" className="pseudo inpt" placeholder="your pseudo" type="text" />
                        <input required minLength="6" maxLength="22" className="pass inpt" placeholder="Password" type="password" />
                    </div>
                    <p className="errorMessage none"></p>
                    <input className="submitButton btn" type="submit" value="Signin" />
                </form>
                <div className="theDetails">
                    <div className="secondProp">
                        <div className="signupLink">
                            <p>Already have an account?<NavLink to="/" exact> Register</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup