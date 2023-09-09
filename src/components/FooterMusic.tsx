'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { FaPlay, FaHeart, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo, FaMicrophone, FaVolumeUp, FaList, FaExpand, FaSpeakerDeck } from "react-icons/fa";

const FooterMusic = () => {

  const [token, setToken] = useState<string>('');
  const [musicPlaying, setMusicPlaying] = useState<any[] | any | undefined | null>([]);
  const [data, setData] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number | undefined>(0);
  const [musicId, setMusicId] = useState('');


  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');
    setToken(autenticator_token!)
    // checkIfMusicIsInFavorites(autenticator_token!);


    if (autenticator_token != '') {
      getMusicPlaying(autenticator_token!);
      checkIfMusicIsInFavorites(autenticator_token!);
      const intervalId = setInterval(() => {
        getMusicPlaying(autenticator_token!);
        checkIfMusicIsInFavorites(token);
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
        setMusicId(jsonData.item.id);
        checkIfMusicIsInFavorites(token);
        // console.log(jsonData.item.id)
      } else {
        // Lide com o caso em que não há música em reprodução no momento
        console.log("Nenhuma música em reprodução no momento.");
      }
    } catch (error) {
      // Lide com o erro de análise JSON ou outras exceções aqui
      console.error("Ocorreu um erro ao buscar os dados da música atual:", error);
    }
  }


  const checkIfMusicIsInFavorites = async (token: string) => {

    getMusicPlaying(token);
    if (musicId == '' || musicId == undefined) {

      return;
    } else {
      const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${musicId}`, {

        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setIsFavorite(data[0]);


    }
  };


  const handleAddToFavoritesWithToken = async () => {
    try {
      if (isFavorite) {

        const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${musicId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsFavorite(false);
        }
      } else {

        const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${musicId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar/remover dos favoritos:', error);
    }
  };


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

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <>
      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <>
          <div className="grid grid-cols-4 fixed bottom-16 left-0 right-0 h-[4.2rem] bg-gradient-to-b from-primary to-dark rounded-t-xl lg:hidden">
            <div className="col-span-4 flex items-center w-full pl-2">
              <Link href={`/Music/${musicPlaying.id}`}>
                <div className="flex items-center">
                  <Image
                    src={musicPlaying.album.images[0].url}
                    alt={musicPlaying.name}
                    width={50}
                    height={50}
                    className="object-cover rounded-xl"
                  />
                  <div className="ml-4 flex-1 w-64">
                    <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
                    <p className="text-lg text-gray-400 font-medium -mt-1">{musicPlaying.artists[0].name}</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-4 pr-5 pb-1">
                {isFavorite == true ? (
                  <button onClick={handleAddToFavoritesWithToken} className="text-primary">
                    <FaHeart className="text-primary" size={24} />
                  </button>
                ) : (
                  <button onClick={handleAddToFavoritesWithToken} className="text-white">
                    <FaHeart className="text-white" size={24} />
                  </button>
                )}
                {isPlaying ? (
                  <button onClick={handlePause}>
                    <FaPlay color="#fff" size={24} />
                  </button>
                ) : (
                  <button onClick={handlePlay}>
                    <FaPause color="#fff" size={24} />
                  </button>
                )}
              </div>
              <div className="bg-gray-100 w-[95%] h-[0.3rem] rounded-full fixed bottom-16 left-[2.5%] right-[2.5%]">
                <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </>
      ) : null}





















      <div className="hidden lg:flex lg:fixed lg:inset-x-0 lg:bottom-0 lg:h-20 lg:bg-gradient-to-b lg:from-primary lg:to-dark lg:rounded-t-xl lg:px-5">
        <div className="flex items-center w-full pl-2">
          <div className="flex items-center gap-4">
            <Link href={`/Music/${musicPlaying.id}`}>
              <div className="flex items-center">
                {musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images[0] && (
                  <Image
                    src={musicPlaying.album.images[0].url}
                    alt={musicPlaying.name}
                    width={50}
                    height={50}
                    className="object-cover rounded-xl"
                  />
                )}

                <div className="ml-4">
                  <h3 className="text-lg text-gray-300 font-medium">{musicPlaying.name}</h3>
                  {musicPlaying.artists && musicPlaying.artists[0] && (
                    <p className="text-lg text-gray-400 font-medium -mt-1">{musicPlaying.artists[0].name}</p>
                  )}
                </div>
              </div>
            </Link>

            {isFavorite == true ? (
              <button onClick={handleAddToFavoritesWithToken} className="text-primary">
                <FaHeart className="text-primary" size={24} />
              </button>
            ) : (
              <button onClick={handleAddToFavoritesWithToken} className="text-white">
                <FaHeart className="text-white" size={24} />
              </button>
            )}
          </div>



          <div className="flex flex-col items-center justify-center w-auto gap-2 mx-auto">
            <div className="flex items-center gap-4">
              <button className="text-white">
                <FaStepForward color="#fff" size={24} />
              </button>

              <button className="text-white">
                <FaStepBackward color="#fff" size={24} />
              </button>

              {isPlaying ? (
                <button onClick={handlePause}>
                  <FaPlay color="#fff" size={24} />
                </button>
              ) : (
                <button onClick={handlePlay}>
                  <FaPause color="#fff" size={24} />
                </button>
              )}

              <button className="text-white">
                <FaRandom color="#fff" size={24} /> {/* Ícone de aleatório */}
              </button>

              <button className="text-white">
                <FaRedo color="#fff" size={24} /> {/* Ícone de repetir */}
              </button>
            </div>

            <div className="w-96 flex flex-row justify-between items-center">
              <span className='text-white text-sm'>{formatTime(musicProgress!)}</span>
              <div className="bg-gray-100 w-[70%] h-[0.4rem] relative rounded-full">
                <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}>
                  <div className="bg-primary w-[0.6rem] h-[0.6rem] rounded-full absolute top-0 -ml-1 -mt-[0.1rem] left-0" style={{ left: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
                </div>
              </div>
              <span className='text-white text-sm'>{formatTime(musicPlaying.duration_ms)}</span>
            </div>
          </div>



          <div>

            <div className="flex items-center gap-4 mt-2">
              <button className="text-white">
                <FaMicrophone color="#fff" size={24} />
              </button>

              <button className="text-white">
                <FaVolumeUp color="#fff" size={24} />
              </button>

              <button className="text-white">
                <FaSpeakerDeck color="#fff" size={24} />
              </button>

              <button className="text-white">
                <FaList color="#fff" size={24} />
              </button>

              <button className="text-white">
                <FaExpand color="#fff" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
















    </>
  );
}

export default FooterMusic;
