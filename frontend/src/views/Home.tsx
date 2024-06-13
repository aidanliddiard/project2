import { useUserContext } from "../context/userContext";
import NavBar from "../components/NavBar";

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <div>
      <NavBar />
      {/* <p>{currentUser.id}</p> */}
    </div>
  );
}
