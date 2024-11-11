/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  prop: any;
};

export default function DeleteStudentModal({ prop }: { prop: any }) {
  const { data: session } = useSession();
  const user: any = session?.user;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearState = () => {
    setError("");
    setLoading(false);
  };

  const delteSchool = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roll/${prop?.user?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user?.accessToken,
          },
        }
      );
      const data = await res.json();

      if (data.error) {
        setError(data?.message);
        setLoading(false);
      } else {
        prop.setStudent(prop?.data.filter((s: any) => s?.id !== data?.id));
        clearState();
        prop.setOpenModal(undefined);
      }
    } catch (e: any) {
      setLoading(false);
      setError(e?.message);
    }
  };
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="false"
      className={`${
        prop.openModal === String(prop?.user?.id) + "delete"
          ? "block"
          : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 h-[81vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
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

            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                আপনি কি নিশ্চিত এই পরীক্ষার্থীকে ডিলিট করবেন?
              </h3>

              <div className="mt-12">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={delteSchool}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-md inline-flex items-center px-5 py-2.5 text-center mr-3 md:mr-8"
                >
                  হ্যাঁ, আমি নিশ্চিত
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={(e) => {
                    clearState();
                    prop.setOpenModal(undefined);
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-md font-semibold px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  না, বাতিল
                </button>
              </div>
            </div>

            {/* error message */}
            <div>
              {error && (
                <p className="text-center text-red-500 text-md font-semibold">
                  ইরর ম্যাসেজ: {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
