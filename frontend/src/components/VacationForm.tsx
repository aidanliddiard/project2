import React, {
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { submitVacation } from "../services/vacationform";
import { useUserContext } from "../context/userContext";
import { fetchImages } from "../services/images";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

interface VacationFormData {
  city: string;
  country: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  imageUrl: string;
  alt: string;
  userId: number;
}

interface updatedFormData {
  city: string;
  country: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  imageUrl: string;
  alt: string;
  userId: number;
}

export default function VacationForm() {
  const { currentUser, addVacation } = useUserContext();
  const userId = currentUser.id;

  const navigate = useNavigate();
  type NavigateFn = ReturnType<typeof useNavigate>;

  const [formData, setFormData] = useState<VacationFormData>({
    city: "",
    country: "",
    description: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    alt: "",
    userId: userId,
  });

  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [cityNotFoundError, setCityNotFoundError] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "city" && cityNotFoundError) {
      setCityNotFoundError(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      console.error("End date cannot be before start date");
      setEndDateError(true);
      return;
    }
    try {
      const imageUnsplashURL = await fetchImages(formData.city);

      if (imageUnsplashURL.results.length === 0) {
        setCityNotFoundError(true);
        return;
      }

      const altDescription: string =
        imageUnsplashURL.results[0].alt_description;
      const imageUnsplashUrl: string = imageUnsplashURL.results[0].urls.full;

      const updatedFormData = {
        ...formData,
        alt: altDescription,
        imageUrl: imageUnsplashUrl,
        userId: Number(currentUser.id),
      };

      const response = await submitVacation(updatedFormData, addVacation);

      setFormData({
        city: "",
        country: "",
        description: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        alt: "",
        userId: userId,
      });

      navigate("/vacations");
    } catch (error) {
      console.error(
        "Error submitting vacation form:",
        (error as Error).message
      );
    }
  };

  useEffect(() => {
    if (formData.endDate) {
      setEndDateError(false);
    }
  }, [formData.endDate]);

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center px-6 mx-auto md:h-screen pt-10">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 pt-4 space-y-4 md:space-y-4 sm:px-8 sm:pt-8 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a Vacation
              </h1>
              <p className="text-sm dark:text-white">
                <span className="text-red-500 text-small">*</span> indicates a
                required field
              </p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                action="#"
              >
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City <span className="text-red-500 text-small"> *</span>
                    {cityNotFoundError && (
                      <p className="text-sm text-red-500 mt-1">
                        No images found for this city. Please enter a different
                        city.
                      </p>
                    )}
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ex: London"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country<span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Ex: United Kingdom"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
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
                    onChange={handleChange}
                    rows="1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ex: Spring Break Trip to London"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                    <span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={
                      formData.startDate instanceof Date
                        ? formData.startDate.toISOString().split("T")[0]
                        : formData.startDate.toString()
                    }
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date<span className="text-red-500 text-small"> *</span>
                    {endDateError && (
                      <p className="text-sm text-red-500 mt-1">
                        Please select a new date. End date must be after the
                        start date.
                      </p>
                    )}
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={
                      formData.endDate instanceof Date
                        ? formData.endDate.toISOString().split("T")[0]
                        : formData.endDate.toString()
                    }
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Submit a Vacation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
