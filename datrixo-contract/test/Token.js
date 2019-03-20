let utils = require('./utils.js');

let token = artifacts.require("/DatrixoToken.sol");
let instance;
let totalSupply = 40240000000000;
let start = 1506780000;
let locked = 15291200000000;
let reserved = 20120000000000;
let owner = "0x376c9fde9555e9a491c4cd8597ca67bb1bbf397e";

contract('token', accounts => {

    before(async() => {
        instance = await token.deployed();
    });



});
