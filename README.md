![Logo](https://github.com/nicob21/sslchain/blob/master/sslchain_site/app/img/logo.png)

# Sslchain

## Introduction
A large amount of data are exchanged on the Internet everyday. These data might be confidential (credit card numbers for example) and their transfer must be secure.
\newline \newline
So, the majority of the websites use SSL certificates to authenticate themselves to their clients and exchange encrypted data. We are going to analyse in this document how Sslchain allows us to manage certificates using a blockchain.

\section{Usual management of SSL certificates}
\subsection*{What is a SSL certificate?}
A SSL certificate allows us to associate a domain name, the identity of its owner and a public key.
\newline
Such a certificate have two main goals:
\begin{itemize}
    \item Identify the server which send the web page to the client: is this really my bank webpage I am trying to access?
    \item Encrypted data exchanges between the client and the server thanks to the public key: my bank details aren't send on a clear channel.
\end{itemize}

\subsection*{How can I get a SSL certificate currently?}
Currently, the domain owner create his certificate giving his identity, the one of his website and generating a private key / public key couple. Then his certificate has to be signed by a certification authority (CA). This authority will check the informations given by the owner and sign the certificate with its private key. This operation costs money.

\subsection*{How to verify the authenticity of a certificate?}
When a client asks for a web page, he receives the certificate from the server. Then, his web browser verify that the certification authority which signed the certificate is trustworthy. If it is, the client and the server can exchange encrypted data using the private / public key couple. Finally, they decide a common symmetric key and use the SSL protocol to secure their exchanges.

\subsection*{Issue}
This system works well but it raise a main issue, it includes a middle man: the certification authority. \newline
How could we avoid to require a trusted third party?
\newline \newline
Sslchain answers this need proposing a new way to manage SSL certificates using a blockchain. The use of a blockchain allows a secure, decentralized, public way to store the certificates.

\section{How does it work?}
\subsection*{Technologies used}
Sslchain is based on the Ethereum blockchain and also uses the web3 API to interact with Ethereum. Sslchain owns  a smart-contract (\textit{cf Sslchain.sol}) composed of a structure to store the certificates and a function to add new ones.

\subsection*{Creation of a certificate}
To create a SSL certificate, a webmaster needs to generate it using a tool such as \textit{openssl}. He has to provide his personal details and then the program generate the certificate and the private / public key couple. Then he self-signs the certificate using his private key and go on Sslchain website (\textit{cf} \ref{man_create_cert}). He can add his certificate in the blockchain throw Sslchain website. 
\newline \newline
These informations are stored in the blockchain using the smart-contract deployed on Ethereum. The smart-contract first check that there are no other certificate for the same domain name or that they expired. So, for one domain name, there is only one valid certificate in the blockchain. The webmaster can then configure his server to send the certificate to the clients.

\subsection*{Verification of a certificate}
In order to verify that a certificate sent by a server is valid, Sslchain has a \textit{NodeJs} script (in the future this script will be automatically executed by the web browser). This program compares the certificate received from the server and the one present in the blockchain for the same domain name. If they match, the certificate is validated and the encrypted exchanges can go on.

\subsection*{Working diagram}
\includegraphics[scale=0.8]{schema_sslchain.png}

\section{Requested tools}
\textit{NB: All the following commands have been tested on Ubuntu 16.04 using Google Chrome only.}

\subsection*{Ethereum connexion}
In order to install all the components required to connect Ethereum blockchain, please execute the following commands.
\begin{verbatim}
    # sudo apt-get install software-properties-common
    # sudo add-apt-repository -y ppa:ethereum/ethereum
    # sudo apt-get update
    # sudo apt-get install ethereum
\end{verbatim}

You can now connect Ethereum test blockchain called \textit{test-net} using the command:
\begin{verbatim}
    # geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024
    --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" console
\end{verbatim}
\textit{NB: The synchronisation with Ethereum might take a long time and need to be done.}

\subsection*{NodeJs module}
To run the website and create certificates, go to \textit{sslchain\_site} repertory and install the following modules:
\begin{verbatim}
    # sudo npm install web3
    # sudo npm install truffle
    # sudo npm install webpack
    # sudo npm install copy-webpack-plugin
\end{verbatim}

To use the verification script, go into \textit{sslchain\_script} and install these modules:
\begin{verbatim}
    # sudo npm install web3
    # sudo npm install openssl-cert-tools
\end{verbatim}

\section{Try Sslchain}
First start the connexion to the blockchain:
\begin{verbatim}
    # geth --testnet --fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024
    --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" console
\end{verbatim}

\subsection*{Create a certificate}
\label{man_create_cert}
Unlock your Ethereum account:
\begin{verbatim}
    web3.personal.unlockAccount(<address>, <password>, 15000)
\end{verbatim} and be sure you got some Ethers (on \textit{test-net} you can get free Ethers: \textit{http://faucet.ropsten.be:3001/}).
Then in the repository \textit{sslchain\_site}, execute the command \textit{npm run dev} and go to \url{http://localhost:8080} to access Sslchain website. In the menu \textit{Create a certificate} you can fulfill the form to save your certificate in the blockchain. Once your certificate will be mined, it will appear in \textit{Overview} section.

\newline \newline
\textit{NB: Adding a certificate to the blockchain might take few minutes.}

\subsection*{Verify a certificate}

Run the command:
\begin{verbatim}
    # node sslchain.js my_domain_name.com
\end{verbatim}
If you previously add your certificate for your domain name, the program will get its certificate and check if the one you entered in the blockchain is equal. 

\section*{Conclusion}
This first version of Sslchain allows us to store SSL certificates publicly and safely using the blockchain technology. We succeeded to avoid a trusted third party such as a certification authority.
\newline \newline
The next step of this project will be to deploy the smart contract on the real Ethereum blockchain and not only on the \textit{test-net}. Then, get Sslchain website online with an interface to pay with classic money or Ethers directly. The last thing will be to integrate the verification program in the web browsers so that the clients get the same experience as now.
\end{document}          

