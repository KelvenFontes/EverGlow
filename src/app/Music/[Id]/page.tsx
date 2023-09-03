'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { access } from "fs";


const MusicById = ({ params }: { params: { Id: string } }) => {

  const [token, setToken] = useState<string>('');
  // const [artist, setArtist] = useState<SpotifyArtist[]>([]);
  // const [artistData, setArtistData] = useState<SpotifyArtist[] | any>([]);
  const musicId = params.Id;
  // console.log(musicId);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setToken(autenticator_token!);
      getMusic(autenticator_token!, musicId);
      console.log(autenticator_token);
    } else {
      setTimeout(() => {
        getMusic(token, musicId);
      }, 5000)
    }

    // getArtist(token, musicId);

  }, [musicId, token]);

  async function getMusic(token: string, musicId: string) {
    const params = {
      // method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',

        // "uris": ["spotify:track:7r8yMaSOy4XmuhRz7iv1gi"],
        // "offset": { "position": 5 },
        // "position_ms": 0
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, params);
    const data = await result.json();

    console.log(result);

    // setArtist(data.tracks);
    console.log(data);

  }

  async function getArtist(token: string, artistId: string) {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, params);
    const data = await result.json();
    console.log(data);

    // setArtistData(data);

  }




  // async function getAlbum() {

  //   const paramsAlbum = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + teste
  //     },
  //   };

  //   const result = await fetch(`https://api.spotify.com/v1/search?q=gustavo&type=artist`, paramsAlbum);
  //   console.log(result);
  // }

  // useEffect(() => {
  //   getAccessToken(CLIENT_ID, paramsBody)

  //   getAlbum();

  //   // async function tesete() {
  //   //   const profile = await fetchProfile(await tokenAcess);
  //   //   console.log(profile);
  //   // }
  //   // tesete();

  // }, [])

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* <p className="text-white">teste</p> */}
        <Image src="/Music/Rectangle 19.png" alt="logo" height={252} width={263} className="mt-20" />

        <h3>Grainly days</h3>
        <p>moody</p>

        {/*lista*/}
        <div></div>
        {/*lista*/}


        {/*player*/}
        <div></div>
        {/*player*/}


      </div>

    </div>

  );
}

export default MusicById;
