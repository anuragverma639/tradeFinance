pragma solidity ^0.4.11;

contract consensusChain_ShippingWork{
    
    struct BillOfLadding{
        bytes32 shippingFrom;
        bytes32 shippingTo;
        bytes32 temperature;
        uint weight;
        uint numberOfBox;
    }
    
    mapping (uint => BillOfLadding) map;
    
    function add(uint QuotationId, bytes32 shippingFrom, bytes32 shippingTo, bytes32 temperature, uint weight, uint numberOfBox){
        map[QuotationId].shippingFrom=shippingFrom;
        map[QuotationId].shippingTo=shippingTo;
        map[QuotationId].temperature=temperature;
        map[QuotationId].weight=weight;
        map[QuotationId].numberOfBox=numberOfBox;
        
    }
    
    function getAllDetails(uint QuotationId) constant returns(bytes32 shippingFrom, bytes32 shippingTo, bytes32 temperature, uint weight, uint numberOfBox){
        
        return (map[QuotationId].shippingFrom,map[QuotationId].shippingTo,map[QuotationId].temperature,map[QuotationId].weight,map[QuotationId].numberOfBox);
        
    }
    
    
}