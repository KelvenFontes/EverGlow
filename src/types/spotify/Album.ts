interface SpotifyAlbumItem {
  album_type: string;
  artists: SpotifyArtist[]; // Este é um array de artistas associados ao álbum
  available_markets: string[]; // Uma matriz de códigos de mercado onde o álbum está disponível
  external_urls: {
    spotify: string; // URL externa para o álbum no Spotify
  };
  id: string; // ID exclusivo do álbum
  images: SpotifyImage[]; // Um array de imagens associadas ao álbum
  name: string; // Nome do álbum
  release_date: string; // Data de lançamento do álbum
  release_date_precision: string; // Precisão da data de lançamento
  total_tracks: number; // Número total de faixas no álbum
  type: string; // Tipo de álbum (por exemplo, "album")
  uri: string; // URI exclusivo do álbum no Spotify
}

interface SpotifyArtist {
  external_urls: {
    spotify: string; // URL externa para o artista no Spotify
  };
  href: string; // URL do artista
  id: string; // ID exclusivo do artista
  name: string; // Nome do artista
  type: string; // Tipo de artista (por exemplo, "artist")
  uri: string; // URI exclusivo do artista no Spotify
}


interface SpotifyImage {
  height: number | null;
  url: string; // URL da imagem
  width: number | null;
}
