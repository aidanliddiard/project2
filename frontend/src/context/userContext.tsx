import { useEffect, useState, createContext, useContext } from "react";
import { getUser } from "../services/auth";

const defaultUser = {
  name: "Example User",
  email: null,
};

const UserContext = createContext(defaultUser);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const getCurrentUser = async () => {
    const data = await getUser();
    setCurrentUser(data);
  };

  useEffect(() => {
    try {
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, getCurrentUser }}>
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
