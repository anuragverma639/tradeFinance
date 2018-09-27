import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header from '../components/Header';
import ApprovePO from '../components/ApprovePO';
import CreateQuotation from '../components/CreateQuotation';
import getWeb3 from '../../utils/getWeb3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let id

class ApprovePO_page extends Component {

    constructor(props) {
        super(props);
       // //console.log(props);
        id=props.match.params.id;
       // //console.log("anurag");
      //  //console.log(id);
        this.state = {
            createQuotation: false,
            web3: null
        }

        this.openCreateModal = this.openCreateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
       
    }

    openCreateModal() {
        //console.log(this.state.createQuotation);
        this.setState({ createQuotation: true })
    }

    closeModal() {
        //console.log(this.state.createQuotation);
        this.setState({ createQuotation: false })
    }

    
    // <Notification />

    render() {


        return (
            <div>

                <Header openCreateModal={this.openCreateModal} />
                <ApprovePO id={id} />
                <CreateQuotation createQuotation={this.state.createQuotation} CreateQuotation={this.CreateQuotation} closeModal={this.closeModal} />

            </div>
        )
    }
}




export default ApprovePO_page;