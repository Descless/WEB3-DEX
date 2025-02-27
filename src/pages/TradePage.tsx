import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const TradePage = () => {
    return (
        <main className="bg-neutral-700 flex flex-grow flex-col min-h-screen">
        <Navbar/>
        
            
        <div className=" text-center text-white mb-16 mt-16 h-screen">
            <h1 className="font-bold text-3xl">Trade</h1>

        </div>
        <Footer/>
        </main>
    );
};

export default TradePage;
