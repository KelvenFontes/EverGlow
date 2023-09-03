'use client'

import Footer from "@/components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';

const MusicById = ({ params }: { params: { Id: string } }) => {

  const [token, setToken] = useState<string>('');
  const [device, setDevice] = useState([]);
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | null | undefined>([]);
  const musicId = params.Id;
  const [musicProgress, setMusicProgress] = useState<number | undefined>(0);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setToken(autenticator_token!);
      playMusic(autenticator_token!, musicId);
      getDevice(autenticator_token!);
      getMusicPlaying(autenticator_token!);

      const intervalId = setInterval(() => {
        getMusicPlaying(autenticator_token!);
      }, 1000); // Atualiza a cada segundo (você pode ajustar o intervalo conforme necessário)

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    } else {
      setTimeout(() => {
        playMusic(token, musicId);
        getDevice(token);
        getMusicPlaying(token);
      }, 5000)
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



  async function getDevice(token: String) {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };
    const result = await fetch(`https://api.spotify.com/v1/me/player/devices`, params);
    const data = await result.json();
    setDevice(data.device);
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

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark" >
        <Header />
      </div >

      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Image src={musicPlaying.album.images[0].url} alt={musicPlaying.name} height={252} width={263} className="mt-20" />
          <div className="ml-4">
            <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
            <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.album.name}</h3>
          </div>

          {/* Barra de Progresso */}
          <div className="bg-gray-100 w-[80%] h-2 rounded-full">
            <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
          </div>

          <div></div>

          <div>
            <div>player</div>
            <div>pause</div>

            <div></div>
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

export default MusicById;
