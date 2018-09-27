import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import consensusChain_PortAuthority from '../../../build/contracts/consensusChain_PortAuthority.json';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { LinkContainer } from 'react-router-bootstrap';
import getWeb3 from '../../utils/getWeb3';

let Web3
let quotationList
class Notification_custom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotation:[],
            web3: null
        }

        this.approveButtonFormatter=this.approveButtonFormatter.bind(this);
    }



    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                const account = this.state.web3.eth.accounts[0];
                //console.log(account);
               // this.state.web3.personal.unlockAccount(account, "testing");
                Web3 = this.state.web3;
                var ExporterInstance;
                const contract = require('truffle-contract');
                const Exporter = contract(consensusChain_Exporter);
                Exporter.setProvider(this.state.web3.currentProvider);
                var quot = [];
                Exporter.deployed().then(function (instance) {

                    ExporterInstance = instance;
                    var event = ExporterInstance.QuotationGenerated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, res) {

                        //console.log(res);
                        const quotation_details = {
                            quotation_id: res.args.QuotationId.toNumber(),
                            exporter:Web3.toUtf8(res.args.exportersEmail),
                            importer: Web3.toUtf8(res.args.importersEmail)
                        }


                        quot.push(quotation_details);

                    });

                });

                this.setState({
                    quotation: quot
                })

                quotationList = quot
                //console.log(quot);
                 //console.log(this.state.quotation);

            })




    }


    approveButtonFormatter(cell, row, enumObject, rowIndex) {

                const id = this.state.quotation[rowIndex].quotation_id;
                //console.log(id);
                let url = `/customsPanel/ApproveQuotation/${id}`;
        
                return (
        
        
                    <LinkContainer to={url} >
                        <a href="#" className="btn btn-primary" onClick={() => {
                            //console.log(this.state.quotation[rowIndex]);
        
                        }} >
                            Details
                  </a>
                    </LinkContainer>
                )
            };




    render() {
        return (
            <div className="container-fluid">

                <h2>Notifications</h2>
                <LinkContainer  to="/customsPanel" >
                <Button bsStyle="default">Refresh</Button>
                </LinkContainer>
                <br/>

                <br/>
                <Well bsSize="large">
                    <div>
                        <BootstrapTable data={quotationList} striped hover bordered={false}>
                            <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='exporter'>Exporter</TableHeaderColumn>
                            <TableHeaderColumn dataField='importer' >Importer</TableHeaderColumn>
                            <TableHeaderColumn dataField="button" dataFormat={this.approveButtonFormatter} >Click To See Details</TableHeaderColumn>
                            
                        </BootstrapTable>
                    </div>
                </Well>
            </div>

        );
    }
}


export default Notification_custom;