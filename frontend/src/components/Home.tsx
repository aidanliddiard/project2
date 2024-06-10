import { useUserContext } from "../context/userContext";

export default function Home() {
  const { currentUser } = useUserContext();
  return (
    <div>
      <p>{currentUser.id}</p>
    </div>
  );
}
