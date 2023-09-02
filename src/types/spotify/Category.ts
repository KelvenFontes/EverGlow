interface SpotifyCategory {
  href: string;
  items: SpotifyCategoryItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface SpotifyCategoryItem {
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
