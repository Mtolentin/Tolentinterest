import { connect } from 'react-redux';


import { updateDetails } from '../../actions/user_actions';
import EditProfileForm from './edit_profile';



const mSTP = ({ entities: {users}, session: { currentUserId}}) => ({
    currentUserId,
    users
});

const mDTP = dispatch => ({
    updateDetails: user => dispatch(updateDetails(user))
});


export default connect(mSTP, mDTP)(EditProfileForm);