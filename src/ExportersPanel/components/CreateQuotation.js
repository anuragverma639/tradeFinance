import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const CreateQuotation = (props) => {
    return (
        <div>
            <Modal isOpen={props.createQuotation}  >
                <div><h2>CREATE NEW QUOTATION</h2></div>
                <div className="container">
                    <form onSubmit={props.CreateQuotation} >
                        <div>
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={2} md={2}></Col>
                                    <Col xs={8} md={8}>
                                    <FormGroup controlId="exporter_email" >
                                    <ControlLabel>Exporter email</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Email"
                                        name="exporter_email"
                                    />
                                </FormGroup>
                                        <FormGroup controlId="importer_email" >
                                            <ControlLabel>Importer email</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Email"
                                                name="importer_email"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="product_name" >
                                            <ControlLabel>Product Name</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="product_name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="description" >
                                            <ControlLabel>Description</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Description"
                                                name="description"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="quantity" >
                                            <ControlLabel>Quantity</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Quantity"
                                                name="quantity"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="rate_per_quantity" >
                                            <ControlLabel>Rate Per Quantity</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Rate per Quantity"
                                                name="rate_per_quantity"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="tax" >
                                            <ControlLabel>Tax (in %)</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Tax"
                                                name="tax"
                                            />
                                        </FormGroup>
                                        <div >
                                        <img id="loader" name="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                        </div>
                                        <br/>
                                        <Button bsStyle="primary" type="submit" >CREATE</Button> &nbsp;
                                    <Button bsStyle="danger" onClick={props.closeModal}>CLOSE</Button>

                                    </Col>
                                    <Col xs={2} md={2}></Col>
                                </Row>

                            </Grid>

                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default CreateQuotation;