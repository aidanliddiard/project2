import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h4 className="text-4xl text-center p-4 md:hidden ">Welcome to the Wonderlust Application</h4>
      <div className="hidden md:block"></div>
      <img className="h-auto max-w-full md:max-w-none md:max-w-full" src="images/image-final.jpg" alt="image description" />
    </div>
  );
}