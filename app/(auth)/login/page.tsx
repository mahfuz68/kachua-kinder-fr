"use client";

import { Button, Label, Spinner } from "flowbite-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import sv from "./dd.svg";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const handleEye = () => {
    setEye(!eye);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        username: mobile.toString(),
        password: password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`font-hind min-h-[100vh] bg-slate-200 `}>
      <div className="flex justify-center items-center">
        <div className=" grid grid-flow-col mx-auto gap-12 items-center -mt-10 min-h-screen">
          <div className=" flex lg:w-1/4 min-w-lg flex-col gap-4 min-w-[300px]">
            <div className="text-4xl font-bold mt-4 text-center text-indigo-700">
              লগইন <span className="text-black">করুন</span>
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email2"
                  className="text-[16px] dark:text-gray-900"
                  value="আপনার মোবাইল নাম্বার"
                />
              </div>
              <input
                id="email2"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 px-4 border-gray-300 text-gray-900 dark:text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-100  dark:placeholder-inigo-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 p-2.5 text-md rounded-lg shadow-sm lg:text-[17px]"
                placeholder="01*********"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-[16px] dark:text-gray-900"
                  htmlFor="password2"
                  value="আপনার পাসওয়ার্ড"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <input
                  type={`${eye ? "text" : "password"}`}
                  id="password2"
                  onKeyDown={(e) => {
                    e.key === "Enter" && onSubmit(e);
                  }}
                  className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 px-4 border-gray-300 text-gray-900 dark:text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 bg-indigo-100 dark:placeholder-inigo-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 p-2.5 text-md rounded-lg shadow-sm lg:text-[17px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <AiFillEye
                  onClick={handleEye}
                  className={`absolute right-2.5 top-2.5 h-6 w-6 ${
                    !eye ? "text-gray-400" : "text-primary-800"
                  } ${password.length > 0 ? "block" : "hidden"}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 ">
              <Label className="flex gap-4" htmlFor="agree">
                <Link
                  className="text-indigo-700 hidden hover:underline dark:text-indigo-500 "
                  href="/register "
                  rel="prefetch"
                >
                  <div className="text-md">নতুন একাউন্ট তৈরী করুন</div>
                </Link>
              </Label>
            </div>
            <Button
              className="bg-indigo-600 enabled:hover:bg-indigo-700 focus:ring-indigo-400 dark:bg-indigo-600 
           dark:enabled:hover:bg-indigo-700 dark:focus:ring-indigo-600"
              type="submit"
              onClick={onSubmit}
              disabled={loading}
            >
              <Spinner
                className={loading ? "block" : "hidden"}
                aria-label="Medium sized spinner example"
              />
              <p className="text-[16px] pl-4">লগইন করুন</p>
            </Button>
            {/* <Button
              className="bg-indigo-600 enabled:hover:bg-indigo-700 focus:ring-indigo-400"
              type="submit"
              onClick={signOut}
            >
              <p className="text-[16px]">লগইন আউট</p>
            </Button> */}
          </div>
          <div className="hidden lg:block">
            <Image
              alt="..."
              src={sv}
              width={700}
              height={500}
              priority={true}
              className="w-[28rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
