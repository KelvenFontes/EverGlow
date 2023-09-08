import CardTopGenres from "./CardTopGenres";
import Image from "next/image";

const BrowseAll = () => {
  return (
    <div className="container mx-auto px-5 pt-6">
      <h2 className="text-white text-lg font-semibold pb-6">Browse All</h2>
      <div className="grid grid-cols-2 gap-4">

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/charts.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/indie.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/kpop.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/new.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/pods.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/pop.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/pop (1).png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/rnb.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

        <div className="flex items-center h-20 w-[100%] rounded-md">
          <div className="relative h-20 w-[100%]">
            <Image src="/genres/u.png" alt="logo" className="rounded-md" style={{ objectFit: 'cover' }} fill />
          </div>
        </div>

      </div>
    </div>
  );
}

export default BrowseAll;
