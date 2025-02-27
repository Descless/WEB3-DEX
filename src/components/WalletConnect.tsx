// components/ConnectWallet.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskLogo from "../assets/img/MetaMask_Fox.svg"
import Dashboard from "../pages/Dashboard";

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isLoginClicked, setIsLoginClicked] = useState<boolean>(false);
  const [isWalletOpened, setIsWalletOpened] = useState<boolean>(false);
  const [isWalletClicked, setIsWalletClicked] = useState<boolean>(false);

  const logOut = () => {
    setAccount(null)
    setIsWalletClicked(!isWalletClicked);
};

const OpenWallet = () => {
  setIsWalletOpened(!isWalletOpened);
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
  

  return (
    <div className="">
      {account ? (
        <div className="flex items-end flex-col hover:cursor-pointer">
          <div onClick={() => setIsWalletClicked(!isWalletClicked)} className="hover:bg-neutral-700 rounded-2xl">
          <p className="text-white px-4 py-2 font-bold ">Cüzdan: {account.substring(0, 10)}...</p>
          </div>
          {isWalletClicked && (
          <div className="p-4 absolute mt-12 w-1/6 bg-neutral-800 border rounded-2xl border-neutral-500">
            <div onClick={() => OpenWallet()} className="rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p flex flex-row">
              <h3 className="p-2 font-bold">Cüzdan</h3>
              </div>
            <div onClick={() => logOut()} className="rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p flex flex-row">
              <h3 className="p-2 font-bold">Çıkış Yap</h3>
              </div>
          </div>
        )}

          
        </div>
        
      ) : (
        <div className="flex items-end flex-col">
        <button onClick={() => setIsLoginClicked(!isLoginClicked)} className="justify-end px-4 py-2 rounded-4xl bg-gray-300 text-black">
          Bağlan
        </button>
        {isLoginClicked && (
          <div className="p-4 absolute mt-12 w-1/5 bg-neutral-800 border rounded-2xl border-neutral-500">
           <h3 className="font-bold mb-4">Bir Cüzdan Seç</h3>
            <div onClick={connectWallet} className="bg-neutral-700 rounded-2xl hover:cursor-pointer hover:bg-neutral-600 items-center p-2 flex flex-row">
              <img src={MetaMaskLogo} alt="meta mask logo" className="w-8 h-8" />
              <h3 className="p-4 font-bold text-lg">Metamask</h3>
              </div>
          </div>
        )}
</div>
      )}

    {isWalletOpened ?
    <Dashboard/>
    : null
  }

    </div>
  );
};

export default ConnectWallet;
