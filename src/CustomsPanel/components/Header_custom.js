import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import {LinkContainer} from 'react-router-bootstrap';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



const Header_custom = (props) => {
    return (
        <div>
            <Navbar inverse >
                <Navbar.Header>
                    <Navbar.Brand>
                    <LinkContainer  to="/customsPanel" >
                        <a href="#">CONSENSUS CHAIN (CUSTOM PANEL)</a>
                     </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>

                       
                        <LinkContainer  to="/customsPanel" >
                            <NavItem eventKey={1}><NotificationBadge count={1} effect={Effect.SCALE} style={{ color: 'green', backgroundColor: 'white', top: '', left: '', bottom: '0px', right: '0px' }} />NOTIFICATION </NavItem>
                        </LinkContainer>
                        <LinkContainer  to="/">
                            <NavItem eventKey={2}>LOGOUT</NavItem>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
}

export default Header_custom;