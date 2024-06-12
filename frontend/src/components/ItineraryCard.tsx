import { IconType } from "react-icons";
import { FaTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";




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
  website: string;
  icon: IconType;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ id, name, price, address, description, start_date,
   end_date, time, website, icon: Icon }) => {
  return (
    <div id="container" className="max-w-sm border rounded-md grid grid-cols-5 w-full mt-3 lg:max-w-full">
      <div className="col-span-4 rounded-md bg-white p-4 flex flex-col justify-between leading-normal">
        <div id="name" className="text-gray-900 font-bold text-xl mb-1">{name}</div>
        <p id="description" className="text-gray-700 text-base">{description}</p>
        <p id="address" className="text-gray-700 text-base">Address: {address}</p>
        <p id="price" className="text-gray-700 text-base">Price: ${price}</p>
        <p id="dates" className="text-gray-700 text-base">{formatDate(start_date)} - {formatDate(end_date)}</p>
        <p id="time" className="text-gray-700 text-base">Time of Day: {time}</p>
        <p id="website" className="text-gray-700 underline text-base"><a href={`http://${website}`}>Website</a></p>
      </div>
      <div className="col-span-1 flex flex-col items-center w-full justify-center">
        {<Icon className="my-2" style={{ width: "15px"}} />}
      {<BsPencilSquare className="my-2" style={{ width: "15px"}}/>}
      {<FaTrashCan className="my-2" style={{ width: "15px"}} />}
      </div>
    </div>
  );
}

export default ItineraryCard;