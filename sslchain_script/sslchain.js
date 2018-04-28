var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/N0eEaWzEOw2HT8wv3qjC"));
var interface = [ { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "certificates", "outputs": [ { "name": "validity_date", "type": "uint256" }, { "name": "cert", "type": "string" }, { "name": "flag", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "dom", "type": "bytes32" }, { "name": "date", "type": "uint256" }, { "name": "cert", "type": "string" } ], "name": "newCertificate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numCertificate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var contractAddress = "0x9031669dD6D8Bb3159071bc0142527e696C849b4";
var contract = web3.eth.contract(interface).at(contractAddress);

var stdin = process.openStdin();
var opensslTools = require('openssl-cert-tools');
stdin.addListener("data", function(d) {
    var domain = d.toString().trim();
	var certSslchain = contract.certificates(domain);
    opensslTools.getCertificate(domain, '443', function(err, crt) {
        if (!err) {
            console.log(certSslchain[1]);
            console.log(crt);
            var n = crt.localeCompare(certSslchain[1]);
            if (n == 0) {
                console.log(crt);
                console.log("Valide Certificate");
            } else {
                console.log("Error: Invalid Certificate");
            }
        } else {
            console.log("Erreur: Invalid Certificate");
        }
        console.log("Domain Name :");
    });
});

console.log("Nom de domaine :");
