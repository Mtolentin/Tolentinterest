import {connect} from 'react-redux';
import { fetchTins } from '../../actions/tin_actions';
import TinIndex from './tin_index';
import { selectUserTins, selectSuggestedTins, selectOtherUsersTins } from '../../reducers/selectors';

const mSTP = ({entities, session}, {match: {params}}) => {
    let tins;
    let createOption = false;
    let mainFeed = false;
    if (params.shelfId) {
        tins = entities.shelves[parseInt(params.shelfId)].tins
    } else if (params.userId) {
        tins = selectUserTins(entities.tins, parseInt(params.userId));
        if ( parseInt(params.userId) === session.currentUserId ) createOption = true;
    } else if (params.tinId){
        tins = selectSuggestedTins(entities.tins, session.currentUserId, parseInt(params.tinId))
    } else {
        tins = selectOtherUsersTins(entities.tins, parseInt(session.currentUserId));
        mainFeed = true;
    }
    return { tins, createOption, mainFeed }
}

const mDTP = dispatch => ({
    getInfo: () => dispatch(fetchTins())
});

export default connect(mSTP, mDTP)(TinIndex);