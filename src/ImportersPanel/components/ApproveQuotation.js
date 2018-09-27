import React, { Component } from 'react';
import { Button, Navbar,Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
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
class ApproveQuotation extends Component {

    
    constructor(props) {
        super(props);
        
        quotationId=props.id;
       this.state = {
            
            web3:null
        }

      this.getQuotationDetails=this.getQuotationDetails.bind(this);
      this.approveQuotation=this.approveQuotation.bind(this);
      this.rejectQuotation=this.rejectQuotation.bind(this);
    }

   
    componentWillMount() {
        
                getWeb3
                    .then(results => {
                        this.setState({
                            web3: results.web3
                        })
                        //console.log(this.state.web3);
                        Web3=this.state.web3;
                        this.getQuotationDetails();
                    })
                    .catch(() => {
                        console.log('Error finding web3.')
                    })
            }


    getQuotationDetails(){

        const account = this.state.web3.eth.accounts[0];
       
       // this.state.web3.personal.unlockAccount(account, "testing");
        var Web3 = this.state.web3;
        var ExporterInstance;
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(this.state.web3.currentProvider);
        var quot = [];
        let id=parseInt(quotationId);

        //console.log(id);

        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;

           return ExporterInstance.getQuotation(id,{from : account, gas:4700000});

        }).then(function(result){
            document.getElementById("exporter_email").value=Web3.toUtf8(result[1]);
        }).then(function(){
            return ExporterInstance.getProductDetails(id,{from:account,gas:4700000});
        }).then(function(res){
            document.getElementById("product_name").value=Web3.toUtf8(res[0]);
            document.getElementById("description").value=Web3.toUtf8(res[1]);
            document.getElementById("quantity").value=res[2];
            document.getElementById("rate_per_quantity").value=res[3];
            document.getElementById("tax").value=res[4];
        });


    }

    approveQuotation(){

        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
       // this.state.web3.personal.unlockAccount(account, "testing");
         var Web3 = this.state.web3;
         var ImporterInstance;
         const contract = require('truffle-contract');
         const Importer = contract(consensusChain_Importer);
         Importer.setProvider(this.state.web3.currentProvider);
         var quot = [];
         let id=parseInt(quotationId);
 
         //console.log(id);
 
         Importer.deployed().then(function (instance) {
 
             ImporterInstance = instance;
 
            return ImporterInstance.answerQuotation(id,true,{from : account, gas:4700000});
 
         }).then(function(result){
            document.getElementById("loader").setAttribute("hidden","hidden");
            
            //console.log(result);
         })
    }
    

    rejectQuotation(){
        const account = this.state.web3.eth.accounts[0];
        document.getElementById("loader").removeAttribute("hidden");
        
        // this.state.web3.personal.unlockAccount(account, "testing");
         var Web3 = this.state.web3;
         var ImporterInstance;
         const contract = require('truffle-contract');
         const Importer = contract(consensusChain_Importer);
         Importer.setProvider(this.state.web3.currentProvider);
         var quot = [];
         let id=parseInt(quotationId);
 
         //console.log(id);
 
         Importer.deployed().then(function (instance) {
 
             ImporterInstance = instance;
 
            return ImporterInstance.answerQuotation(id,false,{from : account, gas:4700000});
 
         }).then(function(result){
            document.getElementById("loader").setAttribute("hidden","hidden");
            
            //console.log(result);
         })
    }




render(){
    return (
        <div>
        <div className="container-fluid"><h2>NEW QUOTATION</h2></div>

        <div className="container">
            <form >
                <div>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={2} md={2}></Col>
                            <Col xs={8} md={8}>
                                <FormGroup controlId="exporter_email" >
                                    <ControlLabel>Exporter email</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Email"
                                        id="exporter_email"
                                        name="exporter_email"
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup controlId="product_name" >
                                    <ControlLabel>Product Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Product Name"
                                        name="product_name"
                                        id="product_name"
                                        readOnly
                                    />
                                </FormGroup>
                                <FormGroup controlId="description" >
                                    <ControlLabel>Description</ControlLabel>
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

                                <div >
                                <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                </div>

                                <Button bsStyle="success" onClick={this.approveQuotation}  >Approve</Button> &nbsp;
                            <Button bsStyle="danger" onClick={this.rejectQuotation}>Reject</Button>
                            </Col>
                            <Col xs={2} md={2}></Col>
                        </Row>

                    </Grid>

                </div>
            </form>
        </div>
   

        </div>
    );
}
}

export default ApproveQuotation;