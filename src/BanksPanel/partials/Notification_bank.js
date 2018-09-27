import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_bank from '../components/Header_bank';
import CreateLOC from '../components/CreateLOC';
import Notification from '../components/Notification';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




class Notification_bank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createLOC: false
        }

        this.openCreateLOC_Modal = this.openCreateLOC_Modal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openCreateLOC_Modal() {
        console.log(this.state.createLOC);
        this.setState({ createLOC: true })
    }

    closeModal() {
        console.log(this.state.createLOC);
        this.setState({ createLOC: false })
    }






    // <Notification />
     
    render() {


        return (
            <div>
               
                <Header_bank openCreateLOC_Modal={this.openCreateLOC_Modal} />
                <CreateLOC closeModal={this.closeModal}  createLOC={this.state.createLOC}/>
                <Notification />
            </div>
        )
    }
}




export default Notification_bank;