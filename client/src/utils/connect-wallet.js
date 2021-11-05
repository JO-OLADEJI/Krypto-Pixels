// wallet connection
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const obj = {
        address: addressArray[0],
        status: 'connected'
      };
      return obj;
    }
    catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      };
    }
  }
  else {
    return {
      address: '',
      status: 'void'
    };
  }
};



// wallet info - incase of page refresh
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts'
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: 'connected'
        };
      }
      else {
        return {
          address: '',
          status: 'not-connected'
        };
      }
    }
    catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      };
    }
  }
  else {
    return {
      address: '',
      status: 'void'
    };
  }
};