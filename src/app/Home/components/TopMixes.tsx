import CardTopMix from "./CardTopMix";

const TopMixes = () => {
  return (
    <div className="container mx-auto pl-5 pt-8">

      <h2 className="text-white text-lg font-semibold pb-3">Your Top Mixes</h2>
      <CardTopMix />
      {/* <CardTopMix />
      <CardTopMix /> */}
    </div>
  );
}

export default TopMixes;
