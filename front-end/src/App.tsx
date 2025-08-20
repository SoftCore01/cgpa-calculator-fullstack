import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {Toaster} from 'sonner'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["CGPA.COM"]);

  //context states


  useEffect(() => {
    const isCookie = Boolean(cookies["CGPA.COM"]);
    setIsAuthenticated(isCookie)
  }, [cookies]);


  return (
    <>
        <Routes>
          <Route
            path="/signin"
            element={<SigninPage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<SignupPage isAuthenticated={isAuthenticated} />}
          />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
        <Toaster theme="dark" />
    </>
  );
}

export default App;
