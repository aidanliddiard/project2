import React, { useState, useEffect } from "react";
import {
  fetchCategory,
  fetchTime,
  createItinerary,
} from "../services/itinerary";
import NavBar from "./NavBar";

export interface ItineraryObject {
  id: number;
  name: string;
  categoryId: number;
  price: number | null;
  address: string;
  description?: string;
  startDate: Date | string;
  endDate?: Date | string;
  timeId: number;
  website?: string;
  vacationId: number;
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
  const [formData, setFormData] = useState<ItineraryObject>({
    id: 0,
    name: "",
    categoryId: 0,
    price: null,
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    timeId: 0,
    website: "",
    vacationId: 0,
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

    fetchCategories();
    fetchTimes();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      createItinerary(formData);
      console.log("submitted");
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        id: 0,
        name: "",
        categoryId: 0,
        price: null,
        address: "",
        description: "",
        startDate: "",
        endDate: "",
        timeId: 0,
        website: "",
        vacationId: 0,
      });
    }
  }

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an Itinerary Item
              </h1>
              <p className="text-sm dark:text-white">
                <span className="text-red-500 text-small">*</span> indicates a required field

              </p>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
              <label
              htmlFor="vacation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Vacation<span className="text-red-500 text-small"> *</span>
              </label>
              <select
              name="category"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              </select>
              
            </div>

                {/* Name */}
                <div>
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
                    placeholder="The Grand Canyon"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category<span className="text-red-500 text-small"> *</span>
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
                    Price <span className="text-red-500 text-small">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    id="price"
                    placeholder="0.00"
                    value={formData.price ? formData.price: ""}
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
                    Address <span className="text-red-500 text-small">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    placeholder="20 South Entrance Road, Grand Canyon National Park Headquarters"
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="start_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date <span className="text-red-500 text-small">*</span>
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
                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date<span className="text-red-500 text-small"> *</span>
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: new Date(e.target.value),
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Time of Day <span className="text-red-500 text-small"> *</span>
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
                      setFormData({ ...formData, website: e.target.value })
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
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Add any additional details here"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
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
    </>
  );
}
