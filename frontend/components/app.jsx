import React from 'react'
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './nav_bar/navbar_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import WelcomeContainer from './session_form/welcome_container';
import PinIndexContainer from './pins/pin_index_container';
import PinShowContainer from './pins/pin_show_container';
import PinCreateContainer from './pins/pin_create_form_container';
import BoardIndexContainer from './boards/board_index_container';
import UserProfileContainer from './user/user_profile_container';
import BoardShowContainer from './boards/board_show_container';

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

            <ProtectedRoute path="/tins/:tinId" component={PinShowContainer} />
            <ProtectedRoute path="/users/:userId/pins" component={PinIndexContainer} />

            <ProtectedRoute path="/users/:userId/shelve/:shelveId" component={BoardShowContainer} />
            <ProtectedRoute path="/users/:userId/shelves" component={BoardIndexContainer} />
            

            <ProtectedRoute path="/pin-builder" component={PinCreateContainer} />
            

            <ProtectedRoute path="/home" component={PinIndexContainer} />

        </Switch>

        
    </div>
);

export default App;