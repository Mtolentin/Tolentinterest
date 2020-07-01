import React from 'react';
import TinIndexItem from './tin_index_item';
import { NavLink } from 'react-router-dom';


class TinIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: 0,
            shuffle: false
        }
        this.reorganizeTins = this.reorganizeTins.bind(this);
    }


    componentDidMount(){
        let body = document.querySelector("body");
        body.style.height = "auto";
        body.style.overflow = "visible";
        this.props.getInfo();
        this.reorganizeTins();
        window.addEventListener("resize", this.reorganizeTins);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.reorganizeTins);
    }

    addCreateTin(){
        if (this.props.createOption){
            return (
                <NavLink to="/tin-builder" className="create-tin-button">
                    <div className="image">
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="title">Create Tin</div>
                </NavLink>
            )
        }
    }

    getNumCols(){
        let indexMargin = 160;
        let tinWidth = 244;
        return Math.floor((window.innerWidth - indexMargin) / tinWidth);
    }

    reorganizeTins(){
        const numCols = this.getNumCols();
        if (numCols !== this.state.columns && numCols > 0){
            this.setState({ 
                columns: numCols,
                shuffle: true
            });
        }   
    }

    shuffleTins(){
        
        const { tins } = this.props;
        const { columns, shuffle } = this.state;

        if (!shuffle) return [];
        let tinCols = new Array(columns);
        for (let i = 0; i < tinCols.length; i++) {
            tinCols[i] = new Array(0);
        }


        let shuffleTins = tins;
        for (let i = 0; i < shuffleTins.length; i++) {
            let col = i % columns;
            tinCols[col].push(shuffleTins[i]);
        }
        return tinCols;

    }


    showTins(sortTins){
        const { tins } = this.props;
        const { columns } = this.state;
        if (!tins || tins.length === 0 || sortTins.length === 0 || !columns) return null;
        const lastCol = sortTins.length - 1;
        const lastRow = sortTins[lastCol].length - 1;


        return (
            <div className="all-tins-box">
                {(sortTins).map((tinCol, colNum) => {


                    return (
                        <div key={colNum} className="tin-column">
                            {(colNum === 0) ? this.addCreateTin() : ""}
                            {tinCol.map((tin, idx) => {
                                const lastTin = colNum === lastCol && idx === lastRow;
                                return <TinIndexItem key={idx} tin={tin} lastTin={lastTin} />;
                            })}
                        </div>
                    )


                })}
            </div>
        )


    }

    render(){
        const sortTins = this.shuffleTins();
        return (
            <div className="tin-index-box">
                {this.showTins(sortTins)}
            </div>
        )
    }
}

export default TinIndex;