import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { withRouter } from 'react-router';


class Login extends Component {
  constructor(props) {
    super(props)
    this.login=this.login.bind(this);
  }

  login(){
    var selected=document.getElementById("selectPanel").value;
    if(selected=="exporter"){
        window.location.href=('/exportersPanel');
    }
    if(selected=="importer"){
        window.location.href=('/importersPanel');
    }
    if(selected=="bank"){
        window.location.href=('/banksPanel');
    }
    if(selected=="port"){
        window.location.href=('/portAuthorityPanel');
    }
    if(selected=="custom"){
        window.location.href=('/customsPanel');
    }
    if(selected=="shipping"){
        window.location.href=('/shippingsPanel');
    }
  }
  
  
  render() {
    
    return (
        <div>
      <div >
      <div>
      <Navbar inverse >
          <Navbar.Header>
              <Navbar.Brand>
              <a href="#">CONSENSUS CHAIN</a>
              
              </Navbar.Brand>
            
          </Navbar.Header>
         
      </Navbar>
  </div>
      </div>

      <div className="row">
         <div className="col col-lg-4">
         
         </div>
         <div className="col col-lg-4">
         <br/>
         <br/>
         <br/>
         <br/>
         <Well>
         <FormGroup controlId="selectPanel">
         <ControlLabel >Select Panel</ControlLabel>
         <FormControl componentClass="select" placeholder="Select" name="selectPanel" >
             <option value="select">Select</option>
             <option value="exporter">Exporter</option>
             <option value="importer">Importer</option>
             <option value="bank">Bank</option>
             <option value="port">PortAuthority</option>
             <option value="custom">Custom</option>
             <option value="shipping">Shipping</option>
         </FormControl>
     </FormGroup>

     <FormGroup controlId="username">
     <ControlLabel >Username</ControlLabel>
     <FormControl type="text" placeholder="Enter Username" name="username" />
 </FormGroup>
     
     <FormGroup controlId="password">
     <ControlLabel >Password</ControlLabel>
     <FormControl type="password" placeholder="Enter Password" name="password" />
 </FormGroup>

 <br/>
 <Button bsStyle="primary" onClick={this.login}>Login</Button> &nbsp;
 
         </Well>
         </div>
         <div className="col col-lg-4">
         
         </div>
      </div>
        </div>
    );
  }
}

export default (Login)
