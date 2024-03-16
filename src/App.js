import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Form from "./components/AddBook/Form";
import AuthForm from "./components/LoginSignUp/AuthForm.jsx";
import ProtectedRoute from "./routing/ProtectedRoute.jsx";
import { useAuth } from "./hooks/use-auth.js";
function App() {
  const {isLoggedIn}=useAuth()
  return (
    <>
      { isLoggedIn && <Navbar />}
      <Routes>
      { !isLoggedIn && <Route path="/" element={<AuthForm />} />}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
