import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import BookingCalendar from "./pages/bookingCalendar/BookingCalendar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Register />} />
            <Route path="register" element={<Register />} />

            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route element={<BookingCalendar />} />
            <Route path="calendar" element={<BookingCalendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
