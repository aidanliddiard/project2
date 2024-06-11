import { useUserContext } from "../context/userContext";
import NavBar from "./NavBar";

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <div>
      <NavBar />
      {/* <p>{currentUser.id}</p> */}
    </div>
  );
}
