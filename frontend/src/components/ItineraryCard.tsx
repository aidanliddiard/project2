import { IconType } from "react-icons";
import { FaTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

import React, { useState } from "react";

import { formatDate } from "../views/Itinerary";
import DeleteModal from "./DeleteItineraryModal";
import EditModal from "./EditItineraryModal";

interface ItineraryCardProps {
  id: number;
  name: string;
  price: number;
  address: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  website: string;
  icon: IconType;
  vacationId: number;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  name,
  price,
  address,
  description,
  startDate,
  endDate,
  time,
  website,
  icon: Icon,
  vacationId,
}: ItineraryCardProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  console.log("vacaid", vacationId);

  const toggleUpdateModal = () => {
    setIsUpdateModalOpen((prevState) => !prevState);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prevState) => !prevState);
  };

  return (
    <div
      id="container"
      className="max-w-sm border rounded-md grid grid-cols-5 w-full mt-3 lg:max-w-full"
    >
      <div className="col-span-4 rounded-md bg-white p-4 flex flex-col justify-between leading-normal">
        <div id="name" className="text-blue-800 font-bold text-xl mb-1">
          {name}
        </div>
        <p id="description" className="text-gray-700">
          {description}
        </p>
        <p id="address" className="text-gray-700">
          Address: {address}
        </p>
        <p id="price" className="text-gray-700">
          Price: ${price}
        </p>
        <p id="dates" className="text-gray-700">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
        <p id="time" className="text-gray-700">
          Time of Day: {time}
        </p>
        <p id="website" className="text-gray-700 underline">
          <a href={`http://${website}`}>Website</a>
        </p>
      </div>
      <div className="col-span-1 flex flex-col items-center w-full justify-center">
        {
          <Icon
            className="mb-4 text-blue-800"
            style={{ width: "30%", height: "auto" }}
          />
        }
        <button onClick={toggleUpdateModal}>
          {
            <BsPencilSquare
              className="my-4 text-gray-600 hover:text-gray-800"
              style={{ width: "15px" }}
            />
          }
        </button>
        <button onClick={toggleDeleteModal}>
          {
            <FaTrashCan
              className="my-4 text-gray-600 hover:text-gray-800"
              style={{ width: "15px" }}
            />
          }
        </button>
        {isUpdateModalOpen && (
          <EditModal
            onClose={toggleUpdateModal}
            id={id}
            vacationId={vacationId}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onClose={toggleDeleteModal}
            id={id}
            vacationId={vacationId}
            name={name}
          />
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
