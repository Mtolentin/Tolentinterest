import React from 'react';
import { withRouter } from 'react-router-dom';

class PinIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.showPinDetails = this.showPinDetails.bind(this);
        this.showImage = this.showImage.bind(this);
    }

    showPinDetails(){
        // debugger
        const pinId = this.props.pin.id;
        this.props.history.push(`/tins/${pinId}`);
        window.scrollTo(0, 0);
    }

    showImage(lastPin){
        return (e) => {
            e.preventDefault();
            document.getElementById(this.props.pin.id).classList.add("image-load");
        }
    }

    render(){
        const {pin, lastPin} = this.props;
        return (
            <div className="pin-box" onClick={this.showPinDetails}>
                <div className="pin-box-details">
                    <div className="pin-image">
                        <img className="thumbnail" src={pin.photoUrl} id={pin.id} onLoad={this.showImage(lastPin)} />
                    </div>
                </div>
                <div className="pin-space"></div>
            </div>
        )
    }
}

export default withRouter(PinIndexItem);