pragma solidity ^0.4.11;

import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ExporterWork.sol';
import './consensusChain_ImporterWork.sol';
import './consensusChain_ShippingWork.sol';

contract consensusChain_Custom is consensusChain_Contract_Addresses{
    
    function updateStatusOfQuotation(uint QuotationId, consensusChain_ExporterWork.ProductStatus status){
        
        expo.updateStatus(QuotationId,status);
    }
    
    
    
}