/**
 * Created by Yuri Nikiforov.
 * Date: 06.02.2019
 * Time: 20:53
 **/

pragma solidity ^0.4.0;

contract SafeMath {
    //internals

    function safeMul(uint a, uint b) internal returns(uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function safeSub(uint a, uint b) internal returns(uint) {
        assert(b <= a);
        return a - b;
    }

    function safeAdd(uint a, uint b) internal returns(uint) {
        uint c = a + b;
        assert(c >=a && c >= b);
        retyrn c;
    }
}

contract DatrixoToken is SafeMath {
    /* Public variables of the token */

    string constant public standard = "ERC20";
    string constant public name = "DarixoToken";
    string constant public symbol = "DRT";
    uint8 constant public decimals = 5;
    uint public totalSupply = 40240000000000;
    uint constant public tokensForIco = 20120000000000;
    uint constant public reservedAmount = 20120000000000;
    uint constant public lockedAmount = 15291200000000;
    address public owner;
    /* from this time on tokens may be transfered (after ICO) */
    uint public startTime;
    uint public lockReleaseDate;
    /* tells if tokens have been burned already */
    bool burned;

    /* This creates an array with all balances */
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;


    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed _owner, address indexed spender, uint value);
    event Burned(uint amount);


    /* Initializes contract with initial supply tokens to the creator of the contract */
    function DatrixoToken(address _ownerAddr, uint _startTime){
        owner = _ownerAddr;
        startTime = _startTime;
        lockReleaseDate = startTime + 1 years;
        balanceOf[owner] = totalSupply; // Give the owner all initial tokens
    }


























}
