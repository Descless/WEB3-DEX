import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EthLogo from "../assets/img/Ethereum-logo.png"
import SolLogo from "../assets/img/Solana_logo.png"
import React, { useEffect, useState } from "react";

interface Coin {
id: string,
label: string,
logo: string,
value: number
}

interface CoinRates {
    [key: string]: {
      usd: number;
    };
  }

const HomePage: React.FC = () => {
const [inputCoinValue, setInputCoinValue] = useState<number>(0);
const [isBuyCoinOpen, setIsBuyCoinOpen] = useState<boolean>(false);
const [isSellCoinOpen, setIsSellCoinOpen] = useState<boolean>(false);
const [coinRates, setCoinRates] = useState<CoinRates>({});

const coins = [
    { id: "ethereum", label: "ETH",  logo: EthLogo , value: 1797.36},
    { id: "solana", label: "SOL", logo: SolLogo , value: 151.85},
];

{/* Set Default Coin Value as Ethereum*/}
const defaultCoin = coins.find((coin) => coin.label === "ETH") || null;

const [selectedBuyCoinType, setSelectedBuyCoinType] = useState<Coin | null>(defaultCoin);
const [selectedSellCoinType, setSelectedSellCoinType] = useState<Coin | null>(defaultCoin);



{/* Get Coin Rates */}
const fetchRates = async () => {
    const ids = coins.map((c) => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setCoinRates(data);
    } catch (err) {
      console.error("Rate çekme hatası:", err);
    }
  };

  {/* Update Coin Rates */}
  useEffect(() => {
    fetchRates();
    console.log("coin güncellendi")
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);


const onInputCoinChange = (coin: any) => {
    setInputCoinValue(parseInt(coin))
}

const onSellCoinTypeChange = (coin: any) => {
    setSelectedSellCoinType(coin)
}

const onBuyCoinTypeChange = (coin: any) => {
    setSelectedBuyCoinType(coin)
}

    return (
        <main className="bg-neutral-700 flex flex-grow flex-col min-h-screen">
        <Navbar/>
        
        {/* Header Text */}
        <div className=" w-full flex text-center flex-col text-white mb-16 mt-16 h-screen items-center">
            <h1 className="font-bold text-3xl">Hoş geldiniz, hemen hızlıca swap yapın!</h1>

        <div className="w-1/3 flex flex-col mt-16 rounded-2xl bg-neutral-900 p-2">


        {/* Input Coin */}
        <div className="border border-neutral-500 flex flex-row text-start p-2 rounded-2xl bg-neutral-800 mt-1 items-center">
        
        {/* Coin Input Value*/}
        <div className="flex flex-col pl-2 gap-y-2 md:w-2/3"> 
            <h1 className="text-neutral-300 ">Satılan</h1>

            {/* Coin Value*/}
            <input className="text-neutral-300 text-2xl cursor-text md:text-base lg:text-2xl" type="number" placeholder="0" onChange={(e) => onInputCoinChange(e.target.value)}/>
            
            {/* Coin Dollars Value */}
            <h1 className="text-neutral-300 md:text-sm lg:text-base">{inputCoinValue ? String(inputCoinValue * (selectedBuyCoinType ? coinRates[selectedBuyCoinType?.id || "ethereum"]?.usd : 1) ) : 0}  $</h1>
            </div>

            {/* Coin Type Part */}
            <div className="h-16 justify-end flex items-center cursor-pointer w-1/3" onClick={() => setIsBuyCoinOpen(!isBuyCoinOpen)}>
            <div className="flow-col">

            {/* Selected Coin Type*/}
           <div className="flex flex-row items-center">
            <img src={selectedBuyCoinType?.logo || "CoinLogo"} alt="" className="w-6 h-8 mr-2" />
            <h1>{selectedBuyCoinType?.label || "CoinName"}</h1>

            <svg className="h-8 w-8 mt-1" viewBox="0 0 24 24" stroke="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.5C11.9015 14.5005 11.8038 14.4813 11.7128 14.4435C11.6218 14.4057 11.5392 14.3501 11.47 14.28L8 10.78C7.90861 10.6391 7.86719 10.4715 7.88238 10.3042C7.89756 10.1369 7.96848 9.97954 8.08376 9.85735C8.19904 9.73515 8.352 9.65519 8.51814 9.63029C8.68428 9.6054 8.85396 9.63699 9 9.72003L12 12.72L15 9.72003C15.146 9.63699 15.3157 9.6054 15.4819 9.63029C15.648 9.65519 15.801 9.73515 15.9162 9.85735C16.0315 9.97954 16.1024 10.1369 16.1176 10.3042C16.1328 10.4715 16.0914 10.6391 16 10.78L12.5 14.28C12.3675 14.4144 12.1886 14.4931 12 14.5Z" fill="#000000"/>
            </svg>
           </div>

                {/* Coin Type Select Module*/}
                {(isBuyCoinOpen) && (
                <div className=" bg-neutral-700/70 absolute rounded-2xl pb-2">
                    {coins.map((coin) => (
                        <div key={coin.id} className="flex flex-row mt-3 w-full px-4 hover:bg-neutral-600 rounded-lg" onClick={() => onBuyCoinTypeChange(coin)}>
                        <img src={coin.logo} alt="" className="w-6 h-8 mr-2" />
                        <h1 className="">{coin.label}</h1>
                        </div>
                    ))}

                </div>
            )}
            </div>
            

    </div>
</div>


        {/* Output Coin */}
        <div className="border border-neutral-500 flex flex-row text-start p-2 rounded-2xl bg-neutral-800 mt-1 items-center">

            {/* Coin Output Value */}
            <div className="flex flex-col pl-2 gap-y-2 w-full mb-4 md:w-2/3 m">
            <h1 className="text-neutral-300">Alınan</h1>
            <h1 className="text-neutral-300 cursor-text md:text-base lg:text-2xl">{inputCoinValue ? String(inputCoinValue * ((selectedBuyCoinType && selectedSellCoinType && selectedSellCoinType.id !== selectedBuyCoinType?.id)
            ? (coinRates[selectedBuyCoinType?.id || ""]?.usd ?? 1) /
              (coinRates[selectedSellCoinType?.id || ""]?.usd ?? 1)
            : 1)) : 0}</h1> 
            </div>


            {/* Coin Type Part */}
            <div className="h-16 justify-end flex items-center cursor-pointer w-1/3" onClick={() => setIsSellCoinOpen(!isSellCoinOpen)}>
           <div className="flow-col">

            {/* Selected Coin Type*/}
           <div className="flex flex-row items-center">
            <img src={selectedSellCoinType?.logo || "CoinLogo"} alt="" className="w-6 h-8 mr-2" />
            <h1>{selectedSellCoinType?.label || "CoinName"}</h1>
            <svg className="h-8 w-8 mt-1" viewBox="0 0 24 24" stroke="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.5C11.9015 14.5005 11.8038 14.4813 11.7128 14.4435C11.6218 14.4057 11.5392 14.3501 11.47 14.28L8 10.78C7.90861 10.6391 7.86719 10.4715 7.88238 10.3042C7.89756 10.1369 7.96848 9.97954 8.08376 9.85735C8.19904 9.73515 8.352 9.65519 8.51814 9.63029C8.68428 9.6054 8.85396 9.63699 9 9.72003L12 12.72L15 9.72003C15.146 9.63699 15.3157 9.6054 15.4819 9.63029C15.648 9.65519 15.801 9.73515 15.9162 9.85735C16.0315 9.97954 16.1024 10.1369 16.1176 10.3042C16.1328 10.4715 16.0914 10.6391 16 10.78L12.5 14.28C12.3675 14.4144 12.1886 14.4931 12 14.5Z" fill="#000000"/>
            </svg>
           </div>

                {/* Coin Type Select Module*/}
                {(isSellCoinOpen) && (
                <div className=" bg-neutral-700/70 absolute rounded-2xl pb-2">
                    
                    {coins.map((coin) => (
                        <div className="flex flex-row mt-3 w-full px-4 hover:bg-neutral-600 rounded-lg" onClick={() => onSellCoinTypeChange(coin)}>
                        <img src={coin.logo} alt="" className="w-6 h-8 mr-2" />
                        <h1 className="">{coin.label}</h1>
                        </div>
                    ))}
                    
                </div>
            )}
        </div>


    </div>
</div>

        {/* Trade Button*/}
        <div className=" flex flex-col text-start bg-neutral-800 mt-2 ">
            <button className="cursor-pointer rounded-2xl bg-neutral-600 p-3 text-neutral-200">Takas Et</button>
        </div>

        </div>
        </div>
        <Footer/>
        </main>
    );
};

export default HomePage;
