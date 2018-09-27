'use strict'

const IPFS = require('ipfs')
var arrayBufferToBuffer = require('arraybuffer-to-buffer');
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';

import React, { Component } from 'react';
import { Button, Navbar,Image, InputGroup, Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const contract = require('truffle-contract');



const document1_hash = "";
const document2_hash = "";
const document3_hash = "";
let node

class UploadDocs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: null
    }
    this.uploadDocument1 = this.uploadDocument1.bind(this);
    this.uploadDocument2 = this.uploadDocument2.bind(this);
    this.uploadDocument3 = this.uploadDocument3.bind(this);
    this.UploadDocs=this.UploadDocs.bind(this);
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
        //console.log('Error finding web3.')
      })

      

      create();

      function create() {
        // Create the IPFS node instance
  
        node = new IPFS({
          repo: String(Math.random() + Date.now())
        })
  
        node.once('ready', () => {
          //console.log('IPFS node is ready')
          
        })
      }
  
  }


  uploadDocument1() {

    const reader = new FileReader();
    const photo = document.getElementById("document1");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    //console.log(reader);

    reader.onloadend = function () {
      var buf = arrayBufferToBuffer(reader.result);
      //console.log(buf);
      ops(buf);
    }


    const self = this
    

    function ops(buf) {
      node.id((err, res) => {
        if (err) {
          throw err
        }

      })

      node.files.add([buf], (err, res) => {
        if (err) {
          throw err
        }

        const hash = res[0].hash
        document1_hash = hash;
      })
    }

  }

  uploadDocument2() {

    const reader = new FileReader();
    const photo = document.getElementById("document2");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    //console.log(reader);

    reader.onloadend = function () {
      var buf = arrayBufferToBuffer(reader.result);
      //console.log(buf);
      ops(buf);
    }


    const self = this
    
    function ops(buf) {
      node.id((err, res) => {
        if (err) {
          throw err
        }

      })

      node.files.add([buf], (err, res) => {
        if (err) {
          throw err
        }

        const hash = res[0].hash
        document2_hash = hash;
      })
    }


  }


  uploadDocument3() {
    const reader = new FileReader();
    const photo = document.getElementById("document3");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    //console.log(reader);

    reader.onloadend = function () {
      var buf = arrayBufferToBuffer(reader.result);
      //console.log(buf);
      ops(buf);
    }


    const self = this
    
    function ops(buf) {
      node.id((err, res) => {
        if (err) {
          throw err
        }

      })

      node.files.add([buf], (err, res) => {
        if (err) {
          throw err
        }

        const hash = res[0].hash
        document3_hash = hash;
      })
    }

  }



  UploadDocs(){

    //console.log(this.state.web3);
    document.getElementById("loader").removeAttribute("hidden");
    
    const account = this.state.web3.eth.accounts[0];
    //this.state.web3.personal.unlockAccount(account, "testing");
    
      const document1_firstHash=document1_hash.substr(0,23);
      const document1_secondHash=document1_hash.substr(23);
      const document2_firstHash=document2_hash.substr(0,23);
      const document2_secondHash=document2_hash.substr(23);
      const document3_firstHash=document3_hash.substr(0,23);
      const document3_secondHash=document3_hash.substr(23);
      const quotationId=parseInt(document.getElementById("quotationId").value);
      var ExporterInstance;
      //console.log(document1_hash);
      //console.log(document2_hash);
      //console.log(document3_hash);
      const Exporter = contract(consensusChain_Exporter);
      Exporter.setProvider(this.state.web3.currentProvider);

      Exporter.deployed().then(function (instance) {

          ExporterInstance = instance;
       return ExporterInstance.uploadDocs(quotationId,document1_firstHash,document1_secondHash,document2_firstHash,document2_secondHash,document3_firstHash,document3_secondHash,3, { from: account, gas: 4700000 });
      }).then(function (result) {
        document.getElementById("loader").setAttribute("hidden","hidden");
        
          //console.log(result);
      })
      
  }



  render() {
    return (
      <div className="container-fluid">
        <h2>Upload Documents</h2>
        
        <Well bsSize="large">

          <Form>
            <Grid>
              <Row className="show-grid">
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8}>
                  <FormGroup controlId="quotationId">
                    <ControlLabel>Quotation ID</ControlLabel>
                    <FormControl type="text" id="quotationId" name="quotation_id" placeholder="Enter Quotation ID"></FormControl>
                  </FormGroup>
                  <FormGroup controlId="document1">
                    <ControlLabel >Document 1</ControlLabel>
                    <InputGroup>
                      <FormControl type="file" id="document1" name="document1"></FormControl>
                      <InputGroup.Button>
                        <Button className="btn btn-info" onClick={this.uploadDocument1}>Upload</Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup controlId="document2">
                    <ControlLabel >Document 2</ControlLabel>
                    <InputGroup>
                      <FormControl type="file" id="document2" name="document2" ></FormControl>
                      <InputGroup.Button>
                        <Button className="btn btn-info" onClick={this.uploadDocument2}>Upload</Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup controlId="document3">
                    <ControlLabel >Document 3</ControlLabel>
                    <InputGroup>
                      <FormControl type="file" id="document3" name="document3" ></FormControl>
                      <InputGroup.Button>
                        <Button className="btn btn-info" onClick={this.uploadDocument3}>Upload</Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                  <br />
                  <div >
                  <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                  </div>
                  <Button bsStyle="primary" onClick={this.UploadDocs} >Upload Documents</Button>
                </Col>
                <Col xs={2} md={2}></Col>
              </Row>

            </Grid>

          </Form>
        </Well>
      </div>
    );
  }
}

export default UploadDocs;