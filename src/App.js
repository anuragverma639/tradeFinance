import React, { Component } from 'react';
import consensusChain_Exporter from '../build/contracts/consensusChain_ExporterWork.json';
import getWeb3 from './utils/getWeb3';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import AppRouter from './utils/route';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

 

  

  render() {
    return (
      <div>
        <AppRouter />
       
      </div>
         
         
    );
  }
}

export default App
