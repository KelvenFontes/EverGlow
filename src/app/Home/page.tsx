import Footer from "@/components/Footer";
import ContinueListening from "./components/ContinueListening";
import Header from "./components/Header";
import TopMixes from "./components/TopMixes";

const Home = () => {
  return (
    <div className="bg-dark h-screen">
      <Header />
      <ContinueListening />
      <TopMixes />
      <Footer />
    </div>
  );
}

export default Home;
