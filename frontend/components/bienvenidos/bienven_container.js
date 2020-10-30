import { connect } from 'react-redux';
import {login, clearErrors, createNewUser} from '../../actions/session_actions';
import {updateDetails} from '../../actions/user_actions';
import Bienven from './bienven';

const mapStateToProps = state => ({
    errors: state.errors.session,
})

const mapDispatchToProps = dispatch => ({
    clearErrors: () => dispatch(clearErrors()),
    processForm: user => dispatch(login(user)),
    createNewUser: user => dispatch(createNewUser(user)),
    updateDetails: user => dispatch(updateDetails(user))
})

export default connect (mapStateToProps, mapDispatchToProps)(Bienven);