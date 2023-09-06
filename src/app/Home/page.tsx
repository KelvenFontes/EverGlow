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

const Home = () => {

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState<SpotifyCategory[]>([]);


  const CLIENT_ID = "4baee310607f4f12b6e000a5299decb2";
  const CLIENT_SECRET = "44900cac48ed4114990e9f37c47f978f";

  // async function getRecentlyPlayed(token: string) {

  //   const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   });


  //   const data = await response.json();

  // }




  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      const tokenAccess = localStorage.getItem('access_token');
      setToken(tokenAccess!);

    } else if (hash != '') {
      const access_token = hash.substring(1).split("&")[0].split('=')[1]
      setToken(access_token!);
      localStorage.setItem('access_token', access_token);
    }

    const intervalId = setInterval(() => {
      try {
        setTimeout(() => {
          getRecommendationGenres(token);
          // getPlaylist(token);

          // getRecentlyPlayed(token);
        }, 2000)
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }, 1000);

    // const refreshAccessToken = async () => {
    //   // Fazer a solicitação para obter um novo token aqui
    //   const newToken = await fetchNewToken(); // Substitua fetchNewToken pela sua lógica de obtenção de token
    //   setToken(newToken);
    // };

    // const intervalId2 = setInterval(() => {

    //   // Defina o intervalo de atualização do token aqui (por exemplo, a cada 30 minutos)
    //   refreshAccessToken();
    // }, 30 * 60 * 1000);

    const autenticatorToken = localStorage.getItem('access_token');
    setToken(autenticatorToken!);

    // return (() => {
    //   clearInterval(intervalId)
    //   // clearInterval(intervalId2)
    // });
    return () => clearInterval(intervalId);

  }, []);

  async function fetchNewToken() {

    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();
    // body.append('grant_type', 'authorization_code');
    // body.append('code', code);
    // body.append('redirect_uri', 'SUA_URL_DE_REDIR');

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





  // async function getRecommendationGenres(token: string) {

  //   console.log('entrou aqui')

  //   const paramse = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Authorization': 'Bearer ' + token
  //     },
  //     // body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  //   };

  //   const result = await fetch("https://api.spotify.com/v1/browse/categories", paramse);
  //   console.log(result);
  //   const data = await result.json();
  //   console.log(data);
  //   setGenres(data.categories.items);
  //   console.log(data.categories.items);
  // }

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




  // async function getPlaylist(token: string) {

  //   const parame = {
  //     // method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + token,
  //       'Content-Type': 'application/json'
  //     },
  //   };

  //   const result = await fetch("https://api.spotify.com/v1/me/playlists", parame);
  //   console.log(result);
  //   const data = await result.json();
  //   console.log(data);
  //   // setGenres(data.categories.items);
  //   // console.log(data.categories.items);
  // }




  // getRecommendationGenres(token);
  // getPlaylist(token);
  // getRecentlyPlayed(token)


  // }, []);




  // Funciona mas é apenas os dados do perfil
  // async function fetchProfile(token: string): Promise<any> {
  //   console.log(`esse é o token ${token}`)
  //   const result = await fetch("https://api.spotify.com/v1/me", {
  //     method: "GET", headers: { Authorization: `Bearer ${token}` }
  //   });
  //   console.log(result);

  //   return await result.json();
  // }



  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <div className="bg-gradient-to-b from-primaryLight to-dark">
        <Header />
      </div>



      <div className="flex-1 pb-24">
        <ContinueListening />

        <h2 className="text-white text-lg font-semibold pt-8 pb-4 px-5">Your Top Mixes</h2>

        <div className="relative flex items-center px-5 lg:justify-center">
          <div className="w-full overflow-x-auto lg:flex lg:items-center lg:justify-center">
            <div className="flex space-x-6 lg:space-x-4 px-4 lg:px-0">
              {genres.map((genre: SpotifyCategory, i: number) => (
                <div key={genre.id} className="flex-shrink-0">
                  <Link href={`/Music/category/${genre.name}`}>
                    <CardTopMix category={genre} />
                  </Link>
                  {/* <p className="text-white">{genre.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* <TopMixes category={genres} /> */}


        <Recommendation />
      </div>
      <FooterMusic />
      <Footer activePage={"home"} />
    </div>

  );
}

export default Home;
