import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Goals from "./components/Goals.jsx";
import Quotes from "./components/Qoutes.jsx";
import Diary from "./components/Diary.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Moods from "./components/Moods.jsx";
import Profile from "./components/Profile.jsx";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/quotes" element={<Quotes />} />
     

      {/* Protected Routes */}
      <Route
        path="/diary"
        element={
          <ProtectedRoute>
            <Diary />
          </ProtectedRoute>
        }
      />
   
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Goals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/moods"
        element={
          <ProtectedRoute>
            <Moods />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>

    
  );
}

export default App;

