import React, { Component } from 'react';
import { connect } from 'react-redux'; 

class CoinInfo extends Component {    
    render(){
        let stats = this.props.stats
        let coin = this.props.coin
        return stats.lastUpdated ? (
            <div>
                Latest: {stats.bx[coin].last_price} | <span style={{color: stats.bx[coin].change > 0 ? '#A2D9CE' : '#E59866'}}>{stats.bx[coin].change}</span>
            </div>
        ) : (<div>-</div>);
    }
}

export default CoinInfo;