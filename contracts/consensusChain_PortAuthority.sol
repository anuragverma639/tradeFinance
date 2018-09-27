pragma solidity ^0.4.11;

import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ExporterWork.sol';

contract consensusChain_PortAuthority is consensusChain_Contract_Addresses{
    
    function updateStatusOfQuotation(uint QuotationId, consensusChain_ExporterWork.ProductStatus status){
        expo.updateStatus(QuotationId,status);
    }
    
}