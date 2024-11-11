"use client";

import AddCenterModal from "@/components/addCenterModal";
import AllSchoolTable from "@/components/allSchoolTable";
import TableComponet from "@/components/tableComponent";
import { englishToBanglaNumber } from "@/lib/numberTranslate";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

/* eslint-disable @next/next/no-img-element */
type Props = {};

export default function Page({ params }: { params: { id: string } }) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { data: session } = useSession();
  const user: any = session?.user;
  const examId = params.id;
  const [examcenter, setExamCenter] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState("examhall");

  const [allUser, setAllUser] = useState<any>([]);
  const [allSchool, setAllSchool] = useState<any>([]);
  const [classN, setClassN] = useState<string>("ONE");
  const [orderby, setOrderby] = useState<string>("roll");
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const isNextExist = count > page * 15;
  const [scount, setsCount] = useState<number>(0);
  const [spage, setsPage] = useState<number>(1);
  const issNextExist = scount > spage * 15;

  const sprop = { openModal, setOpenModal, examcenter, setExamCenter, examId };

  useEffect(() => {
    const getAllUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/student/${examId}?page=${page}&classs=${classN}&orderby=${orderby}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data?.error) {
          setLoading(false);
          data && setAllUser(data?.Students);
          data && setCount(data?.count);
        }
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
      }
    };
    user && examId && getAllUser();
  }, [user, page, examId, classN, orderby]);

  useEffect(() => {
    const getAllSchool = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/school/${examId}?page=${spage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!data?.error) {
          setLoading(false);
          data && setAllSchool(data?.School);
          data && setsCount(data?.count);
        } else {
          setLoading(false);
        }
      } catch (e: any) {
        setLoading(false);
      }
    };
    user && examId && getAllSchool();
  }, [user, spage, examId]);

  useEffect(() => {
    const getAllExamCenter = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/examcenter/${examId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        data && setExamCenter(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    // user && getAdmitCard();
    user && examId && getAllExamCenter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const allCenter = (
    // heding exam center
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 flex items-center">
        <div className=" mx-auto w-full">
          {/* Start coding here */}
          <div className="relative bg-white shadow-md dark:bg-gray-800">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
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
                <button
                  type="button"
                  onClick={() => setOpenModal("form-modal")}
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
                  পরীক্ষা কেন্দ্র অ্যাড করুন
                </button>
                <AddCenterModal prop={sprop} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Exam Center */}
      <div className="px-5 pt-5 min-h-[70vh] dark:bg-gray-700 pb-20">
        <div className="grid gap-8 lg:grid-cols-2 gap-y-3">
          {examcenter.length > 0 &&
            examcenter.map((center: any) => (
              <Link
                key={center.id}
                href={`/dashboard/exam/center/${center.id}`}
                rel="prefetch"
              >
                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between mb-5">
                    <div className="flex items-center gap-x-1 text-primary-800 text-sm font-medium  dark:bg-primary-200 dark:text-primary-800 px-2.5 py-0.5 rounded">
                      <AiFillClockCircle />
                      <h2>{center.totalSeat} seats</h2>
                    </div>
                    <button>
                      <HiMiniPencilSquare className="w-5 h-5 dark:text-white" />
                    </button>
                  </div>
                  <div className=" mb-5 text-gray-500">
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      কেন্দ্রের নামঃ {center.name}
                    </h2>
                  </div>

                  <p className="mb-2  text-gray-500 text-lg dark:text-gray-200 ">
                    কেন্দ্রের ঠিকানাঃ {center.address}
                  </p>
                  <p className="mb-2 text-gray-500 text-lg  dark:text-gray-200 ">
                    {`কেন্দ্রের অন্তর্ভুক্ত স্কুল সংখ্যাঃ
                    ${englishToBanglaNumber(
                      center?._count?.ExamWiseSchool
                    )} টি`}
                  </p>
                  <p className="text-gray-500 text-lg  dark:text-gray-200 ">
                    {`কেন্দ্রের পরীক্ষার্থীর সংখ্যাঃ 
                    ${englishToBanglaNumber(
                      center?._count?.ExamWiseStudent
                    )} জন`}
                  </p>
                </article>
              </Link>
            ))}
        </div>
      </div>
      {/* End Exam center */}
    </div>
  );

  const headingList = {
    examhall: "পরীক্ষার কেন্দ্রসমূহ",
    allSchool: "পরীক্ষায় অন্তর্ভূক্ত স্কুলসমূহ",
    allStudent: "সকল পরীক্ষার্থী",
  };

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
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              rel="prefetch"
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
          <li>
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
              <Link
                href="/dashboard/exam"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white "
              >
                পরীক্ষা
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      {/* tabs */}

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-md font-medium text-center text-gray-200 dark:text-gray-400 dark:bg-gray-800 pl-4">
          <li className="mr-2">
            <button
              onClick={(e) => setTab("examhall")}
              className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active  group gap-x-1 font-semibold ${
                tab == "examhall"
                  ? "dark:text-blue-500 dark:border-blue-500 text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:text-white "
              }`}
            >
              <PiStudentBold className="h-6 w-6" />
              পরীক্ষার কেন্দ্রসমূহ
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={(e) => setTab("allStudent")}
              className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active  group gap-x-1 font-semibold ${
                tab == "allStudent"
                  ? "dark:text-blue-500 dark:border-blue-500 text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:text-white "
              }`}
              aria-current="page"
            >
              <MdSpaceDashboard className="h-6 w-6" /> সকল পরীক্ষার্থী
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={(e) => setTab("allSchool")}
              className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active  group gap-x-1 font-semibold ${
                tab == "allSchool"
                  ? "dark:text-blue-500 dark:border-blue-500 text-blue-600 border-blue-600"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:text-white "
              }`}
            >
              <PiStudentBold className="h-6 w-6" />
              সকল স্কুল
            </button>
          </li>
        </ul>
      </div>

      {/* tabs end */}

      <div>
        <h1 className="px-3 text-xl dark:bg-gray-800 font-semibold text-gray-800 sm:text-2xl dark:text-white pt-4">
          {tab == "examhall"
            ? headingList.examhall
            : tab == "allStudent"
            ? headingList.allStudent
            : headingList.allSchool}
        </h1>
      </div>

      {tab === "examhall" && allCenter}

      {tab === "allStudent" && (
        <div>
          <div className="bg-gray-50 dark:bg-gray-900 flex items-center">
            <div className=" mx-auto w-full">
              {/* Start coding here */}
              <div className="relative bg-white shadow-md dark:bg-gray-800">
                <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
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
                    <select
                      id="countries"
                      value={orderby}
                      name="countries"
                      onChange={(e) => {
                        setsPage(1);
                        setOrderby(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">ফিল্টার করুন</option>
                      <option value="roll">রোল অনুযায়ী</option>
                      <option value="mark">নম্বর অনুযায়ী</option>
                    </select>
                    <select
                      id="countries"
                      value={classN}
                      name="countries"
                      onChange={(e) => {
                        setPage(1);
                        setClassN(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">শ্রেনী সিলেক্ট করুন</option>
                      <option value="ONE">প্রথম শ্রেণী</option>
                      <option value="TWO">দ্বিতীয় শ্রেণী</option>
                      <option value="THREE">তৃতীয় শ্রেনী</option>
                      <option value="FOUR">চতুর্থ শ্রেনী</option>
                      <option value="FIVE">পঞ্চম শ্রেনী</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableComponet data={allUser} />

          <div className="md:sticky pb-20 md:pb-4 md:mb-0 md:bottom-0 md:right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "opacity-50" : ""
                }`}
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                disabled={!isNextExist}
                onClick={() => setPage(page + 1)}
                className={`inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  isNextExist ? "" : "opacity-50"
                }`}
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="text-md font-normal text-gray-500 dark:text-gray-400">
                দেখছেন{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {`${(page - 1) * 15 + 1} - ${
                    (page - 1) * 15 + allUser.length
                  }`}
                </span>{" "}
                মোট{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {count}
                </span>{" "}
                জন ইউজার
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  page === 1 ? "opacity-50" : ""
                }`}
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!isNextExist}
                className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  isNextExist ? "" : "opacity-50"
                }`}
              >
                পরবর্তী
                {loading ? (
                  <svg
                    className="animate-spin ml-2 mr-3 h-5 w-5 text-white"
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
                    className="w-5 h-5 ml-1 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "allSchool" && (
        <div className="dark:bg-gray-800 pt-4">
          <div className=" mx-auto w-full">
            {/* Start coding here */}
            <div className="relative bg-white shadow-md dark:bg-gray-800">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
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
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/roll/schoollist/${examId}`}
                    target="_blank"
                    className="inline-flex items-center justify-center w-1/2 px-3 py-2 font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-md"
                  >
                    <svg
                      className="w-5 h-5 mr-2 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    ডাউনলোড
                  </a>
                </div>
              </div>
            </div>
          </div>

          <AllSchoolTable data={allSchool} />

          <div className="md:sticky pb-20 md:pb-4 md:mb-0 md:bottom-0 md:right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <button
                onClick={() => setPage(spage - 1)}
                disabled={spage === 1}
                className={`inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  spage === 1 ? "opacity-50" : ""
                }`}
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                disabled={!issNextExist}
                onClick={() => setPage(spage + 1)}
                className={`inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  issNextExist ? "" : "opacity-50"
                }`}
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span className="text-md font-normal text-gray-500 dark:text-gray-400">
                দেখছেন{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {`${(spage - 1) * 15 + 1} - ${
                    (spage - 1) * 15 + allSchool.length
                  }`}
                </span>{" "}
                মোট{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {scount}
                </span>{" "}
                টি স্কুল
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setsPage(spage - 1)}
                disabled={spage === 1}
                className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  spage === 1 ? "opacity-50" : ""
                }`}
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setsPage(spage + 1)}
                disabled={!issNextExist}
                className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  issNextExist ? "" : "opacity-50"
                }`}
              >
                পরবর্তী
                {loading ? (
                  <svg
                    className="animate-spin ml-2 mr-3 h-5 w-5 text-white"
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
                    className="w-5 h-5 ml-1 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
    </main>
  );
}
