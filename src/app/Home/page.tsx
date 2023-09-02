import Footer from "@/components/Footer";
import ContinueListening from "./components/ContinueListening";
import Header from "@/components/Header";
import TopMixes from "./components/TopMixes";
import Recommendation from "./components/Recommendation";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="flex-1 pb-24">
        <ContinueListening />
        <TopMixes />
        <Recommendation />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
