'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';

const FooterMusic = () => {

  // const [token, setToken] = useState<string>('');
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | undefined | null>([]);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setTimeout(() => {
        getMusicPlaying(autenticator_token!);
      }, 2000)
    }

    async function getMusicPlaying(token: string) {
      const params = {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
      };
      const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, params);
      const data = await result.json();
      setMusicPlaying(data.item);
      console.log(result);
      console.log(data);
    }

  }, []);



  console.log(musicPlaying);
  return (
    <div className="flex items-center justify-around py-4 pb-5 fixed bottom-20 left-0 right-0 h-20 bg-gradient-to-b from-primary to-dark">
      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <div className="flex items-center">
          <Image src={musicPlaying.album.images[0].url} alt={musicPlaying.name} height={80} width={80} className="object-cover rounded-xl" />
          <div className="ml-4">
            <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Image src='/icon.png' alt="Default Image" height={80} width={80} className="object-cover rounded-xl" />
          <div className="ml-4">
            <h3 className="text-lg text-gray-300 font-medium">No music playing</h3>
          </div>
        </div>
      )}


    </div >

  );
}

export default FooterMusic;
