import React from "react";
import HomePage from "./pages/HomePage";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Signup from "./components/Signup";
import NotFound from './components/NotFound'
import { useDispatch } from "react-redux";
import { getOneChannel } from "./Actions/channelsActions";
import { getOneUser } from './Actions/usersActions';
import jwt from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch()
  dispatch(getOneChannel("6217d3bc8729c91c80ffcd1f"))

  let cook = document.cookie.split(';')

  let userId;
  cook.forEach(el => {
    try {
      let a = jwt(el)
      if (a) {
        userId = a.id
        dispatch(getOneUser(a.id))
      }
    } catch (error) {
      console.log("this token are not valid")
    }
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" strict exact component={HomePage} />
        <Route path="/signup" strict exact component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;
