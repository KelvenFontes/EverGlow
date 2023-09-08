'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';
// import ArtistTrack from "./components/ArtistTrack";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

const AlbumByArtist = ({ params }: { params: { Id: string } }) => {

  const [token, setToken] = useState('');
  const [album, setAlbum] = useState<any[] | null | undefined | any>([]);
  const [artistTrack, setArtistTrack] = useState<any>([]);
  const albumId = params.Id;

  useEffect(() => {

    if (!token) {
      const tokenAccess = localStorage.getItem('access_token');
      setToken(tokenAccess!);
      getArtist(tokenAccess!);
      getTrackByAlbum(tokenAccess!);
    }

  }, [])


  async function getArtist(token: string) {

    const apiUrl = `https://api.spotify.com/v1/albums/${albumId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter informações do Spotify.');
      }

      const data = await response.json(); // Obtenha os dados JSON da resposta

      // Exiba os dados no console
      console.log(data);

      // Faça o que precisar com os dados, como definir o estado do componente
      setAlbum(data);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  async function getTrackByAlbum(token: string) {

    const apiUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter informações do Spotify.');
      }
      console.log(response);
      const data = await response.json(); // Obtenha os dados JSON da resposta

      // Exiba os dados no console
      console.log(data);
      setArtistTrack(data.items);

      // Faça o que precisar com os dados, como definir o estado do componente
      // setArtistTrack(data);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  const customIconStyle = {
    strokeWidth: '1', // Ajuste o valor para alterar a espessura da linha
  };

  const handleGoBack = () => {
    window.history.back(); // Isso volta para a página anterior no histórico de navegação
  };

  return (
    <div className="container mx-auto h-[100rem] flex flex-col bg-dark">
      <div className="flex flex-col bg-dark">
        <div className="bg-gradient-to-b h-32 from-primaryLight to-dark">
          <div className="pt-8 pb-3">
            <div className="flex items-center justify-around gap-10">
              <BsArrowLeft className="text-gray-200 text-3xl cursor-pointer" style={customIconStyle} onClick={handleGoBack} />
              <p className="text-white">From Playlist</p>
              <Link href={`/`}>
                <BsThreeDotsVertical className="text-gray-200 text-3xl cursor-pointer" />
              </Link>
            </div>
          </div>


          <div className="flex flex-col items-center justify-center">
            {album && album.images && album.images.length > 0 && (
              <Image src={album.images[0].url} alt={album.name} height={252} width={263} className="mt-4" />
            )}
            <div className="flex items-center justify-start w-[263px]">
              <div>
                <h3 className="text-xl w-[250px] flex-wrap truncate overflow-hidden text-gray-200 font-medium  pl-4">{album.name}</h3>
                {album.artists && album.artists.length > 0 && (
                  <p className="text-lg w-[250px] flex-wrap truncate overflow-hidden text-gray-400 font-medium mb-8 pl-4">{album.artists[0].name}</p>
                )}
              </div>
            </div>

          </div>

          <div className="px-5">
              <h2 className="text-white text-xl font-semibold">Music Album</h2>
              {artistTrack.map((artist: SpotifyCategoryItem) => (
                <div key={artist.id} >
                  <Link href={`/Music/${artist.id}`} className="flex items-center shadow-xl justify-start rounded-lg overflow-hidden py-2 gap-4">
                    {album && album.images && album.images.length > 0 && (
                      <Image src={album.images[0].url} alt={album.name} height={80} width={80} className="object-cover rounded-xl" />
                    )}
                    <p className="text-gray-200 ml-2">{artist.name}</p>
                  </Link>
                </div>
              ))}

            </div>
        </div>

      </div>


    </div >
  );
}


export default AlbumByArtist;
