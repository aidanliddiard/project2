import { useEffect, useState, createContext, useContext } from "react";
import { getUser, signOutUser } from "../services/auth";
import { fetchVacations } from "../services/vacations";

const defaultUser = {
  name: "Example User",
  email: null,
};

export interface User {
  name: string;
  email: string | null;
}

export interface Vacation {
  id: number;
  city: string;
}

const UserContext = createContext<{
  currentUser: User;
  vacations: Vacation[];
  getCurrentUser: () => Promise<void>;
  signOut: () => Promise<void>;
  addVacation: (newVacation: Vacation) => void;
}>({
  currentUser: defaultUser,
  vacations: [],
  getCurrentUser: async () => {},
  signOut: async () => {},
  addVacation: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [vacations, setVacations] = useState<Vacation[]>([]);

  const getCurrentUser = async () => {
    try {
      const data = await getUser();
      setCurrentUser(data);
    } catch (error) {
      console.log("Error getting user:", error);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setCurrentUser(defaultUser);
    setVacations([]);
  };

  useEffect(() => {
    const getVacations = async () => {
      try {
        const response = await fetchVacations();
        response.sort((a: Vacation, b: Vacation) =>
          a.city.localeCompare(b.city)
        );
        setVacations(response);
      } catch (error) {
        console.log(error);
      }
    };

    getVacations();
    getCurrentUser();
  }, []);

  const addVacation = (newVacation: Vacation) => {
    setVacations((prevVacations) => [...prevVacations, newVacation]);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, vacations, getCurrentUser, signOut, addVacation }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const data = useContext(UserContext);
  if (data === undefined) {
    throw new Error("userContext must be used within a UserProvider");
  }
  return data;
};

export { UserProvider, useUserContext, UserContext };
