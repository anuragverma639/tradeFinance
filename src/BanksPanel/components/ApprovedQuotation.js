import React, { Component } from 'react';
import { Button,Label, Glyphicon, Navbar, Nav, a, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import getWeb3 from '../../utils/getWeb3';
import consensusChain_Bank from '../../../build/contracts/consensusChain_Bank.json';
import consensusChain_Exporter from '../../../build/contracts/consensusChain_Exporter.json';
import {LinkContainer} from 'react-router-bootstrap';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

var Web3 
let LocList
let statusList=[]
class ApprovedQuotation extends Component {

    constructor(props) {
        super(props);
        this.state = {

           loc:[]
        }

        this.LocList=this.LocList.bind(this);
       this.ImporterRecieved=this.ImporterRecieved.bind(this);
       this.locGenerated=this.locGenerated.bind(this);
       this.inloadingPort=this.inloadingPort.bind(this);
       this.inEntryPort=this.inEntryPort.bind(this);
    }

    componentWillMount() {

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

               Web3=this.state.web3;
               this.LocList();

            }).catch(() => {
                console.log('Error finding web3.')
              });

           

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
               const locdetails={
                    "quotation_id": result.args.QuotationId.toNumber(),
                    "desciption": Web3.toUtf8(result.args.productDescription),
                    "loading_port": Web3.toUtf8(result.args.loadingPort),
                    "importer_port": Web3.toUtf8(result.args.entryPort),
                    "importer": Web3.toUtf8(result.args.importer)


                }
                getStatus(result.args.QuotationId.toNumber());
                quo.push(locdetails);
              
            });

            
            

        });

        this.setState({
            loc: quo
        })

        LocList = quo
        let quot=[]

       function getStatus(id){
          //console.log(id);
        const account = Web3.eth.accounts[0];
       // Web3.personal.unlockAccount(account, "testing");
        var ExporterInstance;
        let statusOfQuotation
        
        const contract = require('truffle-contract');
        const Exporter = contract(consensusChain_Exporter);
        Exporter.setProvider(Web3.currentProvider);
        Exporter.deployed().then(function (instance) {

            ExporterInstance = instance;
           return ExporterInstance.getStatusOfQuotation(id);

           }).then(function(res){
               //console.log(res);
              statusOfQuotation={"quotation_id":id,"status":res.toNumber()};
              //console.log(statusOfQuotation);
              quot.push(statusOfQuotation);
           });
            statusList=quot;
           
         }
         
    }

    locGenerated(cell,row){
        //console.log(statusList);
        let status;
        for(var i=0;i<statusList.length;i++){
            if(statusList[i].quotation_id==row.quotation_id){
                status=statusList[i].status;
                break;
            }
        }
        if(status>=2 && status < 4){
        return (
            <Label bsStyle="success">&nbsp;<Glyphicon glyph="forward" />&nbsp;</Label>
        );
    }
    }

    inloadingPort(cell,row){
        //console.log(statusList[0]);
        let status;
        for(var i=0;i<statusList.length;i++){
            if(statusList[i].quotation_id==row.quotation_id){
                status=statusList[i].status;
                break;
            }
        }


        if(status>=4 && status<6 )
        {
        return (
            <Label bsStyle="success">&nbsp;<Glyphicon glyph="forward" />&nbsp;</Label>
        );
    
    }
    }
    
    inEntryPort(cell,row){
        //console.log(statusList[0]);
        let status;
        for(var i=0;i<statusList.length;i++){
            if(statusList[i].quotation_id==row.quotation_id){
                status=statusList[i].status;
                break;
            }
        }
        if(status==6 )
        {
        return (
            <Label bsStyle="success">&nbsp;<Glyphicon glyph="forward" />&nbsp;</Label>
        );
    }
    }

    ImporterRecieved(cell,row){
        //console.log(statusList[0]);
        let status;
        for(var i=0;i<statusList.length;i++){
            if(statusList[i].quotation_id==row.quotation_id){
                status=statusList[i].status;
                break;
            }
        }

        if(status==7)
        {
        return (
            <Label bsStyle="success">&nbsp;<Glyphicon glyph="forward" />&nbsp;</Label>
        );
    }
    }

    render(){
    return (

        <div className="container-fluid">
            <h2>List Of Approved Shipments</h2>
            <LinkContainer  to="/banksPanel" >
            <Button bsStyle="default">Refresh</Button>
            </LinkContainer>
            <br/>
            <br/>
            <Well bsSize="large">
                <div>
                    <BootstrapTable data={LocList} pagination striped hover bordered={false}>
                        <TableHeaderColumn dataField='quotation_id' isKey={true}>Quotation ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='desciption'>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField='locGenerated' dataFormat={this.locGenerated}></TableHeaderColumn>
                        
                        <TableHeaderColumn dataField='loading_port'>Loading Port</TableHeaderColumn>
                        <TableHeaderColumn dataField='loadingPort_status' dataFormat={this.inloadingPort}></TableHeaderColumn>
                        <TableHeaderColumn dataField='importer_port'>Importer Port</TableHeaderColumn>
                        <TableHeaderColumn dataField='importterPort_status' dataFormat={this.inEntryPort}></TableHeaderColumn>
                        <TableHeaderColumn dataField='importer'>Importer</TableHeaderColumn>
                        <TableHeaderColumn dataField='importerRecieved' dataFormat={this.ImporterRecieved}></TableHeaderColumn>
                        
                    </BootstrapTable>
                </div>
            </Well>
            
        </div>

    );
}
}

export default ApprovedQuotation;