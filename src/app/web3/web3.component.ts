import { Component } from '@angular/core';
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


  constructor() {
    if(window.ethereum) {
      this.check = true;
    } else {
      this.check = false;
    }
  }


  async  loginWithMetamask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}).catch((err:any)=> {
      console.log(err.code);
    });
    this.account = accounts[0];
    console.log(this.account);
  }

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
  async sendpayment() {
    let  params = [{
      once: '0x00', // ignored by MetaMask
  gasPrice: Number(21000).toString(16), // customizable by user during MetaMask confirmation.
  gas: Number(2500000).toString(16), // customizable by user during MetaMask confirmation.
  to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  from: this.account, // must match user's active address.
  value: Number(this.money).toString(16), // Only required to send ether to the recipient from the initiating external account.
  data:
  Number(this.money).toString(16), // Optional, but used for defining smart contract creation and interaction.
  chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    }]
    this.result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err:any)=> {
      console.log(err);
    })
  }

}
