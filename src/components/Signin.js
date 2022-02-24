import React from 'react';
import devchallengeicon from '../import/devchallenges.png'
import padlockIcon from '../import/padlock.svg'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Signin = () => {

    return (
        <div className="signin">
            <div className="signinBloc">
                <div className="header">
                    <div className="logo"><img alt="devchallenges" src={devchallengeicon} /><h2>devchallenges</h2></div>
                    <p>Sign in</p>
                </div>
                <form onSubmit={e => {
                    e.preventDefault();
                    const data = {
                        pseudoOrEmail: e.target[0].value,
                        password: e.target[1].value
                    }
                    axios.post("https://chatappback.onrender.com/auth/login", data).then(res => {
                        console.log(res.data)
                        let errorMessageSignin = document.querySelector(".errorMessageSignin");
                        errorMessageSignin.classList.add("none")
                        if (res.data === "pseudo or email are not valid" || res.data === "incorrect password") {
                            errorMessageSignin.classList.remove("none")
                            errorMessageSignin.textContent = res.data
                        }else{
                            console.log("c'est valide")
                            console.log(res.data)
                            document.cookie = "__user="+res.data.cookie
                            window.location.reload()
                        }
                    }).catch(err => {
                        console.error("error grave " + err)
                    })
                }} className="formulaire">
                    <div className="firstInputs">
                        <input required className="inpt" placeholder="Username or email..." type="text" />
                        <input required className="inpt" placeholder="Password" type="password" />
                        <div className="checkZone"><input className="check" name="check" type="checkbox" /><label htmlFor="check">Remember me</label></div>
                    </div>
                    <p className="errorMessageSignin none"></p>
                    <input className="submitButton btn" type="submit" value="Log in" />
                </form>
                <div className="theDetails">
                    <div className="firstProp">
                        <img alt="padlock" src={padlockIcon} />
                        <p>forgot your password?</p>
                    </div>
                    <div className="secondProp">
                        <NavLink to="/signup" exact>Create an account</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin