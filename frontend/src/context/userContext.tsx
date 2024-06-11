import { useEffect, useState, createContext, useContext } from "react";
import { getUser, signOutUser } from "../services/auth";

const defaultUser = {
  name: "Example User",
  email: null,
};

const UserContext = createContext();

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const getCurrentUser = async () => {
    try {
      const data = await getUser();
      console.log(data);
      setCurrentUser(data);
    } catch (error) {
      console.log("Error getting user:", error);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setCurrentUser(defaultUser);
  };

  useEffect(() => {
    try {
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, getCurrentUser, signOut }}>
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
