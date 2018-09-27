import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header from '../components/Header';
import ApprovedQuotation from '../components/ApprovedQuotation';
import CreateQuotation from '../components/CreateQuotation';
import getWeb3 from '../../utils/getWeb3';
import {LinkContainer} from 'react-router-bootstrap';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




class Exporter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createQuotation: false,
            web3: null
        }

        this.openCreateModal = this.openCreateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.CreateQuotation = this.CreateQuotation.bind(this);
    }

    openCreateModal() {
        //console.log(this.state.createQuotation);
        this.setState({ createQuotation: true })
    }

    closeModal() {
        //console.log(this.state.createQuotation);
        this.setState({ createQuotation: false })
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

    CreateQuotation = (e) => {
        e.preventDefault();
        document.getElementById("loader").removeAttribute("hidden");
        const exporterEmail = e.target.elements.exporter_email.value;
        const importerEmail = e.target.elements.importer_email.value;
        const productName = e.target.elements.product_name.value;
        const description = e.target.elements.description.value
        const quantity = e.target.elements.quantity.value;
        const rate_per_quantity = e.target.elements.rate_per_quantity.value;
        const tax = e.target.elements.tax.value;
        const account = this.state.web3.eth.accounts[0];
       // this.state.web3.personal.unlockAccount(account, "testing");

        var ExporterInstance;
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(this.state.web3.currentProvider);

        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;

            return ExporterInstance.createQuotation(exporterEmail, importerEmail, productName, description, quantity, rate_per_quantity, tax, 0, { from: account, gas: 4700000 });
        }).then(function (result) {
            //console.log(result);
            document.getElementById("loader").setAttribute("hidden","hidden");
        })

    }




    // <Notification />

    render() {


        return (
            <div>
            
                <Header openCreateModal={this.openCreateModal} />
                <ApprovedQuotation />
                <CreateQuotation createQuotation={this.state.createQuotation} CreateQuotation={this.CreateQuotation} closeModal={this.closeModal} />

            </div>
        )
    }
}




export default Exporter;