import React, { Component } from 'react';
import { Button, Image, Navbar, Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import consensusChain_Importer from '../../../build/contracts/consensusChain_Importer.json';
import consensusChain_Custom from '../../../build/contracts/consensusChain_Custom.json';
import consensusChain_Shipping from '../../../build/contracts/consensusChain_Shipping.json';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let quotationId
let Web3
class ApproveQuotation extends Component {


    constructor(props) {
        super(props);

        quotationId = props.id;
        this.state = {

            web3: null
        }

        this.getPODetails = this.getPODetails.bind(this);
        this.approveQuotation = this.approveQuotation.bind(this);
        this.rejectQuotation = this.rejectQuotation.bind(this);
        this.getDocsDetails = this.getDocsDetails.bind(this);
        this.getBOLDetails = this.getBOLDetails.bind(this);
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

        })
        this.getBOLDetails();
        this.getDocsDetails();

    }


    getDocsDetails() {
        const account = this.state.web3.eth.accounts[0];

        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var ExporterInstance;
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(this.state.web3.currentProvider);
        let id = parseInt(quotationId);

        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;


            return ExporterInstance.getDocs(id);
        }).then(function (result) {
            let doc1 = Web3.toUtf8(result[0]) + Web3.toUtf8(result[1]);
            let doc2 = Web3.toUtf8(result[2]) + Web3.toUtf8(result[3]);
            let doc3 = Web3.toUtf8(result[4]) + Web3.toUtf8(result[5]);
            let url1 = `https://ipfs.io/ipfs/${doc1}`;
            let url2 = `https://ipfs.io/ipfs/${doc2}`;
            let url3 = `https://ipfs.io/ipfs/${doc3}`;
            //console.log(url1);
            document.getElementById("doc1").src = url1;
            document.getElementById("doc2").src = url2;
            document.getElementById("doc3").src = url3;
            document.getElementById("doc1link").href = url1;
            document.getElementById("doc2link").href = url2;
            document.getElementById("doc3link").href = url3;
        });


    }

    getBOLDetails() {
        const account = this.state.web3.eth.accounts[0];

        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var ShippingInstance;
        const contract = require('truffle-contract');
        const Shipping = contract(consensusChain_Shipping);
        Shipping.setProvider(this.state.web3.currentProvider);
        let id = parseInt(quotationId);

        Shipping.deployed().then(function (instance) {

            ShippingInstance = instance;


            return ShippingInstance.getBOL(id);
        }).then(function (res) {
            //console.log(res);
            document.getElementById("shipping_from").value = Web3.toUtf8(res[0]);
            document.getElementById("shipping_to").value = Web3.toUtf8(res[1]);
            document.getElementById("temperature").value = Web3.toUtf8(res[2]);
            document.getElementById("weight").value =  (res[3]);
            document.getElementById("number_of_boxes").value =  (res[4]);
        })
    }

    approveQuotation() {

        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
        
        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var CustomInstance;
        const contract = require('truffle-contract');
        const Custom = contract(consensusChain_Custom);
        Custom.setProvider(this.state.web3.currentProvider);
        var quot = [];
        let id = parseInt(quotationId);

        //console.log(id);

        Custom.deployed().then(function (instance) {

            CustomInstance = instance;

            return CustomInstance.updateStatusOfQuotation(id, 6, true, { from: account, gas: 4700000 });

        }).then(function (result) {
            //console.log(result);
            document.getElementById("loader").setAttribute("hidden","hidden");
            
        })
    }


    rejectQuotation() {

        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
        
        //this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var CustomInstance;
        const contract = require('truffle-contract');
        const Custom = contract(consensusChain_Custom);
        Custom.setProvider(this.state.web3.currentProvider);
        var quot = [];
        let id = parseInt(quotationId);

        //console.log(id);

        Custom.deployed().then(function (instance) {

            CustomInstance = instance;

            return CustomInstance.updateStatusOfQuotation(id, 5, false, { from: account, gas: 4700000 });

        }).then(function (result) {
            //console.log(result);
            document.getElementById("loader").setAttribute("hidden","hidden");
            
        })
    }




    render() {
        return (
            <div>
                <div className="container">
                    <form >

                        <div>
                            <Grid>
                                <Row className="show-grid">

                                    <Col xs={6} md={6}>
                                        <h3>Purchase Order</h3>

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
                                    <Col xs={6} md={6}>
                                        <h3>Bill Of Ladding</h3>
                                        <FormGroup controlId="shipping_from">
                                            <ControlLabel >SHIPPING FROM</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Shipping Name" name="shipping_from" readOnly />
                                        </FormGroup>

                                        <FormGroup controlId="temperature">
                                            <ControlLabel >TEMPERATURE (in Celsius)</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Temperature" name="temperature" readOnly />

                                        </FormGroup>

                                        <FormGroup controlId="number_of_boxes">
                                            <ControlLabel >NUMBER OF BOXES</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Number of Boxes" name="number_of_boxes" readOnly />
                                        </FormGroup>
                                        <FormGroup controlId="shipping_to">
                                            <ControlLabel >SHIPPING TO</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Shipping Name" name="shipping_to" readOnly />
                                        </FormGroup>
                                        <FormGroup controlId="weight">
                                            <ControlLabel >WEIGHT</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Total Weight" name="weight" readOnly />
                                        </FormGroup>


                                    </Col>

                                </Row>
                                <br /> <br />
                                <Row>
                                    <Col >
                                        <h3>Documents Uploaded</h3>

                                        <br />
                                        <table className="table table-responsive ">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Document 1</strong></td>
                                                    <td>

                                                        <a href="#" target="_blank" id="doc1link" >
                                                            <img id="doc1" height="50px" width="50px" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Document 2</strong></td>
                                                    <td>

                                                        <a href="#" target="_blank" id="doc2link">
                                                            <img id="doc2" height="50px" width="50px" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Document 3</strong></td>
                                                    <td>
                                                        <a href="#" target="_blank" id="doc3link">
                                                            <img id="doc3" height="50px" width="50px" />
                                                        </a>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>

                                    </Col>

                                </Row>
                                <div >
                                <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                </div>
                                <Button bsStyle="success" onClick={this.approveQuotation}  >Approve</Button> &nbsp;
                                <Button bsStyle="danger" onClick={this.rejectQuotation}>Reject</Button>
                                <br /><br />
                            </Grid>

                        </div>
                    </form>
                </div>


            </div>
        );
    }
}

export default ApproveQuotation;