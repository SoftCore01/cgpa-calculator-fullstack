import { Navigate } from "react-router-dom";
import SigninForm from "../components/authComponents/SigninForm";

export default function SigninPage({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-10">Sign In</h1>
      <SigninForm />
    </div>
  );
}
