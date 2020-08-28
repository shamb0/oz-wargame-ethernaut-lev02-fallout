pragma solidity ^0.6.12;

import "@nomiclabs/buidler/console.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract Fallout is Ownable {

  using SafeMath for uint256;
  mapping (address => uint) allocations;

  /* constructor */
  // function Fal1out() public payable {
  //   owner = msg.sender;
  //   allocations[owner] = msg.value;
  //   console.log("Fallout.sol :: F(%s)::Val(%s)", msg.sender, msg.value );
  // }

  constructor() public payable Ownable() {
    // _owner = address(msg.sender);
    allocations[owner()] = msg.value;
  }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
    console.log("Fallout.sol :: F(%s)::Val(%s)", msg.sender, msg.value );
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}
