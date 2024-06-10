import Home from "./frontend/src/components/Home";
import SignUp from "./frontend/src/components/SignUp";
import Vacations from "./frontend/src/components/Vacations";
import VacationForm from "./frontend/src/components/VacationForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItineraryForm from "./frontend/src/components/ItineraryForm";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/createvacation" element={<VacationForm />} />
          <Route path="/create_itinerary" element={<ItineraryForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
