import {connect} from 'react-redux';


import UserProfile from './user_profile';
import { createShelf } from '../../actions/shelf_actions';
import { clearErrors } from '../../actions/session_actions';
import { receiveUser, updateDetails } from '../../actions/user_actions';



const mSTP = ({entities: {users}, session: {currentUserId}, errors}, {match}) => ({
    user: users[match.params.userId],
    errors: errors.boards,
    currentUserId
})

const mDTP = dispatch => ({
    fetchUser: userId => dispatch(receiveUser(userId)),
    createShelf: shelf => dispatch(createShelf(shelf)),
    clearErrors: () => dispatch(clearErrors),
    updateDetails: user => dispatch(updateDetails(user))
})



export default connect(mSTP, mDTP)(UserProfile);