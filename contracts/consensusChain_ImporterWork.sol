pragma solidity ^0.4.11;

contract consensusChain_ImporterWork{
    
    
    struct PurchaseOrder{
       
        bytes32 productName;
        uint quantity;
        uint ratePerQuatity;
        bytes32 description;
        uint tax;
        bytes32 termsAndCondition;
        bool approveByExporter;
    }
    
    
    mapping(uint => PurchaseOrder) map;
    
    function add(uint QuotationId, bytes32 productName, uint quantity, uint ratePerQuatity,bytes32 description,uint tax,bytes32 termsAndCondition){
        
    
        map[QuotationId].productName=productName;
        map[QuotationId].quantity=quantity;
        map[QuotationId].ratePerQuatity=ratePerQuatity;
        map[QuotationId].description=description;
        map[QuotationId].tax=tax;
        map[QuotationId].termsAndCondition=termsAndCondition;
        map[QuotationId].approveByExporter=false;
        
        
    }
    
    
    function getAllDetails(uint QuotationId) constant returns(bytes32 productName, uint quantity, uint ratePerQuatity,bytes32 description,uint tax, bytes32 termsAndCondition){
        
        return (map[QuotationId].productName,map[QuotationId].quantity,map[QuotationId].ratePerQuatity,map[QuotationId].description,map[QuotationId].tax,map[QuotationId].termsAndCondition);
    }
    
    
    function answerByExporter(uint QuotationId,bool answer){
        
        map[QuotationId].approveByExporter=answer;
    }
    
    

    
    
}