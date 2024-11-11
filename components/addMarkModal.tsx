"use client";

import { convertToEngNumber } from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  prop: any;
};

export default function AddMarkModal({ prop }: Props) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [code, setCode] = useState("");
  const [mark, setMark] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearState = () => {
    setCode("");
    setMark("");
    setError("");
    setLoading(false);
  };
  const crateUser = async (code: string, mark: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roll/mark`, {
        method: "POST",
        body: JSON.stringify({
          exampaperCode: convertToEngNumber(code),
          marks: Number(convertToEngNumber(mark)),
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
        prop.setOpenModal(undefined);
        clearState();
      }
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="false"
      className={`${
        prop.openModal === "mark-modal" ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 md:inset-0 h-[84vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg ml-6 font-semibold text-gray-900 dark:text-white">
              পরীক্ষার্থীর প্রাপ্ত নম্বর অ্যাড করুন
            </h3>
            <button
              onClick={(e) => {
                clearState();
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
              <div className="p-6 space-y-6">
                <div className="font-semibold text-[15px]">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                      >
                        উত্তরপত্র কোড
                      </label>
                      <input
                        type="text"
                        value={code}
                        name="name"
                        id="first-name"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="42342"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="examCode"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        প্রাপ্ত নম্বর
                      </label>
                      <input
                        type="text"
                        name="examCode"
                        id="examCode"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="92"
                        required
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
            <div className="mt-6 ml-6 flex gap-x-4 pb-4">
              <button
                disabled={loading}
                onClick={() => {
                  if (code && mark) {
                    if (Number(convertToEngNumber(mark)) <= 100) {
                      crateUser(code, mark);
                    } else {
                      setError("সর্বোচ্চ মার্ক ১০০ এর মধ্যে হতে হবে");
                    }
                  } else {
                    setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                  }
                }}
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-3 md:px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6 hidden"
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
                {loading ? (
                  <svg
                    className="animate-spin px-2 h-5 w-5 text-white"
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
                  <p>
                    <span className="hidden">প্রাপ্ত</span> নম্বর অ্যাড করুন
                  </p>
                )}
              </button>
              <button
                onClick={() => {
                  prop.setOpenModal(undefined);
                  setCode("");
                  setMark("");
                  setError("");
                  setLoading(false);
                }}
                className="text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-md px-2 md:px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
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
