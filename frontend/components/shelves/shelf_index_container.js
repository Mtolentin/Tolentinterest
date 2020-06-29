import {connect} from 'react-redux';
import { fetchShelves, createShelf, updateShelf, deleteShelf } from '../../actions/shelf_actions';
import ShelfIndex from './shelf_index';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({entities: {shelves}, session: {currentUserId}, errors}) => ({
    shelves: Object.values(shelves),
    currentUserId,
    errors: errors.shelves
})

const mapDispatchToProps = (dispatch, {match: {params}}) => ({
    fetchShelves: () => dispatch(fetchShelves(params.userId)),
    clearErrors: () => dispatch(clearErrors()),
    createShelf: shelf => dispatch(createShelf(shelf)),
    updateShelf: shelf => dispatch(updateShelf(shelf)),
    deleteShelf: (userId, shelfId) => dispatch(deleteShelf(userId, shelfId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShelfIndex);