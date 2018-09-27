import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_importer from '../components/Header_importer';
import CreatePO from '../components/CreatePO';
import ApproveQuotation from '../components/ApproveQuotation';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let id
class ApproveQuotation_page extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        
        this.state = {
            id: props.match.params.id,
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
                <ApproveQuotation id={this.state.id} />
                
                <CreatePO closeModal={this.closeModal} CreatePurchaseOrder={this.CreatePurchaseOrder}  createPO={this.state.createPO}/>
            </div>
        )
    }
}




export default ApproveQuotation_page;