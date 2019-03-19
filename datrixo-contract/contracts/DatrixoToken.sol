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
    /* tells if tokens have been burned already */
    bool burned;

    /* This creates an array with all balances */

    /* This balance structure is
    *  account address -> Date of purchase -> value of sold Tokens
    */
    mapping(address => mapping(uint => uint)) public balanceOf;

    /* This allowance structure is
     * seller account -> customer account -> allowance value of Tokens
    */
    mapping(address => mapping(address => uint)) public allowance;


    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, uint purchaseTime, address indexed to, uint transactionTime, uint value);
    event Approval(address indexed _owner, address indexed spender, uint value);
    event Burned(uint amount);


    /* Initializes contract with initial supply tokens to the creator of the contract */
    function DatrixoToken(address _ownerAddr, uint _startTime){
        owner = _ownerAddr;
        startTime = _startTime;
        balanceOf[owner][startTime] = totalSupply; // Give the owner all initial tokens with date of purchase = startTime
    }

    /* Send some of your tokens from your purchase with date = _purchaseTime to a given address and register purchase with date = now*/
    function transfer(uint _purchaseTime, address _to, uint _value) returns(bool success){
        uint _transactionTime = now;
        require(_transactionTime >= startTime); //check if the crowdsale is already over
        if (msg.sender == owner) {
            require(safeSub(balanceOf[msg.sender][startTime], _value) >= lockedAmount); // prevent the owner o spending his share of tokens for company, loyalty program and future financing of the company within the first year
            _purchaseTime = startTime;
        } else {
            if (_purchaseTime != 0) {
                require(_transactionTime > (_purchaseTime + 1 years)); // prevent sale tokens during first year with first purchase. Following purchases have _purchaseTime = 0 and not controlled
            }
            _transactionTime = 0;
        }
        balanceOf[msg.sender][_purchaseTime] = safeSub(balanceOf[msg.sender][_purchaseTime], _value); // Subtract from the sender purchase with purchase date = _purchaseTime
        balanceOf[_to][_transactionTime] = safeAdd(balanceOf[_to][_transactionTime], _value); // Add the same to the recipient purchase with _transactionTime
        Transfer(msg.sender, _purchaseTime, _to, _transactionTime, _value); // Notify anyone listening that this transfer took place
        return true;
    }

    /* Allow another contract or person to spend some tokens in your behalf */
    function approve(address _spender, uint _value) returns(bool success) {
        return _approve(_spender, _value);
    }

    /* internal approve functionality. needed, so we can check the payloadsize if called externally, but smaller
     * payload allowed internally */
    function _approve(address _spender, uint _value) internal returns(bool success) {
        //  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
        require((_value == 0) || (allowance[msg.sender][_spender] == 0));
        allowance[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }


    /* to be called when ICO is closed. burns the remaining tokens except the company share (60360000), the tokens reserved
     * for the bounty/advisors/marketing program (48288000), for the loyalty program (52312000) and for future financing of the company (40240000).
     * anybody may burn the the tokens after ICO ended, but only once (in case the owner holds more tokens in the future).
     * this ensures that the owner will not posses a majority of the tokens. */
    function burn() {
        // if token have not been burned already and the ICO ended
        if (!burned && now > startTime) {
            uint difference = safeSub(balanceOf[owner][startTime], reservedAmount);
            balanceOf[owner][startTime] = reservedAmount;
            totalSupply = safeSub(totalSupply, difference);
            burned = true;
            Burned(difference);
        }
    }


    /**
     * sets the ico address and give it allowance to spend the crowdsale tokens. Only collable once.
     * @param _icoAddress the address of the ico contract
     * value the max amount of tokens to sell during the ICO
     **/
    function setICO(address _icoAddress) {
        require(msg.sender == owner);
        ico = _icoAddress;
        assert((_approve(ico, tokensForIco)));
    }


    /**
     * Allows the ico contract to set the traiding start time to an earler point of time.
     * (In case the soft cap has been reached)
     * @param _newStart the new start date
     **/
    function setStart(uint _newStart) {
        require(msg.sender = ico && _newStart < startTime);
        startTime = _newStart;
    }



















}
