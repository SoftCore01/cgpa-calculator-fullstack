import { Navigate } from "react-router-dom";
import SignupForm from "../components/authComponents/SignUpForm";

export default function SignupPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>SignUp Page</h1>
      <SignupForm />
    </div>
  );
}
