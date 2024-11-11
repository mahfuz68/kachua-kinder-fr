"use client";

import {
  BanglaToEnglishNumber,
  englishToBanglaNumber,
} from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  prop: any;
};

export default function EditResultModal({ prop }: { prop: any }) {
  const { data: session } = useSession();
  const user: any = session?.user;

  const [exampaperCode, setExamPaperCode] = useState<string>(
    String(prop?.exampaperCode)
  );
  const [marks, setMarks] = useState(prop?.marks);
  const [result, setResult] = useState(prop?.result);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputFile = () => {
    setExamPaperCode("");
    setMarks("");
    setResult("");
    setError("");
    setLoading(false);
  };

  const updateStudent = async (
    exampaperCode: string,
    marks: string | number,
    result: string
  ) => {
    if (result) {
      let emark;

      const bRoll = englishToBanglaNumber(+marks);
      if (bRoll) {
        emark = +marks;
      } else {
        const engconv = BanglaToEnglishNumber(marks);
        emark = +engconv;
      }

      const body = {
        id: prop?.id,
        exampaperCode,
        marks: emark,
        result,
      };
      try {
        setError("");
        setLoading(true);

        const req = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/examcenter/centerresult/${prop?.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
          }
        );
        const res = await req.json();

        if (res?.error) {
          setError(res.error);
          setLoading(false);
        } else {
          prop.setStd([
            ...prop?.data.map((std: any) => {
              if (std?.id !== res?.id) {
                return std;
              } else {
                return res;
              }
            }),
          ]);

          clearInputFile();

          prop.setOpenModal(undefined);
        }
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
      }
    } else {
      setLoading(false);
      setError("ডাটা লোড হওয়ার জন্য অপেক্ষা করুন");
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="false"
      className={`${
        prop.openModal === prop?.id ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 h-[81vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg ml-6 font-semibold text-gray-900 dark:text-white">
              পরীক্ষার্থীর ফলাফল ইডিট করুন
            </h3>
            <button
              onClick={(e) => {
                clearInputFile();
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
                        className="block mb-2 font-semibold text-md text-gray-900 dark:text-white"
                      >
                        খাতা কোড
                      </label>
                      <input
                        type="text"
                        value={exampaperCode}
                        name="name"
                        id="first-name"
                        onChange={(e) => {
                          setExamPaperCode(e.target.value);
                        }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="324221"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        বৃত্তি স্ট্যাটাস
                      </label>
                      <select
                        id="countries"
                        value={result}
                        name="countries"
                        onChange={(e) => {
                          setResult(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="NOTHING">প্রযোজ্য নয়</option>
                        <option value="GENERALGRADE">সাধারণ গ্রেড</option>
                        <option value="TALENTPOOL">ট্যালেন্ট পুল</option>
                        <option value="SPECIALGRADE">স্পেশাল গ্রেড</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="school"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        প্রাপ্ত নম্বর
                      </label>
                      <input
                        type="number"
                        pattern="[0-9]*"
                        name="school"
                        value={marks}
                        autoFocus
                        onChange={(e) => setMarks(e.target.value)}
                        onKeyDown={(e) => {
                          e.key === "Enter" &&
                            updateStudent(exampaperCode, marks, result);
                        }}
                        id="school"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="10"
                        required={true}
                      />
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
              disabled={loading}
              onClick={() => {
                if (exampaperCode) {
                  updateStudent(exampaperCode, marks, result);
                  //   crateUser(name, mobile, schoolName, eiin, password);
                } else {
                  setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                }
              }}
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-1 -ml-1 w-5 h-5 hidden md:block"
                >
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              )}

              <span className="hidden md:block">পরিক্ষার্থী ইডিট করুন</span>
              <span className="block md:hidden">ইডিট করুন</span>
            </button>
            <button
              onClick={() => {
                clearInputFile();
                prop.setOpenModal(undefined);
              }}
              className="text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-md px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
              type="submit"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
