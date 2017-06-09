pragma solidity ^0.4.6;

contract Sslchain {

    struct Certificate {
        bytes32 domain;
        uint validity_date;
        string cert;
    }

    uint public numCertificate;
    mapping (uint => Certificate) public certificates;

    modifier validCertificate(bytes32 dom) {
        Certificate c = certificates[0];
        for (uint i = 0; i<=numCertificate; i++) {
            c = certificates[i];
            if (c.domain == dom && c.validity_date >= now) throw;
        }
    	_;
    }

    function newCertificate(bytes32 dom, uint date, string cert) validCertificate(dom) returns (uint certificateID) {
        certificateID = numCertificate++;
        certificates[certificateID] = Certificate(dom, date, cert);
    }

}
