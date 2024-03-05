// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import './Membership.sol';
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Factory {

mapping(address => uint) public numberOfTokensOfAddress;
mapping(address => address[]) public addressToTokenAddress;
  
function deployContract(address initialOwner,string memory title,string memory symbol,uint price) public returns(address){
address newToken = address(new MyToken(initialOwner,title,symbol,price));
numberOfTokensOfAddress[initialOwner]+=1; 
addressToTokenAddress[initialOwner].push(newToken);       
return newToken;
}
    
}