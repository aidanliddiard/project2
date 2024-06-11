import { IconType } from "react-icons";

interface ItineraryCardProps {
  icon: IconType;
}

export default function ItineraryCard({ icon: Icon }: ItineraryCardProps) {
  return (
    <div className="max-w-sm border rounded w-full mt-3 lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      >
        <Icon />
      </div>
      <div className=" border-gray-400 lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div id="name" className="text-gray-900 font-bold text-xl mb-1"><a href="www.hilton.com">Hilton Garden Inn</a></div>
          <p id="address" className="text-gray-700 text-base">12345 Montgomery</p>
          <p id="dates" className="text-gray-700 text-base">6/21/2024 - 6/28/2024</p>
          <p id="description" className="text-gray-700 text-base"></p>
          <p id="dates" className="text-gray-700 text-base">6/21/202 - 6/28/2024</p>
          <p id="dates" className="text-gray-700 text-base">6/21/2024 - 6/28/2024</p>
        </div>
      </div>
    </div>
  );
}
