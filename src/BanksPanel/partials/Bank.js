import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_bank from '../components/Header_bank';
import CreateLOC from '../components/CreateLOC';
import ApprovedQuotation from '../components/ApprovedQuotation';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Bank from '../../../build/contracts/consensusChain_Bank.json';
import getWeb3 from '../../utils/getWeb3';





class Bank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createLOC: false,
            web3:null
        }

        this.openCreateLOC_Modal = this.openCreateLOC_Modal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.CreateLetterOfCredit=this.CreateLetterOfCredit.bind(this);
    }

    openCreateLOC_Modal() {
        //console.log(this.state.createLOC);
        this.setState({ createLOC: true })
    }

    closeModal() {
        //console.log(this.state.createLOC);
        this.setState({ createLOC: false })
    }

    componentWillMount() {
        
                getWeb3
                    .then(results => {
                        this.setState({
                            web3: results.web3
                        })
                        //console.log(this.state.web3);
        
        
                    })
                    .catch(() => {
                        console.log('Error finding web3.')
                    })
            }
    
    CreateLetterOfCredit=(e)=>{
        e.preventDefault();
        document.getElementById("loader").removeAttribute("hidden");
        
        const quotationId=e.target.elements.quotation_id.value;
        const product_description=e.target.elements.product_description.value;
        const total_price=e.target.elements.total_price.value;
        const importer_name=e.target.elements.importer_name.value;
        const bank_importer=e.target.elements.bank_importer.value;
        const importer_branch_code=e.target.elements.importer_branch_code.value;
        const exporter_name=e.target.elements.exporter_name.value;
        const bank_exporter=e.target.elements.bank_exporter.value;
        const exporter_branch_code=e.target.elements.exporter_branch_code.value;
        const shipping_name=e.target.elements.shipping_name.value;
        const custom_authority=e.target.elements.custom_authority.value;
        const port_loading_name=e.target.elements.port_loading_name.value;
        const port_entry_name=e.target.elements.port_entry_name.value;
        
        const account =this.state.web3.eth.accounts[0];
        //this.state.web3.personal.unlockAccount(account, "testing");
        
                var BankInstance;
                const contract = require('truffle-contract');
                const Bank = contract(consensusChain_Bank);
                Bank.setProvider(this.state.web3.currentProvider);
                
                Bank.deployed().then(function (instance) {
        
                    BankInstance = instance;
                    return BankInstance.createLOC( quotationId,product_description,total_price,importer_name,bank_importer,importer_branch_code,exporter_name,bank_exporter,exporter_branch_code,shipping_name,custom_authority,port_loading_name,port_entry_name,2,{ from: account, gas: 4700000 });
                }).then(function (result) {
                    //console.log(result);
                    document.getElementById("loader").setAttribute("hidden","hidden");
                    
                })
    }



    // <Notification />
     
    render() {


        return (
            <div>
               
                <Header_bank openCreateLOC_Modal={this.openCreateLOC_Modal} />
                <ApprovedQuotation />
                <CreateLOC closeModal={this.closeModal} CreateLetterOfCredit={this.CreateLetterOfCredit}  createLOC={this.state.createLOC}/>
            </div>
        )
    }
}




export default Bank;