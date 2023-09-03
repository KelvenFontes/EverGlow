'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";

const FooterMusic = () => {

  const [token, setToken] = useState<string>('');
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | undefined | null>([]);

  const [musicProgress, setMusicProgress] = useState<number | undefined>(0);


  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');
    setToken(autenticator_token!)


    if (autenticator_token != '') {
      getMusicPlaying(autenticator_token!);

      const intervalId = setInterval(() => {
        getMusicPlaying(autenticator_token!);
      }, 1000); // Atualiza a cada segundo (você pode ajustar o intervalo conforme necessário)

      // Limpa o intervalo quando o componente é desmontado
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
    const result = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, params);
    const data = await result.json();

    if (data && data.item) {
      // Acesse progress_ms e duration_ms dentro de data.item
      const progressMs = data.progress_ms;
      const durationMs = data.item.duration_ms;

      setMusicPlaying(data.item);
      setMusicProgress(progressMs);
      console.log(data);
      console.log(progressMs);
    } else {
      // Lide com o caso em que não há música em reprodução no momento
      console.log("Nenhuma música em reprodução no momento.");
    }
  }



  console.log(musicPlaying);
  return (
    <div className="flex items-center justify-around py-4 pb-5 fixed bottom-20 left-0 right-0 h-20 bg-gradient-to-b from-primary to-dark">

      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <Link href={`/Music/${musicPlaying.id}`}>
          <div className="w-[100%]">
            <div className="flex items-center">
              <Image src={musicPlaying.album.images[0].url} alt={musicPlaying.name} height={80} width={80} className="object-cover rounded-xl" />
              <div className="ml-4">
                <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div className="bg-gray-100 w-[80%] h-2 rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
            </div>

          </div>
        </Link>
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
