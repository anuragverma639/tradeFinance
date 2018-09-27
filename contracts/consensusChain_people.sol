pragma solidity ^0.4.11;

contract consensusChain_people{
    
    enum profile{ isExporter, isImporter, isBank, isPort, isCustom, isShipping}
    
    struct Person{
       
        profile whichPerson;
    }
    
    mapping(bytes32 => Person) map;
    
    function add(bytes32 email, profile whichPerson){
        
        map[email].whichPerson=whichPerson;
        
    }
    
    
    function getInfo(bytes32 email) constant returns(profile whichPerson) {
        
       return map[email].whichPerson;
       
    } 
    
}