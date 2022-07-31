import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Constants } from 'src/app/constant';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  labels: any = Constants.LABELS.signupForm;

  check: boolean = false;
  account: any = null;
  accountMain: any = null;
  networkKey: any;
  loader: string = this.labels.loaderOFF;

  metamaskError: string = '';
  isMetamaskError: boolean = false;
  metamaskButtonMessage: string = '';
  err: any;

  ///***********HANDLE LOADER*************////

  handleLoader(check: boolean) {
    if (check === true) {
      this.loader = this.labels.loaderON;
    } else {
      this.loader = this.labels.loaderOFF;
    }
  }

  ///***********HANDLE METAMASK BUTTON MESSAGE*************////

  handleMetaButtonMessage(message: string) {
    this.metamaskButtonMessage = message;
  }

  ///***********HANDLE METAMASK ERROR*************////

  handleMetamaskError(check: boolean, message: string) {
    this.isMetamaskError = check;
    this.metamaskError = message;
  }

  ///***********CHANGING NETWORK LOGIC*************////

  async changeNetwork() {
    try {
      if (!window.ethereum) {
        return;
      }
      await window.ethereum.request({
        method: this.labels.changeNetworkMethod,
        params: [
          {
            chainId: this.labels.ethereumChainID,
          },
        ],
      });
    } catch (err: any) {
      this.handleLoader(false);
      this.handleMetamaskError(true, this.labels.MetaWrongNetwork);
      return err.code;
    }
  }

  ///***********CHECK NETWORK*************////

  checkNetwork() {
    if (window.ethereum !== this.labels.undefined) {
      this.networkKey = window.ethereum.networkVersion;
      return this.networkKey;
    }
  }

  ///***********LOGIN LOGIC*************////

  async loginWithMetamask() {
    this.handleMetaButtonMessage(this.labels.connectingStatus);
    this.err;
    this.handleMetamaskError(false, '');
    if (window.ethereum !== this.labels.undefined) {
      const accounts = await window.ethereum
        .request({ method: this.labels.accountRequestMethod })
        .catch((err: any) => {
          if (err.code === 4001) {
            this.handleLoader(false);
            this.handleMetamaskError(true, this.labels.deniedConnection);
            this.err = 4001;
            return this.err;
          }
        });
      this.account = accounts[0];
    }
  }

  provider: any;

  getProvider() {
    if (window.ethereum !== this.labels.undefined) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  ///***********SIGNATURE LOGIC*************////

  async signMessage() {
    await this.getProvider();
    const mydate = new Date().toLocaleString();
    const signer = this.provider.getSigner();
    const message =
      this.labels.signatureMessage1 +
      this.account +
      this.labels.signatureMessage2 +
      mydate;

    let signature = await signer.signMessage(message);
    let address = ethers.utils.verifyMessage(message, signature);
  }

  async mainLogin() {
    this.handleLoader(true);
    this.handleMetamaskError(false, '');
    this.handleMetaButtonMessage(this.labels.connectingStatus);

    if ((await this.checkNetwork()) !== 1) {
      this.handleMetaButtonMessage(this.labels.changingNetworkStatus);
      const networkStatus = await this.changeNetwork();
      if (networkStatus === 4001) {
        return;
      }
    }
    this.handleMetaButtonMessage(this.labels.connectingStatus);
    await this.loginWithMetamask();
    if (this.err === 4001) {
      return;
    }
    this.handleMetaButtonMessage(this.labels.signatureStatus);
    await this.signMessage().catch((err: any) => {
      this.handleMetamaskError(true, this.labels.signatureDenied);
      return;
    });
    this.accountMain = this.account;
    this.handleLoader(false);
  }
}
