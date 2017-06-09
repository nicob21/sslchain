var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var sslchain = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"certificates","outputs":[{"name":"domain","type":"bytes32"},{"name":"validity_date","type":"uint256"},{"name":"cert","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dom","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"cert","type":"string"}],"name":"newCertificate","outputs":[{"name":"certificateID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numCertificate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]).at("0x7c6249e47c068bbc0924dd14eb0e5b7ddb285b2b");

var stdin = process.openStdin();
var opensslTools = require('openssl-cert-tools');
stdin.addListener("data", function(d) {
    var domain = d.toString().trim();
    var i = 0;
	var certSslchain = sslchain.certificates(i);
	var n = domain.localeCompare(web3.toAscii(certSslchain[0]));
	while ( n != 0) {
		i++;
		var certSslchain = sslchain.certificates(i);
		var n = domain.localeCompare(web3.toAscii(certSslchain[0]));
	}
    opensslTools.getCertificate(domain, '443', function(err, crt) {
        if (!err) {
            certSslchain[2] = '-----BEGIN CERTIFICATE-----\n' + certSslchain[2].replace(/ /g, '\n') + '\n-----END CERTIFICATE-----';
            var n = crt.localeCompare(certSslchain[2]);
            if (n == 0) {
                console.log(crt);
                console.log("Certificat valide");
            } else {
                console.log("Erreur: Certificat non valide");
            }
        } else {
            console.log("Erreur: Certificat non valide");
        }
        console.log("Nom de domaine :");
    });
});

console.log("Nom de domaine :");
