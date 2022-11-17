import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateRoom from "./pages/room/CreateRoom";
import BookingCalendar from "./pages/bookingCalendar/BookingCalendar";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="crearHabitacion" element={<CreateRoom />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<BookingCalendar />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
