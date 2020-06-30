import { connect } from 'react-redux';
import { clearErrors, createNewUser } from '../../actions/session_actions';
import { updateDetails } from '../../actions/user_actions';
import SignUpForm from './sign_up_form';

const mSTP = (state) => ({
    errors: state.errors.session
})

const mDTP = (dispatch) => ({
    clearErrors: () => dispatch(clearErrors()),
    createNewUser: user => dispatch(createNewUser(user)),
    updateDetails: user => dispatch(updateDetails(user))
})

export default connect(mSTP, mDTP)(SignUpForm);