import Button from "@/components/Button";
import Image from "next/image";

import { FaMusic, FaPodcast, FaCompactDisc, FaMicrophone, FaList, FaArtstation, FaSearch, FaPlay, FaTv, FaHeadphones, FaBook } from "react-icons/fa";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  getSearch: () => void;
}

const Header = ({ search, setSearch, selectedCategory, setSelectedCategory, getSearch }: HeaderProps) => {

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    getSearch();
  };

  return (
    <div className="pt-8 items-center">
      <div className="col-span-2">
        <div className="flex flex-row items-center gap-6 pl-5">
          <Image src='/icon.png' alt="image" height={40} width={40} className="rounded-full" />
          <div>
            <h2 className="text-primary font-semibold text-2xl tracking-widest">Search</h2>

          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-6 gap-3">
        <input type="text" className="h-10 w-[75%] rounded-2xl pl-4" placeholder="Songs, Artists, Podcasts & More" value={search} onChange={handleSearchChange} />
        <Button onClick={handleSearch}><FaSearch /></Button>
      </div>

      <div className="relative flex items-center pt-4 px-5 lg:justify-center ">
        <div className="w-full overflow-x-scroll scrollbar-hide whitespace-no-wrap">
          <div className="flex space-x-6">
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "album" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("album")}
            >
              <FaCompactDisc size={20} />
              <span className="text-xs">Album</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "artist" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("artist")}
            >
              <FaMicrophone size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>Artist</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "playlist" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("playlist")}
            >
              <FaList size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>Playlist</span>
            </div>

            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "track" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("track")}
            >
              <FaPlay size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>Track</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "show" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("show")}
            >
              <FaTv size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>Show</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "episode" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("episode")}
            >
              <FaHeadphones size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>Episode</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 cursor-pointer mx-2 ${selectedCategory === "audioBook" ? "text-primary" : "text-white"
                }`}
              onClick={() => handleCategorySelect("audioBook")}
            >
              <FaBook size={20} onClick={handleSearch} />
              <span className="text-xs" onClick={handleSearch}>AudioBook</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;
