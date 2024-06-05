import Home from "./src/Home";
import SignUp from "./src/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
