import { connect } from 'react-redux';
import CreateShelfForm from './shelf_create_form';
import { createShelf } from '../../actions/shelf_actions';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({errors}) => ({
    errors
})

const mapDispatchToProps = dispatch => ({
    createShelf: shelf => dispatch(createShelf(shelf)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateShelfForm);