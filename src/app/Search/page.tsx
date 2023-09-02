'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import TopGenres from "./components/TopGenres";
import BrowseAll from "./components/BrowseAll";
import { useEffect, useState } from "react";

const Search = () => {

  const [search, setSearch] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const access_token = localStorage.getItem('access_token');

  async function getSearch() {

    if (selectedCategory === '') {
      setShowModal(true);
      return;
    }

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

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header search={search} setSearch={setSearch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} getSearch={getSearch} />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Selecione uma categoria</h3>
            <p className="mb-4">Por favor, selecione uma categoria para fazer a pesquisa.</p>
            <button
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors duration-300"
              onClick={() => setShowModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 pb-24">
        <TopGenres />
        <BrowseAll />
      </div>

      <Footer />
    </div>
  );
}

export default Search;
