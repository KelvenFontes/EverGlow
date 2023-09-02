'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import TopGenres from "./components/TopGenres";
import BrowseAll from "./components/BrowseAll";
import { useEffect, useState } from "react";

const Search = () => {

  const [search, setSearch] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState("");

  const access_token = localStorage.getItem('access_token');

  if (search != '') {
    getSearch()
  }

  async function getSearch() {

    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      },
    };

    if (selectedCategory) {
      console.log(selectedCategory);

      const result = await fetch(`https://api.spotify.com/v1/search?q=${search}remaster&type=${selectedCategory}`, params);
      const data = await result.json();

      console.log(data);

      if (data.categories) {
        setSearch(data.categories.items);
      }
    } else {
      console.log('selecione uma categoria')
    }

  }

  useEffect(() => {
    // if (access_token) {
    //   console.log('Access Token:', access_token);
    //   getSearch(access_token);
    // } else {
    //   console.log('Access Token não encontrado no localStorage.');
    // }

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header search={search} setSearch={setSearch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} getSearch={getSearch}/>
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
