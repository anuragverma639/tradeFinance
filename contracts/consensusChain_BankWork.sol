pragma solidity ^0.4.11;

contract consensusChain_BankWork{
    
    event LOCGenerated(uint QuotationId, bytes32 productDescription, uint totalPrice, bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch, bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch , bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort);
    
    struct LetterOfCredit{
        
        uint quotation_id;
        bytes32 productDescription;
        uint totalPrice;
        bytes32 importer;
        bytes32 importeBank;
        bytes32 importerBankBranch;
        bytes32 exporter;
        bytes32 exporterBank;
        bytes32 exporterBankBranch;
        bytes32 shipping;
        bytes32 customAuthority;
        bytes32 loadingPort;
        bytes32 entryPort;
        
    }
    
    
    mapping (uint => LetterOfCredit) map;
    
    function add(uint QuotationId, bytes32 productDescription, uint totalPrice, bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch, bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch , bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort){
        
        map[QuotationId].quotation_id=QuotationId;
        map[QuotationId].productDescription=productDescription;
        map[QuotationId].totalPrice=totalPrice;
        map[QuotationId].importer=importer;
        map[QuotationId].importeBank=importeBank;
        map[QuotationId].importerBankBranch=importerBankBranch;
        map[QuotationId].exporter=exporter;
        map[QuotationId].exporterBank=exporterBank;
        map[QuotationId].exporterBankBranch=exporterBankBranch;
        map[QuotationId].shipping=shipping;
        map[QuotationId].customAuthority=customAuthority;
        map[QuotationId].loadingPort=loadingPort;
        map[QuotationId].entryPort=entryPort;
        
        LOCGenerated(QuotationId,productDescription,totalPrice,importer,importeBank,importerBankBranch,exporter,exporterBank,exporterBankBranch,shipping,customAuthority,loadingPort,entryPort);
        
    }
    
    
    function getProductDetails(uint QuotationId) constant returns(uint quotation_id,bytes32 productDescription, uint totalPrice, bytes32 shipping, bytes32 customAuthority, bytes32 loadingPort, bytes32 entryPort){
        
        return (QuotationId,map[QuotationId].productDescription,map[QuotationId].totalPrice,map[QuotationId].shipping,map[QuotationId].customAuthority,map[QuotationId].loadingPort,map[QuotationId].entryPort );
    }
    
    function getImporterDetails(uint QuotationId) constant returns( bytes32 importer, bytes32 importeBank, bytes32 importerBankBranch){
        
        return (map[QuotationId].importer,map[QuotationId].importeBank,map[QuotationId].importerBankBranch );
    }
    
    function getExporterDetails(uint QuotationId) constant returns( bytes32 exporter, bytes32 exporterBank, bytes32 exporterBankBranch ){
        
        return (map[QuotationId].exporter,map[QuotationId].exporterBank,map[QuotationId].exporterBankBranch );
    }
}