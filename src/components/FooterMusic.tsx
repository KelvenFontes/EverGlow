'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";

const FooterMusic = () => {

  const [token, setToken] = useState<string>('');
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | undefined | null>([]);
  const [data, setData] = useState<any>([]);

  const [musicProgress, setMusicProgress] = useState<number | undefined>(0);


  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');
    setToken(autenticator_token!)


    if (autenticator_token != '') {
      getMusicPlaying(autenticator_token!);

      const intervalId = setInterval(() => {
        getMusicPlaying(autenticator_token!);
      }, 1000);

      return () => clearInterval(intervalId);

    }

  }, []);

  async function getMusicPlaying(token: string) {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    try {
      const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, params);
      const jsonData = await result.json();

      if (jsonData && jsonData.item) {
        // Acesse progress_ms e duration_ms dentro de jsonData.item
        const progressMs = jsonData.progress_ms;
        const durationMs = jsonData.item.duration_ms;

        setMusicPlaying(jsonData.item);
        setMusicProgress(progressMs);
      } else {
        // Lide com o caso em que não há música em reprodução no momento
        console.log("Nenhuma música em reprodução no momento.");
      }
    } catch (error) {
      // Lide com o erro de análise JSON ou outras exceções aqui
      console.error("Ocorreu um erro ao buscar os dados da música atual:", error);
    }







  }



console.log(musicPlaying);
return (
  <div className="flex items-center justify-around py-4 pb-5 fixed bottom-20 left-0 right-0 h-[4.5rem] bg-gradient-to-b from-primary to-dark rounded-t-xl">

    {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
      <div>
        <Link href={`/Music/${musicPlaying.id}`}>

          <div className="flex items-center">
            <Image src={musicPlaying.album.images[0].url} alt={musicPlaying.name} height={50} width={50} className="object-cover rounded-xl" />
            <div className="ml-4">
              <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
            </div>
          </div>
        </Link>

        {/* Barra de Progresso */}
        <div className="bg-gray-100 w-[95%] h-2 rounded-full fixed bottom-20 left-[2.5%] right-[2.5%]">
          <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
        </div>
      </div>


    ) : (
      <div className="flex items-center">
        <Image src='/icon.png' alt="Default Image" height={80} width={80} className="object-cover rounded-xl" />
        <div className="ml-4">
          <h3 className="text-lg text-gray-300 font-medium">No music playing</h3>
        </div>
      </div>
    )
    }
  </div >

);
}

export default FooterMusic;
