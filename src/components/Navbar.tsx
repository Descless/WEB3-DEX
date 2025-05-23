import { NavLink } from "react-router-dom";
import ConnectWallet from "./WalletConnect";
import LogoLight from "../assets/img/DEXLogoLight.png"
// bg-neutral-800 text-white relative
const Navbar = () => {
    //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div className="bg-neutral-900 text-white relative">
            
            <main className="flex items-center flex-row gap-4 ">
            <img src={LogoLight} alt="Logo" className="h-32 w-32 absolute" />
            <div className="h-16 w-32"></div>
            <NavLink className="w-1/12 z-10" to={"/"}><h5 className=" p-4 text-center font-bold">Swap</h5></NavLink>
            {/* <NavLink className="w-1/12 z-10" to={"/follow"}><h5 className="text-center font-bold ">Follow</h5></NavLink> */}
            {/* <NavLink className="w-1/6 z-10" to={"/previous-trades"}><h5 className="font-bold">Previous Trades</h5></NavLink>  */}
            <div className="w-full absolute"><ConnectWallet/></div>
            </main>
        </div>
    );
};

export default Navbar;