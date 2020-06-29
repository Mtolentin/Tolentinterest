import React from 'react'
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavBarContainer from './nav_bar/navbar_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import WelcomeContainer from './session_form/welcome_container';

import TinIndexContainer from './pins/pin_index_container';
import TinShowContainer from './pins/pin_show_container';
import TinCreateContainer from './pins/pin_create_form_container';
import ShelvesIndexContainer from './boards/board_index_container';
import UserProfileContainer from './user/user_profile_container';
import ShelfShowContainer from './boards/board_show_container';

const App = () => (

<div>


        <header>
            <ProtectedRoute path="/" component={NavBarContainer} />
        </header>

        <ProtectedRoute path="/users/:userId" component={UserProfileContainer} />

        <Switch>
            
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/" component={WelcomeContainer} />
            
            <ProtectedRoute path="/pins/:tinId" component={TinShowContainer} />
            <ProtectedRoute path="/users/:userId/tins" component={TinIndexContainer} />
            <ProtectedRoute path="/users/:userId/shelves/:shelfId" component={ShelfShowContainer} />
            <ProtectedRoute path="/users/:userId/shelves" component={ShelvesIndexContainer} />
            <ProtectedRoute path="/tin-builder" component={TinCreateContainer} />
            <ProtectedRoute path="/home" component={TinIndexContainer} />
            
        </Switch>

        
    </div>
);

export default App;