import {connect} from 'react-redux';
import { fetchShelf, fetchTinShelves } from '../../actions/shelf_actions';
import {fetchTins} from '../../actions/tin_actions';
import ShelfShow from './shelf_show';
import { selectShelfTins } from '../../reducers/selectors';

const mapStateToProps = ({entities: {shelves, tinShelves, tins}, errors}, {match: {params}}) => ({
    shelf: shelves[params.shelfId],
    tins: selectShelfTins(tinShelves, tins, parseInt(params.shelfId)),
    errors
})

const mapDispatchToProps = (dispatch, {match: {params}}) => ({
    fetchShelf: () => dispatch(fetchShelf(params.userId, params.ShelfId)),
    fetchTins: () => dispatch(fetchTins()),
    fetchTinShelves: () => dispatch(fetchTinShelves())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShelfShow);