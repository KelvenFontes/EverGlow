'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import TopGenres from "./components/TopGenres";
import BrowseAll from "./components/BrowseAll";
import { useEffect, useState } from "react";
// import SearchResults from "./components/SearchResultsArtist";
import Image from "next/image";
import SearchResultsArtist from "./components/SearchResultsArtist";
import SearchResults from "./components/SearchResults";
import FooterMusic from "@/components/FooterMusic";
import Link from "next/link";

const Search = () => {

  const [access_token, setToken] = useState<string | null>('');
  const [albums, setAlbums] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState({
    albums: [],
    artists: [],
    playlists: [],
    tracks: [],
    shows: [],
    episodes: [],
    audioBooks: []
  });

  useEffect(() => {

    const token = localStorage.getItem('access_token');
    setToken(token);
    getAlbums(token!);

  }, [])



  async function getAlbums(token: string) {

    const apiUrl = `https://api.spotify.com/v1/browse/categories`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter recomendações do Spotify.');
      }

      const data = await response.json();
      setAlbums(data);
      console.log(data)
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  async function getSearch() {

    console.log(search);

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

    console.log(`search?q=${search}`)

    const result = await fetch(`https://api.spotify.com/v1/search?q=${search}remaster&type=${selectedCategory}`, params);
    const data = await result.json();
    console.log(data);
    console.log(result);

    if (data.albums) {
      setSearchResults((prevState) => ({
        ...prevState,
        albums: data.albums.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        albums: [],
      }));
    }

    if (data.artists) {
      setSearchResults((prevState) => ({
        ...prevState,
        artists: data.artists.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        artists: [],
      }));
    }

    if (data.playlists) {
      setSearchResults((prevState) => ({
        ...prevState,
        playlists: data.playlists.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        playlists: [],
      }));
    }

    if (data.tracks) {
      setSearchResults((prevState) => ({
        ...prevState,
        tracks: data.tracks.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        tracks: [],
      }));
    }

    if (data.shows) {
      setSearchResults((prevState) => ({
        ...prevState,
        shows: data.shows.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        shows: [],
      }));
    }

    if (data.episodes) {
      setSearchResults((prevState) => ({
        ...prevState,
        episodes: data.episodes.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        episodes: [],
      }));
    }

    if (data.audioBooks) {
      setSearchResults((prevState) => ({
        ...prevState,
        audioBooks: data.audioBooks.items,
      }));
      console.log(data)
    } else {
      setSearchResults((prevState) => ({
        ...prevState,
        audioBooks: [],
      }));
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

      <div className="flex-1 pb-24 px-5">
        {searchResults.albums.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.albums.map((album: SpotifyCategoryItem) => (
              <div key={album.id} className="shadow-lg rounded-lg overflow-hidden">
                <Link href={`/Music/artist/albums/${album.id}`}>
                  <SearchResults result={album} />
                </Link>
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.artists.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.artists.map((artist: SpotifyCategoryItem) => (
              <div key={artist.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResultsArtist result={artist} />
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.playlists.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.playlists.map((playlist: SpotifyCategoryItem) => (
              <div key={playlist.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResults result={playlist} />
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.tracks.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.tracks.map((track: SpotifyCategoryItem) => (
              <div key={track.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResults result={track} />
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.shows.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.shows.map((show: SpotifyCategoryItem) => (
              <div key={show?.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResults result={show} />
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.episodes.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.episodes.map((episode: SpotifyCategoryItem) => (
              <div key={episode.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResults result={episode} />
              </div>
            ))}
          </div>
        ) : null}

        {searchResults.audioBooks.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {searchResults.audioBooks.map((audioBook: SpotifyCategoryItem) => (
              <div key={audioBook.id} className="shadow-lg rounded-lg overflow-hidden">
                <SearchResults result={audioBook} />
              </div>
            ))}
          </div>
        ) : null}

        {Object.values(searchResults).every(result => result.length === 0) && (
          <>
            {/* <TopGenres /> */}
            <BrowseAll />
          </>
        )}

      </div>

      <FooterMusic />
      <Footer activePage={"explore"} />
    </div>
  );
}

export default Search;
