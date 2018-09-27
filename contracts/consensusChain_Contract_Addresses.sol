pragma solidity ^0.4.11;

import './consensusChain_ExporterWork.sol';
import './consensusChain_ImporterWork.sol';
import './consensusChain_ShippingWork.sol';
import './consensusChain_BankWork.sol';
import './consensusChain_people.sol';

contract consensusChain_Contract_Addresses{
    
    consensusChain_ExporterWork expo=consensusChain_ExporterWork(0xa55e14a237f9394cbf33121cea2850dc6d8e6f34);
    
    consensusChain_ImporterWork impo=consensusChain_ImporterWork(0xe0c614b4f683aaf4a0a831241b994412b4b3907f);
    
    consensusChain_BankWork bank=consensusChain_BankWork(0xa642d5ac4dae7788cf3567084ced28f0cdfa1e8a);
    
    consensusChain_ShippingWork ship = consensusChain_ShippingWork(0xa66e3e064edc0579ca767e3c8922a1cf67127630);
    
    consensusChain_people people=consensusChain_people(0x0c38ca1af9daef9b99f84d54200cb36286b4a58b);
    
} 
