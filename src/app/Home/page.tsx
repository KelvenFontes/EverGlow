import Footer from "@/components/Footer";
import ContinueListening from "./components/ContinueListening";
import Header from "./components/Header";
import TopMixes from "./components/TopMixes";

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-dark">
      <div className="h-32 bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="flex-1 mt-[-32px]">
        <ContinueListening />
        <TopMixes />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
