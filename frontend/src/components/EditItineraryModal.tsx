import React, { useState, useEffect } from "react";
import {
  updateItinerary,
  getItineraryById,
  fetchCategory,
  fetchTime,
} from "../services/itinerary";

interface EditModalProps {
  id: number;
  vacationId: number;
  onClose: () => void;
}
interface Category {
  id: number;
  type: string;
}

interface Time {
  id: number;
  time: string;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, id, vacationId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    price: 0,
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    time: "",
    type: "",
    website: "",
    icon: "",
    timeId: 0,
    categoryId: 0,
    vacationId: vacationId,
  });
  console.log(id, vacationId);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResult = await fetchCategory();
      setCategories(categoryResult);
    };

    const fetchTimes = async () => {
      const timeResult = await fetchTime();
      setTimes(timeResult);
    };

    fetchCategories();
    fetchTimes();
  }, []);

  useEffect(() => {
    const getItineraryData = async () => {
      const response = await getItineraryById(id, vacationId);
      console.log("by id", response);
      setFormData(response);
    };
    getItineraryData();
  }, []);

  const handleUpdate = async () => {
    console.log("updating");
    console.log("id:", id, vacationId);
    try {
      const response = await updateItinerary(id, vacationId, formData);
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
            <section className="bg-gray-50 dark:bg-gray-900 pt-12 pb-5">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Update Itinerary Item
                    </h1>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleUpdate}
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          value={formData.categoryId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              categoryId: Number(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        >
                          <option disabled value="0">
                            Select a Category
                          </option>
                          {categories.map((category: Category) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Price */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          name="price"
                          id="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: Number(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          placeholder="20 South Entrance Road, Grand Canyon National Park Headquarters"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Start Date */}
                      <div>
                        <label
                          htmlFor="startDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Start Date{" "}
                          <span className="text-red-500 text-small">*</span>
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          value={
                            !isNaN(Date.parse(formData.startDate))
                              ? new Date(formData.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: new Date(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label
                          htmlFor="endDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          End Date
                          <span className="text-red-500 text-small"> *</span>
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          value={
                            !isNaN(Date.parse(formData.endDate))
                              ? new Date(formData.endDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: new Date(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label
                          htmlFor="time"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Time of Day
                        </label>
                        <select
                          name="time"
                          id="time"
                          value={formData.timeId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeId: Number(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled value="0">
                            Select a Time
                          </option>
                          {times.map((time: Time) => {
                            return (
                              <option key={time.id} value={time.id}>
                                {time.time}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Website */}
                      <div>
                        <label
                          htmlFor="website"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Website
                        </label>
                        <input
                          type="text"
                          name="website"
                          id="website"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://www.nps.gov/grca/index.htm"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Add any additional details here"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-center space-evenly">
                        <button
                          data-modal-hide="popup-modal"
                          type="submit"
                          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Update
                        </button>
                        <button
                          onClick={onClose}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
