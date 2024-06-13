import React, { useState, useEffect } from "react";
import { updateItinerary, getItineraryById } from "../services/itinerary";

interface EditModalProps {
  id: number;
  vacation_id: number;
  onClose: () => void;
}

const DeleteModal: React.FC<EditModalProps> = ({
  onClose,
  id,
  vacation_id,
}) => {
  const [data, setData] = useState({
    name: "",
    price: 0,
    address: "",
    description: "",
    start_date: "",
    end_date: "",
    time: "",
    type: "",
    website: "",
    icon: "",
    vacationId: 0,
  });

  useEffect(() => {
    const getItineraryData = async () => {
      const response = await getItineraryById(id);
      console.log("by id", response);
      setData(response[0]);
    };
    getItineraryData();
  }, []);

  const handleUpdate = async () => {
    console.log("updating");
    console.log("id:", id, vacation_id);
    try {
      const response = await updateItinerary(id, vacation_id, data);
      console.log(response);
      console.log("updated");
    } catch (error) {
      console.error("Error updating itinerary:", error);
    }
    onClose();
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/* ????? */}
            <button
              onClick={handleUpdate}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={onClose}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
