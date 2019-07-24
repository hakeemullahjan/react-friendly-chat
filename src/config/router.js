import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Screens from '../screens/index'

function Navigation(){
    return(
        <Router>
            <div>
                <Route exact path='/'  component={Screens.Signin} />
                <Route exact path='/signin'  component={Screens.Signin} />
                <Route path='/signup'  component={Screens.Signup} />
                <Route path='/chat/:chatroomID' component={Screens.Chat} />
                <Route path='/chatlist' component={Screens.ChatList} />
            </div>
        </Router>
    );
}

export default Navigation;