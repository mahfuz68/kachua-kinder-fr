"use client";

import { convertToEngNumber } from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  prop: any;
};

export default function AddModal({ prop }: Props) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [eiin, setEiin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const clearState = () => {
    setName("");
    setMobile("");
    setSchoolName("");
    setEiin("");
    setPassword("");
    setError("");
  };

  const crateUser = async (
    name: string,
    mobile: string,
    schoolName: string,
    eiin: string,
    password: string
  ) => {
    setLoading(true);
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        mobile: convertToEngNumber(mobile),
        role: ["TEACHER"],
        schoolName,
        eiin: Number(convertToEngNumber(eiin)),
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.accessToken,
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setLoading(false);
    } else {
      prop.setAllUser([data, ...prop.allUser]);
      clearState();
      prop.setOpenModal(undefined);
      setLoading(false);
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="false"
      className={`${
        prop.openModal === "form-modal" ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 md:inset-0 h-[81vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg ml-6 font-semibold text-gray-900 dark:text-white">
              ইউজার এড করুন
            </h3>
            <button
              onClick={(e) => {
                clearState();
                setLoading(false);
                prop.setOpenModal(undefined);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div>
            {/* main body where edited */}
            <div className="space-y-6">
              <div className="px-6 py-5 space-y-6">
                <div className="font-semibold text-[15px]">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                      >
                        নাম
                      </label>
                      <input
                        type="text"
                        value={name}
                        name="name"
                        id="first-name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="জাকির হোসেন মজুমদার"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        মোবাইল নাম্বার
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="01**********"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="school"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        স্কুলের নাম
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        id="school"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="বরুচর প্রগতি শিশু শিক্ষা নিকেতন"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        EIIN
                      </label>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={eiin}
                        onChange={(e) => setEiin(e.target.value)}
                        name="position"
                        id="position"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="e.g. 183423"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="current-password"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        পাসওয়ার্ড
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="current-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="••••••••"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* error message */}
            <div>
              {error && (
                <p className="ml-6 text-red-500 text-md font-semibold">
                  ইরর ম্যাসেজ: {error}
                </p>
              )}
            </div>
            <div className="mt-4 ml-6 flex gap-x-4 pb-10 md:pb-4">
              <button
                onClick={(e) => {
                  console.log("fire onclick event");

                  if (name && mobile && schoolName && eiin && password) {
                    crateUser(name, mobile, schoolName, eiin, password);
                  } else {
                    setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                  }
                }}
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-3 md:px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <svg
                    className="animate-spin ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx={12}
                      cy={12}
                      r={10}
                      stroke="currentColor"
                      strokeWidth={4}
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="mr-1 -ml-1 w-6 h-6 hidden md:block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="hidden md:block">ইউজার অ্যাড করুন</span>
                <span className="block md:hidden">ইউজার অ্যাড</span>
              </button>
              <button
                onClick={() => {
                  clearState();
                  setLoading(false);
                  prop.setOpenModal(undefined);
                }}
                className="text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-md px-3 md:px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                type="submit"
              >
                বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
