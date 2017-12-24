import React, { Component } from 'react';
import CryptoCard from './CryptoCard';
import { disbatch } from 'redux-act';
import { fetchStats } from './actions/main'
import { connect } from 'react-redux'; 

class App extends Component{
    componentDidMount(){
        let self = this
        setInterval(() => {            
            self.props.fetchStats();
        }, 2000)
    }
    render(){
        return (
            <div className="container">	  
                <div className="row">
                    <CryptoCard coin="btc"/>
                    <CryptoCard coin="ltc"/>
                    <CryptoCard coin="bch"/>
                </div>
                <div className="row">
                    <CryptoCard coin="omg"/>
                    <CryptoCard coin="xrp"/>
                    <CryptoCard coin="eth"/>                    
                </div>                
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({ fetchStats: () => dispatch(fetchStats())})
)(App);