import React, { Component } from 'react';
import { Button, Navbar, Nav, NavItem, Well, FormGroup, FormControl, ControlLabel, Grid, Col, Row } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationBadge, { Effect } from 'react-notification-badge';
import Header_importer from '../components/Header_importer';
import CreatePO from '../components/CreatePO';
import ApprovedQuotation from '../components/ApprovedQuotation';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import consensusChain_Importer from '../../../build/contracts/consensusChain_Importer.json';
import getWeb3 from '../../utils/getWeb3';



class Importer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createPO: false
        }

        this.openCreatePO_Modal = this.openCreatePO_Modal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.CreatePurchaseOrder=this.CreatePurchaseOrder.bind(this);
    }

    openCreatePO_Modal() {
        //console.log(this.state.createPO);
        this.setState({ createPO: true })
    }

    closeModal() {
        //console.log(this.state.createPO);
        this.setState({ createPO: false })
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


    CreatePurchaseOrder=(e)=>{
            e.preventDefault();
            ////console.log("annurag");
            document.getElementById("loader").removeAttribute("hidden");
            
            const quotationId=e.target.elements.quotation_id.value;
            const importer_email="anuragVerma@gmail.com";
            const productName=e.target.elements.productName.value;
            const description = e.target.elements.description.value;
            const quantity=e.target.elements.quantity.value;
            const rate_per_quantity=e.target.elements.rate_per_quantity.value;
            const tax=e.target.elements.tax.value;
            const termsAndCondition=e.target.elements.terms_conditions.value;

            const account = this.state.web3.eth.accounts[0];
          //  this.state.web3.personal.unlockAccount(account, "testing");
    
            var ImporterInstance;
            const contract = require('truffle-contract');
            const Importer = contract(consensusChain_Importer);
            Importer.setProvider(this.state.web3.currentProvider);
    
            Importer.deployed().then(function (instance) {
    
                ImporterInstance = instance;
                return ImporterInstance.createPO(quotationId,importer_email,productName,quantity,rate_per_quantity,description,tax,1,termsAndCondition, { from: account, gas: 4700000 });
            }).then(function (result) {
                //console.log(result);
                document.getElementById("loader").setAttribute("hidden","hidden");
                
            })


    }


    // <Notification />
     
    render() {


        return (
            <div>
               
                <Header_importer openCreatePO_Modal={this.openCreatePO_Modal} />
                <ApprovedQuotation />
                <CreatePO closeModal={this.closeModal} CreatePurchaseOrder={this.CreatePurchaseOrder}  createPO={this.state.createPO}/>
            </div>
        )
    }
}




export default Importer;