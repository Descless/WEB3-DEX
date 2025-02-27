import { useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    const [userBalance, setUserBalance] = useState<number>(0.0);
    const [userAdress, setUserAdress] = useState<string | null>(null);

    return (
        <div className="w-screen h-screen absolute items-start flex border-4">
        <main className="p-4 absolute w-1/5 mt-12 bg-neutral-800 border rounded-2xl border-neutral-500">

<div className=" text-white mt-4 mb-4 flex flex-row items-center">
            <h1 className="ml-4 text-lg font-bold w-5/6">Adress: {userAdress}</h1>

<button onClick={}>
            <svg fill="#FFFFFF" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
</svg>
</button>
        </div>
            
        <div className=" text-white mb-4">
            <h1 className="ml-4 text-2xl font-bold">{userBalance}$</h1>

        </div>

        <div className=" text-white mb-4">
            <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"/previous-trades"}>
            <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Recent Transactions</h1>
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
            <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"/swap"}>
            <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Buy Crypto</h1>
              </NavLink>
             </div>
             <div className=" text-white mb-4">
            <NavLink className="flex flex-row gap-2 items-center w-5/6" to={"/trade"}>
            <h1 className="hover:cursor-pointer ml-4 text-lg font-bold">Trade Crypto</h1>
              </NavLink>
             </div>
        </main>
        </div>
    );
};

export default Dashboard;
