import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
import LoginForm from './login_form';

const mSTP = state => ({
    errors: state.errors.session,
})

const mDTP = dispatch => ({
    clearErrors: () => dispatch(clearErrors()),
    processForm: user => dispatch(login(user)),
})

export default connect (mSTP, mDTP)(LoginForm);