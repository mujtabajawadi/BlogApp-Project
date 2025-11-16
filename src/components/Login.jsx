import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Input, Button, Logo, Loader } from "./index";
import obj_AuthService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await obj_AuthService.login(data);
      if (session) {
        const userData = await obj_AuthService.getCurrentUser();
        // console.log(userData)
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="{`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="className='mt-8'">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email: "
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter password"
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 8,
              })}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? "transparent" : "blue",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <Loader className="flex justify-center items-center" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
