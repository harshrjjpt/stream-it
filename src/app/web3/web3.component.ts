import { Component } from '@angular/core';
import { exhaustAll } from 'rxjs';
import Web3 from 'web3';
import { Web3Service } from '../web3.service';

declare let window: any;

@Component({
  selector: 'app-web3',
  templateUrl: './web3.component.html',
  styleUrls: ['./web3.component.css'],
})
export class Web3Component {
  // web3 = new Web3(window.ethereum);
  check: any;
  hello: boolean = window.ethereum;
  account: any = null;
  mybalance: any;
  result: any;
  error: any;
  networkKey: any;

  constructor(public web_3: Web3Service) {
    if (window.ethereum) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  networks: any = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: {
        name: 'Binance Chain Native Token',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed2.defibit.io',
        'https://bsc-dataseed3.defibit.io',
        'https://bsc-dataseed4.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed2.ninicoin.io',
        'https://bsc-dataseed3.ninicoin.io',
        'https://bsc-dataseed4.ninicoin.io',
        'wss://bsc-ws-node.nariox.org',
      ],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    celo: {
      chainId: `0x${Number(42220).toString(16)}`,
      chainName: 'Celo Mainnet',
      nativeCurrency: {
        name: 'Celo Mainnet',
        symbol: 'CELO',
        decimals: 18,
      },
      rpcUrls: ['https://forno.celo.org'],
      blockExplorerUrls: ['https://explorer.celo.org'],
    },
    ethereum: {
      chainId: `0x${Number(1).toString(16)}`,
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.infura.io/v3/%API_KEY%'],
      blockExplorerUrls: ['https://explorer.celo.org'],
    },
  };

  ///***********LOGIN LOGIC*************////

  async loginWithMetamask() {
    await this.web_3.mainLogin();
  }

  ///***********CHECKING BALANCE LOGIC*************////

  async checkBalance() {
    this.mybalance = await window.ethereum
      .request({ method: 'eth_getBalance', params: [this.account, 'latest'] })
      .catch((err: any) => {
        //  console.log(err);
      });
    this.mybalance = parseInt(this.mybalance) / Math.pow(10, 18);

    console.log(this.mybalance);
  }
  money: any = 100000000000000000;
  money2: any = 200000000000000000;

  ///***********MAKING TRANSACTION LOGIC*************////

  async sendpayment() {
    let params = [
      {
        to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
        from: this.account, // must match user's active address.
        value: Number(this.money).toString(16), // Only required to send ether to the recipient from the initiating external account.
      },
    ];
    this.result = window.ethereum
      .request({ method: 'eth_sendTransaction', params })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async sendpayment2() {
    let params = [
      {
        to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
        from: this.account, // must match user's active address.
        value: Number(this.money2).toString(16), // Only required to send ether to the recipient from the initiating external account.
      },
    ];
    this.result = window.ethereum
      .request({ method: 'eth_sendTransaction', params })
      .catch((err: any) => {
        console.log(err);
        this.error = err.message;
      });
  }

  ///***********CHANGING NETWORK LOGIC*************////

  networkName = 'polygon';

  async changeNetwork(networkName: any) {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...this.networks[networkName],
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  // async handleNetworkSwitch (networkName:any) => {
  //   await changeNetwork({ networkName });
  // };

  ///***********ESTIMATION OF GAS *************////
  mygasprice: any;
  mygasquantity: any;

  async estGasPrice() {
    this.mygasprice = await window.ethereum.request({
      method: 'eth_gasPrice',
      params: [],
      id: 1,
      jsonrpc: '2.0',
    });
    this.mygasprice = parseInt(this.mygasprice);
    console.log(this.mygasprice);
  }

  ///***********ESTIMATION OF GAS QUANTITY *************////

  async estGasQuantity() {
    this.mygasquantity = await window.ethereum.request({
      method: 'eth_estimateGas',
      params: [
        {
          from: '0x8D97689C9818892B700e27F316cc3E41e17fBeb9',
          to: '0xd3CdA913deB6f67967B99D67aCDFa1712C293601',
          value: '0x186a0',
        },
      ],
      id: 1,
      jsonrpc: '2.0',
    });
    this.mygasquantity = parseInt(this.mygasquantity);
    console.log(this.mygasquantity);
  }

  ///***********change tokens *************////

  tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
  tokenSymbol = 'TUT';
  tokenDecimals = 18;
  tokenImage = 'http://placekitten.com/200/300';

  celoUSDAddress = '0x765de816845861e75a25fca122bb6898b8b1282a';
  celoUSDSymbol = 'cUSD';
  celoUSDDecimals = 18;

  polygonUSDT = '0xc2132d05d31c914a87c6611c10748aeb04b58e8f';
  polygonUSDTSymbol = 'USDT';
  polygonUSDTSymbolDecimals = 6;

  async wasAdded(adr: any, sym: string, dec: any) {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: adr, // The address that the token is at.
          symbol: sym, // A ticker symbol or shorthand, up to 5 chars.
          decimals: dec, // The number of decimals in the token
          // image: this.tokenImage, // A string url of the token logo
        },
      },
    });
  }

  checkNetwork() {
    this.networkKey = window.ethereum.networkVersion;
    console.log(window.ethereum.networkVersion);

    return this.networkKey;
  }

  //**********MAKE PAYMENT WITH PARTICULAR TOKEN************//

  //  getDataFieldValue(tokenRecipientAddress:any, tokenAmount:any) {
  //   const web3 = new Web3();
  //   const TRANSFER_FUNCTION_ABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"};
  //   return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
  //       tokenRecipientAddress,
  //       tokenAmount
  //   ]);
  // }

  // async sendpayment3() {
  //   let  params = [{
  // to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  // from: this.account, // must match user's active address.
  // data: this.getDataFieldValue(0x765de816845861e75a25fca122bb6898b8b1282a, Number(this.money).toString(16),),
  // value: Number(this.money).toString(16), // Only required to send ether to the recipient from the initiating external account.
  //   }]
  //   this.result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err:any)=> {
  //     console.log(err);
  //   })
  //}

  // abi:any =  {"status":"1","message":"OK-Missing/Invalid API Key, rate limit of 1/5sec applied","result":"[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_proxyTo\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"_new\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"_old\",\"type\":\"address\"}],\"name\":\"ProxyOwnerUpdate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_new\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_old\",\"type\":\"address\"}],\"name\":\"ProxyUpdated\",\"type\":\"event\"},{\"stateMutability\":\"payable\",\"type\":\"fallback\"},{\"inputs\":[],\"name\":\"implementation\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proxyOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proxyType\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"proxyTypeId\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferProxyOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_newProxyTo\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"updateAndCall\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_newProxyTo\",\"type\":\"address\"}],\"name\":\"updateImplementation\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}]"};
  // address:any = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";

  //  usdtContract = new this.web3.eth.Contract(this.abi, this.address);

  //  async sendpayment3() {
  //   let  params = [{
  // to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
  // from: this.account, // must match user's active address.
  //   data: this.usdtContract.methods
  //         .transfer("0x0000000000000000000000000000000000000000", "0.0001")
  //         .encodeABI(),
  //   }]
  //   this.result = window.ethereum.request({method: "eth_sendTransaction", params}).catch((err:any)=> {
  //     console.log(err);
  //   })
  // }

  async changeasset() {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
          symbol: 'USDT',
          decimals: 6,
        },
      },
    });
  }
}
