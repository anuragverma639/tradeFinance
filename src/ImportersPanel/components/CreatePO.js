import React, { Component } from 'react';
import { Button, Navbar,form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const CreatePO = (props) => {
    return (
        <div>
            <Modal isOpen={props.createPO}  >
                <div><h2>CREATE PURCHASE ORDER</h2></div>

                <div className="container">
                    <form onSubmit={props.CreatePurchaseOrder}>
                        <div>
                            <br />
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="quotation_id" >
                                            <ControlLabel>QUOTATION ID</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter QUOTATION ID"
                                                name="quotation_id"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="productName" >
                                            <ControlLabel>PRODUCT NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="productName"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="description" >
                                            <ControlLabel>DESCRIPTION</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Description"
                                                name="description"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6} md={6}>

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
                                    </Col>

                                </Row>
                                <Row className="show-grid">
                                    <Col xs={12} md={12}>
                                        <FormGroup controlId="terms_conditions" >
                                            <ControlLabel>Terms And Conditions</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="Terms and Contitions"
                                                name="terms_conditions"
                                            />
                                        </FormGroup>

                                        <br />
                                        <div >
                                        <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                        </div>


                                        <Button bsStyle="primary"  type="submit">CREATE</Button> &nbsp;
                                        <Button bsStyle="danger" onClick={props.closeModal}>CLOSE</Button>

                                    </Col>
                                </Row>

                            </Grid>

                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default CreatePO;