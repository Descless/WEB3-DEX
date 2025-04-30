import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const PreviousTradesPage = () => {
    return (
        <main className="bg-neutral-800 flex flex-grow flex-col min-h-screen">
        <Navbar/>
        
            
        <div className=" text-center text-white mb-16 mt-16 h-screen">
            <h1 className="font-bold text-3xl">Previous Trades</h1>

        </div>
        <Footer/>
        </main>
    );
};

export default PreviousTradesPage;
