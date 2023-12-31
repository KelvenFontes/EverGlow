import Image from "next/image";
import Link from "next/link";

interface SearchResultsArtistProps {
  result: SpotifyCategoryItem;
}

const SearchResultsArtist: React.FC<SearchResultsArtistProps> = ({ result }) => {
  return (
    <>
      {result ? (
        <div key={result?.id} className="flex items-center">
          <Link href={`/Music/artist/tracks/${result?.id}`}>
            <div className="flex items-center">
              {result.images && result.images.length > 0 ? (
                <Image src={result.images[0].url} alt={result.name} height={80} width={80} className="object-cover rounded-full" />
              ) : (
                <Image src={result.imageURL} alt={result.name} height={80} width={80} className="object-cover rounded-full" />
              )}

              <div className="ml-4">
                <h3 className="text-lg text-gray-300 font-medium">{result.name}</h3>
              </div>
            </div>
          </Link>
        </div >
      ) : null}
    </>
  );
};

export default SearchResultsArtist;
