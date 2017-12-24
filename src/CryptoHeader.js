import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import moment from 'moment'

class CryptoHeader extends Component {    
    render(){
        return (
            <div className="crypto_header">
                <div>Cryptop</div>
                <div style={{'padding-left': '1em'}}>{moment(this.props.stats.lastUpdated).format('hh:mm:ss A')}</div>                
            </div>
        );
    }
}

export default connect(
    state => {
        return { stats: state.stats };
    }
)(CryptoHeader);