import { Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import CreateRoom from './pages/createRoom/CreateRoom';
import BookingCalendar from './pages/bookingCalendar/BookingCalendar';
import Login from './pages/login/Login';
import AddBokking from './pages/addBooking/AddBooking';
import EditBooking from './pages/editBooking/EditBooking';
import RequireAuth from './components/RequireAuth';
import RequireNotAuth from './components/RequireNotAuth';
import Rooms from './pages/rooms/Rooms';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Routes>
                <Route path="/editReservation/:id" element={<EditBooking />} />
                <Route path="/createRoom" element={<CreateRoom />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<BookingCalendar />} />
                <Route path="/addBooking" element={<AddBokking />} />
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
