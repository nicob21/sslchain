var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var sslchain = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"certificates","outputs":[{"name":"domain","type":"bytes32"},{"name":"validity_date","type":"uint256"},{"name":"cert","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dom","type":"bytes32"},{"name":"date","type":"uint256"},{"name":"cert","type":"string"}],"name":"newCertificate","outputs":[{"name":"certificateID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numCertificate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]).at("0x7c6249e47c068bbc0924dd14eb0e5b7ddb285b2b");

window.createCertificate = function() {
    var dom = $("#domain").val();
    var date = (new Date(new Date().setFullYear(new Date().getFullYear() + 2))).getTime() / 1000;
    var code = $("#code_certificat").val();
    sslchain.newCertificate(dom, date, code, {from: web3.eth.accounts[0],gas: '2000000'});
    alert("Certificat en attente d'être miné.");
}

window.getCertificates = function() {
    var tab = document.getElementById("certificates");
    var nbCert = sslchain.numCertificate.call();
    for (var i=nbCert-3; i<nbCert; i++) {
        var c = sslchain.certificates(i);
        var ind = nbCert - i - 1;
        $("#cert_dom" + ind).html(web3.toAscii(c[0]));
        var d = new Date(c[1] * 1000);
        $("#cert_date" + ind).html(d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear());
        $("#cert_code" + ind).html(c[2]);
    }
}
