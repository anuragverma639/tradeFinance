import React, { Component } from 'react';
import { Button, Navbar, Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const CreateBOL = (props) => {
    return (
        <div>
            <Modal isOpen={props.createBOL}  >
                <div><h2>CREATE BILL OF LADDING</h2></div>

                <div className="container">
                    <Form onSubmit={props.CreateBillOfLadding}>
                        <div>
                            <br />
                            <Grid>

                                <Row className="show-grid">

                                    <Col xs={2} md={2}>


                                    </Col>
                                    <Col xs={8} md={8}>
                                        <FormGroup controlId="quotationId">
                                            <ControlLabel >QUOTATION ID</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Quotation Id" name="quotationId" />
                                        </FormGroup>

                                    </Col>
                                    <Col xs={2} md={2}></Col>



                                </Row>
                                <br />

                                <Row className="show-grid">

                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="shipping_from">
                                            <ControlLabel >SHIPPING FROM</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Shipping Name" name="shipping_from" />
                                        </FormGroup>

                                        <FormGroup controlId="temperature">
                                            <ControlLabel >TEMPERATURE (in Celsius)</ControlLabel>
                                            <FormControl componentClass="select" placeholder="Enter Temperature" name="temperature" >
                                                <option value="select">Select</option>
                                                <option value="0-10">0-10</option>
                                                <option value="10-30">10-30</option>
                                                <option value="30-50">30-50</option>
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup controlId="number_of_boxes">
                                            <ControlLabel >NUMBER OF BOXES</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Number of Boxes" name="number_of_boxes"/>
                                        </FormGroup>


                                    </Col>
                                    <Col xs={6} md={6}>

                                        <FormGroup controlId="shipping_to">
                                            <ControlLabel >SHIPPING TO</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Shipping Name" name="shipping_to" />
                                        </FormGroup>
                                        <FormGroup controlId="weight">
                                            <ControlLabel >WEIGHT</ControlLabel>
                                            <FormControl type="text" placeholder="Enter Total Weight" name="weight" />
                                        </FormGroup>


                                    </Col>

                                </Row>
                                <div >
                                <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                </div>
                                <Button bsStyle="primary" type="submit">CREATE</Button> &nbsp;
                                <Button bsStyle="danger" onClick={props.closeModal}>CLOSE</Button>
                                

                            </Grid>

                        </div>
                    </Form>

                </div>


            </Modal >

        </div >
    );
}

export default CreateBOL;