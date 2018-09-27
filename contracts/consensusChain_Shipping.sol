
pragma solidity ^0.4.11;


import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ExporterWork.sol';
import './consensusChain_ShippingWork.sol';

contract consensusChain_Shipping is consensusChain_Contract_Addresses{
    
   event BOLGenerated(uint QuotationId, bytes32 shippingFrom, bytes32 shippingTo, bytes32 temperature, uint weight, uint numberOfBox, consensusChain_ExporterWork.ProductStatus status);
   
    function createBOL(uint QuotationId, bytes32 shippingFrom, bytes32 shippingTo, bytes32 temperature, uint weight, uint numberOfBox, consensusChain_ExporterWork.ProductStatus status){
         ship.add(QuotationId,shippingFrom,shippingTo,temperature,weight,numberOfBox);
       
         expo.updateStatus(QuotationId,status);
         
         BOLGenerated(QuotationId,shippingFrom,shippingTo,temperature,weight,numberOfBox,status);
    }
    
    function getBOL(uint QuotationId) constant returns(bytes32 shippingFrom, bytes32 shippingTo, bytes32 temperature, uint weight, uint numberOfBox){
       return ship.getAllDetails(QuotationId);
    }
    
    
}