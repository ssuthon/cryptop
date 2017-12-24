import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import numeral from 'numeral';
import _ from 'lodash';

class CoinInfo extends Component {    
    render(){
        let stats = this.props.stats
        let coin = this.props.coin
        if(stats.lastUpdated && stats[this.props.market]){
            let price, change;
            switch(this.props.market){
                case 'bx':
                    price = stats.bx[coin].last_price
                    change = stats.bx[coin].change                    
                    break
                case 'cmc':
                    price = stats.cmc[coin].price_thb
                    change = stats.cmc[coin].percent_change_1h + '(1H)'
                    break     
            }
            return (
                <div className="header_info">
                    {this.props.market.toUpperCase()}: {numeral(_.toNumber(price)).format('0,0.00')} | <span style={{color: change > 0 ? '#A2D9CE' : '#E59866'}}>{change}</span>
                </div>
            );
            
        }else{
            return (<div>-</div>);
        }        
    }
}

export default CoinInfo;