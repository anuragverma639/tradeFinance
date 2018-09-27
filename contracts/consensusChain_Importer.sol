pragma solidity ^0.4.11;

import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ImporterWork.sol';
import './consensusChain_ExporterWork.sol';

contract consensusChain_Importer is consensusChain_Contract_Addresses{
    
    event PurchaseOrderGenerated(uint QuotationId, bytes32 importer_email, bytes32 productName, uint quantity, uint ratePerQuatity,bytes32 description,uint tax, consensusChain_ExporterWork.ProductStatus status);
    
    
    function createPO(uint QuotationId,bytes32 importersEmail, bytes32 productName, uint quantity, uint ratePerQuatity,bytes32 description,uint tax, consensusChain_ExporterWork.ProductStatus status,bytes32 termsAndCondition){
        
        impo.add(QuotationId,productName,quantity,ratePerQuatity,description,tax,termsAndCondition);
        
        expo.updateStatus(QuotationId, status );
        
        PurchaseOrderGenerated(QuotationId,importersEmail,productName,quantity,ratePerQuatity,description,tax,status);
        
        
    }
    
    function getPO(uint QuotationId) constant returns(bytes32 productName, uint quantity, uint ratePerQuatity,bytes32 description,uint tax,bytes32 termsAndCondition){
        
       return impo.getAllDetails(QuotationId);
        
    } 
    
    function answerQuotation(uint QuotationId, bool answer){
        
        expo.answerByImporter(QuotationId,answer);
        
    }
    
    function getStatusOfQuotation(uint Quotation_Id) constant returns(bool status){
        
        expo.getStatus(Quotation_Id);
    }
    
     function updateStatusOfQuotation(uint QuotationId, consensusChain_ExporterWork.ProductStatus status){
        
        expo.updateStatus(QuotationId,status);
    }
    
    
    
    
}
