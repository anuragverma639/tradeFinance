import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import {LinkContainer} from 'react-router-bootstrap';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

let quotationList

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            quotation: []
        }

        this.approveButtonFormatter=this.approveButtonFormatter.bind(this);
       
    }

    approveButtonFormatter(cell, row, enumObject, rowIndex) {
        const id=this.state.quotation[rowIndex].quotation_id;
        
                    let url=`/importersPanel/ApproveQuotation/${id}`;
        
        return (

            
            <LinkContainer to={url} >
            <a  href="#" className="btn btn-primary" onClick={()=>{//console.log(this.state.quotation[rowIndex]);
           
            }} >
              Details
          </a>
          </LinkContainer>
        )
    };

  


    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                const account = this.state.web3.eth.accounts[0];
                //console.log(account);
               // this.state.web3.personal.unlockAccount(account, "testing");
                var Web3 = this.state.web3;
                var ExporterInstance;
                const contract = require('truffle-contract');
                const Exporter = contract(consensusChain_Exporter);
                Exporter.setProvider(this.state.web3.currentProvider);
                var quot = [];
                Exporter.deployed().then(function (instance) {

                    ExporterInstance = instance;
                    var event = ExporterInstance.QuotationGenerated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, res) {

                        const quotation_details = {
                            quotation_id: res.args.QuotationId.toNumber(),
                            exporter_email: Web3.toUtf8(res.args.exportersEmail)
                        }


                        quot.push(quotation_details);

                    });

                });

                this.setState({
                    quotation: quot
                })
                quotationList=quot
                //console.log(this.state.quotation);

            });

    }

   

   

    render() {

        
        return (
            <div className="container-fluid">

                <h2>Notifications</h2>
                <LinkContainer  to="/importersPanel/notifications" >
                <Button bsStyle="default">Refresh</Button>
                </LinkContainer>
                <br/>
                <Well bsSize="large">
                    <div>
                        <BootstrapTable data={this.state.quotation}  striped hover bordered={false} >
                            <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='exporter_email'>Exporter Email</TableHeaderColumn>
                            <TableHeaderColumn dataField="button"  dataFormat={this.approveButtonFormatter} >Click To See Details</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </Well>
            </div>

        );
    }
}


export default Notification;