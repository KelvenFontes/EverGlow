import CardContinueListening from "./CardContinueListening";

const ContinueListening = () => {
  return (
    <div className="container mx-auto px-5">
      <h2 className="text-white text-lg font-semibold pb-5">Continue Listening</h2>
      <div className="grid grid-cols-2 gap-2">
        <CardContinueListening />
        <CardContinueListening />
        <CardContinueListening />
        <CardContinueListening />
        <CardContinueListening />
        {/* <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div>
          <h1 className="text-white">coffee & jazz</h1>
        </div>
        <div></div> */}
      </div>
    </div>
  );
}

export default ContinueListening;
