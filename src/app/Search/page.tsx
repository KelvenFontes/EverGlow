import Footer from "@/components/Footer";
import Header from "./components/Header";
import TopGenres from "./components/TopGenres";
import BrowseAll from "./components/BrowseAll";

const Search = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="flex-1 pb-24">
        <TopGenres />
        <BrowseAll />
      </div>

      <Footer />
    </div>
  );
}

export default Search;
