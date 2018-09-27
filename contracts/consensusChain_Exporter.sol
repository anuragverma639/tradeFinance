pragma solidity ^0.4.11;

import './consensusChain_Contract_Addresses.sol';
import './consensusChain_ExporterWork.sol';
import './consensusChain_ImporterWork.sol';
import './consensusChain_BankWork.sol';



contract consensusChain_Exporter is consensusChain_Contract_Addresses{
    
    event QuotationGenerated(uint QuotationId, bytes32 exportersEmail, bytes32 importersEmail,bytes32 product_name, bytes32 description, uint quantity, uint ratePerQuantity, uint tax , consensusChain_ExporterWork.ProductStatus status);
   
    event DocumentsUploaded(uint QuotationId, bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half , bytes32 Docs3_first_half, bytes32 Docs3_second_half);
    
    uint QuotationId=0;
    
    function createQuotation(bytes32 exportersEmail, bytes32 importersEmail,bytes32 product_name, bytes32 description, uint quantity, uint ratePerQuantity, uint tax , consensusChain_ExporterWork.ProductStatus status){
        
        expo.add(exportersEmail,importersEmail,product_name,description,quantity,ratePerQuantity,tax,status);
       
        QuotationId++;
        
        QuotationGenerated(QuotationId, exportersEmail,importersEmail,product_name,description,quantity,ratePerQuantity,tax,status);
        
         
    }
    
    function uploadDocs(uint Quotation_Id,bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half, bytes32 Docs3_first_half, bytes32 Docs3_second_half,consensusChain_ExporterWork.ProductStatus status){
       
        expo.addDocs(Quotation_Id,Docs1_first_half,Docs1_second_half,Docs2_first_half,Docs2_second_half,Docs3_first_half,Docs3_second_half);
        
        expo.updateStatus(Quotation_Id,status);
        
        DocumentsUploaded(Quotation_Id,Docs1_first_half,Docs2_second_half,Docs2_first_half, Docs2_second_half, Docs3_first_half, Docs3_second_half);
    
        
    }
    
    
    function getProductDetails(uint Quotation_Id) constant returns(bytes32 product_name,bytes32 description, uint quantity, uint ratePerQuantity, uint tax, consensusChain_ExporterWork.ProductStatus status){
        
        return expo.getProductDetails(Quotation_Id);
    }
    
    function getQuotation(uint Quotation_Id) constant returns(uint QuotationId, bytes32 exportersEmail, bytes32 importersEmail){
      
       return (expo.getQuotationDetails(Quotation_Id));
    }
    
    function getDocs(uint Quotation_Id) constant returns(bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half, bytes32 Docs3_first_half, bytes32 Docs3_second_half){
        
        return expo.getAllDocs(Quotation_Id);

    }
    
    
    function answerPO(uint Quotation_Id,bool answer ){
        
       impo.answerByExporter(Quotation_Id,answer);
    }
    
    
    function getStatusOfQuotation(uint Quotation_Id) constant returns( consensusChain_ExporterWork.ProductStatus status){
        
       return expo.getStatus(Quotation_Id);
    }
    
    
    
    
    
}