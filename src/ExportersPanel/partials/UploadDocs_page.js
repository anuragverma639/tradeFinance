import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header from '../components/Header';
import UploadDocs from '../components/UploadDocs';
import CreateQuotation from '../components/CreateQuotation';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import getWeb3 from '../../utils/getWeb3';


class UploadDocs_page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createQuotation: false
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
                <UploadDocs />
                <CreateQuotation createQuotation={this.state.createQuotation} closeModal={this.closeModal} />

            </div>
        )
    }
}




export default UploadDocs_page;