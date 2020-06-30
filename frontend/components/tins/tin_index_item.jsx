import React from 'react';
import { withRouter } from 'react-router-dom';

class TinIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.showTinDetails = this.showTinDetails.bind(this);
        this.showImage = this.showImage.bind(this);
    }

    showTinDetails(){
        const tinId = this.props.tin.id;
        this.props.history.push(`/tins/${tinId}`);
        window.scrollTo(0, 0);
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
            <div className="tin-box" onClick={this.showTinDetails}>
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