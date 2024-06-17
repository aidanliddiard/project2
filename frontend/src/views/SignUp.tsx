import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/auth";
import { useUserContext } from "../context/userContext";
import ToastError from "../components/ToastError";
import NavBar from "../components/NavBar";

export default function SignUp() {
  const navigate = useNavigate();
  const { getCurrentUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const handlePassword = (value: string) => {
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordElement && passwordElement.value === value) {
      setPassword(value);
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  const handleSubmit = async (
    e: React.SyntheticEvent,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    if (errorMessage !== "") {
      setToastOpen(true);
      return;
    }

    try {
      await signUpUser({ name, email, password });
      await getCurrentUser();
      navigate("/create-vacation");
    } catch (error) {
      setErrorMessage(error);
      setToastOpen(true);
    }
  };
  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-10 pb-8">
        <div className={`${toastOpen ? "" : "hidden"}`}>
          <ToastError errorMessage={errorMessage} setToastOpen={setToastOpen} />
        </div>
        <div className="flex flex-col items-center px-6 mx-auto md:h-screen pt-10">
          {" "}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <p className="text-sm dark:text-white">
                <span className="text-red-500 text-small">*</span> indicates a
                required field
              </p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e, name, email, password)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                    <span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                    <span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ex: name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                    <span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                    <span className="text-red-500 text-small"> *</span>
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setErrorMessage("");
                      setToastOpen(false);
                      handlePassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
