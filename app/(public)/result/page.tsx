"use client";

import { bang } from "@/lib/font";
import { BanglaToEnglishNumber } from "@/lib/numberTranslate";
import { useState } from "react";

type Props = {};

export default function Page({}: Props) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [roll, setRoll] = useState<string>("");
  const resultType: any = {
    TALENTPOOL: "ট্যলেন্টপুল বৃত্তি পেয়েছে।",
    NOTHING: "বৃত্তি পাওয়ার উপযুক্ত নম্বর পায়নি।",
    GENERALGRADE: "সাধারণ গ্রেডে বৃত্তি পেয়েছে।",
    SPECIALGRADE: "ট্যলেন্টপুল বৃত্তি পেয়েছে।",
  };
  const searchHandle = (e: any) => {
    if (roll.length > 3) {
      try {
        e.preventDefault();
        setResult(false);
        setError("");
        setLoading(true);
        const nRoll = Number(roll) ? Number(roll) : BanglaToEnglishNumber(roll);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/exresult?roll=${nRoll}`)
          .then((res) => res.json())
          .then((res) => {
            res?.result
              ? setResult(res)
              : setError("সঠিক রোল নং দিন (ইংরেজিতে)");
            setLoading(false);
          })
          .catch((err: any) => {
            setError(err?.message);
            setLoading(false);
          });
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    } else {
      setResult(false);
      setError("সঠিক রোল নং দিন (ইংরেজিতে)");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[66vh] bg-gray-300 pt-20">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-72 md:w-96 mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none justify-center">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="number"
          id="search"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:text-[15px]"
          placeholder="রোল নং"
          required={true}
          onKeyDown={(e) => e.key === "Enter" && searchHandle(e)}
        />
        <button
          type="submit"
          onClick={searchHandle}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          সার্চ করুন
        </button>
      </div>
      <div className="flex justify-center items-center ">
        {!result && loading && (
          <div className="text-center mt-14">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-400 animate-spin dark:text-gray-600 fill-indigo-700"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!result && error && !loading && (
          <p className="text-red-500 text-lg lg:text-xl font-bold mt-5">
            {error}
          </p>
        )}
        {!error && (
          <div className="text-xl text-gray-800 px-2 mt-5">
            {result?.result === "NOTPUBLISHED" ? (
              <div className="text-xl text-gray-800 px-2">
                ফলাফল প্রকাশিত হয়নি।
              </div>
            ) : result?.roll ? (
              <div className="text-xl text-gray-800 px-2 font-medium">
                <p>KACHUA KINDERGARTEN ASSOCIATION SCHOLARSHIP EXAM - 2025</p>
                <p>{`স্কুলের নামঃ ${result?.schoolName}`}</p>
                <p>
                  রোলঃ{" "}
                  {result?.roll && (
                    <span className={bang.className}>{result.roll}</span>
                  )}
                </p>

                <p>{`নামঃ ${result?.name}`}</p>
                <p className="font-semibold">{`বৃত্তিঃ ${
                  resultType[result?.result]
                }`}</p>
              </div>
            ) : (
              !error && (
                <p className="text-red-500 text-lg lg:text-xl font-bold mt-5">
                  {error}
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
