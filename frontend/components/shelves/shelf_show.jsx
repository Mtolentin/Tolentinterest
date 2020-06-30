import React from 'react';
import TinIndex from '../tins/tin_index';

class ShelfShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const {fetchTins, fetchShelf, fetchTinShelves} = this.props;
        fetchTinShelves();
        fetchTins();
        fetchShelf();
    }

    render(){
        const {shelf, tins, fetchShelf} = this.props;
        if (!shelf) return null;
        return (
            <div className="shelf-show-box">
                <div className="shelf-info">
                    <h1>{shelf.name}</h1>
                    <p>{shelf.about}</p>
                </div>

                <div className="shelf-show-tins">
                    { !tins[0] ? "" : <TinIndex getInfo={fetchShelf} tins={tins} /> }
                </div>
            </div>
        )
    }
}

export default ShelfShow;