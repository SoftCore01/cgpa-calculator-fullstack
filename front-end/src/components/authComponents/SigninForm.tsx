import { useForm, type SubmitHandler } from "react-hook-form";
import { signinSchema, type SignInSchema } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { endPoint } from "../../utils/endPoints";
import { BASEURL } from "../../utils/Contants";
import { Link, useNavigate } from "react-router-dom";
import type { SigninResponse } from "../../utils/types";
import { useAtom } from "jotai";
import { usernameAtom } from "../../store/atoms";
import Button from "../Button";
import { toast } from "sonner";


const signinUrl = BASEURL + endPoint.auth.signin;

export default function SigninForm() {
  const navigate = useNavigate();
  const [, setUsername] = useAtom(usernameAtom)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = async (data: SignInSchema) => {

    try {
      const response = await fetch(signinUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiResponse: SigninResponse = await response.json();
      
      if (!apiResponse.success) {
        setError("root", {
          message: apiResponse.message,
        });
      }

      if (apiResponse.success) {
        setUsername(apiResponse.data)
        toast.success('Signin Successful')
        navigate("/"); //navigate to the homePage route
      }
    } catch (error) {
      console.log(error)
      setError("root", {
        message: `An error occured while trying to signin. Please check your internet connect and try again`,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen px-3 sm:max-w-[500px]"
      >
        <input
          className="h-10 rounded-2xl px-3"
          {...register("email")}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && (
          <div className="px-3 text-red-800 text-sm">
            {errors.email.message}
          </div>
        )}
        <input
          className="h-10 rounded-2xl px-3 my-2"
          {...register("password")}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        {errors.password && (
          <div className="px-3 my-2 text-red-800 text-sm">
            {errors.password.message}
          </div>
        )}
        <Button
          className=" mx-auto my-3 "
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
        {errors.root && (
          <div className="px-3 my-2 text-red-800 text-md text-center">
            {errors.root.message}
          </div>
        )}
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="w-20 text-center text-white hover:text-[#646cff]"
          >
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
