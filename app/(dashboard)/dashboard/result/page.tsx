"use client";
import AddCodeModal from "@/components/addCodeModal";
import AddMarkModal from "@/components/addMarkModal";
import Loading from "@/components/loading";
import TableLoading from "@/components/tableLoading";
import UserTable from "@/components/userTable";
import { convertToEngNumber } from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
type Props = {};

export default function Page({}: Props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { data: session, status } = useSession();
  const user: any = session?.user;

  const [allUser, setAllUser] = useState<any>([]);
  const [student, setStudent] = useState<any>({});
  const [rollNo, setRollNo] = useState("");
  const sprop = { openModal, setOpenModal, student, setStudent };
  const prop = { openModal, setOpenModal };
  const [loading, setLoading] = useState<boolean>(false);
  const [dloading, setDloading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const isNextExist = count > page * 15;
  const length = allUser.length;

  const handleSearchRoll = async () => {
    if (rollNo.toString().length >= 4) {
      try {
        setError("");
        setLoading(true);
        const roll = convertToEngNumber(rollNo);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roll/getbyroll/${roll}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
          }
        );
        const data = await res.json();

        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setStudent(data);
          setLoading(false);
          setError("");
          setOpenModal("code-modal");
          setRollNo("");
        }
      } catch (e: any) {
        setError(e?.message);
        setLoading(false);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  if (status === "loading") {
    return <Loading />;
  } else {
    return (
      <main className="sm:ml-64">
        <nav
          className="pt-5 bg-gray-50 dark:bg-gray-800 p-2"
          aria-label="Breadcrumb "
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/dashboard"
                prefetch={true}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                ড্যাশবোর্ড
              </Link>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  রেজাল্ট
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="px-4 py-3 md:py-0 md:text-xl dark:bg-gray-800 font-semibold text-gray-800 text-2xl dark:text-white">
            রেজাল্ট অ্যাড{" "}
            <span className="font-semibold text-sm ml-7">
              (উত্তরপত্র কোড এড করতে আগে রোল নং পূরণ করুন)
            </span>
          </h1>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 flex items-center">
          <div className=" mx-auto w-full">
            {/* Start coding here */}
            <div className="relative bg-white shadow-md dark:bg-gray-800">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <form className=" flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleSearchRoll();
                    }}
                    id="position"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-44 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="রোল নং"
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={handleSearchRoll}
                    className="flex items-center justify-center px-4 py-2 text-md font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
                    অ্যাড উত্তরপত্র কোড
                  </button>
                  <AddCodeModal prop={sprop} />
                  <button
                    type="button"
                    onClick={() => setOpenModal("mark-modal")}
                    className="flex items-center justify-center px-4 py-2 text-md font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    অ্যাড প্রাপ্ত নম্বর
                  </button>
                  <AddMarkModal prop={prop} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="text-center text-red-500 py-3 bg-gray-800">
            ইরর ম্যাসেজঃ {error}
          </div>
        )}

        {dloading && !length ? (
          <TableLoading />
        ) : (
          <UserTable data={allUser} sdata={setAllUser} />
        )}
      </main>
    );
  }
}
