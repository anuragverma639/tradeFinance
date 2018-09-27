import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_custom from '../components/Header_custom' ;
import Notification_custom from '../components/Notification_custom';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';




class Custom extends Component {

    render() {


        return (
            <div>
               
                <Header_custom  />
                <Notification_custom />
             </div>
        )
    }
}




export default Custom;