'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import CardCategoryName from "./components/CardCategoryName";
import CardPlaylist from "./components/CardPlaylist";
import Link from "next/link";
import FooterMusic from "@/components/FooterMusic";

const Library = () => {

  const [categories, setCategories] = useState<SpotifyCategoryItem[]>([]);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [token, setToken] = useState<string>('');



  async function getCategory(token: string) {

    const params = {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/browse/categories`, params);
    const data = await result.json();

    console.log(data);

    if (data.categories) {
      setCategories(data.categories.items);
    }

  }

  async function getPlaylist(token:string) {

    const parame = {
      // method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    const result = await fetch("https://api.spotify.com/v1/me/playlists", parame);
    console.log(result);
    const data = await result.json();
    console.log(data);
    setPlaylists(data.items);
    // setGenres(data.categories.items);
    // console.log(data.categories.items);
  }


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    setToken(access_token!);
    if (access_token) {
      console.log('Access Token:', access_token);
      getCategory(access_token);
      getMusics(access_token)
      getPlaylist(access_token);
    } else {
      console.log('Access Token não encontrado no localStorage.');
    }

  }, []);


  async function getMusics(token: string) {

    const parame = {
      // method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/me`, parame);
    console.log(result);
    const data = await result.json();
    console.log(data);
    // setMusicsByPlaylist(data.tracks.items);
    // setGenres(data.categories.items);
    // console.log(data.categories.items);
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="relative flex items-center pt-8 px-5 lg:justify-center">
        <div className="w-full overflow-x-scroll scrollbar-hide whitespace-no-wrap">
          <div className="flex space-x-4">
            {categories.map((category: SpotifyCategoryItem, i: number) => (
              <div key={category.id}>
                <CardCategoryName category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-8 pb-6">
        <h3 className="text-primary font-semibold text-lg tracking-widest">Recently played</h3>
      </div>

      {playlists.map((playlist) => (

        <div key={playlist.id} className="px-5">
          <Link href={`/Music/playlist/${playlist.id!}`}>
            <CardPlaylist playlist={playlist} />
          </Link>
        </div>
      ))}

      <FooterMusic />
      <Footer activePage={"library"} />
    </div>
  );
}

export default Library;
