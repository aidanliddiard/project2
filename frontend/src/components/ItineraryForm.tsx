import { useState, useEffect } from "react";
import { fetchCategory, fetchTime, createItinerary } from "../services/itinerary";

export interface ItineraryObject {
  id: number;
  name: string;
  category_id: number;
  price: number;
  address: string;
  description?: string;
  start_date: Date | string;
  end_date?: Date | string;
  time_id: number;
  website?: string;
  vacation_id: number;
};

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
    category_id: 0,
    price: 0,
    address: "",
    description: "",
    start_date: "",
    end_date: "",
    time_id: 0,
    website: "",
    vacation_id: 1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
        const categoryResult = await fetchCategory();
        setCategories(categoryResult);
    };

    const fetchTimes = async () => {
        const timeResult = await fetchTime();
        setTimes(timeResult)
    }
  
    fetchCategories();
    fetchTimes();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try{
      createItinerary(formData);
      console.log("submitted")

    } catch (error) {
      console.error(error)
    } finally {
      setFormData({
        id: 0,
        name: "",
        category_id: 0,
        price: 0,
        address: "",
        description: "",
        start_date: "",
        end_date: "",
        time_id: 0,
        website: "",
        vacation_id: 1,
      })
    }
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Itinerary Item
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Vacation
              <div>
                <label
                  htmlFor="vacation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vacation
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

              </div> */}

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
                  onChange = {e => setFormData({...formData, name: e.target.value})}
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
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category_id}
                  onChange={e => setFormData({ ...formData, category_id: Number(e.target.value) })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                    <option disabled value="0">Select a Category</option>
                 {categories.map((category: Category) => {
                    return <option key={category.id} value={category.id}>{category.type}</option>

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
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)
                  })}
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
                  onChange={e => setFormData({...formData, address: e.target.value})}
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
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={formData.start_date instanceof Date ? formData.start_date.toISOString().split('T')[0] : formData.start_date.toString()}
                  onChange={e => setFormData({...formData, start_date:new Date(e.target.value)})}
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
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={formData.end_date instanceof Date ? formData.end_date.toISOString().split('T')[0] : ""}
                  onChange={e => setFormData({...formData, end_date:new Date(e.target.value)})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={formData.time_id}
                  onChange={e => setFormData({ ...formData, time_id: Number(e.target.value) })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                <option disabled value="0">Select a Time</option>
                 {times.map((time: Time) => {
                    return <option key={time.id} value={time.id}>{time.time}</option>
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
                  onChange={e => setFormData({...formData, website: e.target.value})}
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
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Add any additional details here"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an Itinerary Item
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}