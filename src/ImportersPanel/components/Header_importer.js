import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import {LinkContainer} from 'react-router-bootstrap';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



const Header_importer = (props) => {
    return (
        <div>
            <Navbar inverse >
                <Navbar.Header>
                    <Navbar.Brand>
                    <LinkContainer to="/importersPanel">
                    <a href="#">CONSENSUS CHAIN (IMPORTER PANEL) </a>
                   </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>

                       
                        <LinkContainer to="#">
                            <NavItem eventKey={2}  onClick={props.openCreatePO_Modal}>CREATE PURCHASE ORDER</NavItem>

                        </LinkContainer>
                        <LinkContainer  to="/importersPanel/notifications" >
                            <NavItem eventKey={3}><NotificationBadge count={1} effect={Effect.SCALE} style={{ color: 'green', backgroundColor: 'white', top: '', left: '', bottom: '0px', right: '0px' }} />NOTIFICATION </NavItem>
                        </LinkContainer>
                        <LinkContainer  to="/">
                            <NavItem eventKey={4}>LOGOUT</NavItem>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
}

export default Header_importer;