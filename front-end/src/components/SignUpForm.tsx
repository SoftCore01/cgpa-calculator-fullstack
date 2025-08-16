import { useForm, type SubmitHandler } from "react-hook-form";
import { signupSchema, type SignUpSchema, } from "../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { endPoint } from "../utils/endPoints";
import { BASEURL } from "../utils/Contants";
import { useNavigate } from "react-router-dom";
import type { ApiResponse } from "../utils/types";


const signupUrl = BASEURL + endPoint.auth.signup

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
    try {
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiResponse: ApiResponse = await response.json();
      console.log(apiResponse.message, typeof apiResponse.success)
        if (!apiResponse.success) {
          console.log('yes')
        setError("root", {
          message: apiResponse.message,
        });
      }

      if (apiResponse.success) {
        navigate("/signin"); //navigate to the homePage route
      }
    } catch (error) {
      setError("root", {
        message: `${error}`
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
          className="h-10 rounded-2xl px-3 my-2"
          {...register("username")}
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        {errors.email && (
          <div className="px-3 my-2 text-red-800 text-sm">
            {errors.username?.message}
          </div>
        )}
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
        <button
          className=" mx-auto my-3 "
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="px-3 my-2 text-red-800 text-md text-center">
            {errors.root.message}
          </div>
        )}
      </form>
    </>
  );
}
