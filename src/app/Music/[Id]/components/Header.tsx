import Footer from "@/components/Footer";
import Image from 'next/image';
// import Header from "./components/Header";
// import TopGenres from "./components/TopGenres";
// import BrowseAll from "./components/BrowseAll";

const Header = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        {/* <Header /> */}
        <p>Playing from playlist</p>
        <p>Lafti Lafti</p>
      </div>

      <div className="relative h-20 w-[100%]">
        <Image src="/Music/Rectangle 19.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
        <p className="text-black text-xl font-bold absolute top-3 left-6 right-0 bottom-0 flex">Pop Mix</p>
      </div>

      <div className="flex-1 pb-24">
        {/* <TopGenres />
        <BrowseAll /> */}
      </div>

      <Footer />
    </div>
  );
}

export default Header;
