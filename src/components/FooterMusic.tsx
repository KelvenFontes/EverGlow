'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { FaPlay, FaHeart, FaPause } from "react-icons/fa";

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
        // method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setIsFavorite(data[0]);


    }
  };


  const handleAddToFavoritesWithToken = async () => {
    try {
      if (isFavorite) {
        // Remover da biblioteca do usuário (desfavoritar)
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
        // Adicionar à biblioteca do usuário (favoritar)
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


  return (
    <>
      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <div className="grid grid-cols-4 fixed bottom-20 left-0 right-0 h-[4.2rem] bg-gradient-to-b from-primary to-dark rounded-t-xl">

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
                </div>
              </div>
            </Link>

            {/* Coração e Play/Pause à direita */}
            <div className="flex items-center gap-4 pr-5 pb-1">

              {isFavorite == true ? (
                <button onClick={handleAddToFavoritesWithToken} className="text-primary">
                  <FaHeart className="text-primary" size={24} /> {/* Ícone de coração */}
                </button>
              ) : (
                <button onClick={handleAddToFavoritesWithToken} className="text-white">
                  <FaHeart className="text-white" size={24} /> {/* Ícone de coração */}
                </button>
              )}

              {isPlaying ? (
                // <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-2xl">
                <button onClick={handlePause}>
                  <FaPlay color="#fff" size={24} />
                </button>
                // </div>
              ) : (
                // <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-2xl">
                <button onClick={handlePlay}>
                  <FaPause color="#fff" size={24} />
                </button>
                // </div>
              )}
            </div>

            {/* Barra de Progresso */}
            <div className="bg-gray-100 w-[95%] h-[0.3rem] rounded-full fixed bottom-20 left-[2.5%] right-[2.5%]">
              <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
            </div>
          </div>

        </div>
      ) : null}
    </>

  );
}

export default FooterMusic;
