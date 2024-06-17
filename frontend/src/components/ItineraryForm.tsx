import React, { useState, useEffect } from "react";
import {
  fetchCategory,
  fetchTime,
  createItinerary,
} from "../services/itinerary";
import { fetchVacations } from "../services/vacations";
import NavBar from "./NavBar";
import ToastNotification from "./ToastNotification";

export interface ItineraryObject {
  id: number;
  name: string;
  categoryId: number | string;
  price: number | string;
  address: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  timeId: number | string;
  website?: string;
  vacationId: number | string;
}

export interface Vacation {
  id: number;
  city: string;
}

interface Category {
  id: number;
  type: string;
}

interface Time {
  id: number;
  time: string;
}

export default function ItineraryForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastVacation, setToastVacation] = useState<Vacation>();
  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [formData, setFormData] = useState<ItineraryObject>({
    id: 0,
    name: "",
    categoryId: "",
    price: "",
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    timeId: "",
    website: "",
    vacationId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResult = await fetchCategory();
      setCategories(categoryResult);
    };

    const fetchTimes = async () => {
      const timeResult = await fetchTime();
      setTimes(timeResult);
    };

    const fetchVacationData = async () => {
      const vacationResult = await fetchVacations();
      vacationResult.sort((a: Vacation, b: Vacation) =>
        a.city.localeCompare(b.city)
      );
      setVacations(vacationResult);
    };

    fetchVacationData();
    fetchCategories();
    fetchTimes();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      console.error("End date cannot be before start date");
      setEndDateError(true);
      return;
    }
    try {
      createItinerary(formData);
      let vacation = vacations.find(
        (vacation) => vacation.id === formData.vacationId
      );
      if (formData.vacationId && vacation) {
        setToastVacation({
          id: Number(formData.vacationId),
          city: vacation.city,
        });
        setToastOpen(true);
      } else {
        console.error("No vacation selected");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        id: 0,
        name: "",
        categoryId: "",
        price: "",
        address: "",
        description: "",
        startDate: "",
        endDate: "",
        timeId: "",
        website: "",
        vacationId: "",
      });
      window.scrollTo(0, 0);
    }
  }

  return (
    <>
      <NavBar />
      {/* {vacations.length > 0 ? ( */}
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-10 pb-8">
        <div className={`${toastOpen ? "" : "hidden"}`}>
          <ToastNotification vacation={toastVacation} />
        </div>
        <div className="flex flex-col items-center justify-center pt-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 pt-4 space-y-4 md:space-y-4 sm:px-8 sm:pt-8 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an Itinerary Item
              </h1>
              <p className="text-sm dark:text-white mt-0">
                <span className="text-red-500 text-small">*</span> indicates a
                required field
              </p>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Vacation */}
                  <div className="col-span-2 mb-3">
                    <label
                      htmlFor="vacation"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vacation
                      <span className="text-red-500 text-small"> *</span>
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formData.vacationId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vacationId: Number(e.target.value),
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option disabled value="">
                        Select A Vacation
                      </option>
                      {vacations.map((vacation: Vacation) => {
                        return (
                          <option key={vacation.id} value={vacation.id}>
                            {vacation.city}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="col-span-2 mb-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name<span className="text-red-500 text-small"> *</span>
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
                      placeholder="Ex: The Grand Canyon"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="col-span-2 mb-3">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address <span className="text-red-500 text-small">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      placeholder="Ex: 20 South Entrance Road, Grand Canyon National Park Headquarters"
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-3 col-span-2">
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price <span className="text-red-500 text-small">*</span>
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
                      className="bg-gray-50 border h-10 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-3 mr-2">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                      <span className="text-red-500 text-small"> *</span>
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
                      <option disabled value="">
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

                  {/* Time */}
                  <div className="ml-2 mb-3">
                    <label
                      htmlFor="time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time of Day{" "}
                      <span className="text-red-500 text-small"> *</span>
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
                      required
                    >
                      <option disabled value="">
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

                  {/* Start Date */}
                  <div className="mb-3 mr-2">
                    <label
                      htmlFor="start_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Date{" "}
                      <span className="text-red-500 text-small">*</span>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={
                        formData.startDate instanceof Date
                          ? formData.startDate.toISOString().split("T")[0]
                          : formData.startDate.toString()
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
                  <div className="mb-3 ml-2">
                    <label
                      htmlFor="end_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Date
                      <span className="text-red-500 text-small"> *</span>
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      value={
                        formData.endDate instanceof Date
                          ? formData.endDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          endDate: new Date(e.target.value),
                        });
                        setEndDateError(false);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  {endDateError && (
                    <p className="text-sm col-span-2 mb-3 text-red-500 mt-1">
                      Please select a new date. End date must be after the start
                      date.
                    </p>
                  )}

                  {/* Website */}
                  <div className="mb-3 col-span-2">
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
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="Ex: https://www.nps.gov/grca/index.htm"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
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
                </div>

                <button
                  type="submit"
                  className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an Itinerary Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* : (
        <div>
          <h1>You have no vacations!</h1>
          <button onClick={() => navigate("/create-vacation")}>
            Create A Vacation
          </button>
        </div>
      ) */}
      {/* } */}
    </>
  );
}
