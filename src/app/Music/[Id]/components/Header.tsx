import Footer from "@/components/Footer";
import Image from 'next/image';
// import Header from "./components/Header";
// import TopGenres from "./components/TopGenres";
// import BrowseAll from "./components/BrowseAll";

const Header = () => {
  return (
    <div className="flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        {/* <Header /> */}
        <p>Playing from playlist</p>
        <p>Lafti Lafti</p>
      </div>



      <div className="flex-1 pb-24">
        {/* <TopGenres />
        <BrowseAll /> */}
      </div>

      <Footer activePage={"library"} />
    </div>
  );
}

export default Header;
