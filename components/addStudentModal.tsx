"use client";

import {
  BanglaToEnglishNumber,
  englishToBanglaNumber,
} from "@/lib/numberTranslate";
import axios from "axios";
import { Progress } from "flowbite-react";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";

type Props = {
  prop: any;
};

export default function AddStudentModal({ prop }: Props) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const inputFile = useRef<any>(null);

  const [name, setName] = useState("");
  const [classRoll, setClassRoll] = useState("");
  const [cless, setClass] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const { examId, examCenter, examWiseStudent, setExamWiseStudent, id } = prop;

  const formData = new FormData();
  // formData.append("cloud_name", "dc9nekouu");
  // formData.append("upload_preset", "culkk4cb");
  // formData.append("folder", "avatar");

  const clearFileInput = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      !avatarId && setAvatarId("b78f79b0-f3ac-4829-8fe1-afbd7fa44fdf");
      if (name && fatherName && classRoll && cless && avatarId) {
        createStudent(name, classRoll, cless, fatherName, motherName, avatarId);
        //   crateUser(name, mobile, schoolName, eiin, password);
      } else {
        setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
      }
    }
  };

  const clearInputFile = () => {
    setName("");
    setFatherName("");
    setClass("");
    setClassRoll("");
    setMotherName("");
    setFile(null);
    setError("");
    setUploadProgress(0);
    setUpLoading(false);
    setLoading(false);
    setAvatarId("");
    clearFileInput();
  };

  const uploadFile = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setUploadProgress(0);
      setUpLoading(true);
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/student/uploadavatar/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + user?.accessToken,
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/student/uploadavatar/`,
      //   {
      //     method: "POST",
      //     body: formData,
      //     headers: {
      //       Authorization: "Bearer " + user?.accessToken,
      //     },
      //   }
      // );

      const data = await req.data;
      // const imgdata = data.url.split(".")[0];

      // formData.append("public_id", imgdata);
      // await fetch("https://api.cloudinary.com/v1_1/dc9nekouu/image/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      if (data.error) {
        setError(data.message);
        setUploadProgress(0);
        clearFileInput();
        setUpLoading(false);
      } else {
        setAvatarId(data.imageId);
        setUpLoading(false);
      }
    } catch (e: any) {
      setUpLoading(false);
      setUploadProgress(0);
      clearFileInput();
      setError(e.message);
    }
  };

  const createStudent = async (
    name: string,
    classRoll: string,
    cless: string,
    fatherName: string,
    motherName: string,
    avatarId: string
  ) => {
    if (
      avatarId &&
      name &&
      classRoll &&
      cless &&
      fatherName &&
      examId &&
      examCenter &&
      id
    ) {
      let bRolx, eRolx;
      const bRoll = englishToBanglaNumber(+classRoll);
      if (bRoll) {
        bRolx = bRoll.toString().trim();
        eRolx = +classRoll;
      } else {
        bRolx = classRoll.toString().trim();
        const engconv = BanglaToEnglishNumber(classRoll);
        eRolx = +engconv;
      }
      let motherName_n = motherName ? motherName : "";
      const body = {
        name,
        rollNo: eRolx,
        bnRoll: bRolx,
        class: cless,
        fatherName,
        motherName: motherName_n,
        avatarId,
        examId,
        examCenterId: examCenter?.id,
        examWiseSchoolId: id,
      };
      try {
        setError("");
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roll/supcreate/`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.accessToken,
            },
          }
        );
        const data = await res.json();

        if (data?.id) {
          //   setAvatarId("");
          setExamWiseStudent([data, ...examWiseStudent]);
          clearInputFile();

          prop.setOpenModal(undefined);
        } else {
          setLoading(false);
          setError(data.message);
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
      aria-hidden="false"
      className={`${
        prop.openModal === "student-modal" ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 h-[81vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg ml-6 font-semibold text-gray-900 dark:text-white">
              পরীক্ষার্থী এড করুন
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
                        পরীক্ষার্থীর নাম (বাংলায়)
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
                        placeholder="মাহফুজ আনাম মজুমদার"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        শ্রেনী
                      </label>
                      <select
                        id="countries"
                        value={cless}
                        name="countries"
                        onChange={(e) => {
                          setClass(e.target.value);
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
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="school"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        রোল নং (বাংলায়)
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={classRoll}
                        onChange={(e) => setClassRoll(e.target.value)}
                        id="school"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="10"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        পিতার নাম (বাংলায়)
                      </label>
                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        name="position"
                        id="position"
                        className="shadow-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="জাকির হোসেন"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="current"
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                      >
                        মাতার নাম (বাংলায়)
                      </label>
                      <input
                        type="text"
                        name="current"
                        value={motherName}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setMotherName(e.target.value)}
                        id="current"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="কামরুন্নাহার"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <>
                        <label
                          className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                          htmlFor="default_size"
                        >
                          ছবি আপলোড করুন
                        </label>

                        <input
                          required
                          type="file"
                          accept="image/*"
                          ref={inputFile}
                          onChange={(e) => {
                            console.log("fire image upload event");

                            const imageFile = e.target.files?.[0];

                            if (imageFile?.name) {
                              setFile(imageFile);
                              formData.append("file", imageFile);
                              uploadFile(e);
                            } else {
                              setError("Cant find File");
                            }
                          }}
                          className={`block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                            !upLoading && uploadProgress === 100 && "hidden"
                          }`}
                          id="default_size"
                        />
                        {upLoading && (
                          <Progress color="green" progress={uploadProgress} />
                        )}
                        {!upLoading && uploadProgress === 100 && (
                          <div className="bg-gray-700 bg-opacity-50 rounded-md px-3 py-2 flex items-center">
                            <svg
                              className="stroke-2 stroke-current text-green-500 h-8 w-8 mr-2 flex-shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M0 0h24v24H0z" stroke="none" />
                              <circle cx={12} cy={12} r={9} />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                            <div className="text-green-500">
                              <div className="font-bold text-md">
                                ফাইল আপলোড সম্পূর্ণ হয়েছে
                              </div>
                            </div>
                          </div>
                        )}
                      </>
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
                  !avatarId &&
                    setAvatarId("b78f79b0-f3ac-4829-8fe1-afbd7fa44fdf");
                  if (name && fatherName && classRoll && cless && avatarId) {
                    createStudent(
                      name,
                      classRoll,
                      cless,
                      fatherName,
                      motherName,
                      avatarId
                    );
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
                <span className="hidden md:block">পরিক্ষার্থী অ্যাড করুন</span>
                <span className="block md:hidden">পরিক্ষার্থী অ্যাড</span>
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
    </div>
  );
}
