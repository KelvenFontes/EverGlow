interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

interface SpotifyArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images?: SpotifyImage[]; // A propriedade 'images' é opcional
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
