import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import {LinkContainer} from 'react-router-bootstrap';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



const Notification = (props) => {
    return (
        <div className="container-fluid">

            <h2>Notifications</h2>
            <LinkContainer  to="/banksPanel/notifications" >
            <Button bsStyle="default">Refresh</Button>
            </LinkContainer>
            <br/>
            <Well bsSize="large">
                <div>
                    <BootstrapTable striped hover bordered={false}>
                        <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='exporter'>Exporter</TableHeaderColumn>
                        <TableHeaderColumn dataField='quotation' >Quotation</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Well>
        </div>

    );
}


export default Notification;