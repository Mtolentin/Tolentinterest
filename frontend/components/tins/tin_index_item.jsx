import React from 'react';
import { withRouter } from 'react-router-dom';

class TinIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.showImage = this.showImage.bind(this);
    }

    showImage(){
        return (e) => {
            e.preventDefault();
            document.getElementById(this.props.tin.id).classList.add("image-load");
        }
    }

    render(){
        const {tin, lastTin} = this.props;
        return (
            <div className="tin-box">
                <div className="tin-box-details">
                    <div className="tin-image">
                        <img className="thumbnail" src={tin.photoUrl} id={tin.id} onLoad={this.showImage(lastTin)} />
                    </div>
                </div>
                <div className="tin-space"></div>
            </div>
        )
    }
}

export default withRouter(TinIndexItem);