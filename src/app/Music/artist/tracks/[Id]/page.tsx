'use client'

import Footer from "@/components/Footer";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Header from "./components/Header";

const TracksArtist = ({ params }: { params: { Id: string } }) => {

  const [token, setToken] = useState<string>('');
  const [artist, setArtist] = useState<SpotifyArtist[]>([]);
  const [artistData, setArtistData] = useState<SpotifyArtist[] | any>([]);
  const artistId = params.Id;
  console.log(artistId);

  useEffect(() => {

    const autenticator_token = localStorage.getItem('access_token');
    setToken(autenticator_token!);
    getSearchArtist(token, artistId);

    getArtist(token, artistId);

  }, [artistId, token]);

  async function getSearchArtist(token: string, artistId: string) {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=br`, params);
    const data = await result.json();

    setArtist(data.tracks);
    console.log(data);

  }

  async function getArtist(token: string, artistId: string) {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, params);
    const data = await result.json();
    console.log(data);

    setArtistData(data);

  }


  return (
    <div className="min-h-screen flex flex-col bg-dark">

      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>

      <div className="px-5">
        <div className="flex items-center justify-center pb-4">
          {artistData.images && artistData.images.length > 0 ? (
            <Image src={artistData.images[0].url} alt={artistData.name} height={240} width={240} className="object-cover rounded-xl" />
          ) : (
            <Image src={artistData?.imageURL || '/default-image-url.png'} alt={artistData.name} height={240} width={240} className="object-cover rounded-xl" />
          )}
        </div>

        <div className="flex items-center justify-center">
          <h3 className="text-white pb-8 text-3xl font-bold">{artistData.name}</h3>
        </div>

        {artist.map((artist: any) => (
          <div key={artist?.id} className="flex items-center pb-3 px-2">
            {artist.album?.images && artist.album.images.length > 0 ? (
              <Image src={artist.album.images[0].url} alt={artist.name} height={60} width={60} className="object-cover rounded-md" />
            ) : (
              <Image src={artist.album?.imageURL || '/default-image-url.png'} alt={artist.name} height={60} width={60} className="object-cover rounded-md" />
            )}

            <div className="ml-4">
              <p className="text-sm text-gray-200 font-semibold">{artist.name}</p>
              <p className="text-xs text-gray-400 font-medium">{artist.album.name}</p>
            </div>
          </div>
        ))}

      </div>

      <Footer />

    </div>
  );
}

export default TracksArtist;
