pragma solidity ^0.4.11;


import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ExporterWork.sol';
import './consensusChain_BankWork.sol';

contract consensusChain_Bank is consensusChain_Contract_Addresses{
    
    
    event LOCGenerated(uint QuotationId, bytes32 productDescription, uint totalPrice, bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch, bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch , bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort, consensusChain_ExporterWork.ProductStatus status);
    
    function createLOC(uint QuotationId, bytes32 productDescription, uint totalPrice, bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch, bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch , bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort, consensusChain_ExporterWork.ProductStatus status){
        
        bank.add(QuotationId,productDescription,totalPrice,importer,importeBank,importerBankBranch,exporter,exporterBank,exporterBankBranch,shipping,customAuthority,loadingPort,entryPort);
        
        expo.updateStatus(QuotationId, status);
        
        LOCGenerated(QuotationId,productDescription,totalPrice,importer,importeBank,importerBankBranch,exporter,exporterBank,exporterBankBranch,shipping,customAuthority,loadingPort,entryPort,status);
        
    }
    
    
    function getExporterDetails(uint QuotationId) constant returns(bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch){
        return bank.getExporterDetails(QuotationId);
    }
    
    function getProductDetails(uint QuotationId) constant returns(uint quotation_id,bytes32 productDescription, uint totalPrice, bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort){
        return bank.getProductDetails(QuotationId);
    }
    
    function getImporterDetails(uint QuotationId) constant returns( bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch){
        return bank.getImporterDetails(QuotationId);
   
    }
    
    
    
    
    function getStatusOfQuotation(uint Quotation_Id) constant returns(bool status){
        
        expo.getStatus(Quotation_Id);
        
    }
    
    
    
}