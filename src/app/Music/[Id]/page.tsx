'use client'

import { FaStepBackward, FaPause, FaPlay, FaStepForward, FaRedo, FaRandom, FaHeart, FaPlus } from 'react-icons/fa';
import { FaTrash, FaTags, FaUser, FaCompactDisc, FaInfoCircle, FaShare } from 'react-icons/fa';

import Header from "./components/Header";
import { useEffect, useState } from "react";
import Image from 'next/image';

import './TextAnimation.css';
import { BsArrowLeft } from 'react-icons/bs';

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');

    if (autenticator_token != '') {
      setToken(autenticator_token!);
      playMusic(autenticator_token!, musicId);
      getDevice(autenticator_token!);
      getMusicPlaying(autenticator_token!);

      getMusic(autenticator_token!)
      checkIfMusicIsInFavorites(autenticator_token!);

      const intervalId = setInterval(() => {
        getMusicPlaying(autenticator_token!);
        checkIfMusicIsInFavorites(autenticator_token!);

      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setTimeout(() => {
        playMusic(token, musicId);
        getDevice(token);
        getMusicPlaying(token);
        // toggleFavorite(token);
        getMusic(token)
        checkIfMusicIsInFavorites(token);

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
      const progressMs = data.progress_ms;
      const durationMs = data.item.duration_ms;

      setMusicPlaying(data.item);
      setMusicProgress(progressMs);

      setMusicPlaying(data.item);
      setMusicProgress(progressMs);
      setMusicDuration(durationMs);
      setCurrentTime(progressMs);

    } else {

      console.log("Nenhuma música em reprodução no momento.");
    }
  }

  async function getMusic(token: String) {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };
    const result = await fetch(`https://api.spotify.com/v1/tracks/${musicId}`, params);
    const data = await result.json();
  }

  const checkIfMusicIsInFavorites = async (token: string) => {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${musicId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setIsFavorite(data[0]);
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
          uris: [`spotify:track:${musicId}`],
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
    setIsShuffling((prevState) => !prevState);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark" >
        <Header musicId={musicId} openModal={openModal} />
      </div >

      {musicPlaying && musicPlaying.album && musicPlaying.album.images && musicPlaying.album.images.length > 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image src={musicPlaying.album.images[0].url} alt={musicPlaying.name} height={252} width={263} className="mt-8" />
          <div className="flex items-center justify-start w-[263px]">
            <div className="">
              <h3 className="text-lg text-gray-200 font-medium">{musicPlaying.name}</h3>
              <div className="text-animation-container">
                <div className="text-animation text-md text-gray-500">
                  {musicPlaying.album.name}
                </div>
              </div>
            </div>


          </div>

          <div className="flex items-center justify-center w-[80%] gap-3 mt-10">
            <span className='text-white text-sm'>{formatTime(musicProgress!)}</span>
            <div className="bg-gray-100 w-[80%] h-[0.4rem] relative rounded-full">
              <div className="bg-primary h-full rounded-full" style={{ width: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}>
                <div className="bg-primary w-[0.6rem] h-[0.6rem] rounded-full absolute top-0 -ml-1 -mt-[0.1rem] left-0" style={{ left: `${(musicProgress! / musicPlaying.duration_ms) * 100}%` }}></div>
              </div>
            </div>
            <span className='text-white text-sm'>{formatTime(musicPlaying.duration_ms)}</span>
          </div>

          <div className="flex items-center space-x-4 pt-3">

            {isFavorite === true ? (
              <button onClick={handleAddToFavoritesWithToken} className="text-white">
                <FaPlus className="text-primary" />
              </button>
            ) : (
              <button onClick={handleAddToFavoritesWithToken} className="text-white">
                <FaPlus className="text-white" />
              </button>
            )}

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

            {isFavorite === true ? (
              <button onClick={handleAddToFavoritesWithToken} className="text-white">
                <FaHeart className="text-primary" />
              </button>
            ) : (
              <button onClick={handleAddToFavoritesWithToken} className="text-white">
                <FaHeart className="text-white" />
              </button>
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 -mx-3">
              <div className="w-full p-4 rounded-lg shadow-lg">

                <div className="container mx-auto h-auto flex flex-col bg-dark border border-gray-400">
                  <div className="pt-5 pb-3">
                    <div className="flex items-center justify-start pl-5 gap-48">
                      <BsArrowLeft
                        className="text-gray-200 text-3xl cursor-pointer arrow-left-icon"

                        onClick={closeModal}
                      />

                    </div>
                  </div>

                  <div className="h-screen flex flex-col flex-1 justify-end px-5 mb-10">

                    <ul className="text-white list-none p-0">
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaPlus className="mr-2" />
                          <span className="text-lg">Add to playlist</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaPlay className="mr-2" />
                          <span className="text-lg">Add to queue</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaTrash className="mr-2" />
                          <span className="text-lg">Remove from playlist</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaTags className="mr-2" />
                          <span className="text-lg">Modify tags</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaUser className="mr-2" />
                          <span className="text-lg">View artist</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaCompactDisc className="mr-2" />
                          <span className="text-lg">View album</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaInfoCircle className="mr-2" />
                          <span className="text-lg">Show Credits</span>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <FaShare className="mr-2" />
                          <span className="text-lg">Share</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div >
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="container flex flex-col items-center justify-center mt-52">
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )
      }

    </div >

  );
}

export default MusicById;
function useSpring(arg0: {
  from: { transform: string; }; to: { transform: string; }; config: { duration: number; };
  reset: boolean;
  reverse: boolean;
}) {
  throw new Error('Function not implemented.');
}

