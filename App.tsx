import React from "react";
import Home from "./frontend/src/views/Home";
import SignUp from "./frontend/src/views/SignUp";
import LogIn from "./frontend/src/views/LogIn";
import Vacations from "./frontend/src/views/Vacations";
import VacationForm from "./frontend/src/components/VacationForm";
import { submitVacation } from "./frontend/src/services/vacationform";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItineraryForm from "./frontend/src/components/ItineraryForm";
import Itinerary from "./frontend/src/views/Itinerary";
import PrivateRoutes from "./frontend/src/components/PrivateRoutes";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/vacations" element={<Vacations />} />
            <Route
              path="/create-vacation"
              element={<VacationForm submitVacation={submitVacation} />}
            />
            <Route path="/create-itinerary" element={<ItineraryForm />} />{" "}
            <Route path="/vacations/:id/" element={<Itinerary />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
