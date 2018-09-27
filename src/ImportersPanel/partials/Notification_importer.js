import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_importer from '../components/Header_importer';
import CreatePO from '../components/CreatePO';
import Notification from '../components/Notification';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




class Notification_importer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createPO: false
           
        }

        this.openCreatePO_Modal = this.openCreatePO_Modal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openCreatePO_Modal() {
        //console.log(this.state.createPO);
        this.setState({ createPO: true })
    }

    closeModal() {
        //console.log(this.state.createPO);
        this.setState({ createPO: false })
    }

    // <Notification />

    render() {


        return (
            <div>

                <Header_importer openCreatePO_Modal={this.openCreatePO_Modal} />
                <CreatePO closeModal={this.closeModal} createPO={this.state.createPO} />
                <Notification  />
            </div>
        )
    }
}




export default Notification_importer;