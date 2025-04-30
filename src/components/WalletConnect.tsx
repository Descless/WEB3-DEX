// components/ConnectWallet.tsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskLogo from "../assets/img/MetaMask_Fox.svg"
import { NavLink } from "react-router-dom";

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoginClicked, setIsLoginClicked] = useState<boolean>(false);
  const [isWalletOpened, setIsWalletOpened] = useState<boolean>(false);
  const [isWalletClicked, setIsWalletClicked] = useState<boolean>(false);

  const logOut = () => {
    setAccount(null)
    setIsWalletClicked(!isWalletClicked);
};

const OpenCloseWallet = () => {
  setIsWalletOpened(!isWalletOpened);
  if (isWalletClicked) {
    setIsWalletClicked(false)
  }
};

  const connectWallet = async () => {
    const provider: any = await detectEthereumProvider();

    if (!provider) {
      alert("MetaMask yüklü değil!");
      return;
    }

    const ethersProvider = new ethers.BrowserProvider(provider);
    const accounts = await ethersProvider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);

    setIsLoginClicked(!isLoginClicked)
  };

  const getBalance = async (account: string) => {
    const provider: any = await detectEthereumProvider();
    const ethersProvider = new ethers.BrowserProvider(provider);

    const balance = await ethersProvider.getBalance(account);
    const ethBalance = ethers.formatEther(balance); // Wei → ETH
    setBalance(Number(ethBalance));
  };
  
  useEffect(() => {
    if (account) {
      getBalance(account);
    }
  }, [account]);

  return (
    <div className="mr-4">
      {account ? (
        <div className="flex items-end flex-col hover:cursor-pointer">
          <div onClick={() => setIsWalletClicked(!isWalletClicked)} className="hover:bg-neutral-700 rounded-2xl">
          <p className="text-white px-4 py-2 font-bold ">Wallet: {account.substring(0, 10)}...</p>
          </div>
          {isWalletClicked && (
          <div className="p-4 absolute mt-12 w-1/6 bg-neutral-900 border rounded-2xl border-neutral-500">
            <div onClick={() => OpenCloseWallet()} className="rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p flex flex-row">
              <h3 className="p-2 font-bold">Wallet</h3>
              </div>
            <div onClick={() => logOut()} className="rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p flex flex-row">
              <h3 className="p-2 font-bold">Log Out</h3>
              </div>
          </div>
        )}

          
        </div>
        
      ) : (
        <div className="flex items-end flex-col">
        <button onClick={() => setIsLoginClicked(!isLoginClicked)} className="justify-end px-4 py-2 rounded-2xl bg-neutral-700 hover:cursor-pointer hover:bg-neutral-600 text-white">
          Connect
        </button>
        {isLoginClicked && (
          <div className="p-4 absolute mt-12 w-1/5 bg-neutral-900 border rounded-2xl border-neutral-500">
           <h3 className="font-bold mb-4">Choose A Wallet</h3>
            <div onClick={connectWallet} className="bg-neutral-700 rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p-2 flex flex-row">
              <img src={MetaMaskLogo} alt="meta mask logo" className="w-8 h-8" />
              <h3 className="p-4 font-bold text-lg">Metamask</h3>
              </div>
          </div>
        )}
</div>
      )}

    {isWalletOpened ?
    //dashboard

    <div className="absolute flex w-full  mt-2.5">
    <div className="w-4/5"></div>
    <main className="p-2 mt-1 bg-neutral-900 border rounded-2xl border-neutral-500">

<div className=" text-white mt-4 mb-4 flex flex-row items-center">
  <div className="flex flex-col w-full">
        <h1 className="ml-4 mb-4 text-lg font-bold w-5/6">Adress: </h1>
        <div onClick={() => {navigator.clipboard.writeText(account != null ? account : "")}} className="flex flex-row">
        <h1 className="ml-4 cursor-pointer">{account}</h1>
        <svg viewBox="0 0 24 24" fill="#FFFFFF"xmlns="http://www.w3.org/2000/svg" className="ml-4 w-6 h-6 white cursor-pointer">
<path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#1C274C" stroke-width="1.5"/>
<path opacity="0.5" d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#1C274C" stroke-width="1.5"/>
</svg>
</div>
        </div>
<button onClick={() => OpenCloseWallet()}>
        <svg fill="#FFFFFF" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-4 mb-16 cursor-pointer">
<path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
</svg>
</button>
    </div>
        
    <div className=" text-white mb-4">
        <h1 className="ml-4 text-lg">{balance}$</h1>

    </div>

    <div className=" text-white mb-4">
        <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"#"}>
        <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Previous Trades</h1>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 hover:cursor-pointer mt-0.5"
          >
            <path d="M46,24A22,22,0,0,1,4.3,33.7a2,2,0,0,1,.5-2.6,2,2,0,0,1,3,.7A18,18,0,1,0,10.6,12h5.3A2.1,2.1,0,0,1,18,13.7,2,2,0,0,1,16,16H6a2,2,0,0,1-2-2V4.1A2.1,2.1,0,0,1,5.7,2,2,2,0,0,1,8,4V8.9A22,22,0,0,1,46,24Z"/>
            <path d="M34,32a1.7,1.7,0,0,1-1-.3L22,25.1V14a2,2,0,0,1,4,0v8.9l9,5.4a1.9,1.9,0,0,1,.7,2.7A1.9,1.9,0,0,1,34,32Z"/>
          </svg>
          </NavLink>
         </div>

         <div className=" text-white mb-4">
        <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"/"}>
        <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Buy Crypto</h1>
          </NavLink>
         </div>
         <div className=" text-white mb-4">
        {/* <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"/"}>
        <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Trade Crypto</h1>
          </NavLink> */}
         </div>
    </main>
    </div>

    : null
  } 

    </div>
  );
};

export default ConnectWallet;
