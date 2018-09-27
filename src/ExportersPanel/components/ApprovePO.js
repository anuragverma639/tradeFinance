import React, { Component } from 'react';
import { Button, Navbar, Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';

import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import consensusChain_Importer from '../../../build/contracts/consensusChain_Importer.json';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let quotationId
let Web3

class ApprovePO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: null
        }
        //console.log(props);

        quotationId = props.id;

        this.ApprovePO = this.ApprovePO.bind(this);
        this.RejectPO = this.RejectPO.bind(this);
        this.getPODetails = this.getPODetails.bind(this);
    }


    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                //console.log(this.state.web3);
                Web3 = this.state.web3;
                this.getPODetails();
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }


    getPODetails() {

        const account = this.state.web3.eth.accounts[0];

        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var ImporterInstance;
        const contract = require('truffle-contract');
        const Importer = contract(consensusChain_Importer);
        Importer.setProvider(this.state.web3.currentProvider);
        var quot = [];
        let id = parseInt(quotationId);

        //console.log(id);

        Importer.deployed().then(function (instance) {

            ImporterInstance = instance;

            return ImporterInstance.getPO(id, { from: account, gas: 4700000 });

        }).then(function (result) {
            document.getElementById("quotation_id").value = id;
            document.getElementById("productName").value = Web3.toUtf8(result[0]);
            document.getElementById("quantity").value = (result[1]);
            document.getElementById("rate_per_quantity").value = (result[2]);
            document.getElementById("description").value = Web3.toUtf8(result[3]);
            document.getElementById("tax").value = (result[4]);
            document.getElementById("terms_conditions").value = Web3.toUtf8(result[5]);
        })

    }
    //answerPO

    ApprovePO() {
        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
        
        //this.state.web3.personal.unlockAccount(account, "testing");
        var ExporterInstance;
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(this.state.web3.currentProvider);
        let id = parseInt(quotationId);

        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;

            return ExporterInstance.answerPO(id,true, { from: account, gas: 4700000 });

        }).then(function(result){
            //console.log(result);
            document.getElementById("loader").setAttribute("hidden","hidden");
            
        })
    }

    RejectPO() {
        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
        
        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var ExporterInstance;
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(this.state.web3.currentProvider);
        let id = parseInt(quotationId);
        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;

            return ExporterInstance.answerPO(id,false, { from: account, gas: 4700000 });

        }).then(function(result){
            //console.log(result);
            document.getElementById("loader").setAttribute("hidden","hidden");
            
        })
    }




    render() {
        return (
            <div>
                <div className="container-fluid"><h2> PURCHASE ORDER</h2></div>

                <div className="container">
                    <Form>
                        <div>
                            <br />
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="quotation_id" >
                                            <ControlLabel>QUOTATION ID</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter QUOTATION ID"
                                                name="quotation_id"
                                                id="quotation_id"
                                                readOnly
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="productName" >
                                            <ControlLabel>PRODUCT NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="productName"
                                                id="productName"
                                                readOnly
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="description" >
                                            <ControlLabel>DESCRIPTION</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Description"
                                                name="description"
                                                id="description"
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6} md={6}>

                                        <FormGroup controlId="quantity" >
                                            <ControlLabel>Quantity</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Quantity"
                                                name="quantity"
                                                id="quantity"
                                                readOnly
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="rate_per_quantity" >
                                            <ControlLabel>Rate Per Quantity</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Rate per Quantity"
                                                name="rate_per_quantity"
                                                id="rate_per_quantity"
                                                readOnly
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="tax" >
                                            <ControlLabel>Tax (in %)</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Tax"
                                                name="tax"
                                                id="tax"
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <FormGroup controlId="terms_conditions" >
                                            <ControlLabel>Terms And Conditions</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="Terms and Contitions"
                                                name="terms_conditions"
                                                id="terms_conditions"
                                                readOnly
                                            />
                                        </FormGroup>

                                        <br />
                                        <div >
                                        <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                        </div>


                                        <Button bsStyle="success" onClick={this.ApprovePO} >Approve</Button> &nbsp;
                                        <Button bsStyle="danger" onClick={this.RejectPO}>Reject</Button>

                                    </Col>
                                </Row>

                            </Grid>

                        </div>
                    </Form>
                </div>


            </div>
        );
    }
}

export default ApprovePO;