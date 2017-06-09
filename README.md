# ![Logo](https://github.com/nicob21/sslchain/blob/master/sslchain_site/app/img/logo.png) Sslchain

## What is Sslchain?
Sslchain is a new way to manage SSL certificates without requiring a certification authority. It uses Ethereum blockchain to get a secure, decentralized and public way to store SSL certificates. Please find the one-pager that sum-up the project in the repository.

## How does it work?
Sslchain uses Ethereum blockchain and web3 API to interact with Ethereum. Sslchain owns  a smart-contract *cf Sslchain.sol* composed of a structure to store the certificates and a function to add new ones.

To create a SSL certificate, a webmaster needs to generate it using a tool such as *openssl*. He has to provide his personal details and then the program generate the certificate and the private/public key couple. Then he self-signs the certificate using his private key and go on Sslchain website. He can add his certificate in the blockchain throw Sslchain website. 

These informations are stored in the blockchain using the smart-contract deployed on Ethereum. The smart-contract first check that there are no other certificate for the same domain name or that they expired. So, for one domain name, there is only one valid certificate in the blockchain. The webmaster can then configure his server to send the certificate to the clients.

In order to verify that a certificate sent by a server is valid, Sslchain has a *NodeJs* script (in the future this script will be automatically executed by the web browser). This program compares the certificate received from the server and the one present in the blockchain for the same domain name. If they match, the certificate is validated and the encrypted exchanges can go on.

## Requested tools
*NB: All the following commands have been tested on Ubuntu 16.04 using Google Chrome only.*

### Ethereum connexion
In order to install all the components required to connect Ethereum blockchain, please execute the following commands.
```
    # sudo apt-get install software-properties-common
    # sudo add-apt-repository -y ppa:ethereum/ethereum
    # sudo apt-get update
    # sudo apt-get install ethereum
```

You can now connect Ethereum test blockchain called *test-net* using the command:
```
    # geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024
    --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" console
```
*NB: The synchronisation with Ethereum might take a long time and need to be done.*

### NodeJs module
To run the website and create certificates, go to *sslchain_site* repertory and install the following modules:
```
    # sudo npm install web3
    # sudo npm install truffle
    # sudo npm install webpack
    # sudo npm install copy-webpack-plugin
```

To use the verification script, go into *sslchain_script* and install these modules:
```
    # sudo npm install web3
    # sudo npm install openssl-cert-tools
```

## Try Sslchain
First start the connexion to the blockchain:
```
    # geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024
    --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" console
```

### Create a certificate
Unlock your Ethereum account:
```
    web3.personal.unlockAccount(<address>, <password>, 15000)
```
and be sure you got some Ethers (on *test-net* you can get free Ethers: [http://faucet.ropsten.be:3001/](http://faucet.ropsten.be:3001/)).
Then in the repository *sslchain\_site*, execute the command *npm run dev* and go to [http://localhost:8080](http://localhost:8080) to access Sslchain website. In the menu *Create a certificate* you can fulfill the form to save your certificate in the blockchain. Once your certificate will be mined, it will appear in *Overview* section.

*NB: Adding a certificate to the blockchain might take few minutes.*

### Verify a certificate

Run the command:
```
    # node sslchain.js my_domain_name.com
```
If you previously add your certificate for your domain name, the program will get its certificate and check if the one you entered in the blockchain is equal. 

For more informations, you can also read [sslchain.pdf](https://github.com/nicob21/sslchain/blob/master/sslchain.pdf)

## Contact
To contact me : nico.bernard21@gmail.com
