import CardTopGenres from "./CardTopGenres";

const BrowseAll = () => {
  return (
    <div className="container mx-auto px-5 pt-10">
      <h2 className="text-white text-lg font-semibold pb-3">Browse All</h2>
      <div className="grid grid-cols-2 gap-4">
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
        <CardTopGenres />
      </div>
    </div>
  );
}

export default BrowseAll;
