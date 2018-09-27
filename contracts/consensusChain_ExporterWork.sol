pragma solidity ^0.4.11;

contract consensusChain_ExporterWork{
    
    uint public QuotationId=0;
    
    event QuotationGenerated(uint QuotationId, bytes32 exportersEmail, bytes32 importersEmail,bytes32 product_name, bytes32 description, uint quantity, uint ratePerQuantity, uint tax , ProductStatus status);
   
    event DocumentsUploaded(uint QuotationId, bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half , bytes32 Docs3_first_half, bytes32 Docs3_second_half);
    
    enum ProductStatus{QuotationGenerated, POGenerated, LOCGenerated, DocsUploaded, PortAuthorityVerified,BOLGenerated,DocsVerified,ImporterRecieved}
   
    
    struct Quotation{
        uint quotation_id;
        bytes32 exportersEmail;
        bytes32 importersEmail;
        bytes32 product_name;
        bytes32 description;
        uint quantity;
        uint ratePerQuantity;
        uint tax;
        ProductStatus status;
        bool approveByImporter;
     }
     
     
    struct Documents{
        
        bytes32 Docs1_first_half;
        bytes32 Docs1_second_half;
        bytes32 Docs2_first_half;
        bytes32 Docs2_second_half;
        bytes32 Docs3_first_half;
        bytes32 Docs3_second_half;
    }
     
     mapping (uint => Quotation) map;
     
     mapping (uint => Documents) doc_map;
     
     function add(bytes32 exportersEmail, bytes32 importersEmail,bytes32 product_name, bytes32 description, uint quantity, uint ratePerQuantity, uint tax , ProductStatus status) returns(uint Qid){
        
         QuotationId++;
        
         map[QuotationId].quotation_id=QuotationId;
         map[QuotationId].exportersEmail=exportersEmail;
         map[QuotationId].importersEmail=importersEmail;
         map[QuotationId].product_name=product_name;
         
         map[QuotationId].description=description;
         map[QuotationId].quantity=quantity;
         map[QuotationId].ratePerQuantity=ratePerQuantity;
         map[QuotationId].tax=tax;
         map[QuotationId].status=status;
         map[QuotationId].approveByImporter=false;
         
         QuotationGenerated(QuotationId, exportersEmail,importersEmail,product_name,description,quantity,ratePerQuantity,tax,status);
         
        return QuotationId;
         
     }
     
    
     
     function getProductDetails(uint Quotation_Id) constant returns( bytes32 product_name,bytes32 description, uint quantity, uint ratePerQuantity, uint tax, ProductStatus status){
         
         return (map[Quotation_Id].product_name, map[Quotation_Id].description,map[Quotation_Id].quantity,map[Quotation_Id].ratePerQuantity,map[Quotation_Id].tax,map[Quotation_Id].status);
     
         
     }
     
     function getQuotationDetails(uint Quotation_Id) constant returns(uint QuotationId, bytes32 exportersEmail, bytes32 importersEmail){
         
         return (Quotation_Id,map[Quotation_Id].exportersEmail,map[Quotation_Id].importersEmail);
     
         
     }
     
     
     function getStatus(uint Quotation_Id)constant returns(ProductStatus status){
         return (map[Quotation_Id].status);
     }
     
     
     function addDocs(uint Quotation_Id,bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half, bytes32 Docs3_first_half, bytes32 Docs3_second_half){
         
         doc_map[Quotation_Id].Docs1_first_half=Docs1_first_half;
         doc_map[Quotation_Id].Docs1_second_half=Docs1_second_half;
         doc_map[Quotation_Id].Docs2_first_half=Docs2_first_half; 
         doc_map[Quotation_Id].Docs2_second_half=Docs2_second_half;
         doc_map[Quotation_Id].Docs3_first_half=Docs3_first_half;
         doc_map[Quotation_Id].Docs3_second_half=Docs3_second_half;
         
         DocumentsUploaded(Quotation_Id,Docs1_first_half,Docs2_second_half,Docs2_first_half, Docs2_second_half, Docs3_first_half, Docs3_second_half);
    
     }
     
     
     function getAllDocs(uint Quotation_Id)constant returns(bytes32 Docs1_first_half, bytes32 Docs1_second_half, bytes32 Docs2_first_half, bytes32 Docs2_second_half, bytes32 Docs3_first_half, bytes32 Docs3_second_half){
         
         return(doc_map[Quotation_Id].Docs1_first_half,doc_map[Quotation_Id].Docs1_second_half,doc_map[Quotation_Id].Docs2_first_half,doc_map[Quotation_Id].Docs2_second_half,doc_map[Quotation_Id].Docs3_first_half,doc_map[Quotation_Id].Docs3_second_half);
         
     }
     
     
     function updateStatus(uint Quotation_Id, ProductStatus status){
         
         map[Quotation_Id].status=status;
         
     }
     
     
     function answerByImporter(uint Quotation_Id, bool answer){
        
         map[Quotation_Id].approveByImporter=answer;
         
     }
     
     
}