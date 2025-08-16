import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["CGPA.COM"]);

  useEffect(() => {
    const isCookie = Boolean(cookies["CGPA.COM"]);
    console.log(isCookie)
    setIsAuthenticated(isCookie)
  }, [cookies]);


  return (
    <>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
