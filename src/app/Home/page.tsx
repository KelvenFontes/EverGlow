'use client'

import Footer from "@/components/Footer";
import ContinueListening from "./components/ContinueListening";
import Header from "@/components/Header";
import TopMixes from "./components/TopMixes";
import Recommendation from "./components/Recommendation";
import { useEffect, useState } from "react";

import Link from "next/link";
import CardTopMix from "./components/CardTopMix";
import FooterMusic from "@/components/FooterMusic";

interface SpotifyRecommendationsProps {
  accessToken: string;
  seedArtistId: string;
  limit: number;
}

const Home = () => {

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState<SpotifyCategory[]>([]);
  const [recommendedTracks, setRecommendedTracks] = useState<any[]>([]);
  const [recommendedTracksTop, setRecommendedTracksTop] = useState<any[]>([]);
  const [recommendedArtistsTop, setRecommendedArtistsTop] = useState<any[]>([]);
  const [ profile, setProfile ] = useState<any[]>([]);

  const CLIENT_ID = "c31682f453d342c7a7ebfb81009c987c";
  const CLIENT_SECRET = "44900cac48ed4114990e9f37c47f978f";

  const limit = 10;

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      const tokenAccess = localStorage.getItem('access_token');
      setToken(tokenAccess!);
      getSpotifyRecommendations(tokenAccess!)
      getRecommendationGenres(tokenAccess!);
      getRecommendationTopixes(tokenAccess!)
      getRecommendationTopArtists(tokenAccess!)
      getSpotifyProfile(tokenAccess!)

    } else if (hash != '') {
      const access_token = hash.substring(1).split("&")[0].split('=')[1]
      setToken(access_token!);
      localStorage.setItem('access_token', access_token);
      getSpotifyRecommendations(access_token!)
      getRecommendationGenres(access_token!);
      getRecommendationTopixes(access_token!)
      getRecommendationTopArtists(access_token!)
      getSpotifyProfile(access_token!)
    }

    getRecommendationGenres(token);
    getSpotifyRecommendations(token)
    getRecommendationTopixes(token)
    getRecommendationTopArtists(token)
    getSpotifyProfile(token);
    const intervalId = setInterval(() => {
      try {
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }, 1000);

    const autenticatorToken = localStorage.getItem('access_token');
    setToken(autenticatorToken!);
    return () => clearInterval(intervalId);

  }, []);

  async function fetchNewToken() {

    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();

    const headers = {
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação de token de acesso');
      }

      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Erro ao obter token de acesso:', error);
      throw error;
    }
  }

  async function getRecommendationGenres(token: string) {


    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token,
      },
    };

    try {
      const result = await fetch("https://api.spotify.com/v1/browse/categories", params);
      if (!result.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const data = await result.json();
      if (data && data.categories && data.categories.items) {
        setGenres(data.categories.items);

      } else {
        console.error('Dados inválidos retornados da API Spotify:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async function getRecommendationTopixes(token: string) {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    try {
      const result = await fetch(`https://api.spotify.com/v1/me/top/tracks`, params);
      if (!result.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const data = await result.json();
      if (data && data.items) {
        setRecommendedTracksTop(data.items);

      } else {
        console.error('Dados inválidos retornados da API Spotify:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async function getRecommendationTopArtists(token: string) {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };

    try {
      const result = await fetch(`https://api.spotify.com/v1/me/top/artists`, params);
      if (!result.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const data = await result.json();
      if (data && data.items) {
        setRecommendedArtistsTop(data.items);

      } else {
        console.error('Dados inválidos retornados da API Spotify:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async function getSpotifyRecommendations(token: string) {

    const apiUrl = `https://api.spotify.com/v1/recommendations?limit=6&market=BR&seed_genres=pop`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter recomendações do Spotify.');
      }

      const data = await response.json();
      setRecommendedTracks(data.tracks);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }

  async function getSpotifyProfile(token: string) {

    const apiUrl = `https://api.spotify.com/v1/me`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao obter recomendações do Spotify.');
      }

      const data = await response.json();
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  }



  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header profile={profile}/>
      </div>

      <div className="flex-1 pb-40">
        <h2 className="text-white text-lg font-semibold pb-2 pl-4">Continue Listening</h2>
        <div className="grid grid-cols-2 gap-2 px-4">
          {recommendedTracks.map((recommendation: any, index: number) => (
            <div key={recommendation.id}>
              <ContinueListening recommendedTracks={recommendation} />
            </div>
          ))}
        </div>

        <h2 className="text-white text-lg font-semibold pt-8 px-5">Your Top Mixes</h2>

        <div className="relative flex items-center px-5 lg:justify-center">
          <div className="w-full overflow-x-auto lg:flex lg:items-center lg:justify-center">
            <div className="flex space-x-6 lg:space-x-4 lg:px-0">
              {recommendedTracksTop.map((genre: SpotifyCategory, i: number) => (
                <div key={genre.id}>
                  <Link href={`/Music/${genre.id}`}>
                    <CardTopMix category={genre} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Recommendation recommendedTracks={recommendedArtistsTop} />

        <h2 className="text-white text-lg font-semibold pb-1 pt-4 pl-4">Categories</h2>
        <div className="relative flex items-center px-5 lg:justify-center">
          <div className="w-full overflow-x-auto lg:flex lg:items-center lg:justify-center">
            <div className="flex space-x-6 lg:space-x-4 lg:px-0">
              {genres.map((genre: SpotifyCategory, i: number) => (
                <div key={genre.id} className="flex-shrink-0">
                  <Link href={`/Music/${genre.id}`}>
                    <CardTopMix category={genre} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <FooterMusic />
      <Footer activePage={"home"} />
    </div >

  );
}

export default Home;
