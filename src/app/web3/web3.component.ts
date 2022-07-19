import { Component } from '@angular/core';
import { exhaustAll } from 'rxjs';
import Web3 from 'web3';


declare let window: any;

@Component({
  selector: 'app-web3',
  templateUrl: './web3.component.html',
  styleUrls: ['./web3.component.css'],
})
export class Web3Component {



  web3:any = null;
  check:any;
  hello:boolean = window.ethereum;
  account:any = null;
  mybalance:any;
  result:any;
  error:any;

   


  constructor() {
    if(window.ethereum) {
      this.check = true;
    } else {
      this.check = false;
    }
  }


  networks:any = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls: ["https://bscscan.com"]
    },
    celo: {
      chainId: `0x${Number(42220).toString(16)}`,
      chainName: "Celo Mainnet",
      nativeCurrency: {
        name: "Celo Mainnet",
        symbol: "CELO",
        decimals: 18
      },
      rpcUrls: [
        "https://forno.celo.org"
      ],
      blockExplorerUrls: ["https://explorer.celo.org"]
    }
  };
  




 ///***********LOGIN LOGIC*************//// 

  async  loginWithMetamask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}).catch((err:any)=> {
      console.log(err.code);
    });
    this.account = accounts[0];
    console.log(this.account);
  }





 ///***********CHECKING BALANCE LOGIC*************//// 

  async checkBalance () {
      this.mybalance = await window.ethereum.request({method: "eth_getBalance",
     params: [
       this.account,
       'latest'
     ]}
     ).catch((err:any)=> {
      //  console.log(err);
     })
     this.mybalance = parseInt(this.mybalance)/Math.pow(10,18);

     console.log(this.mybalance);
  }
money:any = 100000000000000000;
money2:any = 200000000000000000;


 ///***********MAKING TRANSACTION LOGIC*************//// 



  async sendpayment() {
    let  params = [{
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: this.account, // must match user's active address.
  value: Number(this.money).toString(16), // Only required to send ether to the recipient from the initiating external account.
    }]
    this.result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err:any)=> {
      console.log(err);
    })
  }

  async sendpayment2() {
    let  params = [{
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: this.account, // must match user's active address.
  value: Number(this.money2).toString(16), // Only required to send ether to the recipient from the initiating external account.
    }]
    this.result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err:any)=> {
      console.log(err);
      this.error = err.message;

    })
  }



 ///***********CHANGING NETWORK LOGIC*************//// 

 networkName = "polygon";


 async changeNetwork  (networkName:any) {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...this.networks[networkName]
        }
      ]
    });
  } catch (err) {
    console.log(err);
  }
};

// async handleNetworkSwitch (networkName:any) => {
//   await changeNetwork({ networkName });
// };







}
