import React, { Component } from 'react';
import { Button, Navbar, Form, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import {LinkContainer} from 'react-router-bootstrap';

import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


const CreateLOC = (props) => {
    return (
        <div>
            <Modal isOpen={props.createLOC}  >
                <div><h2>CREATE LETTER OF CREDIT</h2></div>

                <div className="container">
                    <Form onSubmit={props.CreateLetterOfCredit} >
                        <div>
                            <br />
                            <Grid>
                                <Row className="show-grid">
                                <Col xs={2} md={2}></Col>
                                    <Col xs={8} md={8}>
                                        <FormGroup controlId="quotation_id" >
                                            <ControlLabel>QUOTATION ID</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter QUOTATION ID"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="product_description" >
                                            <ControlLabel>PRODUCT DESCRIPTION</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Full Description"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="total_price" >
                                            <ControlLabel>TOTAL PRICE</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Total Price"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={2} md={2}></Col>
                                </Row>

                                <Row className="show-grid">

                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="importer_name" >
                                            <ControlLabel>IMPORTER NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Importer Name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="bank_importer" >
                                            <ControlLabel>IMPORTERS BANK NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Importer Bank Name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="importer_branch_code" >
                                            <ControlLabel>IMPORTERS BANKS BRANCH CODE</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Banks Branch Code"
                                            />
                                        </FormGroup>

                                    </Col>
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="exporter_name" >
                                            <ControlLabel>EXPORTER NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Exporter Name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="bank_exporter" >
                                            <ControlLabel>EXPORTERS BANK NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Exporter Bank Name"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="exporter_branch_code" >
                                            <ControlLabel>EXPORTERS BANKS BRANCH CODE</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Banks Branch Code"
                                            />
                                        </FormGroup>

                                    </Col>

                                </Row>


                                <Row className="show-grid">

                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="shipping_name" >
                                            <ControlLabel>SHIPPING COMPANY NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Company Name"
                                            />
                                        </FormGroup>


                                    </Col>
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="custom_authority" >
                                            <ControlLabel>CUSTOMS AUTHORITY NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Customs Name"
                                            />
                                        </FormGroup>

                                    </Col>

                                </Row>

                                <Row className="show-grid">

                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="port_loading_name" >
                                            <ControlLabel>PORT OF LOADING NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Port of Loading Name"
                                            />
                                        </FormGroup>


                                    </Col>
                                    <Col xs={6} md={6}>
                                        <FormGroup controlId="port_entry_name" >
                                            <ControlLabel>PORT OF ENTRY NAME</ControlLabel>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter Port of Entry Name"
                                            />
                                        </FormGroup>

                                    </Col>

                                </Row>
                                <div >
                                <img id="loader" src={require("../../utils/images/Ellipsis.gif")} hidden height="100px" width="100px" alt="Your image" />
                                </div>

                                <Button bsStyle="primary" type="submit" >CREATE</Button> &nbsp;
                                <Button bsStyle="danger" onClick={props.closeModal}>CLOSE</Button>

                            </Grid>

                        </div>
                    </Form>

                </div>


            </Modal >

        </div >
    );
}

export default CreateLOC;