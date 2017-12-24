import React, { Component } from 'react';
import CoinHeader from './CoinHeader';

class CryptoCard extends Component {
    constructor(props){
        super(props)
        this.chart = new cryptowatch.Embed('bitfinex', props.coin + 'usd')
    }

    componentDidMount(){
        //this.chart.mount(this.chartComponent)
    }

    render(){
        return (
            <div className="square">
                <CoinHeader coin={this.props.coin}/>
		        <div ref={chart => this.chartComponent = chart} style={{flex: 1}}></div>
            </div>
        );
    }
}

export default CryptoCard;