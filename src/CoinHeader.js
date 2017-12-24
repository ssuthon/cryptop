import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import CoinInfo from './CoinInfo';

class CoinHeader extends Component {    
    render(){
        return (
            <div className="card_header">
                <div className="coin_title">
                    {this.props.coin.toUpperCase()}
                </div>
                <div className="coin_info">
                    <CoinInfo {...this.props} market="bx"/>                    
                </div>
                <div className="coin_info">
                    <CoinInfo {...this.props} market="cmc"/>                    
                </div>
            </div>		        
        );
    }
}

export default connect(
    state => {
        return { stats: state.stats };
    }
)(CoinHeader);