import Button from "@/components/Button";
import Image from "next/image";
// import { SetStateAction, useState } from "react";

import { FaMusic, FaPodcast, FaArtstation, FaSearch } from "react-icons/fa";

interface HeaderProps {
  search: string | undefined;
  setSearch: (value: string) => void;
  selectedCategory: string | undefined;
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

      <div className="flex items-center justify-center pt-4">
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "album" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("album")}
        >
          <FaMusic size={24} />
          <span className="text-xs">Album</span>
        </div>
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "artist" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("artist")}
        >
          <FaPodcast size={24} />
          <span className="text-xs">Artist</span>
        </div>
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "playlist" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("playlist")}
        >
          <FaArtstation size={24} />
          <span className="text-xs">Playlist</span>
        </div>

        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "track" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("track")}
        >
          <FaArtstation size={24} />
          <span className="text-xs">Track</span>
        </div>
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "show" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("show")}
        >
          <FaArtstation size={24} />
          <span className="text-xs">Show</span>
        </div>
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "episode" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("episode")}
        >
          <FaArtstation size={24} />
          <span className="text-xs">Episode</span>
        </div>
        <div
          className={`cursor-pointer mx-2 ${selectedCategory === "audioBook" ? "text-primary" : "text-white"
            }`}
          onClick={() => handleCategorySelect("audioBook")}
        >
          <FaArtstation size={24} />
          <span className="text-xs">AudioBook</span>
        </div>

      </div>


    </div>
  );
}

export default Header;
