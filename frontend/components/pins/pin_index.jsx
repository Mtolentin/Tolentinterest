import React from 'react';
import PinIndexItem from './pin_index_item';
import { NavLink } from 'react-router-dom';

class PinIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: 0,
            shuffle: false
        }
        this.reorganizePins = this.reorganizePins.bind(this);
    }

    componentDidMount(){
        let body = document.querySelector("body");
        body.style.height = "auto";
        body.style.overflow = "visible";
        this.props.getInfo();
        this.reorganizePins();
        window.addEventListener("resize", this.reorganizePins);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.reorganizePins);
    }

    addCreatePin(){
        if (this.props.createOption){
            return (
                <NavLink to="/pin-builder" className="create-pin-button">
                    <div className="image">
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="title">Create Pin</div>
                </NavLink>
            )
        }
    }

    getNumCols(){
        let indexMargin = 160;
        let pinWidth = 244;
        return Math.floor((window.innerWidth - indexMargin) / pinWidth);
    }

    reorganizePins(){
        const numCols = this.getNumCols();
        if (numCols !== this.state.columns && numCols > 0){
            this.setState({ 
                columns: numCols,
                shuffle: true
            });
        }   
    }

    shufflePins(){
        const { pins } = this.props;
        const { columns, shuffle } = this.state;
        if (!shuffle) return [];

        let pinCols = new Array(columns);
        for (let i = 0; i < pinCols.length; i++) {
            pinCols[i] = new Array(0);
        }

        let shufflePins = pins;
        for (let i = shufflePins.length - 1; i > 0; i--) {
            const randIdx = Math.floor(Math.random() * (i + 1));
            [shufflePins[i], shufflePins[randIdx]] = 
                [shufflePins[randIdx], shufflePins[i]];
        }

        for (let i = 0; i < shufflePins.length; i++) {
            let col = i % columns;
            pinCols[col].push(shufflePins[i]);
        }
        return pinCols;
    }


    showPins(pinList){
        const { pins } = this.props;
        const { columns } = this.state;
        if (!pins || pins.length === 0 || pinList.length === 0 || !columns) 
            return null;
        const lastCol = pinList.length - 1;
        const lastRow = pinList[lastCol].length - 1;
        return (
            <div className="all-pins-box">
                {(pinList).map((pinCol, colNum) => {
                    return (
                        <div key={colNum} className="pin-column">
                            {(colNum === 0) ? this.addCreatePin() : ""}
                            {pinCol.map((pin, idx) => {
                                const lastPin = colNum === lastCol 
                                    && idx === lastRow;
                                return <PinIndexItem key={idx} pin={pin} 
                                    lastPin={lastPin} />;
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    render(){
        const pinList = this.shufflePins();
        return (
            <div className="pin-index-box">
                {this.showPins(pinList)}
            </div>
        )
    }
}

export default PinIndex;