import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_port from '../components/Header_port';
import ApproveQuotation from '../components/ApproveQuotation';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let id

class ApproveQuotation_Port extends Component {

    constructor(props) {
        super(props);
        id=props.match.params.id;
       
    }

  
    
    // <Notification />

    render() {
        return (
            <div>

                <Header_port openCreateModal={this.openCreateModal} />
                <ApproveQuotation id={id} />
               
            </div>
        )
    }
}




export default ApproveQuotation_Port;