'use client'

import { FaStepBackward, FaPause, FaPlay, FaStepForward, FaRedo, FaRandom } from 'react-icons/fa';
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';

const MusicById = ({ params }: { params: { Id: string } }) => {


  const [token, setToken] = useState<string>('');
  const [device, setDevice] = useState([]);
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | null | undefined>([]);
  const musicId = params.Id;
  const [currentMusicId, setCurrentMusicId] = useState(params.Id)
  const [musicProgress, setMusicProgress] = useState<number | undefined>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setToken(autenticator_token!);
      playMusic(autenticator_token!, musicId);
      getDevice(autenticator_token!);
      getMusicPlaying(autenticator_token!);
      getLetra(autenticator_token!)



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
        getLetra(token)

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

      setMusicPlaying(data.item);
      setMusicProgress(progressMs);
      setMusicDuration(durationMs); // Define a duração da música
      setCurrentTime(progressMs); // Define o tempo atual
      console.log(data);
      console.log(progressMs);



    } else {
      // Lide com o caso em que não há música em reprodução no momento
      console.log("Nenhuma música em reprodução no momento.");
    }
  }

  async function getLetra(token: String) {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };
    const result = await fetch(`https://api.spotify.com/v1/tracks/${musicId}/lyrics`, params);
    const data = await result.json();
    setDevice(data.device);
    console.log(data);
    console.log(result);
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
        "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c",
      })
    };
    const result = await fetch(`https://api.spotify.com/v1/me/player/play`, params);
  }

  const handlePrevious = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c"
        }),
      });

      if (response.status === 204) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir a musica anterior música:', error);
    }
  }

  const handleNext = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c"
        }),
      });

      if (response.status === 204) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir a próxima música:', error);
    }
  }

  const handlePlay = async () => {

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
    const result = await fetch(`https://api.spotify.com/v1/me/player/pause`, params);


    setIsPlaying(true);
  };

  const handlePause = async () => {

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [`spotify:track:${musicId}`], // Substitua pelo ID da faixa que você deseja reproduzir
          position_ms: musicProgress
        }),
      });

      if (response.status === 204) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir a música:', error);
    }
  };


  const handleRepeat = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/repeat?state=context', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "device_id": "14f5302560cfebe1b8e7a425b6d7894a4708f15c",
        }),
      });

      if (response.status === 204) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir a música:', error);
    }
  };

  const handleShuffle = () => {
    // Lógica para alternar entre os modos de reprodução aleatória
    setIsShuffling((prevState) => !prevState);
  };
  // setIsPlaying(false);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


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

          <div className="flex items-center justify-center w-[80%] gap-3">
            <span className='text-white text-sm'>{formatTime(musicProgress!)}</span>
            <div className="bg-gray-100 w-[80%] h-[0.4rem] relative rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}>
                <div className="bg-primary w-[0.6rem] h-[0.6rem] rounded-full absolute top-0 -ml-1 -mt-[0.1rem] left-0" style={{ left: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
              </div>
            </div>
            <span className='text-white text-sm'>{formatTime(musicPlaying.duration_ms)}</span>
          </div>








          <div className="flex items-center space-x-4 pt-3">

            <button onClick={handleShuffle} className={`text-white ${isShuffling ? 'text-primary' : ''}`}>
              <FaRandom />
            </button>


            <button onClick={handlePrevious} className="text-white">
              <FaStepBackward />
            </button>

            {isPlaying ? (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-2xl">
                <button onClick={handlePause} className="pl-[0.2rem]">
                  <FaPlay />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-2xl">
                <button onClick={handlePlay}>
                  <FaPause />
                </button>
              </div>
            )}

            <button onClick={handleNext} className="text-white">
              <FaStepForward />
            </button>

            <button onClick={handleRepeat} className="text-white">
              <FaRedo />
            </button>
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

export default MusicById;
