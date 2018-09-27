import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_shipping from '../components/Header_shipping';
import CreateBOL from '../components/CreateBOL';
import Notification_shipping from '../components/Notification_shipping';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import consensusChain_Shipping from '../../../build/contracts/consensusChain_Shipping.json';
import getWeb3 from '../../utils/getWeb3';




class Shipping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createBOL: false
        }

        this.openCreateBOL_Modal = this.openCreateBOL_Modal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.CreateBillOfLadding=this.CreateBillOfLadding.bind(this);
    }

    openCreateBOL_Modal() {
        //console.log(this.state.createBOL);
        this.setState({ createBOL: true })
    }

    closeModal() {
        //console.log(this.state.createBOL);
        this.setState({ createBOL: false })
    }

    componentWillMount() {
        
                getWeb3
                    .then(results => {
                        this.setState({
                            web3: results.web3
                        })
                        //console.log(this.state.web3);
        
        
                    })
                    .catch(() => {
                        console.log('Error finding web3.')
                    })
            }

    CreateBillOfLadding=(e)=>{
        e.preventDefault();
        document.getElementById("loader").removeAttribute("hidden");
        
        const quotationId=e.target.elements.quotationId.value;
        const shipping_from=e.target.elements.shipping_from.value;
        const temperature=e.target.elements.temperature.value;
        const number_of_boxes=e.target.elements.number_of_boxes.value;
        const shipping_to=e.target.elements.shipping_to.value;
        const weight = e.target.elements.weight.value;


        const account =this.state.web3.eth.accounts[0];
        //this.state.web3.personal.unlockAccount(account, "testing");
        
                var ShippingInstance;
                const contract = require('truffle-contract');
                const Shipping = contract(consensusChain_Shipping);
                Shipping.setProvider(this.state.web3.currentProvider);
                
                Shipping.deployed().then(function (instance) {
        
                    ShippingInstance = instance;
                    return ShippingInstance.createBOL(quotationId, shipping_from,shipping_to,temperature,weight,number_of_boxes,5,{ from: account, gas: 4700000 });
                }).then(function (result) {
                    //console.log(result);
                    document.getElementById("loader").setAttribute("hidden","hidden");
                    
                })
    }




    // <Notification />
     
    render() {


        return (
            <div>
               
                <Header_shipping openCreateBOL_Modal={this.openCreateBOL_Modal} />
                <Notification_shipping />
                <CreateBOL closeModal={this.closeModal} CreateBillOfLadding={this.CreateBillOfLadding} createBOL={this.state.createBOL}/>
            </div>
        )
    }
}




export default Shipping;