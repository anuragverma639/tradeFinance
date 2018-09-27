import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Importer from '../../../build/contracts/consensusChain_Importer.json';
import consensusChain_Bank from '../../../build/contracts/consensusChain_Bank.json';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

let quotationList
var Web3 
let LocList
class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {

            quotation: [],
            loc:[]
        }

        this.approveButtonFormatter = this.approveButtonFormatter.bind(this);
        this.LocList=this.LocList.bind(this);
    }

    approveButtonFormatter(cell, row, enumObject, rowIndex) {

        const id = this.state.quotation[rowIndex].quotation_id;

        let url = `/exportersPanel/ApprovePurchaseOrder/${id}`;

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




    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                const account = this.state.web3.eth.accounts[0];
                //console.log(account);
                //this.state.web3.personal.unlockAccount(account, "testing");
                Web3 = this.state.web3;
                var ImporterInstance;
                const contract = require('truffle-contract');
                const Importer = contract(consensusChain_Importer);
                Importer.setProvider(this.state.web3.currentProvider);
                var quot = [];
                Importer.deployed().then(function (instance) {

                    ImporterInstance = instance;
                    var event = ImporterInstance.PurchaseOrderGenerated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, res) {

                        //console.log(res);
                        const quotation_details = {
                            quotation_id: res.args.QuotationId.toNumber(),
                            importer_email: Web3.toUtf8(res.args.importer_email)
                        }


                        quot.push(quotation_details);

                    });

                });

                this.setState({
                    quotation: quot
                })

                quotationList = quot
                this.LocList();
               // //console.log(this.state.quotation);

            })
            
           
        

    }


    LocList(){
        //console.log("anurag");
        var BankInstance;
        const contract = require('truffle-contract');
        const Bank = contract(consensusChain_Bank);
        Bank.setProvider(Web3.currentProvider);
       var quo=[];
        Bank.deployed().then(function (instance) {

            BankInstance = instance;
            var event = BankInstance.LOCGenerated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, result) {
                //console.log("anurag");
                //console.log(result);
                //console.log(result.args.QuotationId);
                const locdetails={
                    "quotation_id": result.args.QuotationId,
                    "importer_bank": Web3.toUtf8(result.args.importeBank)
                }

                quo.push(locdetails);
              
            });

            

        });

        this.setState({
            loc: quo
        })

        LocList = quo
    }




    render() {


        return (
            <div className="container-fluid">
            <LinkContainer  to="/exportersPanel/notifications" >
            <Button bsStyle="default">Refresh</Button>
            </LinkContainer>
            
            <br/>
                
                <div className="col col-lg-6">
                <h3>Purchase Order List</h3>
                  <Well bsSize="large">
                   
                    <div  >
                        <BootstrapTable data={quotationList} striped hover bordered={false} >
                            <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='importer_email'>Importer Email</TableHeaderColumn>
                            <TableHeaderColumn dataField="button" dataFormat={this.approveButtonFormatter} >Click To See Details</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                
                  </Well>
                </div>


                <div className="col col-lg-6">
                <h3>Letter of Credit List</h3>
                   <Well bsSize="large">
                    
                    <div>
                        <BootstrapTable data={LocList} striped hover bordered={false} >
                            <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='importer_bank'>Importer Bank</TableHeaderColumn>
                            <TableHeaderColumn dataField="button" dataFormat={this.approveButtonFormatter} >Click To See Details</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                
                   </Well>
                </div>
            </div>

        );
    }
}


export default Notification;