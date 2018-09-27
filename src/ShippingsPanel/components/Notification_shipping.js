import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import getWeb3 from '../../utils/getWeb3';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Bank from '../../../build/contracts/consensusChain_Bank.json';
import { LinkContainer } from 'react-router-bootstrap';
import 'react-bootstrap-table/css/react-bootstrap-table.css';


var Web3 
let LocList
class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {

            
            loc:[]
        }

       
        this.LocList=this.LocList.bind(this);
    }

    




    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                Web3=this.state.web3;
                this.LocList();
              
            })
            
           
        

    }


    LocList(){
        console.log("anurag");
        var BankInstance;
        const contract = require('truffle-contract');
        const Bank = contract(consensusChain_Bank);
        Bank.setProvider(Web3.currentProvider);
        var quo=[];
        Bank.deployed().then(function (instance) {

            BankInstance = instance;
            var event = BankInstance.LOCGenerated({}, { fromBlock: 0, toBlock: 'latest' }, function (err, result) {
                console.log("anurag");
                console.log(result);
                console.log(result.args.QuotationId);
                const locdetails={
                    "quotation_id": result.args.QuotationId,
                    "shipping_from": Web3.toUtf8(result.args.loadingPort),
                    "shipping_to": Web3.toUtf8(result.args.entryPort)
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

                
                
                <div>
                <h2>Notifications</h2>
                <LinkContainer  to="/shippingsPanel" >
                <Button bsStyle="default">Refresh</Button>
                </LinkContainer>
                <br/>
                <br/>
                
                   <Well bsSize="large">
                    
                    <div>
                        <BootstrapTable data={LocList} striped hover bordered={false} >
                            <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='shipping_from'>Shipping From</TableHeaderColumn>
                            <TableHeaderColumn dataField='shipping_to'>Shipping To</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                
                   </Well>
                </div>
            </div>

        );
    }
}


export default Notification;