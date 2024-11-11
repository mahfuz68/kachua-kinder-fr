"use client";

import { convertToEngNumber } from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = {
  prop: any;
};

export default function AddExamModal({ prop }: Props) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [schoolName, setSchoolName] = useState("");
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [password, setPassword] = useState<Date | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const clearState = () => {
    setName("");
    setMobile("");
    setSchoolName("");
    setPassword(undefined);
    setError("");
    setLoading(false);
  };
  const crateUser = async (
    name: string,
    mobile: string,
    schoolName: string,
    password: Date
  ) => {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        code: Number(convertToEngNumber(mobile)),
        examYear: Number(convertToEngNumber(schoolName)),
        formFillupD: password,
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
      prop.setAllExam([...prop.allExam, data]);
      clearState();
      prop.setOpenModal(undefined);
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
              পরীক্ষা এড করুন
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
                className="w-5 h-5 "
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
                        পরীক্ষার নাম
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
                        placeholder="বৃত্তি পরীক্ষা ২০২৩"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="examCode"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        পরীক্ষা কোড
                      </label>
                      <input
                        type="text"
                        name="examCode"
                        id="examCode"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="23"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="school"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        পরীক্ষার বছর
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        id="school"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="2023"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        ফরম ফিলাপের শেষ সময়
                      </label>
                      <div className="text-white -mx-4">
                        <DayPicker
                          mode="single"
                          className="m-0 p-0"
                          selected={password}
                          onSelect={setPassword}
                          footer={false}
                        />{" "}
                      </div>
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
            <div className="mt-6 ml-6 flex gap-x-4 pb-10 md:pb-4">
              <button
                onClick={() => {
                  console.log("fire onclick event");
                  if (name && mobile && schoolName && password) {
                    crateUser(name, mobile, schoolName, password);
                  } else {
                    setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                  }
                }}
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-3 md:px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
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
                <span>পরীক্ষা</span> অ্যাড করুন
              </button>
              <button
                onClick={() => {
                  clearState();
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
