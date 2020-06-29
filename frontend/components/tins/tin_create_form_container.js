import {connect} from 'react-redux';
import CreateTinForm from './tin_create_form';
import { createTin, saveToShelf } from '../../actions/tin_actions';
import { clearErrors } from '../../actions/session_actions';
import {fetchShelves, createShelf} from '../../actions/shelf_actions'

const mapStateToProps = ({entities: {users, shelves}, errors, session}) => ({
    owner: users[session.currentUserId],
    shelves: Object.values(shelves),
    errors: errors.tins
})

const mapDispatchToProps = dispatch => ({
    fetchShelves: (userId) => dispatch(fetchShelves(userId)),
    createShelf: shelf => dispatch(createShelf(shelf)),
    createTin: tin => dispatch(createTin(tin)),
    clearErrors: () => dispatch(clearErrors()),
    saveToShelf: (shelfTin) => dispatch(saveToShelf(shelfTin))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTinForm);