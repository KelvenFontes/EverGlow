'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import CardMusicByPlaylist from './components/CardMusicByPlaylist';

// interface CardPlaylistProps {
//   playlist: SpotifyPlaylist;
// }

const CardPlaylist = ({ params }: { params: { Id: string } }) => {

  const [musicsByPlaylist, setMusicsByPlaylist] = useState([]);
  const [token, setToken] = useState('');

  const playlistId = params.Id;

  console.log(playlistId);

  async function getMusicsByPlaylist() {

    const parame = {
      // method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    };

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, parame);
    console.log(result);
    const data = await result.json();
    console.log(data.tracks.items);
    setMusicsByPlaylist(data.tracks.items);
    // setGenres(data.categories.items);
    // console.log(data.categories.items);
  }


  useEffect(() => {

    const autenticato = localStorage.getItem('access_token');
    setToken(autenticato!);

    setTimeout(() => {
      getMusicsByPlaylist()
    }, 2000)
  }, [])



  return (
    <div>
      {musicsByPlaylist.map((musicByPlaylist, i) => (
        <div key={i}>
          <CardMusicByPlaylist musicByPlaylist={musicByPlaylist} />
        </div>
      ))}
    </div>
  );
}

export default CardPlaylist;
