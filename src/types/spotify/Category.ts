interface SpotifyCategory {
  album: any;
  images: any;
  id: null | undefined;
  icons: any;
  href: string;
  items: SpotifyCategoryItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  name: string;
}

interface SpotifyCategoryItem {
  album: any;
  albums: any;
  map(arg0: () => any): unknown;
  images: any;
  imageURL: string;
  href: string;
  icons: SpotifyImage[];
  id: string;
  name: string;
}

interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}
