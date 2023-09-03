import Image from 'next/image';

interface CardPlaylistProps {
  playlist: SpotifyPlaylist;
}

const CardPlaylist = ({ playlist }: CardPlaylistProps) => {

  return (
    <>
      {
        playlist ? (
          <div key={playlist?.id} className="flex items-center pb-4" >
            {
              playlist.images && playlist.images.length > 0 ? (
                <Image src={playlist.images[0].url} alt={playlist.name} height={80} width={80} className="object-cover rounded-xl" />
              ) : (
                <Image src='/icon.png' alt={playlist.name} height={80} width={80} className="object-cover rounded-xl" />
              )
            }

            < div className="ml-4" >
              <h3 className="text-lg text-gray-300 font-medium">{playlist.name}</h3>
            </div >
          </div >
        ) : null}
    </>
  );
}

export default CardPlaylist;
