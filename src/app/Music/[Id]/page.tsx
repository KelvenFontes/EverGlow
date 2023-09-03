'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';

const MusicById = ({ params }: { params: { Id: string } }) => {

  const [token, setToken] = useState<string>('');
  const [device, setDevice] = useState([]);
  const musicId = params.Id;

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setToken(autenticator_token!);
      playMusic(autenticator_token!, musicId);
      getDevice(autenticator_token!);
      playMusicA(autenticator_token!);
      console.log(autenticator_token);
    } else {
      setTimeout(() => {
        playMusic(token, musicId);
        getDevice(token);
      }, 5000)
    }

    // getArtist(token, musicId);

  }, [musicId, token]);

  async function getDevice(token: String) {
    console.log('entrou no device')
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/me/player/devices`, params);
    const data = await result.json();

    console.log(result);

    // setArtist(data.tracks);
    console.log(data);
    setDevice(data.device);
    console.log(device);

  }


  async function playMusic(token: string, musicId: string) {
    const params = {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uris": [`spotify:track:${musicId}`],
        "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c"
      })
    };
    const result = await fetch(`https://api.spotify.com/v1/me/player/play`, params);

  }

  async function playMusicA(token: string) {
    const params = {
      // method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //   "uris": [`spotify:track:${musicId}`],
      //   "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c"
      // })
    };
    const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, params);
    const data = await result.json();
    console.log(result);
    console.log(data);
  }



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
