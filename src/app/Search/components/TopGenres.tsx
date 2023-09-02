import CardTopGenres from "./CardTopGenres";

const TopGenres = () => {
  return (
    <div className="container mx-auto px-5 pt-8">
      <h2 className="text-white text-lg font-semibold pb-3">Your Top Genres</h2>
      <div className="grid grid-cols-2 gap-4">
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
      </div>
    </div>
  );
}

export default TopGenres;
