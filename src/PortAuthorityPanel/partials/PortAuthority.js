import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_port from '../components/Header_port';

import Notification_port from '../components/Notification_port';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




class PortAuthority extends Component {

   
    // <Notification />
     
    render() {


        return (
            <div>
               
                <Header_port  />
                <Notification_port />
         </div>
        )
    }
}




export default PortAuthority;