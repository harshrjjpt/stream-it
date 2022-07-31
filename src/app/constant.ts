export class Constants {
  public static GENERAL = {
    GA_TRACKING_ID: 'UA-197948260-1',
  };

  public static LABELS = {
    signupForm: {
      loaderON: 'ON',
      loaderOFF: 'OFF',
      MetaWrongNetwork:
        'Please make sure your wallet is on the Ethereum Mainnet',
      connectingStatus: 'connecting...',
      changingNetworkStatus: 'Changing the network...',
      signatureStatus: 'signing...',
      deniedConnection:
        'Ooops..There was a problem and we were unable to connect your wallet. Please try again',
      signatureDenied:
        'signature denied by the user... try again to request the signature',
      changeNetworkMethod: 'wallet_switchEthereumChain',
      accountRequestMethod: 'eth_requestAccounts',
      signatureMessage1:
        'StreamIt wants you to sign in with your Ethereum account: \n\n',
      signatureMessage2:
        '\n\n\nBy signing this transaction you are allowing StreamIt to see the following: your wallet address. \n\nURI: https://dapplooker.com \nVersion: 1 \nChain ID: 1 \nIssued At:',
      noMetamaskFound:
        'Seems like your metamask wallet is disabled or not installed...',
      metamaskLogin: 'Login with metamask',
      ethereumChainID: '0x1',
      undefined: 'undefined',
    },
  };
}
