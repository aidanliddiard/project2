import { IconType } from "react-icons";

import { formatDate } from "./Itinerary";

interface ItineraryCardProps {
  id: number;
  name: string;
  price: number;
  address: string;
  description: string;
  start_date: string;
  end_date: string;
  time: string;
  type: string;
  website: string;
  icon: IconType;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ id, name, price, address, description, start_date,
   end_date, time, type, website, icon: Icon }) => {
  return (
    <div className="max-w-sm border rounded w-full mt-3 lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
        >
        <div><Icon/></div>
      </div>
      <div className=" border-gray-400 lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div id="name" className="text-gray-900 font-bold text-xl mb-1">{name}</div>
          <p id="description" className="text-gray-700 text-base">{description}</p>
          <p id="address" className="text-gray-700 text-base">{address}</p>
          <p id="price" className="text-gray-700 text-base">{price}</p>
          <p id="dates" className="text-gray-700 text-base">{formatDate(start_date)} - {formatDate(end_date)}</p>
          <p id="time" className="text-gray-700 text-base">{time}</p>
          <p id="type" className="text-gray-700 text-base">{type}</p>
          <p id="website" className="text-gray-700 text-base"><a href={`http://${website}`}>Website</a></p>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;