import {connect} from 'react-redux';

import TinShow from './tin_show';
import { updateTin, fetchTins, deleteTin, saveToShelf } from '../../actions/tin_actions';
import { fetchShelves, createShelf } from '../../actions/shelf_actions';
import { clearErrors } from '../../actions/session_actions';
import { fetchUsers } from '../../actions/user_actions'

const mSTP = ({ entities: { users, tins, shelves }, session: { currentUserId }, errors }, { match: { params } }) => {
    return {
        tins,
        chosenTinId: parseInt(params.tinId),
        users,
        errors,
        currentUserId,
        shelves: Object.values(shelves)
    }
}

const mDTP = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    fetchTins: () => dispatch(fetchTins()),
    fetchShelves: (userId) => dispatch(fetchShelves(userId)),
    clearErrors: () => dispatch(clearErrors()),
    updateTin: tin => dispatch(updateTin(tin)),
    deleteTin: tinId => dispatch(deleteTin(tinId)),
    saveToShelf: (shelfTin) => dispatch(saveToShelf(shelfTin)),
    createShelf: shelf => dispatch(createShelf(shelf))
})

export default connect(mSTP, mDTP)(TinShow);