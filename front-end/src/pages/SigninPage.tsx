import SigninForm from "../components/SiginForm";

export default function SigninPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="mb-10">Sign In</h1>
      <SigninForm />
    </div>
  );
}
