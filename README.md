# ![Logo](https://github.com/nicob21/sslchain/blob/master/sslchain_site/app/img/logo.png) Sslchain

## What is Sslchain?
Sslchain is a new way to manage SSL certificates without requiring a certification authority. It uses Ethereum blockchain to get a secure, decentralized and public way to store SSL certificates. Please find the one-pager that sum-up the project in the repository.

## How does it work?
Sslchain uses Ethereum blockchain and web3 API to interact with Ethereum. Sslchain owns  a smart-contract (*cf Sslchain.sol*) composed of a structure to store the certificates and a function to add new ones.

To create a SSL certificate, a webmaster needs to generate it using a tool such as *openssl*. He has to provide his personal details and then the program generates the certificate and the private/public key couple. Then he self-signs the certificate using his private key and goes on Sslchain website. He can add his certificate in the blockchain throw Sslchain website. 

These informations are stored in the blockchain using the smart-contract deployed on Ethereum. The smart-contract first checks that there are no other certificate for the same domain name or that they expired. So, for one domain name, there is only one valid certificate in the blockchain. The webmaster can then configure his server to send the certificate to the clients.

In order to verify that a certificate sent by a server is valid, Sslchain has a *NodeJs* script (in the future this script will be automatically executed by the web browser). This program compares the certificate received from the server and the one present in the blockchain for the same domain name. If they match, the certificate is validated and the encrypted exchanges can start.

## Requested tools
*NB: All the following commands have been tested on Ubuntu 16.04 using Google Chrome only.*

### Ethereum connexion
Sslchain uses Kovan test-net Ethereum blockchain. In order to interact with Kovan, we use Infura provider so we don't need to run a node.

### NodeJs module
To run the website and create certificates, go to *sslchain_site* repertory and launch the following command to automatically install NodeJS dependencies.
```
    # sudo npm install
```

To use the verification script, go into *sslchain_script* and install its dependencies.
```
    # sudo npm install
```

## Try Sslchain


### Create a certificate
In the repository *sslchain\_site*, click on index.html to enjoy the web interface localy. In the menu *Create a certificate* you can fulfill the form to save your certificate in the blockchain. Once your certificate is mined, you can ask for it in *Overview* section.


### Verify a certificate
In the repository *sslchain\_script*, run the command:
```
    # node sslchain.js my_domain_name.com
```
If you previously add your certificate for your domain name, the program will get its certificate and check if the one you entered in the blockchain is equal. 

For more informations, you can also read [sslchain.pdf](https://github.com/nicob21/sslchain/blob/master/sslchain.pdf)

## Contact
To contact me : nico.bernard21@gmail.com
