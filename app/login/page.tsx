"use client";
import { postProprtyOfUser } from "@/lib/features/property/propertyAPI";
import { postCreateNewUser, postLoginUser } from "@/lib/features/user/userAPI";
import {
  changeState,
  getuserLoginAsync,
  selectLoggedIn,
  selectStatus,
} from "@/lib/features/user/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, CircularProgress } from "@mui/material";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userStatus = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const [showSpinner, setShowSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(changeState())
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      dispatch(getuserLoginAsync(data));
    }, 1000); // Show spinner for 1 second
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <div className="py-20" style={{ marginTop: "200px" }}>
        <div className="flex h-full items-center justify-center">
          <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                <form
                  className="flex flex-col gap-4 pb-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Logo and header */}
                  <div className="flex flex-col items-center justify-center gap-2 mb-4">
                    <a href="https://amethgalarcio.web.app/" target="_blank">
                      <img src="/assets/logo/logo.png" className="w-8" />
                    </a>
                    <p className="m-0 text-[16px] font-semibold dark:text-white">
                      Login to your Account
                    </p>
                    <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                      Get started with our app, just start section and enjoy
                      experience.
                    </span>
                  </div>

                  {/* Email input */}
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        {...register("identifier", {
                          required: true,
                          maxLength: 80,
                        })}
                      />
                    </div>
                    {errors.identifier && <span>This field is required</span>}
                  </div>

                  {/* Password input */}
                  <div>
                    <div className="mb-2">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="password"
                      >
                        Password
                      </label>
                    </div>
                    <div className="flex w-full rounded-lg pt-1">
                      <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                        id="password"
                        type="password"
                        {...register("password", {
                          required: true,
                          maxLength: 80,
                        })}
                      />
                    </div>
                    {errors.password && <span>This field is required</span>}
                    <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
                      Forgot password?
                    </p>
                  </div>

                  {/* Error message for invalid credentials */}
                  {userStatus === "failed" && (
                    <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                      <svg
                        viewBox="0 0 24 24"
                        className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                      >
                        <path
                          fill="currentColor"
                          d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                        ></path>
                      </svg>
                      <span className="text-red-800">
                        Invalid Credentials, please try again.
                      </span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
  type="submit"
  className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg min-w-[100px]"
>
  {showSpinner ? (
    <div className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
      <CircularProgress color="inherit" size={20} />
    </div>
  ) : (
    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base">
      Login
    </span>
  )}
</button>

                </form>

                {/* Link to sign up */}
                <div className="min-w-[270px]">
                  <div className="mt-4 text-center dark:text-gray-200">
                    New user?
                    <Link
                      className="text-blue-500 underline px-2 hover:text-blue-600"
                      href="/signup"
                    >
                      Create account here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
